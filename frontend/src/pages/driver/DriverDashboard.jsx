"use client"

import React, { useEffect, useState, useMemo } from "react"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { db } from "../../firebase"
import { PieChart, Pie, Cell, Label, Tooltip, Legend } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

const DriverDashboard = () => {
  const [bookings, setBookings] = useState([])
  const [engineStatus, setEngineStatus] = useState("Good")
  const driverName = localStorage.getItem("name")
  const uid = localStorage.getItem("uid")

  useEffect(() => {
    if (!uid) return

    const q = query(collection(db, "bookings"), where("driverId", "==", uid))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setBookings(list)
    })

    const vehicleQ = query(
      collection(db, "vehicles"),
      where("assignedDriver", "==", uid)
    )
    const unsubscribeVehicle = onSnapshot(vehicleQ, (snapshot) => {
      if (!snapshot.empty) {
        setEngineStatus(snapshot.docs[0].data().engineStatus || "Good")
      }
    })

    return () => {
      unsubscribe()
      unsubscribeVehicle()
    }
  }, [uid])

  const currentBooking = bookings.find((b) => b.status === "in-progress") || null

  // --- Pie-chart Data Memoized ---
  const pieData = useMemo(() => [
    { name: "Pending", value: bookings.filter((b) => b.status === "pending").length },
    { name: "Completed", value: bookings.filter((b) => b.status === "completed").length },
    { name: "In-Progress", value: bookings.filter((b) => b.status === "in-progress").length },
    { name: "Cancelled", value: bookings.filter((b) => b.status === "cancelled").length },
  ], [bookings])

  const totalBookings = useMemo(
    () => pieData.reduce((acc, b) => acc + b.value, 0),
    [pieData]
  )

  // --- Colors (Blue Shades) ---
  const COLORS = ["#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe"]

  return (
    <div className="text-white">
      <h1 className="text-4xl font-bold">Welcome, {driverName}</h1>
      <p className="mt-2 text-gray-400">
        Here's your overview for today: bookings, routes, and vehicle health.
      </p>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-[#141414] p-6 rounded-xl border border-gray-800 shadow hover:scale-105 transition">
          <h2 className="text-lg text-gray-400">Upcoming Bookings</h2>
          <p className="text-3xl font-bold">{pieData[0].value}</p>
        </div>

        <div className="bg-[#141414] p-6 rounded-xl border border-gray-800 shadow hover:scale-105 transition">
          <h2 className="text-lg text-gray-400">Engine Status</h2>
          <p className="text-3xl font-bold">{engineStatus}</p>
        </div>

        <div className="bg-[#141414] p-6 rounded-xl border border-gray-800 shadow hover:scale-105 transition">
          <h2 className="text-lg text-gray-400">Completed Trips</h2>
          <p className="text-3xl font-bold">{pieData[1].value}</p>
        </div>

        <div className="bg-[#141414] p-6 rounded-xl border border-gray-800 shadow hover:scale-105 transition">
          <h2 className="text-lg text-gray-400">Current Booking</h2>
          <p className="text-3xl font-bold">{currentBooking ? currentBooking.customerName : "None"}</p>
        </div>
      </div>

      {/* Current Booking */}
      {currentBooking && (
        <div className="mt-8 bg-[#1e1e1e] p-6 rounded-xl border border-gray-700 shadow">
          <h2 className="mb-4 text-2xl font-bold text-white">Current Booking</h2>
          <p><span className="font-semibold text-gray-300">Customer:</span> {currentBooking.customerName}</p>
          <p><span className="font-semibold text-gray-300">Pickup:</span> {currentBooking.pickupLocation}</p>
          <p><span className="font-semibold text-gray-300">Drop:</span> {currentBooking.dropLocation}</p>
          <p className="mt-2">
            <span className="font-semibold text-gray-300">Status:</span>{" "}
            <span className="px-2 py-1 text-sm text-gray-200 bg-gray-800 rounded-md">{currentBooking.status}</span>
          </p>
        </div>
      )}

      {/* All Bookings + Pie Donut Chart */}
      <div className="mt-10">
        <h2 className="mb-4 text-2xl font-bold">All Bookings</h2>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">

          {/* LEFT — BOOKINGS */}
          <div>
            {bookings.length === 0 ? (
              <p className="text-gray-400">No bookings assigned yet.</p>
            ) : (
              <div className="space-y-4">
                {bookings.map((b) => (
                  <div key={b.id} className="p-4 rounded-xl border border-gray-700 bg-[#1a1a1a] shadow">
                    <p><span className="font-semibold text-gray-300">Customer:</span> {b.customerName}</p>
                    <p><span className="font-semibold text-gray-300">Pickup:</span> {b.pickupLocation}</p>
                    <p><span className="font-semibold text-gray-300">Drop:</span> {b.dropLocation}</p>
                    <p className="mt-2">
                      <span className="font-semibold text-gray-300">Status:</span>{" "}
                      <span className="px-2 py-1 text-sm text-gray-200 bg-gray-800 rounded-md">{b.status}</span>
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT — PIE DONUT CHART */}
          <Card className="bg-[#1a1a1a] border border-gray-800 shadow">
            <CardHeader className="items-center pb-0">
              <CardTitle className="text-white">Booking Status</CardTitle>
              <CardDescription className="text-gray-400">Overview</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
              <div className="mx-auto aspect-square max-h-[300px]">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={100}
                    strokeWidth={5}
                    label={({ name, cx, cy, midAngle, outerRadius, percent, index }) => (
                      <text
                        x={cx}
                        y={outerRadius + 20} // label below the slice
                        textAnchor="middle"
                        fill="#ffffff"
                        fontSize={12}
                      >
                        {name} ({pieData[index].value})
                      </text>
                    )}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1e1e1e", border: "none", color: "#fff" }}
                    itemStyle={{ color: "#fff" }}
                  />
                  <Legend verticalAlign="bottom" align="center" iconType="circle" />
                </PieChart>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm text-gray-400">
              Showing total bookings by status
            </CardFooter>
          </Card>

        </div>
      </div>
    </div>
  )
}

export default DriverDashboard

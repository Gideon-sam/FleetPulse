import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, doc, updateDoc, addDoc } from "firebase/firestore";
import { db } from "../../firebase";

const DriverBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [recommendation, setRecommendation] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ customerName: "", pickup: "", drop: "" });

  const uid = localStorage.getItem("uid");

  // Fetch bookings assigned to this driver
  useEffect(() => {
    if (!uid) return;
    const q = query(collection(db, "bookings"), where("driverId", "==", uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setBookings(list);
    });
    return () => unsubscribe();
  }, [uid]);

  // Generate Smart Recommendation (mock)
  const generateRecommendation = () => {
    const streets = ["Main Street", "Central Park", "Warehouse", "Downtown", "Riverside"];
    const shuffled = streets.sort(() => Math.random() - 0.5);
    setRecommendation(`Suggested Route: ${shuffled.join(" → ")}`);
  };

  // Mark booking complete
  const completeBooking = async (id) => {
    await updateDoc(doc(db, "bookings", id), { status: "Completed" });
  };

  // Handle Add Booking
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAddBooking = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "bookings"), {
      ...formData,
      driverId: uid,
      status: "Pending",
      timestamp: Date.now(),
    });
    setFormData({ customerName: "", pickup: "", drop: "" });
    setShowForm(false);
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-white">Customer Bookings</h1>
      <p className="mt-2 opacity-70">Manage your assigned bookings and see AI suggestions.</p>

      <div className="flex gap-4 mt-6">
        <button
          onClick={generateRecommendation}
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Generate Smart Recommendation
        </button>

        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
        >
          + Add Booking
        </button>
      </div>

      {recommendation && (
        <p className="mt-3 p-2 bg-[#141414] rounded border border-gray-800 text-white">
          {recommendation}
        </p>
      )}

      {/* Add Booking Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="p-6 bg-gray-900 rounded-xl w-96">
            <h2 className="mb-4 text-xl font-semibold">New Booking</h2>
            <form onSubmit={handleAddBooking} className="space-y-3">
              <input
                type="text"
                name="customerName"
                placeholder="Customer Name"
                value={formData.customerName}
                onChange={handleChange}
                required
                className="w-full p-2 text-white bg-gray-800 border border-gray-700 rounded"
              />
              <input
                type="text"
                name="pickup"
                placeholder="Pickup Location"
                value={formData.pickup}
                onChange={handleChange}
                required
                className="w-full p-2 text-white bg-gray-800 border border-gray-700 rounded"
              />
              <input
                type="text"
                name="drop"
                placeholder="Drop Location"
                value={formData.drop}
                onChange={handleChange}
                required
                className="w-full p-2 text-white bg-gray-800 border border-gray-700 rounded"
              />

              <div className="flex gap-2 mt-2">
                <button
                  type="submit"
                  className="flex-1 p-2 font-semibold text-white bg-green-600 rounded hover:bg-green-700"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 p-2 font-semibold text-white bg-gray-700 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bookings List */}
      <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-2">
        {bookings.length === 0 && <p className="text-white opacity-70">No bookings assigned yet.</p>}
        {bookings.map((b) => (
          <div
            key={b.id}
            className="p-4 bg-[#141414] rounded-xl border border-gray-800 text-white"
          >
            <h2 className="text-xl text-blue-400">Booking #{b.id}</h2>
            <p>Customer: {b.customerName}</p>
            <p>Pickup: {b.pickup}</p>
            <p>Drop: {b.drop}</p>
            <p>
              Status:{" "}
              <span
                className={
                  b.status === "Completed"
                    ? "text-green-400"
                    : b.status === "Pending"
                    ? "text-yellow-400"
                    : "text-red-400"
                }
              >
                {b.status || "Pending"}
              </span>
            </p>
            <button
              className="px-2 py-1 mt-2 bg-green-600 rounded"
              onClick={() => completeBooking(b.id)}
              disabled={b.status === "Completed"}
            >
              Mark Completed
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default DriverBookings;

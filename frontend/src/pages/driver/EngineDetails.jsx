import React, { useEffect, useState } from "react";
import DriverLayout from "./DriverLayout";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

const DriverEngine = () => {
  const [vehicle, setVehicle] = useState(null);

  const uid = localStorage.getItem("uid");

  // Fetch vehicle assigned to this driver (assuming bookings/vehicles have driverId)
  useEffect(() => {
    const q = query(collection(db, "vehicles"), where("assignedDriver", "==", uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setVehicle(list[0] || null); // Assuming one vehicle per driver
    });

    return () => unsubscribe();
  }, [uid]);

  return (
    <>
      <h1 className="text-3xl font-bold text-white">Vehicle Engine & Telemetry</h1>
      <p className="mt-2 opacity-70">Monitor your assigned vehicle in real-time.</p>

      {vehicle ? (
        <div className="mt-6 p-6 bg-[#141414] rounded-xl border border-gray-800 text-white">
          <h2 className="text-2xl text-blue-400">{vehicle.number}</h2>
          <p>Model: {vehicle.model}</p>
          <p>Type: {vehicle.type}</p>
          <p>Health: {vehicle.health}%</p>
          <p>Engine Status: {vehicle.engineStatus}</p>
          <p>
            Last Telemetry:{" "}
            {vehicle.lastTelemetry
              ? new Date(vehicle.lastTelemetry).toLocaleString()
              : "N/A"}
          </p>

          {/* Mock speed and location */}
          <p>Speed: {vehicle.speed || 0} km/h</p>
          <p>Location: {vehicle.location || "N/A"}</p>
        </div>
      ) : (
        <p className="mt-6 text-white opacity-70">
          No vehicle assigned yet.
        </p>
      )}
    </>
  );
};

export default DriverEngine;

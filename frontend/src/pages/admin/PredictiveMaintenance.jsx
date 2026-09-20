import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

const Predictive = () => {
  const [vehicles, setVehicles] = useState([]);

  // Fetch real-time vehicles
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "vehicles"), (snapshot) => {
      const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setVehicles(list);
    });

    return () => unsubscribe();
  }, []);

  // Update Health Manually
  const updateHealth = async (id, newHealth) => {
    if (newHealth > 100) newHealth = 100;
    if (newHealth < 0) newHealth = 0;
    await updateDoc(doc(db, "vehicles", id), { health: newHealth });
  };

  return (
    <>
      <div className="text-white">
        <h1 className="text-3xl font-bold">Predictive Maintenance</h1>
        <p className="mt-2 text-gray-400">
          Monitor vehicle health and maintenance alerts.
        </p>

        <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((v) => {
            // Determine health status
            let healthStatus = "Healthy";
            let healthColor = "bg-green-700 text-green-100";

            if (v.health < 50 && v.health >= 25) {
              healthStatus = "Warning";
              healthColor = "bg-yellow-700 text-yellow-100";
            } else if (v.health < 25) {
              healthStatus = "Critical";
              healthColor = "bg-red-700 text-red-100";
            }

            return (
              <div
                key={v.id}
                className="p-6 bg-[#141414] rounded-xl border border-gray-800 shadow"
              >
                <h2 className="text-xl font-semibold text-blue-400">{v.number}</h2>
                <p className="text-gray-300">Model: {v.model}</p>
                <p className="text-gray-300">Type: {v.type}</p>

                <p className="mt-2">
                  Health:{" "}
                  <span
                    className={`px-2 py-1 rounded font-medium text-sm ${healthColor}`}
                  >
                    {v.health}% — {healthStatus}
                  </span>
                </p>

                <p className="mt-1 text-gray-300">Engine Status: {v.engineStatus}</p>

                <div className="flex gap-2 mt-4">
                  <button
                    className="flex-1 px-2 py-1 text-white transition bg-green-600 rounded-xl hover:bg-green-700"
                    onClick={() => updateHealth(v.id, v.health + 10)}
                    disabled={v.health >= 100}
                  >
                    +10
                  </button>
                  <button
                    className="flex-1 px-2 py-1 text-white transition bg-red-600 rounded-xl hover:bg-red-700"
                    onClick={() => updateHealth(v.id, v.health - 10)}
                    disabled={v.health <= 0}
                  >
                    -10
                  </button>
                </div>
              </div>
            );
          })}

          {vehicles.length === 0 && (
            <p className="mt-6 text-center text-gray-400 col-span-full">
              No vehicles found.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Predictive;

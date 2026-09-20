// src/pages/admin/FleetManagement.jsx
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import api from "../../api/axios";

export default function FleetManagement() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    // fetch vehicles (placeholder)
    async function load() {
      try {
        // const res = await api.get("/admin/vehicles/all");
        // setVehicles(res.data);
        setVehicles([
          { id: 1, vehicleNo: "NF-101", model: "Swift", healthStatus: "Good" },
          { id: 2, vehicleNo: "NF-102", model: "Ertiga", healthStatus: "Warning" },
        ]);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, []);

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Fleet Management</h2>
      <div className="grid gap-4">
        {vehicles.map(v => (
          <Card key={v.id}>
            <CardHeader>
              <CardTitle>{v.vehicleNo} — {v.model}</CardTitle>
            </CardHeader>
            <CardContent>
              <div>Health: <strong>{v.healthStatus}</strong></div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

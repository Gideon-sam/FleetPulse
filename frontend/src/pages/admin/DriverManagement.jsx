// src/pages/admin/DriverManagement.jsx
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function DriverManagement() {
  const [drivers] = useState([
    { id: 1, name: "Rohit Kumar", phone: "9876543210" },
    { id: 2, name: "Anita Singh", phone: "9876501234" },
  ]);

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Driver Management</h2>
      <div className="grid gap-4">
        {drivers.map(d => (
          <Card key={d.id}>
            <CardHeader>
              <CardTitle>{d.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div>Phone: {d.phone}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

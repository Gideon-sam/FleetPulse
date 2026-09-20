// src/pages/admin/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import api from "@/api/axios";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // placeholder for fetching dashboard stats
    async function fetchStats() {
      try {
        // example: GET /dashboard/admin/stats
        // const res = await api.get("/dashboard/admin/stats");
        // setStats(res.data);
        setStats({ vehicles: 12, drivers: 8, activeRides: 3 });
      } catch (err) {
        console.error(err);
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Vehicles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{stats?.vehicles ?? "—"}</div>
          <div className="text-sm text-muted-foreground">Total vehicles</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Drivers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{stats?.drivers ?? "—"}</div>
          <div className="text-sm text-muted-foreground">Total drivers</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Rides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{stats?.activeRides ?? "—"}</div>
          <div className="text-sm text-muted-foreground">Ongoing</div>
        </CardContent>
      </Card>
    </div>
  );
}

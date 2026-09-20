// src/pages/admin/RouteOptimization.jsx
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import api from "@/api/axios";

export default function RouteOptimization() {
  const [start, setStart] = useState({ lat: "", lng: "" });
  const [end, setEnd] = useState({ lat: "", lng: "" });
  const [route, setRoute] = useState(null);
  const [loading, setLoading] = useState(false);

  const run = async () => {
    setLoading(true);
    try {
      const res = await api.post("/route/optimize", {
        startLat: parseFloat(start.lat),
        startLng: parseFloat(start.lng),
        endLat: parseFloat(end.lat),
        endLng: parseFloat(end.lng)
      });
      setRoute(res.data);
    } catch (err) {
      alert("Failed to fetch route: " + (err?.response?.data || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">AI Route (OpenRouteService)</h2>
      <Card>
        <CardHeader>
          <CardTitle>Quick Route</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <input placeholder="start lat" value={start.lat} onChange={e => setStart({...start, lat: e.target.value})} className="p-2 border rounded bg-background border-border/10" />
            <input placeholder="start lng" value={start.lng} onChange={e => setStart({...start, lng: e.target.value})} className="p-2 border rounded bg-background border-border/10" />
            <input placeholder="end lat" value={end.lat} onChange={e => setEnd({...end, lat: e.target.value})} className="p-2 border rounded bg-background border-border/10" />
            <input placeholder="end lng" value={end.lng} onChange={e => setEnd({...end, lng: e.target.value})} className="p-2 border rounded bg-background border-border/10" />
          </div>
          <button onClick={run} className="px-4 py-2 rounded bg-primary text-primary-foreground">
            {loading ? "Running..." : "Optimize"}
          </button>

          {route && (
            <div className="mt-4">
              <div>Distance (m): {route.distance}</div>
              <div>Duration (s): {route.duration}</div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

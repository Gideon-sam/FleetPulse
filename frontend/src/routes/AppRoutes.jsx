// src/routes/AppRoutes.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";

import DashboardLayout from "@/components/layout/DashboardLayout";

import AdminDashboard from "@/pages/admin/AdminDashboard";
import FleetManagement from "@/pages/admin/FleetManagement";
import PredictiveMaintenance from "@/pages/admin/PredictiveMaintenance";
import DriverManagement from "@/pages/admin/DriverManagement";
import RouteOptimization from "@/pages/admin/RouteOptimization";

import DriverDashboard from "@/pages/driver/DriverDashboard";
import Profile from "@/pages/driver/Profile";
import Bookings from "@/pages/driver/Bookings";
import EngineDetails from "@/pages/driver/EngineDetails";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<DashboardLayout role="ADMIN" />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/fleet" element={<FleetManagement />} />
          <Route path="/admin/predictive" element={<PredictiveMaintenance />} />
          <Route path="/admin/drivers" element={<DriverManagement />} />
          <Route path="/admin/route" element={<RouteOptimization />} />
        </Route>

        <Route element={<DashboardLayout role="DRIVER" />}>
          <Route path="/driver/dashboard" element={<DriverDashboard />} />
          <Route path="/driver/profile" element={<Profile />} />
          <Route path="/driver/bookings" element={<Bookings />} />
          <Route path="/driver/engine" element={<EngineDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

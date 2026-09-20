// src/components/layout/DashboardLayout.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet, useNavigate } from "react-router-dom";

export default function DashboardLayout({ role = "ADMIN" }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // try to get user from localStorage (simple)
    const raw = localStorage.getItem("nf_user");
    if (raw) setUser(JSON.parse(raw));
    else {
      // redirect to login if not present
      navigate("/login");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("nf_user");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role={role} footerUser={user} />
      <div className="flex flex-col flex-1">
        <Topbar user={user} onLogout={handleLogout} />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

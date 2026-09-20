// src/components/layout/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Truck, Route, Wrench, Users } from "lucide-react";

function SideItem({ to, children, icon }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
          isActive ? "bg-accent/20 text-accent-foreground" : "text-muted-foreground hover:bg-white/2"
        }`
      }
    >
      <span className="text-sm">{icon}</span>
      <span className="text-sm">{children}</span>
    </NavLink>
  );
}

export default function Sidebar({ role, footerUser }) {
  return (
    <aside className="flex flex-col justify-between w-64 min-h-screen border-r bg-card border-border/10">
      <div className="p-4">
        <div className="px-2 mb-6">
          <h2 className="text-lg font-bold">FleetPulse</h2>
          <p className="text-xs text-muted-foreground">Admin Console</p>
        </div>

        <nav className="flex flex-col gap-2">
          <SideItem to={role === "ADMIN" ? "/admin/dashboard" : "/driver/dashboard"} icon={<Home size={16} />}>
            Dashboard
          </SideItem>

          {role === "ADMIN" && (
            <>
              <SideItem to="/admin/fleet" icon={<Truck size={16} />}>Fleet Management</SideItem>
              <SideItem to="/admin/route" icon={<Route size={16} />}>AI Route</SideItem>
              <SideItem to="/admin/predictive" icon={<Tool size={16} />}>Predictive Maintenance</SideItem>
              <SideItem to="/admin/drivers" icon={<Users size={16} />}>Driver Management</SideItem>
            </>
          )}

          {role === "DRIVER" && (
            <>
              <SideItem to="/driver/profile" icon={<Users size={16} />}>Profile</SideItem>
              <SideItem to="/driver/bookings" icon={<Truck size={16} />}>Bookings</SideItem>
              <SideItem to="/driver/engine" icon={<Wrench  size={16} />}>Engine Details</SideItem>
            </>
          )}
        </nav>
      </div>

      <div className="p-4 border-t border-border/10">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent">N</div>
          <div>
            <div className="text-sm font-medium">{footerUser?.name ?? "Admin"}</div>
            <div className="text-xs text-muted-foreground">{footerUser?.role ?? ""}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

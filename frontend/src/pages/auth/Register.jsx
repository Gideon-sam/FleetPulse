// src/pages/auth/Register.jsx
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import api from "@/api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "DRIVER",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // backend: POST /api/user/register
      const res = await api.post("/api/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role
      });
      localStorage.setItem("nf_user", JSON.stringify(res.data));
      navigate(form.role === "ADMIN" ? "/admin/dashboard" : "/driver/dashboard");
    } catch (err) {
  if (err.response) {
    console.log("BACKEND ERROR:", err.response.data);
    alert("Backend error: " + JSON.stringify(err.response.data));
  } else if (err.request) {
    console.log("NO RESPONSE:", err.request);
    alert("No response from server");
  } else {
    console.log("AXIOS ERROR:", err.message);
    alert("Axios error: " + err.message);
  }
}
 finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Create account</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit}>
            <input
              name="name"
              placeholder="Full name"
              value={form.name}
              onChange={onChange}
              className="w-full p-3 border rounded-md bg-background border-border/10"
              required
            />
            <input
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={onChange}
              className="w-full p-3 border rounded-md bg-background border-border/10"
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={onChange}
              className="w-full p-3 border rounded-md bg-background border-border/10"
              required
            />

            <select
              name="role"
              value={form.role}
              onChange={onChange}
              className="w-full p-3 border rounded-md bg-background border-border/10"
            >
              <option value="ADMIN">Admin</option>
              <option value="DRIVER">Driver</option>
            </select>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </Button>
          </form>

          <p className="mt-4 text-sm text-center text-muted-foreground">
            Already registered? <a href="/login" className="underline text-primary">Login</a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

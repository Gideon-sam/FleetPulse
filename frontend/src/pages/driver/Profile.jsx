import React, { useState } from "react";

const DriverProfile = () => {
  const [name, setName] = useState("Driver Name");
  const [phone, setPhone] = useState("9876543210");

  return (
    <div className="max-w-xl text-white">
      <h2 className="text-3xl font-bold">Profile Settings</h2>

      <div className="mt-6 bg-[#141414] p-6 rounded-xl border border-gray-800">
        <label className="block mb-3 text-sm opacity-80">Full Name</label>
        <input
          className="w-full p-2 rounded bg-[#0d0d0d] border border-gray-700 text-white"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="block mt-4 mb-3 text-sm opacity-80">Phone</label>
        <input
          className="w-full p-2 rounded bg-[#0d0d0d] border border-gray-700 text-white"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button className="w-full p-2 mt-6 bg-blue-600 rounded-lg hover:bg-blue-700">
          Save
        </button>
      </div>
    </div>
  );
};

export default DriverProfile;

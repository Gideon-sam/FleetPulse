// src/components/shared/Loader.jsx
import React from "react";

export default function Loader({ size = 36 }) {
  return (
    <div className="flex items-center justify-center">
      <svg
        style={{ width: size, height: size }}
        viewBox="0 0 50 50"
        className="animate-spin"
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="5"
          fill="none"
        />
        <path
          d="M45 25a20 20 0 00-6.1-14"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
}

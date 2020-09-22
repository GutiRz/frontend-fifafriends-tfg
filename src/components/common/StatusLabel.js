import React from "react";

export const StatusLabel = ({ color, text }) => {
  return (
    <span
      className={`relative inline-block px-3 py-1 font-semibold text-${color}-900 leading-tight mr-8`}
    >
      <span
        aria-hidden=""
        className={`absolute inset-0 bg-${color}-200 opacity-50 rounded-full`}
      ></span>
      <span className="relative">{text}</span>
    </span>
  );
};

"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={theme === "dark"}
        onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      />
      <div
        className={`w-14 h-7 flex items-center rounded-full p-1 transition duration-300 ${
          theme === "dark" ? "bg-[#cacaca]" : "bg-[#2a2a2a]"
        }`}
      >
        <FaMoon
          size={14}
          className={`text-gray-200 absolute right-2 transition-opacity duration-300 `}
        />
        <FaSun
          size={14}
          className={`text-gray-700 absolute left-2 transition-opacity duration-300`}
        />
        <div
          className={`h-5 w-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
            theme === "dark" ? "translate-x-7" : "translate-x-0"
          }`}
        />
      </div>
    </label>
  );
}

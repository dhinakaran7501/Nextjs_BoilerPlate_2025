import { ToastType } from "@/types/utilsTypes";
import { NextRequest } from "next/server";
import toast from "react-hot-toast";

export function isAuthenticated(req: NextRequest): boolean {
  const token = req.cookies.get("authToken");
  return !!token;
}

export const setCookie = (
  name: string,
  value: string,
  days = 0,
  hours = 0,
): void => {
  const date = new Date();
  const serializedValue = btoa(encodeURIComponent(value)); // Convert object to Base64

  if (days || hours) {
    date.setTime(
      date.getTime() + hours * 60 * 60 * 1000 + days * 24 * 60 * 60 * 1000,
    );
    document.cookie = `${name}=${serializedValue};path=/;expires=${date.toUTCString()};SameSite=Lax`;
  } else {
    document.cookie = `${name}=${serializedValue};path=/;SameSite=Lax`;
  }
};

export const getCookie = (name: string) => {
  const cookieMatch = document.cookie.match(`(^|;)\\s*${name}=([^;]*)`);
  if (cookieMatch && cookieMatch[2]) {
    try {
      return JSON.parse(decodeURIComponent(atob(cookieMatch[2])));
    } catch (error) {
      console.error("Error parsing cookie value:", error);
      return null;
    }
  }
  return null;
};

export const deleteCookie = (name: string): void => {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax`;
};

export const showToast = (
  type: ToastType,
  message: string,
  duration: number = 3000,
): void => {
  const options = {
    duration,
    style: {
      borderRadius: "10px",
      background: "var(--primary-background-color)",
      color: "var(--primary-text-color)",
    },
  };

  switch (type) {
    case "success":
      toast.success(message, options);
      break;
    case "error":
      toast.error(message, options);
      break;
    case "info":
      toast(message, { ...options, icon: "ℹ️" });
      break;
    case "warning":
      toast(message, { ...options, icon: "⚠️" });
      break;
    default:
      toast(message, options);
      break;
  }
};

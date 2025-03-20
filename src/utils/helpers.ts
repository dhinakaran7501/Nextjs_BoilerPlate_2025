import { ErrorResponse, ToastType } from "@/types/utilsTypes";
import { NextRequest } from "next/server";
import toast from "react-hot-toast";
import { CookieKey } from "./secureKeys";

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
  if (typeof window === "undefined") return null;

  const cookieMatch = document.cookie.match(`(^|;)\\s*${name}=([^;]*)`);
  if (cookieMatch && cookieMatch[2]) {
    try {
      return decodeURIComponent(atob(cookieMatch[2]));
    } catch (error) {
      return error;
    }
  }
  return null;
};

export const deleteCookie = (name: string): void => {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax`;
};

export function isAuthenticated(req?: NextRequest): boolean {
  if (typeof window !== "undefined") {
    return !!getCookie(CookieKey);
  }

  const token = req?.cookies.get(CookieKey)?.value;
  return !!token;
}

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

export function handleError(error: any): ErrorResponse {
  let errorMessage = "Something went wrong! Please try again.";
  let statusCode;

  // API response Error
  if (error?.response) {
    statusCode = error.response.status;
    errorMessage =
      error.response.data?.message ||
      `Server responded with an error (${statusCode})`;
  }
  // Network error
  else if (error?.message?.includes("Network Error")) {
    errorMessage = "Network error! Please check your connection.";
  }
  // built-in JavaScript error
  else if (error instanceof Error) {
    errorMessage = error.message;
  }

  showToast("error", errorMessage);

  return { message: errorMessage, statusCode };
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3005";

export function getCookie(name: string) {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
  return null;
}

function setCookie(name: string, value: string, days: number) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `; expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value}${expires}; path=/`;
}

function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = getCookie("access_token");

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(endpoint, { ...options, headers });
  return response;
}

export async function fetchListings(category?: string) {
  const url = new URL(`${API_URL}/listings`);
  if (category) {
    url.searchParams.append("category", category);
  }
  const response = await apiFetch(url.toString(), { method: "GET" });
  if (!response.ok) {
    throw new Error("Failed to fetch listings");
  }
  return response.json();
}

export async function checkUser(identifier: string) {
  const response = await apiFetch(`${API_URL}/auth/check-user`, {
    method: "POST",
    body: JSON.stringify({ identifier }),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Failed to check user");
  }
  return response.json();
}

export async function sendOtp(email: string) {
  const response = await apiFetch(`${API_URL}/auth/send-otp`, {
    method: "POST",
    body: JSON.stringify({ email }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to send OTP");
  }
  return response.json();
}

export async function verifyOtp(email: string, otp: string) {
  const response = await apiFetch(`${API_URL}/auth/verify-otp`, {
    method: "POST",
    body: JSON.stringify({ email, otp }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Invalid OTP");
  }
  return response.json();
}

export async function onboardUser(data: {
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
}) {
  const response = await apiFetch(`${API_URL}/auth/onboard`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to onboard user");
  }
  return response.json();
}

export async function login(credentials: {
  email?: string;
  phone?: string;
  password?: string;
}) {
  const response = await apiFetch(`${API_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Login failed");
  }
  const data = await response.json();
  if (data.access_token) {

    setCookie("access_token", data.access_token, 7);
  }
  return data;
}

export async function register(userData: {
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  password?: string;
  phone?: string;
  country?: string;
}) {
  const response = await apiFetch(`${API_URL}/auth/register`, {
    method: "POST",
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Registration failed");
  }
  const data = await response.json();
  if (data.token) {
    setCookie("access_token", data.token, 7);
  }
  return data;
}

export function logout() {
  deleteCookie("access_token");

  localStorage.removeItem("userAvatar");
}

export async function fetchMe() {
  const response = await apiFetch(`${API_URL}/auth/me`);
  if (!response.ok) {
    throw new Error("Failed to fetch user profile");
  }
  return response.json();
}

export async function uploadAvatar(file: File, email: string) {

  const formData = new FormData();
  formData.append("file", file);
  formData.append("email", email);

  const token = getCookie("access_token");

  const response = await fetch(`${API_URL}/auth/upload-avatar`, {
    method: "POST",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload avatar");
  }
  return response.json();
}

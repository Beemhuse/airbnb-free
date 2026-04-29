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

/** Parses both {message: "..."} and {error: "..."} response shapes */
async function parseErrorMessage(response: Response, fallback: string): Promise<string> {
  try {
    const body = await response.json();
    // Handle arrays (e.g. NestJS validation errors)
    if (Array.isArray(body?.message)) return body.message.join(", ");
    return body?.message || body?.error || fallback;
  } catch {
    return fallback;
  }
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

export async function fetchListingById(id: string) {
  const response = await apiFetch(`${API_URL}/listings/${id}`, { method: "GET" });
  if (!response.ok) {
    const message = await parseErrorMessage(response, "Failed to fetch listing");
    throw new Error(message);
  }
  return response.json();
}


export async function sendOtp(email: string) {
  const response = await apiFetch(`${API_URL}/auth/send-otp`, {
    method: "POST",
    body: JSON.stringify({ email }),
  });
  if (!response.ok) {
    const message = await parseErrorMessage(response, "Failed to send OTP");
    throw new Error(message);
  }
  return response.json();
}

export async function verifyOtp(email: string, otp: string) {
  const response = await apiFetch(`${API_URL}/auth/verify-otp`, {
    method: "POST",
    body: JSON.stringify({ email, otp }),
  });
  if (!response.ok) {
    const message = await parseErrorMessage(response, "Invalid OTP code");
    throw new Error(message);
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
    const message = await parseErrorMessage(response, "Failed to onboard user");
    throw new Error(message);
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

  // Handle explicit HTTP error status codes
  if (!response.ok) {
    const message = await parseErrorMessage(response, "Login failed");
    throw new Error(message);
  }

  const data = await response.json();

  // Handle backends that return 200 OK with {error: "..."} instead of a 4xx status
  if (!data.access_token && (data.error || data.message?.includes?.("Invalid"))) {
    throw new Error(data.error || data.message || "Invalid credentials");
  }

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
    const message = await parseErrorMessage(response, "Registration failed");
    throw new Error(message);
  }
  const data = await response.json();
  // Some backends return token, others access_token
  const token = data.access_token || data.token;
  if (token) {
    setCookie("access_token", token, 7);
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
    const message = await parseErrorMessage(response, "Failed to upload avatar");
    throw new Error(message);
  }
  return response.json();
}

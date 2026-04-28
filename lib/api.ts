const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005';

export async function fetchListings() {
  const response = await fetch(`${API_URL}/listings`);
  if (!response.ok) {
    throw new Error('Failed to fetch listings');
  }
  return response.json();
}

export async function sendOtp(email: string) {
  const response = await fetch(`${API_URL}/auth/send-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to send OTP');
  }
  return response.json();
}

export async function verifyOtp(email: string, otp: string) {
  const response = await fetch(`${API_URL}/auth/verify-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, otp }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Invalid OTP');
  }
  return response.json();
}

export async function onboardUser(data: {
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
}) {
  const response = await fetch(`${API_URL}/auth/onboard`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to onboard user');
  }
  return response.json();
}


export async function login(credentials: { email?: string; phone?: string; password?: string }) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    throw new Error('Login failed');
  }
  return response.json();
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
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Registration failed');
  }
  return response.json();
}



export async function uploadAvatar(file: File, email: string) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('email', email);

  const response = await fetch(`${API_URL}/auth/upload-avatar`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload avatar');
  }
  return response.json();
}

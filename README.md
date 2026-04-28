# Airbnb Clone - Frontend

A modern, high-performance Airbnb clone built with Next.js, featuring a robust onboarding flow, secure cookie-based authentication, and dynamic listing management.

## 🚀 Features

- **Onboarding Flow**: Multi-step registration wizard including profile setup, community commitment, and phone verification.
- **Secure Authentication**: Cookie-based session persistence with `access_token` and a dedicated `/me` endpoint for real-time user hydration.
- **Dynamic Listings**: Category-based filtering and listing discovery powered by TanStack React Query.
- **State Management**: Centralized data fetching and caching using TanStack React Query for smooth, zero-latency interactions.
- **Premium UI**: Styled with Tailwind CSS, featuring glassmorphism, smooth transitions, and conditional footers.

## 🛠️ Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Data Fetching**: TanStack React Query
- **State/Auth**: Custom `useAuth` and `useCrud` hooks
- **API Client**: Standard `fetch` with centralized `apiFetch` wrapper

## 🏃 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm/yarn

### Local Development

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd airbnb-free
   ```

2. **Install dependencies**:

   ```bash
   pnpm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_API_URL=(https://airbnb-server-keek.onrender.com)
   ```

4. **Launch the development server**:
   ```bash
   pnpm dev
   ```
   The app will be available at `http://localhost:3000`.

### Production Deployment

1. **Build the application**:

   ```bash
   pnpm build
   ```

2. **Start the production server**:
   ```bash
   pnpm start
   ```

## 📡 API Architecture

The frontend communicates with a backend service (defaulting to port 3005). Authentication is handled via Bearer tokens stored in the `access_token` cookie.

### Key Endpoints

| Category       | Endpoint           | Method | Description                                     |
| :------------- | :----------------- | :----- | :---------------------------------------------- |
| **Auth**       | `/auth/login`      | POST   | Authenticate user and receive access token.     |
| **Auth**       | `/auth/register`   | POST   | Create a new user account.                      |
| **Auth**       | `/auth/me`         | GET    | Retrieve current user profile (requires token). |
| **Auth**       | `/auth/check-user` | POST   | Check if an email/phone already exists.         |
| **Onboarding** | `/auth/send-otp`   | POST   | Send verification code to user email/phone.     |
| **Onboarding** | `/auth/verify-otp` | POST   | Verify the OTP code provided by user.           |
| **Listings**   | `/listings`        | GET    | Fetch all listings or filter by category.       |

## 🏗️ Project Structure

- `app/`: Next.js pages and layouts.
- `components/`: Reusable UI components, including the `onboarding` flow.
- `hooks/`: Custom React Query hooks (`useAuth`, `useListings`, `useCrud`).
- `lib/`: Utility functions and API client (`api.ts`).
- `public/`: Static assets and logos.

---

_Created with ❤️ for the Airbnb community._

# AddressVerify — Frontend

The React frontend for AddressVerify, a full-stack application that verifies a user's physical presence at an address using GPS coordinates from their device.

> **Backend repo:** [address-verify-backend](https://github.com/OchigboDaniel/address-verification-backend)

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React 18 + Vite | UI framework and build tool |
| React Router v6 | Client-side routing and navigation |
| Tailwind CSS | Utility-first styling |
| Fetch API | HTTP requests to Spring Boot backend |

---

## Features

- **JWT Authentication** — login stores token and role in localStorage, logout clears session
- **Role-Based Routing** — users land on the verify page, admins/managers land on the dashboard
- **Protected Routes** — unauthenticated users are redirected to login; unauthorized roles are redirected away
- **GPS Verification** — uses the browser Geolocation API to capture coordinates and send to the backend
- **Admin Dashboard** — paginated table of all verification records with next/previous navigation
- **Filtering** — search records by country, state, or email via backend query parameters
- **CSV Export** — triggers a file download directly from the backend endpoint
- **Reusable Component Library** — `Input`, `Button`, `ErrorMessage`, `ProtectedRoute` components used across pages

---

## Project Structure

```
src/
├── components/
│   ├── Button.jsx
│   ├── ErrorMessage.jsx
│   ├── Input.jsx
│   └── ProtectedRoute.jsx
│   └── NavBar.jsx
├── pages/
│   ├── WelcomePage.jsx
│   ├── LoginPage.jsx
│   ├── SignUpPage.jsx
│   ├── VerifyPage.jsx
│   └── AdminDashboard.jsx
├── service/
│   ├── fetchAddress.js
│   └── getGeoLocation.js
├── config.js
└── App.jsx
```

---

## Pages

| Page | Route | Access | Description |
|---|---|---|---|
| Welcome | `/` | Public | Landing page with Login and Sign Up |
| Login | `/login` | Public | JWT login with role-based redirect |
| Sign Up | `/signup` | Public | New user registration |
| Verify | `/verify-address` | USER | GPS-based address verification |
| Admin Dashboard | `/admin/dashboard` | ADMIN, MANAGER | Paginated records, filters, CSV export |

---

## Getting Started

### Prerequisites
- Node.js 18+
- AddressVerify backend running on `http://localhost:8080`

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_SIGNUP_URL=http://localhost:8080/api/auth/signup
VITE_LOGIN_URL=http://localhost:8080/api/auth/login
VITE_EXPORT_CSV_FILE_URL=http://localhost:8080/api/address?export=true
VITE_ADDRESS_URL=http://localhost:8080/api/address
VITE_VERIFY_ADDRESS_URL=http://localhost:8080/api/verify-address
```

### Run Locally

```bash
git clone https://github.com/OchigboDaniel/address-verification-frontend.git
cd address-verify
npm install
npm run dev
```

App will be available at `http://localhost:5173`

---

## Key Design Decisions

**Controlled inputs** — all form inputs are controlled components driven by React state, making form data always accessible without touching the DOM.

**Service abstraction** — API calls and browser APIs (geolocation, fetch) are extracted into `/service` files, keeping page components focused on UI logic only.

**Backend-driven filtering and pagination** — filtering and pagination happen on the server, not the client, ensuring all records are covered regardless of what's currently loaded in the browser.

**Role-based protected routes** — `ProtectedRoute` accepts a `requiredRole` prop, so route-level access control is declared in one place (`App.jsx`) rather than scattered across pages.

---

## Known Limitations & Future Improvements

| Limitation | Planned Improvement |
|---|---|
| JWT stored in localStorage | Move to httpOnly cookies to prevent XSS attacks |
| No token expiry handling | Detect 401 responses and redirect to login automatically |
| No loading skeleton on dashboard | Replace "Loading..." text with a skeleton table |
| No empty state illustration | Add a friendly message when no records match the filter |
| No mobile responsive design | Add responsive breakpoints for tablet and mobile |

---

## Author

**Daniel** — Full-Stack Developer (Java + React)  
[GitHub](https://github.com/OchigboDaniel) · [LinkedIn](www.linkedin.com/in/daniel-ochigbo-2a77b7229)

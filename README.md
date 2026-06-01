# Cost Tracking Application

A full-stack, multi-user app to track and manage your **income and expenses**. Users sign in,
define spending categories, record expenses (multi-item, multi-currency) and income, and view
analytics of their monthly spending.

Built with **Angular 21**, **Node.js**, **Express 5**, and **MongoDB**.

---

## Features

- JWT authentication (register / login) with access + refresh tokens
- Add, edit, and delete expense and income records
- Multi-item, multi-currency expenses with per-item categories
- User-defined categories for organizing spending
- Analytics dashboard and reports (charts via ECharts)
- Paginated, filterable transaction lists
- Responsive UI styled with Tailwind CSS v4

---

## Tech Stack

| Layer    | Technology |
|----------|------------|
| Frontend | Angular 21 (standalone, zoneless, signals), NgRx, Tailwind CSS v4, ECharts, lucide-angular |
| Backend  | Node.js, Express 5, TypeScript, Mongoose |
| Database | MongoDB |
| Auth     | JWT (access + refresh), bcrypt |
| Deploy   | Serverless (`serverless-http`) |

---

## Project Structure

```
CostTracking/
├── Backend/                  # Express + Mongoose REST API (TypeScript)
│   └── src/
│       ├── config/           # DB connection
│       ├── controllers/      # Route handlers (auth, exp, category, income)
│       ├── handlers/         # Not-found + central error handler
│       ├── middlewares/      # auth guard, zod validation, schemas
│       ├── models/           # Mongoose schemas + data-access fns (+ seeds)
│       ├── routes/           # Feature routers mounted under /api
│       ├── types/            # Shared interfaces
│       ├── app.ts            # Express app setup
│       ├── server.ts         # Local server entry
│       └── serverless.ts     # Serverless handler
│
├── Frontend/                 # Angular 21 SPA
│   └── src/app/
│       ├── auth/             # login, register, route guards
│       ├── core/             # services, HTTP interceptors, guards, utils
│       ├── common/           # reusable components & directives
│       ├── dashboard/        # expenses, income, category, analytics, layout
│       └── store/            # NgRx slices (expenses, income, category)
│
└── README.md
```

---

## Prerequisites

- Node.js v18+
- MongoDB (local or cloud)
- Angular CLI (`npm i -g @angular/cli`)

---

## Getting Started

### Clone

```bash
git clone https://github.com/Sushilkarki77/CostTracking
cd CostTracking
```

### Backend

```bash
cd Backend
npm install
```

Create a `.env` file in `Backend/`:

```env
PORT=3000
MONGO_URI=<your-mongodb-connection-string>
SECRET_KEY=<jwt-access-token-secret>
SECRET_KEY_REFRESH=<jwt-refresh-token-secret>
```

Run the API (watch mode):

```bash
npm run dev
```

API runs at `http://localhost:3000`.

### Frontend

```bash
cd Frontend
npm install
```

Set the API base URL in `src/environments/environment.development.ts`
(note the trailing slash — services append paths like `auth/`, `exp`, etc.):

```ts
export const environment = {
  API_URL: 'http://localhost:3000/api/',
  production: false,
};
```

Run the app:

```bash
npm start
```

Frontend runs at `http://localhost:4200`.

---

## API Endpoints

All non-auth routes require an `Authorization: Bearer <accessToken>` header. Responses use the
shape `{ message, data }`.

### Auth — `/api/auth`
- `POST /register` – Create a user
- `POST /login` – Log in, returns access + refresh tokens
- `POST /refresh-token` – Exchange a refresh token for a new access token

### Expenses — `/api/exp`
- `GET /` – List the current user's expenses
- `POST /` – Create an expense
- `PUT /:id` – Update an expense
- `DELETE /:id` – Delete an expense

### Categories — `/api/cat`
- `GET /` – List categories
- `POST /` – Create a category
- `PUT /:id` – Update a category
- `DELETE /:id` – Delete a category

### Income — `/api/income`
- `GET /` – List income records
- `POST /` – Create an income record
- `PUT /:id` – Update an income record
- `DELETE /:id` – Delete an income record

---

## Scripts

### Backend
- `npm run dev` – Run with tsx watch
- `npm run build` – Compile TypeScript (`tsc`)
- `npm run deploy` – Build and deploy via Serverless

### Frontend
- `npm start` – Dev server (`ng serve`)
- `npm run build` – Production build
- `npm test` – Unit tests (Karma/Jasmine)

---

## Contributing

1. Fork the repository
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add feature"`
4. Push to branch: `git push origin feature/your-feature`
5. Open a pull request

---

## License

This project is licensed under the **MIT License**.

# Cost Tracking Application

A full-stack web application to track and manage your incomes and expenses, built with **Node.js**, **Express**, **MongoDB**, and **Angular**.

---

## Features

* Add, edit, and delete income and expense records
* Categorize transactions for better tracking
* View analytics and dashboards to monitor spending habits
* Responsive Angular frontend with smooth UX
* RESTful Express API with MongoDB backend
* Paginated and searchable transaction lists

---

## Tech Stack

* **Frontend:** Angular
* **Backend:** Node.js, Express
* **Database:** MongoDB
* **Styling:** Tailwind CSS / Angular Material (if used)

---

## Prerequisites

* Node.js v18+
* MongoDB (local or cloud)
* Angular CLI

---

## Getting Started

### Clone the repository

```bash
git clone [<repository-url>](https://github.com/Sushilkarki77/CostTracking)
cd cost-tracking-app
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=3000
MONGO_URI=<your-mongodb-connection-string>
```

Start the backend server:

```bash
npm run dev
```

Server will run on `http://localhost:3000`.

### Frontend Setup

```bash
cd frontend
npm install
```

Update `environment.ts` with the API URL:

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

Run the Angular app:

```bash
ng serve
```

Frontend will run on `http://localhost:4200`.

---

## API Endpoints

* `GET /api/expenses` – Fetch all expenses
* `POST /api/expenses` – Add a new expense
* `PUT /api/expenses/:id` – Update an expense
* `DELETE /api/expenses/:id` – Delete an expense
* `GET /api/incomes` – Fetch all incomes
* `POST /api/incomes` – Add a new income

---

## Folder Structure

```
cost-tracking-app/
│
├── backend/          # Node.js & Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── frontend/         # Angular frontend
│   ├── src/app/
│   │   ├── components/
│   │   ├── services/
│   │   └── pages/
│   └── angular.json
│
└── README.md
```

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

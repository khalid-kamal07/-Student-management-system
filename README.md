# Student Management System

A modern full-stack Student Management System built with **React + Vite**, **Express**, and **MongoDB**.

## Features
- Dashboard with total, active, inactive and department statistics
- Add student
- Edit student records
- Delete student records
- View complete student details
- Search by name, email or student ID
- Filter by department and status
- Responsive modern UI
- REST API with MongoDB persistence
- Form validation and friendly error states

## Project structure
```text
student-management-system/
├── api/index.js          # Vercel serverless entry (wraps the Express app)
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── app.js            # Express app (shared by local + Vercel)
│   ├── db.js             # cached MongoDB connection
│   └── server.js         # local dev server
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   ├── api.js
│   │   ├── main.jsx
│   │   └── styles.css
│   └── package.json
├── .env.example
├── vercel.json
└── package.json
```

## Run locally
### 1. Install dependencies
```bash
npm run install-all
```

### 2. Configure MongoDB
Copy `.env.example` to `.env` in the project root and update the connection string if needed.

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/student_management
```

You can use MongoDB locally or replace `MONGODB_URI` with a MongoDB Atlas connection string.

### 3. (Optional) Add demo data
```bash
npm run seed
```

### 4. Start both apps
```bash
npm run dev
```

Frontend: `http://localhost:5173`  
Backend: `http://localhost:5000`

## Deploy to Vercel
1. Create a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster, add a database user, and under **Network Access** allow `0.0.0.0/0` (Vercel uses dynamic IPs).
2. Push this repo to GitHub and import it at vercel.com/new (leave Root Directory as the repo root; `vercel.json` handles the rest).
3. Add the environment variable `MONGODB_URI` (your Atlas connection string, including the database name, e.g. `...mongodb.net/student_management`).
4. Deploy. The frontend is served statically and `/api/*` runs as a serverless function.
5. (Optional) Seed demo data once from your machine: put the Atlas URI in `.env` and run `npm run seed`.

CLI alternative: `npm i -g vercel && vercel --prod`.

## REST endpoints
- `GET /api/students`
- `GET /api/students/:id`
- `POST /api/students`
- `PUT /api/students/:id`
- `DELETE /api/students/:id`
- `GET /api/students/stats/summary`

## Student fields
`studentId`, `name`, `email`, `phone`, `department`, `semester`, `status`, `joinDate`, `address`

# Student Management System

A modern full-stack Student Management System built with **React + Vite**, **Express**, and **MongoDB**.

## Features
- Dashboard with total, active, inactive and department statistics
- Add, edit, view and delete students
- Search by name, email or student ID
- Filter by department and status
- Responsive modern UI
- REST API with MongoDB persistence
- Form validation and friendly error states
- Vercel-ready frontend + Express API in one project

## Project structure
```text
student-management-system/
├── server.js                 # Vercel Express entry
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── app.js                # Express application
│   ├── db.js                 # MongoDB connection cache
│   ├── server.js             # Local development server
│   └── .env.example
├── frontend/
│   ├── src/
│   ├── vite.config.js
│   └── package.json
├── package.json
└── vercel.json
```

## Local setup

### 1. Install dependencies
```bash
npm run install-all
```

### 2. Configure MongoDB
Create `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/student_management
```

For MongoDB Atlas, replace `MONGODB_URI` with your Atlas connection string.

### 3. Optional demo data
```bash
npm run seed
```

### 4. Start the application
```bash
npm run dev
```

Frontend: `http://localhost:5173`
Backend: `http://localhost:5000`

## Deploy frontend + backend together on Vercel

1. Push the entire repository to GitHub.
2. Import the repository into Vercel.
3. Keep the Vercel project root at the repository root. Do **not** set `frontend` as the Root Directory.
4. Vercel uses `vercel.json` to build `frontend` and expose the Express API through `/api`.
5. Add this environment variable in Vercel:

```text
MONGODB_URI=your_mongodb_atlas_connection_string
```

6. Deploy.

The frontend automatically calls `/api`, so the same Vercel domain serves both the UI and API. Vercel serves the Vite build from `public/` and runs the Express app for API requests.

Example:
```text
https://your-project.vercel.app
https://your-project.vercel.app/api/health
```

## REST endpoints
- `GET /api/students`
- `GET /api/students/:id`
- `POST /api/students`
- `PUT /api/students/:id`
- `DELETE /api/students/:id`
- `GET /api/students/stats/summary`

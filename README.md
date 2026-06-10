# Task Manager — MERN Stack

A full-stack Task Management Web Application built with the MERN stack. Features JWT authentication, full CRUD operations, search, filter, and pagination.

**Live Demo:** https://task-management-fawn-sigma.vercel.app
**Backend API:** https://task-management-backend-6qdu.onrender.com/api/health

---

## Features

- User registration and login with JWT authentication
- Create, edit, delete, and view tasks
- Toggle task status between pending and completed
- Search tasks by title or description
- Filter tasks by status
- Pagination support
- Protected routes on both frontend and backend
- Fully responsive UI

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js (Vite), Tailwind CSS v4, shadcn/ui |
| Backend | Node.js, Express.js |
| Database | MongoDB (Atlas) |
| Auth | JSON Web Tokens (JWT) |
| Deployment | Vercel (frontend), Render (backend) |

---

## Project Structure

```
task-management/
├── task-manager-backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── validate.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── utils/
│   │   ├── generateToken.js
│   │   └── apiResponse.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
└── task-manager-frontend/
    ├── src/
    │   ├── api/
    │   │   ├── axios.js
    │   │   ├── auth.api.js
    │   │   └── task.api.js
    │   ├── components/
    │   │   ├── ui/          (shadcn components)
    │   │   ├── Navbar.jsx
    │   │   ├── StatsBar.jsx
    │   │   ├── TaskCard.jsx
    │   │   ├── TaskForm.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── hooks/
    │   │   └── useAuth.js
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   └── Dashboard.jsx
    │   ├── App.jsx
    │   └── main.jsx
    ├── .env.example
    └── package.json
```

---

## Local Setup

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- npm

---

### 1. Clone the Repository

```bash
git clone https://github.com/Mushirul-Hassan/task-management.git
cd task-management
```

---

### 2. Backend Setup

```bash
cd task-manager-backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=7d
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

Backend runs at: `http://localhost:5000`

---

### 3. Frontend Setup

```bash
cd task-manager-frontend
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## API Reference

### Base URL
```
http://localhost:5000/api
```

### Auth Routes

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/auth/register` | Public | Register a new user |
| POST | `/auth/login` | Public | Login and receive JWT |
| GET | `/auth/me` | Private | Get logged-in user |

### Task Routes

All task routes require `Authorization: Bearer <token>` header.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | Get all tasks (search, filter, paginate) |
| GET | `/tasks/stats` | Get task counts for dashboard |
| GET | `/tasks/:id` | Get a single task |
| POST | `/tasks` | Create a task |
| PUT | `/tasks/:id` | Update a task |
| PATCH | `/tasks/:id/toggle` | Toggle pending ↔ completed |
| DELETE | `/tasks/:id` | Delete a task |

### Query Parameters for GET /tasks

| Param | Description | Example |
|-------|-------------|---------|
| `search` | Search title/description | `?search=meeting` |
| `status` | Filter by status | `?status=pending` |
| `page` | Page number | `?page=2` |
| `limit` | Items per page (max 50) | `?limit=10` |
| `sortBy` | Sort field | `?sortBy=createdAt` |
| `order` | asc or desc | `?order=desc` |

---

## Deployment

### Backend — Render

1. Push backend to GitHub
2. Create a new Web Service on [render.com](https://render.com)
3. Set build command: `npm install`
4. Set start command: `node server.js`
5. Add environment variables from `.env.example`
6. Use MongoDB Atlas as the database

### Frontend — Vercel

1. Push frontend to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Set root directory to `task-manager-frontend`
4. Add environment variable: `VITE_API_URL=https://your-render-url.onrender.com/api`
5. Deploy

---

## Environment Variables

### Backend `.env`

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default 5000) |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for signing JWT tokens |
| `JWT_EXPIRES_IN` | Token expiry duration (e.g. 7d) |
| `NODE_ENV` | development or production |
| `CLIENT_URL` | Frontend URL for CORS |

### Frontend `.env`

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend API base URL |

---

## Screenshots

> Register → Login → Dashboard with task list, stats, search, and filter.

---

## Author

**Mushirul Hassan**
B.Tech CSE — Jamia Hamdard University
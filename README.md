# MERN Task Manager

A full-stack Task Manager application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js).

## Features

- User Registration and Login
- JWT Authentication
- Create Tasks
- Mark Tasks as Complete/Incomplete
- Delete Tasks
- Search Tasks
- Filter Tasks (All, Completed, Pending)
- Task Priority Levels (High, Medium, Low)
- Due Dates
- User-specific Task Management

## Tech Stack

### Frontend
- React.js
- React Router
- Axios
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

## Project Structure

```
task-manager
│
├── client
│   ├── src
│   └── public
│
├── server
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   └── config
│
└── README.md
```

## Installation

### Clone Repository

```bash
git clone https://github.com/skanishkha1-prog/mern-task-manager.git
```

### Install Dependencies

Frontend:

```bash
cd client
npm install
```

Backend:

```bash
cd server
npm install
```

### Configure Environment Variables

Create a `.env` file inside the server folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Run Backend

```bash
cd server
npm run dev
```

### Run Frontend

```bash
cd client
npm run dev
```

## Future Improvements

- Edit Tasks
- Dark Mode
- Task Categories
- Drag-and-Drop Task Board
- Email Notifications

## Author

**Kanishkha S**

GitHub: https://github.com/skanishkha1-prog
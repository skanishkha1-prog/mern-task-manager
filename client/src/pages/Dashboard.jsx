import { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";



function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [filter, setFilter] = useState("All");


  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    console.log("useEffect running");
    fetchTasks();
  }, []);



  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");

      console.log("Tasks received:", res.data);

      setTasks(res.data);
    } catch (err) {
      console.log("Error:", err);
    }
  };
  const addTask = async () => {
    try {
      const res = await API.post("/tasks", {
        title,
        priority,
        dueDate,
      });

      setTasks([...tasks, res.data]);
      setTitle("");
      setPriority("Medium");
      setDueDate("");
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);

      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const toggleComplete = async (task) => {
    try {
      const res = await API.put(`/tasks/${task._id}`, {
        completed: !task.completed,
      });

      setTasks(
        tasks.map((t) =>
          t._id === task._id ? res.data : t
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = totalTasks - completedTasks;

  const filteredTasks = tasks
    .filter((task) =>
      task.title
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .filter((task) => {
      if (filter === "Completed")
        return task.completed;

      if (filter === "Pending")
        return !task.completed;

      return true;
    });


  return (
    <div className="dashboard-container">

      <div className="dashboard-card">

        <div className="dashboard-header">
          <div>
            <h1>Task Manager</h1>
            <p className="welcome-text">
              Welcome, {user?.name} 👋
            </p>
          </div>

          <button
            className="logout-btn"
            onClick={logout}
          >
            Logout
          </button>
        </div>

        <div className="stats-container">

          <div className="stat-card">
            <h2>{totalTasks}</h2>
            <p>Total Tasks</p>
          </div>

          <div className="stat-card">
            <h2>{completedTasks}</h2>
            <p>Completed</p>
          </div>

          <div className="stat-card">
            <h2>{pendingTasks}</h2>
            <p>Pending</p>
          </div>

        </div>

        <div className="task-input-section">
          <input
            type="text"
            placeholder="Enter a task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <div className="search-section">
            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button
            className="add-btn"
            onClick={addTask}
          >
            Add Task
          </button>
        </div>
        <div className="filter-section">
          <button onClick={() => setFilter("All")}>
            All
          </button>

          <button onClick={() => setFilter("Completed")}>
            Completed
          </button>

          <button onClick={() => setFilter("Pending")}>
            Pending
          </button>
        </div>


        <div className="task-list">

          {filteredTasks.length === 0 ? (
            <p>No tasks found.</p>
          ) : (
            filteredTasks.map((task) => (
              <div
                className="task-card"
                key={task._id}
              >
                <div>
                  <span
                    className={
                      task.completed
                        ? "completed-task"
                        : ""
                    }
                  >
                    {task.title}
                  </span>

                  <div className="task-details">

                    <span
                      className={`priority ${task.priority?.toLowerCase()}`}
                    >
                      {task.priority}
                    </span>

                    {task.dueDate && (
                      <span className="due-date">
                        Due: {new Date(task.dueDate)
                          .toLocaleDateString()}
                      </span>
                    )}

                  </div>
                </div>

                <div>
                  <button
                    className="complete-btn"
                    onClick={() =>
                      toggleComplete(task)
                    }
                  >
                    {task.completed
                      ? "Undo"
                      : "Complete"}
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteTask(task._id)
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}

        </div>
      </div>
    </div>
)}

export default Dashboard;
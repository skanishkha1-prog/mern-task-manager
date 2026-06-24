import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";


function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Registration Successful!");
      console.log(res.data);
    } catch (err) {
      alert("Registration Failed");
      console.log(err);
    }
  };

  return (
  <div className="auth-container">
    <div className="auth-card">

      <h1>Task Manager</h1>
      <h2>Create Account</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          Register
        </button>

      </form>

      <p>
        Already have an account?
        <Link to="/"> Login</Link>
      </p>

    </div>
  </div>
);
}

export default Register;
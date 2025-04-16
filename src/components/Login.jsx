import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginAccountMutation } from "./AccountSlice";

export default function Login({ updateLoginStatus }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [logIn, { isLoading, error, isError }] = useLoginAccountMutation();

  async function checkUser(event) {
    event.preventDefault();
    try {
      const result = await logIn({ email, password }).unwrap();

      if (result && result.token) {
        localStorage.setItem("token", result.token);
        updateLoginStatus(true);
        navigate("/account");
      } else {
        console.error(
          "Login succeeded but token was missing in the response:",
          result
        );
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  }

  return (
    <div className="form container mt-4" style={{ maxWidth: "500px" }}>
      <h1 className="mb-4 text-center">Log In</h1>
      <form onSubmit={checkUser}>
        <div className="form-group mb-3">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={isLoading}
        >
          {isLoading ? "Logging In..." : "Log In"}
        </button>
      </form>

      {isError && error && (
        <div className="alert alert-danger mt-3" role="alert">
          Login failed:{" "}
          {error.data?.message ||
            error.error ||
            "Please check your credentials and try again."}
        </div>
      )}
    </div>
  );
}

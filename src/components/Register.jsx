import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddAccountMutation } from "./AccountSlice";
export default function Register({ updateLoginStatus }) {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [registerUser, { isLoading, error, isError }] = useAddAccountMutation();

  async function postUser(event) {
    event.preventDefault();
    try {
      const result = await registerUser({
        firstname,
        lastname,
        email,
        password,
      }).unwrap();

      if (result && result.token) {
        localStorage.setItem("token", result.token);
        updateLoginStatus(true);
        navigate("/account");
      } else if (result && result.message) {
        navigate("/login?registered=true");
      } else {
        console.error(
          "Registration succeeded but response format was unexpected:",
          result
        );
      }
    } catch (err) {
      console.error("Registration failed:", err);
    }
  }

  return (
    <div className="form container mt-4" style={{ maxWidth: "500px" }}>
      <h1 className="mb-4 text-center">Register</h1>
      <form onSubmit={postUser}>
        <div className="form-group mb-3">
          <label className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            className="form-control"
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
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>

      {isError && error && (
        <div className="alert alert-danger mt-3" role="alert">
          Registration failed:{" "}
          {error.data?.message ||
            error.error ||
            "An error occurred. Please try again."}
        </div>
      )}
    </div>
  );
}

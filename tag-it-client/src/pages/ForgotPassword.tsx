import { useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    await axios.post("/api/Auth/forgot-password", email, {
      headers: { "Content-Type": "application/json" },
    });
    setMessage("Reset link sent to your email.");
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSubmit}>Send Reset Link</button>
      {message && <p>{message}</p>}
    </div>
  );
}

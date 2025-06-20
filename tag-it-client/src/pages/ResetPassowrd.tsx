import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token")!;
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async () => {
    try {
      await axios.post("/api/Auth/reset-password", {
        token,
        newPassword: password,
      });
      setMessage("Password reset successfully.");
    } catch {
      setMessage("Invalid or expired token.");
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <input
        type="password"
        placeholder="New password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleReset}>Reset</button>
      {message && <p>{message}</p>}
    </div>
  );
}

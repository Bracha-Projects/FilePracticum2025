import { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "sonner";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

 const handleSubmit = async (e:React.MouseEvent) => {
  e.preventDefault();
  try {
    console.log("Sending reset link to:", JSON.stringify(email));
    await axiosInstance.post("/api/Auth/forgot-password", email, {
      headers: { "Content-Type": "application/json" },
    });
    setMessage("Reset link sent to your email.");
    toast.success("Reset link sent to your email.");
  } catch (error: any) {
    const errorMsg = error?.response?.data || "Something went wrong. Please try again.";
    toast.error(errorMsg);
  }
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
      <button type="button" onClick={(e) => handleSubmit(e)}>Send Reset Link</button>
      {message && <p>{message}</p>}
    </div>
  );
}

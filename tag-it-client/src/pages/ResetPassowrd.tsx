import { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "sonner";
import LayoutWrapper from "@/components/LayoutWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useSearchParams } from "react-router-dom";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token")!;
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async () => {
    try {
      await axiosInstance.post("/api/Auth/reset-password", {
        token,
        newPassword: password,
      });
      setMessage("Password reset successfully.");
      toast.success("Password reset successfully.");
    } catch {
      setMessage("Invalid or expired token.");
      toast.error("Invalid or expired token.");
    }
  };

  return (
    <LayoutWrapper>
      <div className="page-container">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center py-20 px-4 md:py-28 relative overflow-hidden">
          <div className="absolute top-1/4 left-10 w-64 h-64 bg-[#A8EBC7]/30 rounded-full blur-3xl opacity-70 animate-pulse-slow" />
          <div
            className="absolute bottom-1/3 right-10 w-72 h-72 bg-[#4B6982]/20 rounded-full blur-3xl opacity-70 animate-pulse-slow"
            style={{ animationDelay: "1s" }}
          />

          <div className="space-y-6 max-w-3xl mx-auto relative z-10">
            <span className="inline-block py-1 px-3 rounded-full text-sm font-medium bg-[#A8EBC7]/40 text-[#4B6982] border border-[#A8EBC7]/60">
              Reset Password
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-[#4B6982] leading-tight tracking-tight animate-fade-in">
              Enter your new <span className="text-[#A8EBC7]">password</span>
            </h1>
            <p className="text-xl text-[#4B6982]/80 animate-slide-up">
              Please choose a strong password to secure your account.
            </p>
          </div>
        </section>

        {/* Reset Password Form */}
        <div className="max-w-md mx-auto glass p-8 rounded-xl border-2 border-[#A8EBC7]/30 shadow-lg">
          <Input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-[#A8EBC7]/30 focus:border-[#A8EBC7] mb-6"
          />
          <Button
            onClick={handleReset}
            className="w-full bg-[#4B6982] text-white hover:bg-[#3a5269] border-2 border-[#4B6982] shadow-md font-bold"
          >
            Reset Password
          </Button>
          {message && (
            <p className="mt-4 text-center text-[#4B6982]/90 font-semibold">{message}</p>
          )}
        </div>
      </div>
    </LayoutWrapper>
  );
}

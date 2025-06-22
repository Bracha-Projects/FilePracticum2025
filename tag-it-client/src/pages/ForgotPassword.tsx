import { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LayoutWrapper from "@/components/LayoutWrapper";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.MouseEvent) => {
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
        <LayoutWrapper>
            <div className="glass p-8 rounded-xl border-2 border-[#A8EBC7]/30 shadow-lg max-w-md mx-auto mt-12">
                <h2 className="text-2xl font-bold text-[#4B6982] mb-6 text-center">Forgot Password</h2>

                <p className="text-[#4B6982]/70 mb-6 text-center">
                    Enter your email address and we'll send you a reset link.
                </p>

                <form>
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-sm font-medium text-[#4B6982] mb-2">
                            Email Address
                        </label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border-[#A8EBC7]/30 focus:border-[#A8EBC7]"
                            required
                        />
                    </div>

                    <Button
                        type="button"
                        onClick={handleSubmit}
                        className="w-full bg-[#4B6982] text-white hover:bg-[#3a5269] border-2 border-[#4B6982] shadow-md font-bold"
                    >
                        Send Reset Link
                    </Button>
                </form>

                {message && <p className="mt-6 text-center text-[#4B6982]/80">{message}</p>}
            </div>
        </LayoutWrapper>
    );
}

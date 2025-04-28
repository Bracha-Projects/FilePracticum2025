"use client";

import type React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LayoutWrapper from "@/components/LayoutWrapper";
import Logo from "@/components/Logo";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import axios from "@/utils/axiosInstance";
import { setUser } from "@/redux/slices/userSlice";

// Import types
import { UserPostModel } from "@/types/UserPostModel";
import { AuthResponse } from "@/types/AuthResponse";

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match", {
        description: "Error",
      });
      return;
    }

    if (!agreeTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }

    setIsLoading(true);

    try {
      const userPostModel: UserPostModel = {
        FirstName: formData.firstName,
        LastName: formData.lastName,
        Email: formData.email,
        Password: formData.password,
      };

      const response = await axios.post<AuthResponse>("/User/register", userPostModel);

      const data = response.data;

      // Save user details and token in Redux
      dispatch(setUser({ user: data.user, token: data.token }));

      // Save token in localStorage
      localStorage.setItem("token", data.token);

      toast.success("Your account has been created successfully!");
      navigate("/dashboard");
    } catch (error: any) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            toast.error("Bad Request: Please check your input data", {
              description: error.response.data || "Invalid data provided",
            });
            break;
          case 500:
            toast.error("Server error: Please try again later", {
              description: "Error",
            });
            break;
          default:
            toast.error(`Unexpected error: ${error.response.status}`, {
              description: "Something went wrong",
            });
        }
      } else if (error.request) {
        toast.error("No response from server: Please check your network", {
          description: "Network error",
        });
      } else {
        toast.error("An unexpected error occurred", {
          description: error.message,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LayoutWrapper>
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <Logo size="lg" />
            </div>
            <h1 className="text-2xl font-bold text-[#4B6982]">Create an account</h1>
            <p className="text-[#4B6982]/80 mt-2">Join Tag-it to manage your files with AI</p>
          </div>

          <div className="glass p-8 rounded-xl shadow-elevation animate-scale-in border-2 border-[#A8EBC7]/30">
            <form onSubmit={handleRegister} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-[#4B6982]">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="tagit-input border-[#A8EBC7]/50 focus:border-[#A8EBC7] focus:ring-[#A8EBC7]/30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-[#4B6982]">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="tagit-input border-[#A8EBC7]/50 focus:border-[#A8EBC7] focus:ring-[#A8EBC7]/30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#4B6982]">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="tagit-input border-[#A8EBC7]/50 focus:border-[#A8EBC7] focus:ring-[#A8EBC7]/30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#4B6982]">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="tagit-input pr-10 border-[#A8EBC7]/50 focus:border-[#A8EBC7] focus:ring-[#A8EBC7]/30"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#4B6982]"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-[#4B6982]">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="tagit-input border-[#A8EBC7]/50 focus:border-[#A8EBC7] focus:ring-[#A8EBC7]/30"
                />
              </div>

              <div className="flex items-center">
                <Checkbox
                  id="terms"
                  checked={agreeTerms}
                  onCheckedChange={(checked) => setAgreeTerms(checked === true)}
                  className="data-[state=checked]:bg-[#A8EBC7] data-[state=checked]:border-[#A8EBC7]"
                />
                <label htmlFor="terms" className="ml-2 text-sm text-[#4B6982] cursor-pointer">
                  I agree to the{" "}
                  <Link to="/terms" className="text-[#4B6982] font-bold hover:text-[#A8EBC7]">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-[#4B6982] font-bold hover:text-[#A8EBC7]">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#A8EBC7] text-[#4B6982] hover:bg-[#A8EBC7]/90 font-bold border-2 border-[#A8EBC7] shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-[#4B6982]">
                Already have an account?{" "}
                <Link to="/login" className="text-[#4B6982] font-bold hover:text-[#A8EBC7]">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
};

export default RegisterPage;
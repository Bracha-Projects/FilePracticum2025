import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import LayoutWrapper from '@/components/LayoutWrapper';
import Logo from '@/components/Logo';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.password) {
      toast.error(
        "Please fill in all fields",
      );
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
        toast.error("Error", {
            description: "Passwords do not match",
          });
      return;
    }
    
    if (!agreeTerms) {
        toast.error("Please agree to the terms and conditions");
      return;
    }
    
    // Simulate registration
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast.success(
        "Your account has been created successfully!"
      );
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <LayoutWrapper>
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <Logo size="lg" />
            </div>
            <h1 className="text-2xl font-bold text-tagit-darkblue">Create an account</h1>
            <p className="text-tagit-blue mt-2">Join Tag-it to manage your files with AI</p>
          </div>
          
          <div className="glass p-8 rounded-xl shadow-elevation animate-scale-in">
            <form onSubmit={handleRegister} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="tagit-input"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="tagit-input"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="tagit-input pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-tagit-blue"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="tagit-input"
                />
              </div>
              
              <div className="flex items-center">
                <Checkbox 
                  id="terms" 
                  checked={agreeTerms}
                  onCheckedChange={(checked) => setAgreeTerms(checked === true)}
                  className="data-[state=checked]:bg-tagit-mint data-[state=checked]:border-tagit-mint"
                />
                <label
                  htmlFor="terms"
                  className="ml-2 text-sm text-tagit-blue cursor-pointer"
                >
                  I agree to the{' '}
                  <Link to="/terms" className="text-tagit-darkblue font-medium hover:text-tagit-mint">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-tagit-darkblue font-medium hover:text-tagit-mint">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              
              <Button
                type="submit"
                className="w-full bg-tagit-blue hover:bg-tagit-darkblue text-white"
                disabled={isLoading}
              >
                {isLoading ? 'Creating account...' : 'Create account'}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-tagit-blue">
                Already have an account?{' '}
                <Link to="/login" className="text-tagit-darkblue font-medium hover:text-tagit-mint">
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
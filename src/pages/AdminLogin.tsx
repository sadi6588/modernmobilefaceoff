
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";
import { verifyPassword } from '@/data/phonesData';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { KeySquare, User, QrCode } from "lucide-react";
import { Card } from '@/components/ui/card';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const admin = verifyPassword(username, password);
    if (admin) {
      setStep(2);
      toast({
        title: "First step complete",
        description: "Please enter your 2FA code",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Authentication failed",
        description: "Invalid username or password",
      });
    }
  };

  return (
    <div className="container mx-auto py-10 px-4 h-screen flex flex-col justify-center items-center">
      <Card className="glass w-full max-w-md p-8">
        <h1 className="text-3xl font-bold mb-6 text-center neon-text">Admin Login</h1>
        
        {step === 1 ? (
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center border-b border-white/10 pb-2">
                <User className="mr-2 text-neon-blue" size={18} />
                <Input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border-none bg-transparent focus:ring-0 placeholder:text-white/50"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center border-b border-white/10 pb-2">
                <KeySquare className="mr-2 text-neon-blue" size={18} />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-none bg-transparent focus:ring-0 placeholder:text-white/50"
                  required
                />
              </div>
            </div>
            
            <Button type="submit" className="w-full btn-neon">
              Proceed to 2FA
            </Button>
          </form>
        ) : (
          <OtpVerification username={username} />
        )}
      </Card>
    </div>
  );
};

const OtpVerification = ({ username }: { username: string }) => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  
  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    
    // For demo purposes, accepting "123456" as valid OTP
    if (otp === "123456") {
      // Store admin session in localStorage
      localStorage.setItem('adminSession', JSON.stringify({ 
        username,
        authenticated: true,
        timestamp: Date.now()
      }));
      
      toast({
        title: "Login successful",
        description: "Welcome to the admin panel",
      });
      
      navigate('/admin/dashboard');
    } else {
      toast({
        variant: "destructive",
        title: "Authentication failed",
        description: "Invalid 2FA code",
      });
    }
  };
  
  return (
    <form onSubmit={handleVerify} className="space-y-6">
      <p className="text-center text-white/80">
        Enter the 6-digit code from your authenticator app
      </p>
      
      <div className="flex flex-col items-center justify-center space-y-4">
        <QrCode className="h-16 w-16 text-neon-blue mb-2" />
        
        <div className="space-y-2 w-full">
          <div className="flex items-center border-b border-white/10 pb-2">
            <Input
              type="text"
              placeholder="6-digit code"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="border-none bg-transparent focus:ring-0 placeholder:text-white/50 text-center text-xl tracking-widest"
              maxLength={6}
              required
            />
          </div>
        </div>
      </div>
      
      <Button type="submit" className="w-full btn-neon">
        Verify & Login
      </Button>
      
      <p className="text-xs text-white/60 text-center mt-4">
        Use code 123456 for demo purposes
      </p>
    </form>
  );
};

export default AdminLogin;

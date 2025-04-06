
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";
import { verifyPassword } from '@/data/phonesData';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { KeySquare, User, QrCode, RotateCcw } from "lucide-react";
import { Card } from '@/components/ui/card';
import { useAdminAuth } from '@/hooks/use-admin-auth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1);
  const [activeTab, setActiveTab] = useState('login');
  const navigate = useNavigate();
  const { requestReset, isResetRequested } = useAdminAuth();

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

  const handleResetRequest = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username) {
      toast({
        variant: "destructive",
        title: "Username required",
        description: "Please enter your username to reset",
      });
      return;
    }
    
    // Request password reset
    requestReset(username);
    
    toast({
      title: "Reset requested",
      description: "If your account exists, you'll receive reset instructions",
    });
    
    // Move to the reset confirmation tab
    setActiveTab('resetConfirm');
  };

  return (
    <div className="container mx-auto py-10 px-4 h-screen flex flex-col justify-center items-center">
      <Card className="glass w-full max-w-md p-8">
        <h1 className="text-3xl font-bold mb-6 text-center neon-text">Admin Login</h1>
        
        {step === 1 ? (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="reset">Reset Password</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
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
            </TabsContent>
            
            <TabsContent value="reset">
              <form onSubmit={handleResetRequest} className="space-y-6">
                <div className="space-y-2">
                  <p className="text-white/80 mb-4">
                    Enter your username to reset your password
                  </p>
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
                
                <Button type="submit" className="w-full btn-neon">
                  <RotateCcw size={16} className="mr-2" />
                  Request Password Reset
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="resetConfirm">
              <div className="space-y-6">
                <div className="p-4 border border-neon-blue/20 rounded bg-neon-blue/5">
                  <h3 className="text-neon-blue font-medium mb-2">Reset Requested</h3>
                  <p className="text-white/80 text-sm">
                    If an account with username <span className="font-bold">{username}</span> exists, 
                    reset instructions would be sent in a real application.
                  </p>
                  <p className="text-white/80 text-sm mt-2">
                    For this demo, use the following temporary credentials:
                  </p>
                  <ul className="mt-2 text-sm text-white/70">
                    <li>• Username: <span className="text-neon-blue">{username}</span></li>
                    <li>• Password: <span className="text-neon-blue">admin123</span></li>
                    <li>• 2FA code: <span className="text-neon-blue">123456</span></li>
                  </ul>
                </div>
                
                <Button 
                  onClick={() => setActiveTab('login')} 
                  className="w-full btn-neon"
                >
                  Return to Login
                </Button>
              </div>
            </TabsContent>
          </Tabs>
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
  const { isResetRequested } = useAdminAuth();
  
  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    
    // For demo purposes, accepting "123456" as valid OTP
    if (otp === "123456") {
      // Store admin session in localStorage
      localStorage.setItem('adminSession', JSON.stringify({ 
        username,
        authenticated: true,
        timestamp: Date.now(),
        id: 'admin1'
      }));
      
      toast({
        title: "Login successful",
        description: "Welcome to the admin panel",
      });
      
      // If this was a reset login, clear the reset flag
      if (isResetRequested(username)) {
        localStorage.removeItem('adminResetRequested');
      }
      
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

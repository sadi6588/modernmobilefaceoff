
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { generateOtpSecret, Admin } from '@/data/phonesData';
import { QrCode } from 'lucide-react';

interface AdminFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (admin: Admin) => void;
  admin?: Admin | null;
  title: string;
}

const AdminFormModal: React.FC<AdminFormModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  admin, 
  title 
}) => {
  const [formData, setFormData] = useState({
    id: '',
    username: '',
    password: '',
    otpSecret: generateOtpSecret(),
    permissions: {
      addPhone: true,
      deletePhone: true,
      editPhone: true,
      viewAdmins: false,
      manageAdmins: false
    }
  });

  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    if (admin) {
      setFormData({
        ...admin,
        password: ''  // Don't populate password field for security
      });
    } else {
      setFormData({
        id: '',
        username: '',
        password: '',
        otpSecret: generateOtpSecret(),
        permissions: {
          addPhone: true,
          deletePhone: true,
          editPhone: true,
          viewAdmins: false,
          manageAdmins: false
        }
      });
    }
  }, [admin, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePermissionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [name]: checked
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create the admin object
    const adminToSave: Admin = {
      ...formData,
      passwordHash: formData.password ? 'hashed-password-would-go-here' : (admin?.passwordHash || '')
    };
    
    // Remove plain text password before saving
    delete (adminToSave as any).password;
    
    onSave(adminToSave);
  };

  // In a real app, you would generate a QR code for the OTP secret
  const mockQrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?data=otpauth://totp/PhoneCompare:admin@example.com?secret=JBSWY3DPEHPK3PXP&issuer=PhoneCompare&algorithm=SHA1&digits=6&period=30";

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="glass sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-neon-purple">{title}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">
                {admin ? "Password (leave blank to keep unchanged)" : "Password"}
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required={!admin} // Required only for new admins
              />
            </div>
            
            {/* 2FA Setup */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>2FA Authentication</Label>
                <Button 
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-neon-purple"
                  onClick={() => setShowQR(!showQR)}
                >
                  {showQR ? "Hide QR" : "Show QR"}
                </Button>
              </div>
              
              {showQR && (
                <div className="flex flex-col items-center p-4 border border-white/10 rounded-md bg-black/30">
                  <QrCode className="h-32 w-32 text-neon-purple mb-2" />
                  <p className="text-xs text-white/60 text-center mt-2">
                    Scan this QR code with an authenticator app
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-4">
            <h3 className="text-lg font-medium mb-4">Permissions</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="addPhone" className="cursor-pointer">Add Phones</Label>
                <input
                  type="checkbox"
                  id="addPhone"
                  name="addPhone"
                  checked={formData.permissions.addPhone}
                  onChange={handlePermissionChange}
                  className="h-4 w-4 text-neon-blue focus:ring-neon-blue border-white/20 rounded cursor-pointer"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="editPhone" className="cursor-pointer">Edit Phones</Label>
                <input
                  type="checkbox"
                  id="editPhone"
                  name="editPhone"
                  checked={formData.permissions.editPhone}
                  onChange={handlePermissionChange}
                  className="h-4 w-4 text-neon-blue focus:ring-neon-blue border-white/20 rounded cursor-pointer"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="deletePhone" className="cursor-pointer">Delete Phones</Label>
                <input
                  type="checkbox"
                  id="deletePhone"
                  name="deletePhone"
                  checked={formData.permissions.deletePhone}
                  onChange={handlePermissionChange}
                  className="h-4 w-4 text-neon-blue focus:ring-neon-blue border-white/20 rounded cursor-pointer"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="viewAdmins" className="cursor-pointer">View Admins</Label>
                <input
                  type="checkbox"
                  id="viewAdmins"
                  name="viewAdmins"
                  checked={formData.permissions.viewAdmins}
                  onChange={handlePermissionChange}
                  className="h-4 w-4 text-neon-purple focus:ring-neon-purple border-white/20 rounded cursor-pointer"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="manageAdmins" className="cursor-pointer">Manage Admins</Label>
                <input
                  type="checkbox"
                  id="manageAdmins"
                  name="manageAdmins"
                  checked={formData.permissions.manageAdmins}
                  onChange={handlePermissionChange}
                  className="h-4 w-4 text-neon-purple focus:ring-neon-purple border-white/20 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="btn-neon bg-neon-purple/10 border-neon-purple text-neon-purple hover:bg-neon-purple/20 hover:shadow-[0_0_15px_rgba(157,78,221,0.5)]">
              Save Admin
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminFormModal;


import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Phone, getAllPhones } from '@/data/phonesData';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminPhones from '@/components/admin/AdminPhones';
import AdminAdmins from '@/components/admin/AdminAdmins';
import { useAdminAuth } from '@/hooks/use-admin-auth';
import { LogOut } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { admin, permissions, isLoading, logout } = useAdminAuth();
  const [phones, setPhones] = useState<Phone[]>([]);
  const [searchParams] = useSearchParams();
  const tabFromUrl = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState('phones');
  
  // Set the active tab based on URL parameter, if present
  useEffect(() => {
    if (tabFromUrl === 'phones' || tabFromUrl === 'admins') {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl]);
  
  useEffect(() => {
    if (!isLoading && !admin) {
      navigate('/admin/login');
    } else {
      setPhones(getAllPhones());
    }
  }, [isLoading, admin, navigate]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 flex justify-center items-center min-h-screen">
        <div className="animate-pulse text-neon-blue text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold neon-text">Admin Dashboard</h1>
        <Button 
          variant="ghost" 
          onClick={logout}
          className="text-white/80 hover:text-white flex items-center gap-2"
        >
          <LogOut size={18} />
          Logout
        </Button>
      </div>
      
      <div className="glass p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <p className="text-white/80">Welcome back,</p>
            <h2 className="text-xl font-bold text-neon-purple">{admin?.username}</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full md:w-auto">
            <PermissionBadge 
              label="Add" 
              enabled={permissions.addPhone} 
            />
            <PermissionBadge 
              label="Edit" 
              enabled={permissions.editPhone} 
            />
            <PermissionBadge 
              label="Delete" 
              enabled={permissions.deletePhone} 
            />
            <PermissionBadge 
              label="Manage Admins" 
              enabled={permissions.manageAdmins} 
            />
          </div>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 max-w-md mx-auto mb-8">
          <TabsTrigger value="phones" className="data-[state=active]:text-neon-blue">Manage Phones</TabsTrigger>
          {permissions.viewAdmins && (
            <TabsTrigger value="admins" className="data-[state=active]:text-neon-purple">Manage Admins</TabsTrigger>
          )}
        </TabsList>
        <TabsContent value="phones" className="mt-4">
          <AdminPhones phones={phones} permissions={permissions} />
        </TabsContent>
        {permissions.viewAdmins && (
          <TabsContent value="admins" className="mt-4">
            <AdminAdmins />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

const PermissionBadge = ({ label, enabled }: { label: string; enabled: boolean }) => {
  return (
    <div className={`py-1 px-3 rounded-full text-xs text-center ${enabled ? 'bg-neon-blue/20 text-neon-blue' : 'bg-white/10 text-white/40'}`}>
      {label} {enabled ? '✓' : '×'}
    </div>
  );
};

export default AdminDashboard;

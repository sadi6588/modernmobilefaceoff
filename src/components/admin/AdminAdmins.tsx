
import React, { useState, useEffect } from 'react';
import { Admin, getAllAdmins, addAdmin, deleteAdmin, updateAdmin } from '@/data/phonesData';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Plus, Trash2, Edit, ShieldCheck, ShieldX } from 'lucide-react';
import { useAdminAuth } from '@/hooks/use-admin-auth';
import AdminFormModal from './AdminFormModal';

const AdminAdmins = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [adminToEdit, setAdminToEdit] = useState<Admin | null>(null);
  const { admin } = useAdminAuth();

  useEffect(() => {
    if (admin?.id) {
      fetchAdmins();
    }
  }, [admin]);

  const fetchAdmins = () => {
    if (!admin?.id) return;
    
    // For demo purposes, we'll mock this data
    const mockAdmins: Admin[] = [
      {
        id: "admin1",
        username: "superadmin",
        passwordHash: "",
        otpSecret: "",
        permissions: {
          addPhone: true,
          deletePhone: true,
          editPhone: true,
          viewAdmins: true,
          manageAdmins: true
        }
      },
      {
        id: "admin2",
        username: "editor",
        passwordHash: "",
        otpSecret: "",
        permissions: {
          addPhone: true,
          deletePhone: false,
          editPhone: true,
          viewAdmins: false,
          manageAdmins: false
        }
      }
    ];
    
    setAdmins(mockAdmins);
    
    // In a real app, we'd use this:
    // const fetchedAdmins = getAllAdmins(admin.id);
    // if (fetchedAdmins) {
    //   setAdmins(fetchedAdmins);
    // }
  };

  const handleDelete = (id: string) => {
    if (!admin?.id) return;
    if (admin.id === id) {
      toast({
        variant: "destructive",
        title: "Invalid action",
        description: "You cannot delete yourself"
      });
      return;
    }
    
    if (confirm("Are you sure you want to delete this admin?")) {
      // In a real app: const success = deleteAdmin(admin.id, id);
      const success = true; // Mock for demo
      
      if (success) {
        setAdmins(admins.filter(a => a.id !== id));
        toast({
          title: "Admin deleted",
          description: "The admin has been successfully removed"
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to delete the admin"
        });
      }
    }
  };

  const handleEdit = (adminData: Admin) => {
    setAdminToEdit(adminData);
    setShowEditModal(true);
  };

  const handleAdd = () => {
    setShowAddModal(true);
  };

  const handleSaveNew = (newAdmin: Omit<Admin, 'id'>) => {
    if (!admin?.id) return;
    
    // In a real app: const result = addAdmin(admin.id, newAdmin);
    const result = {
      ...newAdmin,
      id: `admin${Date.now()}`
    };
    
    if (result) {
      setAdmins([...admins, result as Admin]);
      setShowAddModal(false);
      toast({
        title: "Admin added",
        description: "The new admin has been successfully added"
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add the admin"
      });
    }
  };

  const handleSaveEdit = (editedAdmin: Admin) => {
    if (!admin?.id) return;
    
    // In a real app: const result = updateAdmin(admin.id, editedAdmin.id, editedAdmin);
    const result = editedAdmin; // Mock for demo
    
    if (result) {
      setAdmins(admins.map(a => a.id === editedAdmin.id ? editedAdmin : a));
      setShowEditModal(false);
      setAdminToEdit(null);
      toast({
        title: "Admin updated",
        description: "The admin has been successfully updated"
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update the admin"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Admin Management</h2>
        <Button onClick={handleAdd} className="btn-neon flex items-center gap-2">
          <Plus size={16} />
          Add New Admin
        </Button>
      </div>

      <div className="glass overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-neon-purple">Username</TableHead>
              <TableHead className="text-neon-purple">Permissions</TableHead>
              <TableHead className="text-neon-purple text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {admins.map((adminItem) => (
              <TableRow key={adminItem.id} className="hover:bg-white/5">
                <TableCell className="font-medium flex items-center gap-2">
                  {adminItem.username === admin?.username ? (
                    <>
                      <ShieldCheck size={16} className="text-neon-purple" />
                      <span>{adminItem.username} (you)</span>
                    </>
                  ) : (
                    <>
                      <ShieldX size={16} className="text-white/60" />
                      {adminItem.username}
                    </>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {adminItem.permissions.addPhone && (
                      <span className="bg-neon-blue/20 text-neon-blue px-2 py-0.5 rounded-full text-xs">Add</span>
                    )}
                    {adminItem.permissions.editPhone && (
                      <span className="bg-neon-blue/20 text-neon-blue px-2 py-0.5 rounded-full text-xs">Edit</span>
                    )}
                    {adminItem.permissions.deletePhone && (
                      <span className="bg-neon-blue/20 text-neon-blue px-2 py-0.5 rounded-full text-xs">Delete</span>
                    )}
                    {adminItem.permissions.viewAdmins && (
                      <span className="bg-neon-purple/20 text-neon-purple px-2 py-0.5 rounded-full text-xs">View Admins</span>
                    )}
                    {adminItem.permissions.manageAdmins && (
                      <span className="bg-neon-purple/20 text-neon-purple px-2 py-0.5 rounded-full text-xs">Manage Admins</span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleEdit(adminItem)}
                    className="hover:text-neon-purple"
                    disabled={admin?.id === adminItem.id} // Can't edit self in this demo
                  >
                    <Edit size={16} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleDelete(adminItem.id)}
                    className="hover:text-neon-pink"
                    disabled={admin?.id === adminItem.id} // Can't delete self
                  >
                    <Trash2 size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Add Admin Modal */}
      <AdminFormModal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)}
        onSave={handleSaveNew}
        title="Add New Admin"
      />
      
      {/* Edit Admin Modal */}
      <AdminFormModal 
        isOpen={showEditModal} 
        onClose={() => {
          setShowEditModal(false);
          setAdminToEdit(null);
        }}
        onSave={handleSaveEdit}
        admin={adminToEdit}
        title="Edit Admin"
      />
    </div>
  );
};

export default AdminAdmins;

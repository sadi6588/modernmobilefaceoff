
import React, { useState } from 'react';
import { Phone, deletePhone, addPhone, updatePhone } from '@/data/phonesData';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Plus, Trash2, Edit, Smartphone } from 'lucide-react';
import { AdminPermissions } from '@/data/phonesData';
import PhoneFormModal from './PhoneFormModal';

interface AdminPhonesProps {
  phones: Phone[];
  permissions: AdminPermissions;
}

const AdminPhones: React.FC<AdminPhonesProps> = ({ phones, permissions }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [phoneToEdit, setPhoneToEdit] = useState<Phone | null>(null);

  const handleDelete = (id: string) => {
    if (!permissions.deletePhone) {
      toast({
        variant: "destructive",
        title: "Permission denied",
        description: "You don't have permission to delete phones"
      });
      return;
    }

    if (confirm("Are you sure you want to delete this phone?")) {
      const success = deletePhone(id);
      if (success) {
        toast({
          title: "Phone deleted",
          description: "The phone has been successfully deleted"
        });
        // In a real app, we would use state management to update the UI
        window.location.reload(); // Simple refresh for demo
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to delete the phone"
        });
      }
    }
  };

  const handleEdit = (phone: Phone) => {
    if (!permissions.editPhone) {
      toast({
        variant: "destructive",
        title: "Permission denied",
        description: "You don't have permission to edit phones"
      });
      return;
    }
    
    setPhoneToEdit(phone);
    setShowEditModal(true);
  };

  const handleAdd = () => {
    if (!permissions.addPhone) {
      toast({
        variant: "destructive",
        title: "Permission denied",
        description: "You don't have permission to add phones"
      });
      return;
    }
    
    setShowAddModal(true);
  };

  const handleSaveNew = (newPhone: Phone) => {
    const result = addPhone(newPhone);
    if (result) {
      toast({
        title: "Phone added",
        description: "The phone has been successfully added"
      });
      setShowAddModal(false);
      // In a real app, we would use state management to update the UI
      window.location.reload(); // Simple refresh for demo
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add the phone"
      });
    }
  };

  const handleSaveEdit = (editedPhone: Phone) => {
    const result = updatePhone(editedPhone);
    if (result) {
      toast({
        title: "Phone updated",
        description: "The phone has been successfully updated"
      });
      setShowEditModal(false);
      setPhoneToEdit(null);
      // In a real app, we would use state management to update the UI
      window.location.reload(); // Simple refresh for demo
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update the phone"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Phone Management</h2>
        {permissions.addPhone && (
          <Button onClick={handleAdd} className="btn-neon flex items-center gap-2">
            <Plus size={16} />
            Add New Phone
          </Button>
        )}
      </div>

      <div className="glass overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-neon-blue">Phone</TableHead>
              <TableHead className="text-neon-blue">Brand</TableHead>
              <TableHead className="text-neon-blue">Price</TableHead>
              <TableHead className="text-neon-blue text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {phones.map((phone) => (
              <TableRow key={phone.id} className="hover:bg-white/5">
                <TableCell className="font-medium flex items-center gap-2">
                  <Smartphone size={16} className="text-neon-blue" />
                  {phone.name}
                </TableCell>
                <TableCell>{phone.brand}</TableCell>
                <TableCell>{phone.price}</TableCell>
                <TableCell className="text-right space-x-2">
                  {permissions.editPhone && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleEdit(phone)}
                      className="hover:text-neon-blue"
                    >
                      <Edit size={16} />
                    </Button>
                  )}
                  {permissions.deletePhone && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDelete(phone.id)}
                      className="hover:text-neon-pink"
                    >
                      <Trash2 size={16} />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {phones.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-white/60">
                  No phones found. Add a new phone to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Add Phone Modal */}
      <PhoneFormModal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)}
        onSave={handleSaveNew}
        title="Add New Phone"
      />
      
      {/* Edit Phone Modal */}
      <PhoneFormModal 
        isOpen={showEditModal} 
        onClose={() => {
          setShowEditModal(false);
          setPhoneToEdit(null);
        }}
        onSave={handleSaveEdit}
        phone={phoneToEdit}
        title="Edit Phone"
      />
    </div>
  );
};

export default AdminPhones;

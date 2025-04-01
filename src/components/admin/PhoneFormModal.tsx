
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Phone, PhoneSpecs } from '@/data/phonesData';

interface PhoneFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (phone: Phone) => void;
  phone?: Phone | null;
  title: string;
}

const EMPTY_SPECS: PhoneSpecs = {
  processor: { name: "Chip", value: "" },
  ram: { name: "RAM", value: "" },
  storage: { name: "Storage", value: "" },
  display: { name: "Display", value: "" },
  camera: { name: "Camera", value: "" },
  battery: { name: "Battery", value: "" },
  os: { name: "OS", value: "" },
  weight: { name: "Weight", value: "" }
};

const PhoneFormModal: React.FC<PhoneFormModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  phone, 
  title 
}) => {
  const [formData, setFormData] = useState<Phone>({
    id: '',
    name: '',
    brand: '',
    price: '',
    image: '',
    specs: { ...EMPTY_SPECS }
  });

  useEffect(() => {
    if (phone) {
      setFormData(phone);
    } else {
      setFormData({
        id: '',
        name: '',
        brand: '',
        price: '',
        image: '',
        specs: { ...EMPTY_SPECS }
      });
    }
  }, [phone, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSpecChange = (specKey: keyof PhoneSpecs, value: string) => {
    setFormData(prev => ({
      ...prev,
      specs: {
        ...prev.specs,
        [specKey]: {
          ...prev.specs[specKey],
          value
        }
      }
    }));
  };

  const handleSpecWinner = (specKey: keyof PhoneSpecs, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      specs: {
        ...prev.specs,
        [specKey]: {
          ...prev.specs[specKey],
          winner: checked
        }
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate ID if it's a new phone
    const phoneToSave: Phone = {
      ...formData,
      id: formData.id || formData.name.toLowerCase().replace(/\s+/g, '-')
    };
    
    onSave(phoneToSave);
  };

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="glass sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-neon-blue">{title}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Phone Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="brand">Brand</Label>
              <Input
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                placeholder="$999"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
                placeholder="https://example.com/phone.jpg"
              />
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-4">
            <h3 className="text-lg font-medium mb-4">Specifications</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(Object.keys(formData.specs) as Array<keyof PhoneSpecs>).map(specKey => (
                <div key={specKey} className="flex items-end gap-4">
                  <div className="flex-1 space-y-2">
                    <Label htmlFor={`spec-${specKey}`}>{formData.specs[specKey].name}</Label>
                    <Input
                      id={`spec-${specKey}`}
                      value={formData.specs[specKey].value.toString()}
                      onChange={(e) => handleSpecChange(specKey, e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex items-center gap-2 pb-2">
                    <Label htmlFor={`winner-${specKey}`} className="cursor-pointer">
                      Winner
                    </Label>
                    <input
                      type="checkbox"
                      id={`winner-${specKey}`}
                      checked={!!formData.specs[specKey].winner}
                      onChange={(e) => handleSpecWinner(specKey, e.target.checked)}
                      className="h-4 w-4 text-neon-blue focus:ring-neon-blue border-white/20 rounded cursor-pointer"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="btn-neon">
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PhoneFormModal;

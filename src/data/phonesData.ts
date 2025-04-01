
export interface PhoneSpec {
  name: string;
  value: string | number;
  winner?: boolean;
}

export interface PhoneSpecs {
  processor: PhoneSpec;
  ram: PhoneSpec;
  storage: PhoneSpec;
  display: PhoneSpec;
  camera: PhoneSpec;
  battery: PhoneSpec;
  os: PhoneSpec;
  weight: PhoneSpec;
}

export interface Phone {
  id: string;
  name: string;
  brand: string;
  image: string;
  price: string;
  specs: PhoneSpecs;
}

// Admin user interface with permissions
export interface AdminPermissions {
  addPhone: boolean;
  deletePhone: boolean;
  editPhone: boolean;
  viewAdmins: boolean;
  manageAdmins: boolean;
}

export interface Admin {
  id: string;
  username: string;
  passwordHash: string; // In a real app, this would be properly hashed
  otpSecret: string;
  permissions: AdminPermissions;
}

// Mock admin data - in a real app this would be in a database
let admins: Admin[] = [
  {
    id: "admin1",
    username: "superadmin",
    passwordHash: "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918", // hash of 'admin'
    otpSecret: "JBSWY3DPEHPK3PXP", // Example secret for demo purposes
    permissions: {
      addPhone: true,
      deletePhone: true,
      editPhone: true,
      viewAdmins: true,
      manageAdmins: true
    }
  }
];

export let phones: Phone[] = [
  {
    id: "iphone-15-pro",
    name: "iPhone 15 Pro",
    brand: "Apple",
    image: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15-pro.jpg",
    price: "$999",
    specs: {
      processor: { name: "Chip", value: "A17 Pro bionic", winner: true },
      ram: { name: "RAM", value: "8 GB" },
      storage: { name: "Storage", value: "128 / 256 / 512 GB / 1TB" },
      display: { name: "Display", value: "6.1\" OLED, 120Hz" },
      camera: { name: "Camera", value: "48MP + 12MP + 12MP" },
      battery: { name: "Battery", value: "3,274 mAh" },
      os: { name: "OS", value: "iOS 17" },
      weight: { name: "Weight", value: "187g", winner: true }
    }
  },
  {
    id: "galaxy-s24-ultra",
    name: "Galaxy S24 Ultra",
    brand: "Samsung",
    image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s24-ultra-5g.jpg",
    price: "$1,299",
    specs: {
      processor: { name: "Chip", value: "Snapdragon 8 Gen 3" },
      ram: { name: "RAM", value: "12 GB", winner: true },
      storage: { name: "Storage", value: "256 / 512 GB / 1TB", winner: true },
      display: { name: "Display", value: "6.8\" AMOLED, 120Hz", winner: true },
      camera: { name: "Camera", value: "200MP + 12MP + 50MP + 10MP", winner: true },
      battery: { name: "Battery", value: "5,000 mAh", winner: true },
      os: { name: "OS", value: "Android 14, One UI 6.1" },
      weight: { name: "Weight", value: "233g" }
    }
  }
];

export const getAllPhones = () => {
  return phones;
};

export const getPhoneById = (id: string): Phone | undefined => {
  return phones.find(phone => phone.id === id);
};

export const comparePhones = (phone1Id: string, phone2Id: string) => {
  const phone1 = getPhoneById(phone1Id);
  const phone2 = getPhoneById(phone2Id);
  
  if (!phone1 || !phone2) {
    return null;
  }
  
  return {
    phone1,
    phone2
  };
};

// Phone CRUD operations
export const addPhone = (phone: Phone): Phone => {
  phones = [...phones, phone];
  return phone;
};

export const updatePhone = (updatedPhone: Phone): Phone | null => {
  const index = phones.findIndex(p => p.id === updatedPhone.id);
  if (index === -1) return null;
  
  phones = [
    ...phones.slice(0, index),
    updatedPhone,
    ...phones.slice(index + 1)
  ];
  
  return updatedPhone;
};

export const deletePhone = (id: string): boolean => {
  const initialLength = phones.length;
  phones = phones.filter(phone => phone.id !== id);
  return phones.length < initialLength;
};

// Admin authentication and management
export const verifyPassword = (username: string, password: string): Admin | null => {
  // In a real app, this would use proper password hashing and verification
  const admin = admins.find(a => a.username === username);
  if (!admin) return null;
  
  // Mock password verification (use proper hashing in production)
  const passwordHash = "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918"; // hash of 'admin'
  if (passwordHash === admin.passwordHash) {
    return admin;
  }
  
  return null;
};

export const verifyOtp = (username: string, otp: string): boolean => {
  // In a real implementation, use a proper TOTP library
  // For demo purposes, accept "123456" as valid OTP
  return otp === "123456";
};

export const getAllAdmins = (requestingAdminId: string): Admin[] | null => {
  const admin = admins.find(a => a.id === requestingAdminId);
  if (!admin || !admin.permissions.viewAdmins) return null;
  
  // Don't return password hashes when listing admins
  return admins.map(({ id, username, permissions }) => ({ 
    id, username, permissions, 
    passwordHash: '', 
    otpSecret: '' 
  }));
};

export const addAdmin = (
  requestingAdminId: string, 
  newAdmin: Omit<Admin, 'id'>
): Admin | null => {
  const admin = admins.find(a => a.id === requestingAdminId);
  if (!admin || !admin.permissions.manageAdmins) return null;
  
  const adminToAdd = {
    ...newAdmin,
    id: `admin${Date.now()}` // Generate a unique ID
  };
  
  admins = [...admins, adminToAdd];
  return adminToAdd;
};

export const updateAdmin = (
  requestingAdminId: string,
  adminId: string,
  updates: Partial<Omit<Admin, 'id'>>
): Admin | null => {
  const requestingAdmin = admins.find(a => a.id === requestingAdminId);
  if (!requestingAdmin || !requestingAdmin.permissions.manageAdmins) return null;
  
  const adminIndex = admins.findIndex(a => a.id === adminId);
  if (adminIndex === -1) return null;
  
  const updatedAdmin = {
    ...admins[adminIndex],
    ...updates
  };
  
  admins = [
    ...admins.slice(0, adminIndex),
    updatedAdmin,
    ...admins.slice(adminIndex + 1)
  ];
  
  return updatedAdmin;
};

export const deleteAdmin = (
  requestingAdminId: string,
  adminIdToDelete: string
): boolean => {
  const requestingAdmin = admins.find(a => a.id === requestingAdminId);
  if (!requestingAdmin || !requestingAdmin.permissions.manageAdmins) return false;
  
  // Prevent deleting yourself
  if (requestingAdminId === adminIdToDelete) return false;
  
  const initialLength = admins.length;
  admins = admins.filter(admin => admin.id !== adminIdToDelete);
  return admins.length < initialLength;
};

// Generate QR code secret for admin
export const generateOtpSecret = (): string => {
  // In a real app, this would use a proper TOTP library to generate a secret
  return "JBSWY3DPEHPK3PXP"; // Example secret for demo purposes
};

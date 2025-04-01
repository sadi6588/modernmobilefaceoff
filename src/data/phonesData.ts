
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

export const phones: Phone[] = [
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

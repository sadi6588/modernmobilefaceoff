
import React, { useState, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getAllPhones, Phone } from "@/data/phonesData";
import { mockInstallDatabase } from "@/lib/mockInstall";
import { markDatabaseAsInstalled } from "@/lib/databaseStatus";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileMenu from "@/components/MobileMenu";
import PhoneCard from "@/components/PhoneCard";
import ComparisonTable from "@/components/ComparisonTable";
import { Loader2 } from "lucide-react";

const Index = () => {
  const { toast } = useToast();
  const phones = getAllPhones();
  const [selectedPhones, setSelectedPhones] = useState<Phone[]>([]);
  const [isInstalling, setIsInstalling] = useState(false);
  const [installDialogOpen, setInstallDialogOpen] = useState(false);
  const compareRef = useRef<HTMLDivElement>(null);
  
  const handlePhoneSelect = (phone: Phone) => {
    if (selectedPhones.find(p => p.id === phone.id)) {
      // Remove if already selected
      setSelectedPhones(selectedPhones.filter(p => p.id !== phone.id));
    } else {
      // Add new phone, but limit to 2 selections
      const newSelection = [...selectedPhones, phone].slice(-2);
      setSelectedPhones(newSelection);
      
      // Scroll to comparison if 2 phones are selected
      if (newSelection.length === 2 && compareRef.current) {
        setTimeout(() => {
          compareRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  };
  
  const handleInstall = async () => {
    setIsInstalling(true);
    
    try {
      const result = await mockInstallDatabase({
        host: "localhost",
        username: "modernadmin",
        password: "securepass",
        database: "mobilecompare"
      });
      
      if (result.success) {
        // Mark database as installed
        markDatabaseAsInstalled();
        
        toast({
          title: "Installation Complete",
          description: "Database installed successfully!",
        });
      } else {
        toast({
          title: "Installation Failed",
          description: "There was an error during installation.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Installation Error",
        description: "An unexpected error occurred.",
        variant: "destructive"
      });
    } finally {
      setIsInstalling(false);
      setInstallDialogOpen(false);
    }
  };
  
  const showInstallDialog = () => {
    setInstallDialogOpen(true);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <MobileMenu onInstallClick={showInstallDialog} />
      <Header />
      
      <main className="flex-grow container mx-auto px-4">
        <section id="phones" className="py-8">
          <h2 className="text-2xl font-bold mb-6">Latest Smartphones</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {phones.map(phone => (
              <PhoneCard 
                key={phone.id} 
                phone={phone} 
                onSelect={() => handlePhoneSelect(phone)} 
                selected={selectedPhones.some(p => p.id === phone.id)}
              />
            ))}
          </div>
        </section>
        
        <section id="compare" className="py-12" ref={compareRef}>
          <h2 className="text-2xl font-bold mb-6">Comparison</h2>
          <ComparisonTable 
            phone1={selectedPhones[0]} 
            phone2={selectedPhones[1]} 
          />
        </section>
        
        <section id="about" className="py-12">
          <div className="glass p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">About ModernMobileFaceoff</h2>
            <p className="mb-4">
              ModernMobileFaceoff is a cutting-edge platform for comparing the latest smartphones.
              Our detailed specification comparisons help you make informed decisions about your next device purchase.
            </p>
            <p>
              This site showcases a modern dark UI with neon accents, responsive design, and interactive features that would be powered by PHP and MySQL in a production environment.
              The database installation demo simulates what would happen in a real PHP application.
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
      
      {/* Install Dialog */}
      <Dialog open={installDialogOpen} onOpenChange={setInstallDialogOpen}>
        <DialogContent className="glass border-neon-blue/30 text-white">
          <DialogHeader>
            <DialogTitle>Database Installation</DialogTitle>
            <DialogDescription className="text-neutral-400">
              This simulates what would happen in the install.php file of a PHP application.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <p className="mb-4">
              The installation will set up the database schema and populate it with sample phone data.
            </p>
            
            <div className="glass bg-black/50 p-4 rounded-md font-mono text-sm mb-4">
              <div className="mb-2"><span className="text-neon-blue">Host:</span> localhost</div>
              <div className="mb-2"><span className="text-neon-blue">Database:</span> mobilecompare</div>
              <div className="mb-2"><span className="text-neon-blue">Username:</span> modernadmin</div>
              <div><span className="text-neon-blue">Password:</span> ********</div>
            </div>
            
            <Button 
              className="btn-neon w-full"
              disabled={isInstalling}
              onClick={handleInstall}
            >
              {isInstalling ? (
                <span className="flex items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Installing...
                </span>
              ) : "Install Database"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;

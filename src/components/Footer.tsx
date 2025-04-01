
import React from "react";
import { Heart } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 mt-20 py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-xl font-bold neon-text">ModernMobileFaceoff</h2>
            <p className="text-neutral-400 text-sm">
              The ultimate smartphone comparison platform
            </p>
          </div>
          
          <div className="flex gap-8">
            <div>
              <h3 className="font-medium mb-2">Resources</h3>
              <ul className="text-sm text-neutral-400 space-y-1">
                <li><a href="#" className="hover:text-neon-blue">API</a></li>
                <li><a href="#" className="hover:text-neon-blue">Documentation</a></li>
                <li><a href="#" className="hover:text-neon-blue">Privacy</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Connect</h3>
              <ul className="text-sm text-neutral-400 space-y-1">
                <li><a href="#" className="hover:text-neon-blue">Twitter</a></li>
                <li><a href="#" className="hover:text-neon-blue">GitHub</a></li>
                <li><a href="#" className="hover:text-neon-blue">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mt-8 pt-6 border-t border-white/5">
          <p className="text-neutral-500 text-sm flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-neon-pink" /> in 2025
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

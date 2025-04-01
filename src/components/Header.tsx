
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="text-center pt-24 pb-12 px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        <span className="neon-text">Modern</span>
        <span className="neon-purple-text ml-2">Mobile</span>
        <span className="text-white ml-2">Faceoff</span>
      </h1>
      <p className="text-neutral-400 max-w-2xl mx-auto">
        Compare the latest and greatest smartphones side by side. 
        See which device reigns supreme in our detailed spec comparison.
      </p>
    </header>
  );
};

export default Header;

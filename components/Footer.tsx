// Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-6 bg-gray-800 text-white">
      <div className="flex justify-between text-center px-10">
        <p>&copy; 2024 Sanders Technology</p>
        <p>
          <a href="mailto:hello@sanders.technology" className="text-blue-400 hover:underline">
            Kontakt oss
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
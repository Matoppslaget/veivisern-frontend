// Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-2 sm:py-4">
      <div className="sm:flex sm:justify-between text-center sm:px-10">
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
import React from 'react';
import { Sparkles, Phone, Settings } from 'lucide-react';

interface HeaderProps {
  onAdminClick: () => void;
}

export default function Header({ onAdminClick }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Sparkles className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">CleanPro Edmonton</span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors">Services</a>
            <a href="#quote" className="text-gray-700 hover:text-blue-600 transition-colors">Get Quote</a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <a
              href="tel:+17804567890"
              className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
            >
              <Phone className="h-4 w-4 mr-2" />
              <span className="font-semibold">(780) 456-7890</span>
            </a>
            <button
              onClick={onAdminClick}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              title="Admin Dashboard"
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
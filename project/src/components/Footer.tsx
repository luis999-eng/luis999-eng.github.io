import React from 'react';
import { Sparkles, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <Sparkles className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold">CleanPro Edmonton</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Edmonton's trusted cleaning service providing exceptional residential and commercial 
              cleaning solutions with a 100% satisfaction guarantee.
            </p>
            <div className="space-y-2">
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-blue-400 mr-3" />
                <span>(780) 456-7890</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-blue-400 mr-3" />
                <span>info@cleanproedmonton.ca</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-blue-400 mr-3" />
                <span>Serving Edmonton & surrounding areas</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Residential Cleaning</li>
              <li>Commercial Cleaning</li>
              <li>Deep Cleaning</li>
              <li>Move-in/out Cleaning</li>
              <li>Post-construction Cleanup</li>
              <li>Emergency Service</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Areas Served</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Edmonton</li>
              <li>Sherwood Park</li>
              <li>St. Albert</li>
              <li>Leduc</li>
              <li>Beaumont</li>
              <li>Devon</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">
            © 2025 CleanPro Edmonton. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
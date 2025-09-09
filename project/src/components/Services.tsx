import React from 'react';
import { Home, Building, Sparkles, Clock } from 'lucide-react';

const services = [
  {
    icon: Home,
    title: 'Residential Cleaning',
    description: 'Complete home cleaning services for houses, apartments, and condos.',
    features: ['Deep cleaning', 'Regular maintenance', 'Move-in/out cleaning', 'Post-construction cleanup'],
    price: 'Starting at $80'
  },
  {
    icon: Building,
    title: 'Commercial Cleaning',
    description: 'Professional cleaning for offices, retail spaces, and commercial buildings.',
    features: ['Office cleaning', 'Retail spaces', 'Medical facilities', 'Industrial cleaning'],
    price: 'Starting at $150'
  },
  {
    icon: Sparkles,
    title: 'Deep Cleaning',
    description: 'Comprehensive deep cleaning service for thorough sanitization.',
    features: ['Detailed cleaning', 'Disinfection', 'Hard-to-reach areas', 'Appliance cleaning'],
    price: 'Starting at $120'
  },
  {
    icon: Clock,
    title: 'Regular Maintenance',
    description: 'Scheduled cleaning services to keep your space consistently clean.',
    features: ['Weekly service', 'Bi-weekly service', 'Monthly service', 'Custom schedules'],
    price: 'Starting at $60'
  }
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Professional Cleaning Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We offer comprehensive cleaning solutions for both residential and commercial properties 
            throughout Edmonton and surrounding areas.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-2"
            >
              <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <service.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="text-lg font-bold text-blue-600">{service.price}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
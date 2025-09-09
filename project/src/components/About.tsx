import React from 'react';
import { Shield, Award, Users, Clock } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Fully Insured & Bonded',
    description: 'Complete coverage for your peace of mind with comprehensive liability insurance.'
  },
  {
    icon: Award,
    title: '10+ Years Experience',
    description: 'Trusted by Edmonton residents and businesses with over a decade of excellence.'
  },
  {
    icon: Users,
    title: 'Professional Team',
    description: 'Background-checked, trained professionals committed to exceptional service.'
  },
  {
    icon: Clock,
    title: '24/7 Availability',
    description: 'Emergency cleaning services available around the clock for urgent needs.'
  }
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Choose CleanPro Edmonton?
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We're Edmonton's premier cleaning service, dedicated to delivering exceptional results 
              for both residential and commercial clients. Our commitment to quality, reliability, 
              and customer satisfaction sets us apart.
            </p>
            
            <div className="grid gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-blue-600 p-3 rounded-xl">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-blue-50 rounded-xl">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
                <div className="text-gray-900 font-semibold">Satisfaction Guarantee</div>
                <div className="text-sm text-gray-600 mt-1">
                  We're not happy until you're completely satisfied
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/4107031/pexels-photo-4107031.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Professional cleaning team"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -top-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">500+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg">
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-600">10+</div>
                <div className="text-sm text-gray-600">Years Serving Edmonton</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
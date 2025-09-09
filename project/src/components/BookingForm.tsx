import React, { useState } from 'react';
import { X, Calendar, Clock, User, MapPin } from 'lucide-react';
import { QuoteData, BookingData } from '../App';

interface BookingFormProps {
  quote: QuoteData;
  onSubmit: (booking: BookingData) => void;
  onClose: () => void;
}

export default function BookingForm({ quote, onSubmit, onClose }: BookingFormProps) {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [notes, setNotes] = useState('');

  const timeSlots = [
    '8:00 AM - 10:00 AM',
    '10:00 AM - 12:00 PM',
    '12:00 PM - 2:00 PM',
    '2:00 PM - 4:00 PM',
    '4:00 PM - 6:00 PM'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const booking: BookingData = {
      ...quote,
      id: Math.random().toString(36).substr(2, 9),
      customerInfo,
      preferredDate,
      preferredTime,
      status: 'pending',
      notes,
      createdAt: new Date()
    };

    onSubmit(booking);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Complete Your Booking</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Quote Summary */}
          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <h3 className="font-bold text-blue-900 mb-4">Service Summary</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Service Type:</span>
                <span className="ml-2 font-semibold capitalize">{quote.serviceType}</span>
              </div>
              <div>
                <span className="text-gray-600">Frequency:</span>
                <span className="ml-2 font-semibold capitalize">{quote.frequency.replace('-', ' ')}</span>
              </div>
              {quote.serviceType === 'residential' && (
                <>
                  <div>
                    <span className="text-gray-600">Cleaning Type:</span>
                    <span className="ml-2 font-semibold capitalize">{quote.cleaningType} House</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Rooms/Bathrooms:</span>
                    <span className="ml-2 font-semibold">{quote.rooms} rooms, {quote.bathrooms} bathrooms</span>
                  </div>
                </>
              )}
              <div className="md:col-span-2">
                <span className="text-gray-600">Square Footage:</span>
                <span className="ml-2 font-semibold">{quote.squareFootage.toLocaleString()} sq ft</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-blue-200">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Total Price:</span>
                <span className="text-2xl font-bold text-blue-600">${quote.totalPrice}</span>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-900 mb-2">
                  <User className="h-4 w-4 mr-2 text-blue-600" />
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-900 mb-2">
                  <MapPin className="h-4 w-4 mr-2 text-blue-600" />
                  Service Address *
                </label>
                <input
                  type="text"
                  required
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Full address including postal code"
                />
              </div>
              
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-900 mb-2">
                  <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                  Preferred Date *
                </label>
                <input
                  type="date"
                  required
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-900 mb-2">
                  <Clock className="h-4 w-4 mr-2 text-blue-600" />
                  Preferred Time *
                </label>
                <select
                  required
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                >
                  <option value="">Select a time slot</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Special Instructions or Notes
              </label>
              <textarea
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Any special requirements, access instructions, or preferences..."
              />
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="text-sm text-yellow-800">
                <strong>Please note:</strong> This booking is subject to confirmation. We'll contact you within 2 hours 
                to confirm availability and finalize the details.
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Submit Booking Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
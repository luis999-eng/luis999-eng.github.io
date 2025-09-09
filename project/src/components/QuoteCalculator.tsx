import React, { useState, useEffect } from 'react';
import { Calculator, ArrowRight } from 'lucide-react';
import { QuoteData } from '../App';

interface QuoteCalculatorProps {
  onQuoteGenerated: (quote: QuoteData) => void;
}

export default function QuoteCalculator({ onQuoteGenerated }: QuoteCalculatorProps) {
  const [serviceType, setServiceType] = useState<'residential' | 'commercial'>('residential');
  const [cleaningType, setCleaningType] = useState<'whole' | 'partial'>('whole');
  const [rooms, setRooms] = useState(3);
  const [bathrooms, setBathrooms] = useState(2);
  const [squareFootage, setSquareFootage] = useState(1500);
  const [frequency, setFrequency] = useState<'one-time' | 'weekly' | 'bi-weekly' | 'monthly'>('one-time');
  const [extras, setExtras] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const extraServices = [
    { id: 'windows', name: 'Window Cleaning', price: 25 },
    { id: 'carpet', name: 'Carpet Deep Clean', price: 40 },
    { id: 'appliances', name: 'Appliance Cleaning', price: 35 },
    { id: 'garage', name: 'Garage Cleaning', price: 50 },
    { id: 'basement', name: 'Basement Cleaning', price: 45 },
    { id: 'oven', name: 'Oven Deep Clean', price: 30 }
  ];

  useEffect(() => {
    calculatePrice();
  }, [serviceType, cleaningType, rooms, bathrooms, squareFootage, frequency, extras]);

  const calculatePrice = () => {
    let basePrice = 0;
    
    if (serviceType === 'residential') {
      basePrice = cleaningType === 'whole' ? 80 : 60;
      basePrice += (rooms - 1) * 15;
      basePrice += (bathrooms - 1) * 10;
      basePrice += Math.max(0, (squareFootage - 1000) / 500) * 20;
    } else {
      basePrice = 150;
      basePrice += squareFootage * 0.08;
    }

    // Frequency discounts
    const frequencyMultiplier = {
      'one-time': 1,
      'weekly': 0.85,
      'bi-weekly': 0.90,
      'monthly': 0.95
    };

    basePrice *= frequencyMultiplier[frequency];

    // Add extras
    const extrasPrice = extras.reduce((total, extraId) => {
      const extra = extraServices.find(e => e.id === extraId);
      return total + (extra ? extra.price : 0);
    }, 0);

    setTotalPrice(Math.round(basePrice + extrasPrice));
  };

  const handleExtraToggle = (extraId: string) => {
    setExtras(prev =>
      prev.includes(extraId)
        ? prev.filter(id => id !== extraId)
        : [...prev, extraId]
    );
  };

  const handleGetQuote = () => {
    const quote: QuoteData = {
      serviceType,
      cleaningType,
      rooms,
      bathrooms,
      squareFootage,
      frequency,
      extras,
      totalPrice
    };
    onQuoteGenerated(quote);
  };

  return (
    <section id="quote" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Calculator className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Get Your Instant Quote
            </h2>
          </div>
          <p className="text-xl text-gray-600">
            Customize your cleaning service and get a real-time price estimate
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Service Type */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-900 mb-4">Service Type</label>
            <div className="grid md:grid-cols-2 gap-4">
              {(['residential', 'commercial'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setServiceType(type)}
                  className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                    serviceType === type
                      ? 'border-blue-600 bg-blue-50 text-blue-900'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-lg font-semibold capitalize">{type}</div>
                  <div className="text-sm text-gray-600 mt-1">
                    {type === 'residential' ? 'Homes, apartments, condos' : 'Offices, retail, warehouses'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {serviceType === 'residential' && (
            <div className="mb-8">
              <label className="block text-lg font-semibold text-gray-900 mb-4">Cleaning Type</label>
              <div className="grid md:grid-cols-2 gap-4">
                {(['whole', 'partial'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setCleaningType(type)}
                    className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                      cleaningType === type
                        ? 'border-blue-600 bg-blue-50 text-blue-900'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-lg font-semibold capitalize">{type} House</div>
                    <div className="text-sm text-gray-600 mt-1">
                      {type === 'whole' ? 'All rooms and areas' : 'Select specific rooms'}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Property Details */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {serviceType === 'residential' && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Number of Rooms</label>
                  <select
                    value={rooms}
                    onChange={(e) => setRooms(Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Number of Bathrooms</label>
                  <select
                    value={bathrooms}
                    onChange={(e) => setBathrooms(Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Square Footage</label>
              <input
                type="number"
                value={squareFootage}
                onChange={(e) => setSquareFootage(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="e.g., 1500"
              />
            </div>
          </div>

          {/* Frequency */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-900 mb-4">Cleaning Frequency</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {([
                { value: 'one-time', label: 'One-Time', discount: '' },
                { value: 'weekly', label: 'Weekly', discount: '15% OFF' },
                { value: 'bi-weekly', label: 'Bi-Weekly', discount: '10% OFF' },
                { value: 'monthly', label: 'Monthly', discount: '5% OFF' }
              ] as const).map((freq) => (
                <button
                  key={freq.value}
                  onClick={() => setFrequency(freq.value)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    frequency === freq.value
                      ? 'border-blue-600 bg-blue-50 text-blue-900'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-semibold">{freq.label}</div>
                  {freq.discount && (
                    <div className="text-xs text-green-600 font-bold mt-1">{freq.discount}</div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Extra Services */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-900 mb-4">Additional Services</label>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {extraServices.map((extra) => (
                <label
                  key={extra.id}
                  className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    extras.includes(extra.id)
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={extras.includes(extra.id)}
                    onChange={() => handleExtraToggle(extra.id)}
                    className="sr-only"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{extra.name}</div>
                    <div className="text-sm text-blue-600 font-bold">+${extra.price}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Total Price Display */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-lg text-gray-600">Estimated Total</div>
                {frequency !== 'one-time' && (
                  <div className="text-sm text-green-600 font-semibold">
                    Recurring discount applied
                  </div>
                )}
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-blue-600">${totalPrice}</div>
                {frequency !== 'one-time' && (
                  <div className="text-sm text-gray-600">per {frequency.replace('-', ' ')}</div>
                )}
              </div>
            </div>
          </div>

          {/* Book Now Button */}
          <button
            onClick={handleGetQuote}
            className="w-full bg-blue-600 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center"
          >
            Book This Service
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
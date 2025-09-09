import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import QuoteCalculator from './components/QuoteCalculator';
import BookingForm from './components/BookingForm';
import AdminDashboard from './components/AdminDashboard';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

export interface QuoteData {
  serviceType: 'residential' | 'commercial';
  cleaningType: 'whole' | 'partial';
  rooms: number;
  bathrooms: number;
  squareFootage: number;
  frequency: 'one-time' | 'weekly' | 'bi-weekly' | 'monthly';
  extras: string[];
  totalPrice: number;
}

export interface BookingData extends QuoteData {
  id: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  preferredDate: string;
  preferredTime: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  notes: string;
  createdAt: Date;
}

function App() {
  const [currentView, setCurrentView] = useState<'main' | 'admin'>('main');
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [currentQuote, setCurrentQuote] = useState<QuoteData | null>(null);

  const handleQuoteGenerated = (quote: QuoteData) => {
    setCurrentQuote(quote);
    setShowBookingForm(true);
  };

  const handleBookingSubmitted = (booking: BookingData) => {
    setBookings(prev => [...prev, booking]);
    setShowBookingForm(false);
    setCurrentQuote(null);
  };

  const updateBooking = (id: string, updates: Partial<BookingData>) => {
    setBookings(prev => prev.map(booking => 
      booking.id === id ? { ...booking, ...updates } : booking
    ));
  };

  if (currentView === 'admin') {
    return (
      <AdminDashboard 
        bookings={bookings}
        onBack={() => setCurrentView('main')}
        onUpdateBooking={updateBooking}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header onAdminClick={() => setCurrentView('admin')} />
      <main>
        <Hero />
        <Services />
        <QuoteCalculator onQuoteGenerated={handleQuoteGenerated} />
        <About />
        <Contact />
      </main>
      <Footer />
      
      {showBookingForm && currentQuote && (
        <BookingForm
          quote={currentQuote}
          onSubmit={handleBookingSubmitted}
          onClose={() => {
            setShowBookingForm(false);
            setCurrentQuote(null);
          }}
        />
      )}
    </div>
  );
}

export default App;
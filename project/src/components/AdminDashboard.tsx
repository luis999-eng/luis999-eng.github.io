import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, XCircle, Edit3, Eye, Filter } from 'lucide-react';
import { BookingData } from '../App';

interface AdminDashboardProps {
  bookings: BookingData[];
  onBack: () => void;
  onUpdateBooking: (id: string, updates: Partial<BookingData>) => void;
}

export default function AdminDashboard({ bookings, onBack, onUpdateBooking }: AdminDashboardProps) {
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [selectedBooking, setSelectedBooking] = useState<BookingData | null>(null);
  const [editingPrice, setEditingPrice] = useState<string | null>(null);
  const [newPrice, setNewPrice] = useState('');

  const filteredBookings = bookings.filter(booking => 
    filter === 'all' || booking.status === filter
  );

  const handleStatusUpdate = (id: string, status: BookingData['status']) => {
    onUpdateBooking(id, { status });
  };

  const handlePriceUpdate = (id: string) => {
    if (newPrice && !isNaN(Number(newPrice))) {
      onUpdateBooking(id, { totalPrice: Number(newPrice) });
      setEditingPrice(null);
      setNewPrice('');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={onBack}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors mr-4"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              >
                <option value="all">All Bookings</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredBookings.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">No bookings found</div>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredBookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {booking.customerInfo.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {booking.serviceType} • {booking.frequency} • {booking.squareFootage} sq ft
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                    
                    <button
                      onClick={() => setSelectedBooking(selectedBooking === booking ? null : booking)}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-gray-500">Email:</span>
                    <div className="font-medium">{booking.customerInfo.email}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Phone:</span>
                    <div className="font-medium">{booking.customerInfo.phone}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Date & Time:</span>
                    <div className="font-medium">{booking.preferredDate} • {booking.preferredTime}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500">Total:</span>
                    {editingPrice === booking.id ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          value={newPrice}
                          onChange={(e) => setNewPrice(e.target.value)}
                          className="w-24 px-2 py-1 text-sm border border-gray-300 rounded"
                          placeholder={booking.totalPrice.toString()}
                        />
                        <button
                          onClick={() => handlePriceUpdate(booking.id)}
                          className="text-green-600 hover:text-green-700"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingPrice(null);
                            setNewPrice('');
                          }}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <XCircle className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-blue-600">${booking.totalPrice}</span>
                        <button
                          onClick={() => {
                            setEditingPrice(booking.id);
                            setNewPrice(booking.totalPrice.toString());
                          }}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    {booking.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleStatusUpdate(booking.id, 'approved')}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(booking.id, 'rejected')}
                          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {booking.status === 'approved' && (
                      <button
                        onClick={() => handleStatusUpdate(booking.id, 'completed')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        Mark Complete
                      </button>
                    )}
                  </div>
                </div>

                {selectedBooking === booking && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Service Details</h4>
                        <div className="space-y-2 text-sm">
                          <div><span className="text-gray-500">Service Type:</span> {booking.serviceType}</div>
                          {booking.serviceType === 'residential' && (
                            <>
                              <div><span className="text-gray-500">Cleaning Type:</span> {booking.cleaningType} house</div>
                              <div><span className="text-gray-500">Rooms:</span> {booking.rooms}</div>
                              <div><span className="text-gray-500">Bathrooms:</span> {booking.bathrooms}</div>
                            </>
                          )}
                          <div><span className="text-gray-500">Square Footage:</span> {booking.squareFootage}</div>
                          <div><span className="text-gray-500">Frequency:</span> {booking.frequency}</div>
                          {booking.extras.length > 0 && (
                            <div><span className="text-gray-500">Extras:</span> {booking.extras.join(', ')}</div>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Contact & Address</h4>
                        <div className="space-y-2 text-sm">
                          <div><span className="text-gray-500">Address:</span> {booking.customerInfo.address}</div>
                          <div><span className="text-gray-500">Booked:</span> {booking.createdAt.toLocaleDateString()}</div>
                          {booking.notes && (
                            <div>
                              <span className="text-gray-500">Notes:</span>
                              <div className="mt-1 text-gray-900">{booking.notes}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
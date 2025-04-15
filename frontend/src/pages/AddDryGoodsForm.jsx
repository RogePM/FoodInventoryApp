// src/components/AddDryGoodsForm.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AddDryGoodsForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const defaultName = params.get('item') || '';

  const [formData, setFormData] = useState({
    name: defaultName,
    category: 'Dry Goods',
    quantity: 1,
    expirationDate: '',
    donor: '',
    storageLocation: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5555/foods', formData);
      navigate('/inventory');
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">Add Dry Good Item</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Item Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Quantity</label>
          <input
            type="number"
            value={formData.quantity}
            onChange={(e) => setFormData({...formData, quantity: e.target.value})}
            className="w-full p-2 border rounded"
            min="1"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Expiration Date</label>
          <input
            type="date"
            value={formData.expirationDate}
            onChange={(e) => setFormData({...formData, expirationDate: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Donor</label>
          <input
            type="text"
            value={formData.donor}
            onChange={(e) => setFormData({...formData, donor: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Storage Location</label>
          <input
            type="text"
            value={formData.storageLocation}
            onChange={(e) => setFormData({...formData, storageLocation: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Item
        </button>
      </form>
    </div>
  );
}

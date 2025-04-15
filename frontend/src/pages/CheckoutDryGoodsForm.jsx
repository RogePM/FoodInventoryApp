import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CheckoutDryGoodsForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const defaultName = params.get('item') || '';

  const [quantity, setQuantity] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5555/foods/checkout`, {
        name: defaultName,
        quantity: Number(quantity)
      });
      navigate('/inventory');
    } catch (error) {
      console.error('Error checking out item:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-2xl font-bold mb-6 text-yellow-600">Checkout Item</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Item</label>
          <input
            type="text"
            value={defaultName}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full p-2 border rounded"
            min="1"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Checkout
        </button>
      </form>
    </div>
  );
}

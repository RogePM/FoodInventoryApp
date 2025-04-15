import React from 'react';
import { Link } from 'react-router-dom';

const commonItems = ['Rice', 'Pasta', 'Canned Vegetables', 'Cereal', 'Flour', 'Beans'];

export default function CheckoutDryGoodsPanel() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-2xl font-bold mb-6 text-yellow-600">Select Dry Good to Checkout</h2>
      <div className="grid grid-cols-2 gap-4">
        {commonItems.map((item, index) => (
          <Link
            key={index}
            to={`/checkout-items/dry-goods/form?item=${encodeURIComponent(item)}`}
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
          >
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
}

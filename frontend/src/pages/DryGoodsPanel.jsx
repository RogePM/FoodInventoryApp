// src/pages/DryGoodsPanel.jsx
import { Link } from 'react-router-dom';
import React from 'react';


const commonItems = [
  'Rice', 'Pasta', 'Canned Vegetables', 'Cereal', 'Flour', 'Beans'
];

export default function DryGoodsPanel() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">Select Dry Good Item</h2>
      <div className="grid grid-cols-2 gap-4">
        {commonItems.map((item, index) => (
          <Link 
            key={index}
            to={`/add-items/dry-goods/form?item=${encodeURIComponent(item)}`}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
          >
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
}

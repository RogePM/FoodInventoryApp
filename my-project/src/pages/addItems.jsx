import React from 'react';

const AddItems = () => {
  const categories = ['Dry Goods', 'Produce', 'Dairy', 'Meat', 'Bakery'];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-blue-600">Add Items</h1>
      <div className="grid grid-cols-2 gap-4">
        {categories.map((category, index) => (
          <button
            key={index}
            
            className="p-4 bg-blue-100 rounded-lg hover:bg-blue-200 transition"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AddItems;

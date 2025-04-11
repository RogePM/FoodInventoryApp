import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const panels = [
    { title: 'Add Items', link: '/add-items' },
    { title: 'Checkout Items', link: '/checkout-items' },
    { title: 'Full Inventory List', link: '/inventory' },
    { title: 'Recent Changes', link: '/recent-changes' },
    { title: 'Settings', link: '/settings' },
    { title: 'Calendar', link: '/calendar' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-blue-600">Food Bank Inventory</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {panels.map((panel, index) => (
          <Link
            key={index}
            to={panel.link}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-2">{panel.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home; // Ensure this line exists and is correct


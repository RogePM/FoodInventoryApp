import React from 'react';

const RecentChanges = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-blue-600">Recent Changes</h1>
      {/* Add logic to fetch and display recent changes */}
    <ul>
      {RecentChanges.map((change, index) => (
        <li key={index} className="mb-4 p-4 bg-white shadow rounded">
        <h2 className="text-xl font-semibold">{change.title}</h2>
        <p className="text-gray-600">{change.description}</p>
        <span className="text-sm text-gray-500">{change.date}</span>
        </li>
      ))}
    </ul>
      <p>Recent changes will be displayed here.</p>
    </div>
  );
};

export default RecentChanges;

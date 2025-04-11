import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/foods')
      .then((response) => {
        setItems(Array.isArray(response.data.data) ? response.data.data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-blue-600">Full Inventory</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2">Item Name</th>
              <th className="border border-gray-400 px-4 py-2">Category</th>
              <th className="border border-gray-400 px-4 py-2">Quantity</th>
              <th className="border border-gray-400 px-4 py-2">Expiration Date</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td className="border border-gray-400 px-4 py-2">{item.name}</td>
                <td className="border border-gray-400 px-4 py-2">{item.category}</td>
                <td className="border border-gray-400 px-4 py-2">{item.quantity}</td>
                <td className="border border-gray-400 px-4 py-2">
                  {item.expirationDate ? new Date(item.expirationDate).toLocaleDateString() : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Inventory;

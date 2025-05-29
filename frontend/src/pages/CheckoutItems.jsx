import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  GiGrain, GiFruitBowl, GiMilkCarton, GiMeatCleaver, GiBread,
  GiCannedFish, GiWaterBottle, GiBabyBottle, GiSoap, GiHotMeal,
  GiChocolateBar, GiFrozenOrb
} from 'react-icons/gi';
import { MdArrowBack } from 'react-icons/md';

// Categories
const categories = [
  { name: 'Dry Goods', icon: <GiGrain size={36} />, route: 'dry-goods' },
  { name: 'Produce', icon: <GiFruitBowl size={36} />, route: 'produce' },
  { name: 'Dairy', icon: <GiMilkCarton size={36} />, route: 'dairy' },
  { name: 'Meat', icon: <GiMeatCleaver size={36} />, route: 'meat' },
  { name: 'Bakery', icon: <GiBread size={36} />, route: 'bakery' },
  { name: 'Frozen Foods', icon: <GiFrozenOrb size={36} />, route: 'frozen-foods' },
  { name: 'Canned Goods', icon: <GiCannedFish size={36} />, route: 'canned-goods' },
  { name: 'Beverages', icon: <GiWaterBottle size={36} />, route: 'beverages' },
  { name: 'Baby Items', icon: <GiBabyBottle size={36} />, route: 'baby-items' },
  { name: 'Prepared Meals', icon: <GiHotMeal size={36} />, route: 'prepared-meals' },
  { name: 'Snacks', icon: <GiChocolateBar size={36} />, route: 'snacks' },
  { name: 'Personal Hygiene', icon: <GiSoap size={36} />, route: 'hygiene' },
];

// Helper: Normalize item names for deduplication
const normalizeName = name =>
  name.trim().toLowerCase().replace(/[^a-z0-9]/g, '').replace(/s$/, '');

const deduplicateItems = items => {
  const seen = new Map();
  for (const item of items) {
    const norm = normalizeName(item.name);
    if (!seen.has(norm)) {
      seen.set(norm, item);
    }
  }
  return Array.from(seen.values());
};

const CheckoutItems = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [removingId, setRemovingId] = useState(null);
  const [removeQty, setRemoveQty] = useState({});
  const [message, setMessage] = useState('');

  // Open modal and fetch items for category
  const openModal = async (category) => {
    setSelectedCategory(category);
    setModalOpen(true);
    setSearch('');
    setMessage('');
    setRemovingId(null);
    setRemoveQty({});
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/foods`);
      // Deduplicate by normalized name
      const filtered = res.data.data.filter(item => item.category === category);
      setItems(deduplicateItems(filtered));
    } catch {
      setItems([]);
      setMessage('Failed to load items');
    }
  };

  // Remove quantity or delete item
  const handleRemove = async (item) => {
    const qtyToRemove = Number(removeQty[item._id]);
    if (!qtyToRemove || qtyToRemove < 1 || qtyToRemove > item.quantity) {
      setMessage('Enter a valid quantity');
      return;
    }
    setRemovingId(item._id);
    try {
      if (qtyToRemove === item.quantity) {
        // Delete the item
        await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/foods/${item._id}`);
        setItems(items => items.filter(i => i._id !== item._id));
        setMessage('Item fully checked out!');
      } else {
        // PUT: update item with new quantity and all required fields
        const updatedItem = {
          name: item.name,
          category: item.category,
          quantity: item.quantity - qtyToRemove,
          expirationDate: item.expirationDate,
          donor: item.donor || 'N/A',
          storageLocation: item.storageLocation || 'N/A',
          lastModified: new Date().toISOString(),
        };
        await axios.put(`${process.env.REACT_APP_API_BASE_URL}/foods/${item._id}`, updatedItem);
        setItems(items =>
          items.map(i =>
            i._id === item._id ? { ...i, quantity: i.quantity - qtyToRemove } : i
          )
        );
        setMessage('Item quantity updated!');
      }
      setRemoveQty(qty => ({ ...qty, [item._id]: '' }));
    } catch {
      setMessage('Failed to check out item.');
    }
    setRemovingId(null);
  };

  // Filtered items
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Distinctive Checkout Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-amber-200 z-0" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[90vw] h-[90vw] max-w-[1000px] rounded-full bg-amber-400 opacity-10 blur-3xl z-0" />

      {/* Main Content */}
      <div className="relative z-10 px-4 sm:px-6 pt-6 sm:pt-8 pb-4 flex flex-col justify-between min-h-screen">
        {/* Back Button */}
        <div className="flex justify-start mb-4">
          <Link
            to="/"
            className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow hover:bg-white transition text-amber-700 font-medium text-sm sm:text-base"
          >
            <MdArrowBack className="text-lg sm:text-xl" />
            Dashboard
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-1">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 drop-shadow-sm">Check Out Items</h1>
          <p className="mt-2 text-gray-600 text-sm sm:text-md">Select a category to quickly check out items.</p>
        </div>

        {/* Category Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 place-items-center">
          {categories.map((cat, index) => (
            <button
              key={index}
              type="button"
              onClick={() => openModal(cat.name)}
              className="bg-white/80 backdrop-blur-lg w-full max-w-[160px] sm:max-w-[180px] md:max-w-[200px] h-[130px] sm:h-[150px] rounded-3xl p-5 shadow-md hover:shadow-xl hover:bg-white group transition duration-300 transform hover:-translate-y-1 flex flex-col justify-center items-center text-center focus:outline-none"
            >
              <div className="text-amber-600 mb-2 group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-800 group-hover:text-amber-700">
                {cat.name}
              </h3>
            </button>
          ))}
        </div>

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-8 shadow-lg w-full max-w-lg space-y-4 relative">
              <button
                type="button"
                className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-2xl"
                onClick={() => setModalOpen(false)}
                aria-label="Close"
              >×</button>
              <h2 className="text-xl font-bold mb-2 text-amber-700">
                Check Out from {selectedCategory}
              </h2>
              <input
                className="w-full px-3 py-2 rounded border border-gray-200 focus:ring-amber-200"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search item name..."
              />
              <div className="max-h-72 overflow-y-auto">
                {filteredItems.length === 0 ? (
                  <div className="text-gray-400 py-8 text-center">No items found.</div>
                ) : (
                  <ul className="divide-y divide-amber-100">
                    {filteredItems.map(item => (
                      <li key={item._id} className="flex items-center justify-between py-3">
                        <div>
                          <div className="font-semibold text-gray-700">{item.name}</div>
                          <div className="text-xs text-gray-500">
                            Qty: {item.quantity} | Exp: {item.expirationDate ? new Date(item.expirationDate).toLocaleDateString() : 'N/A'}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min={1}
                            max={item.quantity}
                            value={removeQty[item._id] || ''}
                            onChange={e =>
                              setRemoveQty(qty => ({
                                ...qty,
                                [item._id]: e.target.value.replace(/^0+/, '')
                              }))
                            }
                            placeholder="Qty"
                            className="w-16 px-2 py-1 rounded border border-amber-200 focus:ring-amber-300 text-sm"
                            disabled={removingId === item._id}
                          />
                          <button
                            className={`px-3 py-1 rounded-full font-semibold text-xs shadow transition
                              ${removingId === item._id
                                ? 'bg-amber-300 text-white'
                                : 'bg-amber-500 hover:bg-amber-600 text-white'}
                            `}
                            onClick={() => handleRemove(item)}
                            disabled={removingId === item._id}
                          >
                            {removingId === item._id ? 'Processing...' : 'Check Out'}
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {message && (
                <div className="text-center text-sm mt-2 text-amber-700">{message}</div>
              )}
            </div>
          </div>
        )}

        <div className="h-8" />
      </div>
    </div>
  );
};

export default CheckoutItems;

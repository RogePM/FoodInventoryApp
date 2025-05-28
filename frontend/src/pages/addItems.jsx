import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  GiGrain, GiFruitBowl, GiMilkCarton, GiMeatCleaver, GiBread,
  GiCannedFish, GiWaterBottle, GiBabyBottle, GiSoap, GiHotMeal,
  GiChocolateBar, GiFrozenOrb
} from 'react-icons/gi';
import { MdArrowBack } from 'react-icons/md';

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

const commonItems = {
  'Dry Goods': ['Rice', 'Pasta', 'Beans', 'Flour'],
  'Produce': ['Apples', 'Carrots', 'Potatoes', 'Bananas'],
  'Dairy': ['Milk', 'Cheese', 'Yogurt'],
  'Meat': ['Chicken', 'Beef', 'Pork'],
  'Bakery': ['Bread', 'Bagels', 'Rolls'],
  'Frozen Foods': ['Frozen Pizza', 'Frozen Veggies'],
  'Canned Goods': ['Canned Beans', 'Canned Corn', 'Canned Tuna'],
  'Beverages': ['Juice', 'Water', 'Soda'],
  'Baby Items': ['Formula', 'Baby Food', 'Diapers'],
  'Prepared Meals': ['Ready Meals', 'Microwave Meals'],
  'Snacks': ['Granola Bars', 'Chips', 'Cookies'],
  'Personal Hygiene': ['Soap', 'Toothpaste', 'Shampoo'],
};

const AddItems = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expiration, setExpiration] = useState('');
  const [donor, setDonor] = useState('');
  const [storageLocation, setStorageLocation] = useState('');
  const [message, setMessage] = useState('');

  const openModal = (category) => {
    setSelectedCategory(category);
    setModalOpen(true);
    setItemName('');
    setQuantity('');
    setExpiration('');
    setDonor('');
    setStorageLocation('');
    setMessage('');
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!itemName || !quantity || !expiration || !selectedCategory) {
      setMessage('Please fill all fields');
      return;
    }
    try {
      await axios.post('http://localhost:5555/foods', {
        name: itemName,
        category: selectedCategory,
        quantity,
        expirationDate: expiration,
        donor: donor || 'N/A',
        storageLocation: storageLocation || 'N/A',
        lastModified: new Date().toISOString(),
      });
      setMessage('Item added!');
      setItemName('');
      setQuantity('');
      setExpiration('');
      setDonor('');
      setStorageLocation('');
      // Close the modal after a short delay (optional, for user feedback)
      setTimeout(() => {
        setMessage('');
        setModalOpen(false);
      }, 700);
    } catch (err) {
      setMessage('Failed to add item.');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-white to-blue-200 z-0" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[90vw] h-[90vw] max-w-[1000px] rounded-full bg-blue-300 opacity-10 blur-3xl z-0" />

      {/* Main Content */}
      <div className="relative z-10 px-4 sm:px-6 pt-6 sm:pt-8 pb-4 flex flex-col justify-between min-h-screen">
        {/* Back Button */}
        <div className="flex justify-start mb-4">
          <Link
            to="/"
            className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow hover:bg-white transition text-blue-700 font-medium text-sm sm:text-base"
          >
            <MdArrowBack className="text-lg sm:text-xl" />
            Dashboard
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-1">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 drop-shadow-sm">Add New Items</h1>
          <p className="mt-2 text-gray-600 text-sm sm:text-md">Select a category to begin.</p>
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
              <div className="text-blue-600 mb-2 group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-800 group-hover:text-blue-700">
                {cat.name}
              </h3>
            </button>
          ))}
        </div>

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <form
              className="bg-white rounded-2xl p-8 shadow-lg w-full max-w-md space-y-4 relative"
              onSubmit={handleAdd}
            >
              <button
                type="button"
                className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-2xl"
                onClick={() => setModalOpen(false)}
                aria-label="Close"
              >×</button>
              <h2 className="text-xl font-bold mb-2 text-blue-700">
                Add Item to {selectedCategory}
              </h2>
              {/* Quick pick common items */}
              {commonItems[selectedCategory] && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {commonItems[selectedCategory].map((item, i) => (
                    <button
                      type="button"
                      key={i}
                      className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold hover:bg-blue-200"
                      onClick={() => setItemName(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
              <input
                className="w-full px-3 py-2 rounded border border-gray-200 focus:ring-blue-200"
                value={itemName}
                onChange={e => setItemName(e.target.value)}
                placeholder="Item Name"
                required
              />
              <input
                className="w-full px-3 py-2 rounded border border-gray-200 focus:ring-blue-200"
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
                type="number"
                min="1"
                placeholder="Quantity"
                required
              />
              <input
                className="w-full px-3 py-2 rounded border border-gray-200 focus:ring-blue-200"
                value={expiration}
                onChange={e => setExpiration(e.target.value)}
                type="date"
                required
              />
              <input
                className="w-full px-3 py-2 rounded border border-gray-200 focus:ring-blue-200"
                value={donor}
                onChange={e => setDonor(e.target.value)}
                placeholder="Donor (optional)"
              />
              <input
                className="w-full px-3 py-2 rounded border border-gray-200 focus:ring-blue-200"
                value={storageLocation}
                onChange={e => setStorageLocation(e.target.value)}
                placeholder="Storage Location (optional)"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition"
              >
                Add Item
              </button>
              {message && (
                <div className="text-center text-sm mt-2 text-blue-600">{message}</div>
              )}
            </form>
          </div>
        )}

        <div className="h-8" />
      </div>
    </div>
  );
};

export default AddItems;

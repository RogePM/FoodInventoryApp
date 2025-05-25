import React from 'react';
import { Link } from 'react-router-dom';
import {
  GiGrain, GiFruitBowl, GiMilkCarton, GiMeatCleaver, GiBread,
  GiCannedFish, GiWaterBottle, GiBabyBottle, GiSoap, GiHotMeal,
  GiChocolateBar, GiFrozenOrb
} from 'react-icons/gi';
import { MdArrowBack } from 'react-icons/md';

const AddItems = () => {
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
            <Link
              key={index}
              to={`/add-items/${cat.route}`}
              className="bg-white/80 backdrop-blur-lg w-full max-w-[160px] sm:max-w-[180px] md:max-w-[200px] h-[130px] sm:h-[150px] rounded-3xl p-5 shadow-md hover:shadow-xl hover:bg-white group transition duration-300 transform hover:-translate-y-1 flex flex-col justify-center items-center text-center"
            >
              <div className="text-blue-600 mb-2 group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-800 group-hover:text-blue-700">
                {cat.name}
              </h3>
            </Link>
          ))}
        </div>

        <div className="h-8" />
      </div>
    </div>
  );
};

export default AddItems;

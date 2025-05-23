import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { GiMagnifyingGlass } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { MdArrowBack, MdKeyboardArrowUp } from 'react-icons/md';

const CATEGORY_OPTIONS = [
  'All',
  'Dry Goods',
  'Produce',
  'Dairy',
  'Meat',
  'Bakery',
  'Frozen Foods',
  'Canned Goods',
  'Beverages',
  'Baby Items',
  'Prepared Meals',
  'Snacks',
  'Personal Hygiene',
];

const SORT_OPTIONS = [
  { label: 'Name (A-Z)', value: 'name' },
  { label: 'Quantity (Low → High)', value: 'quantity' },
  { label: 'Expiration (Soonest)', value: 'expirationDate' },
];

const isExpiringSoon = (dateStr) => {
  if (!dateStr) return false;
  const now = new Date();
  const exp = new Date(dateStr);
  const diff = (exp - now) / (1000 * 60 * 60 * 24);
  return diff >= 0 && diff <= 7;
};

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('name');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/foods')
      .then((response) => {
        setItems(Array.isArray(response.data.data) ? response.data.data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filtered = useMemo(() => {
    let data = items;
    if (category !== 'All') {
      data = data.filter((item) => item.category === category);
    }
    if (search.trim()) {
      const term = search.trim().toLowerCase();
      data = data.filter(
        (item) =>
          item.name.toLowerCase().includes(term) ||
          (item.category && item.category.toLowerCase().includes(term))
      );
    }
    if (sort === 'name') {
      data = [...data].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'quantity') {
      data = [...data].sort((a, b) => a.quantity - b.quantity);
    } else if (sort === 'expirationDate') {
      data = [...data].sort((a, b) =>
        new Date(a.expirationDate || 0) - new Date(b.expirationDate || 0)
      );
    }
    return data;
  }, [items, search, category, sort]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-100 z-0" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[90vw] h-[90vw] max-w-[1000px] rounded-full bg-blue-300 opacity-10 blur-3xl z-0" />

      {/* Main Content */}
      <div className="relative z-10 px-4 sm:px-8 pt-10 pb-8 flex flex-col min-h-screen">
        {/* Back Button */}
        <div className="flex justify-start mb-6">
          <Link
            to="/"
            className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow hover:bg-white transition text-blue-700 font-medium text-sm sm:text-base"
          >
            <MdArrowBack className="text-lg sm:text-xl" />
            Dashboard
          </Link>
        </div>
        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 drop-shadow-sm mb-1">
              Full Inventory
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Search, filter, and manage all food bank items.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <input
                type="text"
                className="pl-10 pr-4 py-2 rounded-full bg-white/80 backdrop-blur shadow border border-gray-200 focus:ring-2 focus:ring-blue-200 outline-none transition"
                placeholder="Search by name or category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <GiMagnifyingGlass className="absolute left-3 top-2.5 text-blue-400" size={20} />
            </div>
            <select
              className="rounded-full px-4 py-2 bg-white/80 shadow border border-gray-200 focus:ring-2 focus:ring-blue-200 outline-none transition"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {CATEGORY_OPTIONS.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <select
              className="rounded-full px-4 py-2 bg-white/80 shadow border border-gray-200 focus:ring-2 focus:ring-blue-200 outline-none transition"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
        {/* Table */}
        <div className="overflow-x-auto rounded-3xl shadow-lg bg-white/80 backdrop-blur-lg">
          {loading ? (
            <div className="p-10 text-center text-blue-400 animate-pulse">Loading inventory...</div>
          ) : (
            <table className="min-w-full text-left">
              <thead className="sticky top-0 bg-white/90 z-10">
                <tr>
                  <th className="px-6 py-4 font-semibold text-gray-700">Item Name</th>
                  <th className="px-6 py-4 font-semibold text-gray-700">Category</th>
                  <th className="px-6 py-4 font-semibold text-gray-700">Quantity</th>
                  <th className="px-6 py-4 font-semibold text-gray-700">Expiration Date</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-10 text-center text-gray-400">
                      No items found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((item, idx) => (
                    <tr
                      key={item._id}
                      className={
                        `${idx % 2 === 0 ? 'bg-blue-50/50' : 'bg-white/80'} ` +
                        (isExpiringSoon(item.expirationDate)
                          ? 'bg-amber-100/60'
                          : 'hover:bg-blue-100/70 transition')
                      }
                    >
                      <td className="px-6 py-3 font-medium text-gray-800 border-b border-blue-100">{item.name}</td>
                      <td className="px-6 py-3 text-gray-600 border-b border-blue-100">{item.category}</td>
                      <td className="px-6 py-3 text-gray-600 border-b border-blue-100">{item.quantity}</td>
                      <td className="px-6 py-3 text-gray-600 border-b border-blue-100">
                        {item.expirationDate
                          ? new Date(item.expirationDate).toLocaleDateString()
                          : <span className="text-gray-400">N/A</span>}
                        {isExpiringSoon(item.expirationDate) && (
                          <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-amber-300 text-amber-900 font-semibold">
                            Expiring Soon
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
        {/* Scroll To Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg p-3 transition flex items-center justify-center"
            aria-label="Scroll to top"
          >
            <MdKeyboardArrowUp size={28} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Inventory;

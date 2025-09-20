import React from 'react';
import { Link } from 'react-router-dom';
import {
  MdOutlineAddBox,
  MdOutlineRemoveCircle,
  MdInventory,
  MdUpdate,
  MdSettings,
  MdCalendarToday,
} from 'react-icons/md';

const Home = () => {
  const panels = [
    {
      title: 'Add Items',
      link: '/add-items',
      icon: <MdOutlineAddBox size={40} />,
      desc: 'Register new donations or food stock entries quickly.',
    },
    {
      title: 'Checkout Items',
      link: '/checkout-items',
      icon: <MdOutlineRemoveCircle size={40} />,
      desc: 'Track outgoing inventory to keep records accurate.',
    },
    {
      title: 'Full Inventory List',
      link: '/inventory',
      icon: <MdInventory size={40} />,
      desc: 'View, sort, and manage everything in one place.',
    },
    {
      title: 'Recent Changes',
      link: '/recent-changes',
      icon: <MdUpdate size={40} />,
      desc: 'See the latest updates made to the inventory system.',
    },
    {
      title: 'Calendar',
      link: '/calendar',
      icon: <MdCalendarToday size={40} />,
      desc: 'Visualize item flow and expiration dates by month.',
    },
    {
      title: 'Settings',
      link: '/settings',
      icon: <MdSettings size={40} />,
      desc: 'Adjust preferences and configure system options.',
    },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-y-auto sm:overflow-y-hidden flex flex-col items-center bg-transparent">
      {/* Ambient Gradient Background */}
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-br from-blue-100 via-white to-blue-200 z-0" />
      {/* Radial Glow */}
      <div className="pointer-events-none fixed top-1/3 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] max-w-[1000px] rounded-full bg-blue-300 opacity-10 blur-3xl z-0" />
      
      {/* Content */}
      <div className="relative z-10 w-full px-4 pt-8 pb-16 flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-5xl font-bold text-gray-800 tracking-tight drop-shadow">
            Food Bank Dashboard Center
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Quickly manage and track food inventory and donations
          </p>
        </div>

        {/* Panels */}
        <div className="max-w-5xl w-full mx-auto grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6 p-4">
          {panels.map((panel, idx) => (
            <Link
              to={panel.link}
              key={idx}
              className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:bg-blue-50 transition duration-300 transform hover:-translate-y-1"
            >
              <div className="flex flex-col items-center text-center">
                <div className="text-blue-600 mb-4 transition-transform group-hover:scale-110">
                  {panel.icon}
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 group-hover:text-blue-700">
                  {panel.title}
                </h3>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">{panel.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

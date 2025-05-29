import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  MdArrowBack,
  MdAddCircleOutline,
  MdEdit,
  MdDeleteOutline,
  MdUpdate
} from 'react-icons/md';

const RecentChanges = () => {
  const [changes, setChanges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChanges = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/foods/changes/recent`);
        setChanges(response.data);
      } catch (error) {
        console.error('Error fetching changes:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchChanges();
  }, []);

  const getActionIcon = (actionType) => {
    const iconClass = "text-2xl mr-2";
    switch (actionType) {
      case 'added':
        return <MdAddCircleOutline className={`${iconClass} text-green-500`} />;
      case 'updated':
        return <MdEdit className={`${iconClass} text-blue-500`} />;
      case 'deleted':
        return <MdDeleteOutline className={`${iconClass} text-red-500`} />;
      default:
        return <MdUpdate className={`${iconClass} text-amber-500`} />;
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-purple-100 z-0" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[90vw] h-[90vw] max-w-[1000px] rounded-full bg-purple-200 opacity-10 blur-3xl z-0" />

      {/* Main Content */}
      <div className="relative z-10 px-4 sm:px-8 pt-10 pb-8 flex flex-col min-h-screen">
        {/* Back Button */}
        <div className="flex justify-start mb-6">
          <Link
            to="/"
            className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow hover:bg-white transition text-purple-700 font-medium text-sm sm:text-base"
          >
            <MdArrowBack className="text-lg sm:text-xl" />
            Dashboard
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 drop-shadow-sm">
            Recent Changes
          </h1>
          <p className="mt-2 text-gray-600 text-sm sm:text-base">
            Track inventory modifications and updates
          </p>
        </div>

        {/* Changes List */}
        <div className="max-w-4xl mx-auto w-full">
          {loading ? (
            <div className="text-center text-purple-400 animate-pulse">
              Loading changes...
            </div>
          ) : changes.length === 0 ? (
            <div className="text-center text-gray-400">
              No recent changes found
            </div>
          ) : (
            <div className="space-y-4">
              {changes.map((change, index) => (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-md hover:shadow-lg transition"
                >
                  <div className="flex items-start">
                    {getActionIcon(change.actionType)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {change.itemName}
                        </h3>
                        <span className="text-sm text-gray-500">
                          {formatTimestamp(change.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        <span className="capitalize font-medium">{change.actionType}</span> in {change.category}
                      </p>
                      {change.actionType === 'updated' && change.changes && (
                        <div className="mt-2 text-sm space-y-1">
                          {Object.entries(change.changes).map(([field, values]) => (
                            <div key={field} className="flex items-center text-gray-600">
                              <span className="font-medium w-24 capitalize">{field}:</span>
                              <span className="line-through text-red-400 mr-2">{values.old}</span>
                              <span className="text-green-500">→ {values.new}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {change.actionType === 'deleted' && (
                        <div className="mt-2 text-sm text-gray-600">
                          <span className="font-medium">Previous Quantity:</span> {change.previousQuantity}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentChanges;

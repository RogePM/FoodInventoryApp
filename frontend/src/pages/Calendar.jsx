import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MdArrowBack,
  MdEvent,
  MdAdd,
  MdAssignment,
  MdLocalShipping,
  MdInventory,
  MdChevronLeft,
  MdChevronRight
} from 'react-icons/md';

// Utility functions
const getDaysInMonth = (month, year) =>
  new Date(year, month + 1, 0).getDate();

const getWeekday = (year, month, day) =>
  new Date(year, month, day).getDay();

function getNthWeekdayOfMonth(year, month, weekday, n) {
  let count = 0;
  for (let day = 1; day <= 31; day++) {
    const date = new Date(year, month, day);
    if (date.getMonth() !== month) break;
    if (date.getDay() === weekday) {
      count++;
      if (count === n) return day;
    }
  }
  return null;
}

const recurringEvents = (year, month) => [
  {
    date: getNthWeekdayOfMonth(year, month, 2, 2), // 2nd Tuesday
    title: "Food Truck Delivery",
    icon: <MdLocalShipping className="inline mr-1" />,
    color: "bg-green-100 text-green-700",
    type: "recurring"
  },
  {
    date: getDaysInMonth(month, year), // Last day of month
    title: "Inventory Count",
    icon: <MdInventory className="inline mr-1" />,
    color: "bg-blue-100 text-blue-700",
    type: "recurring"
  }
];

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Calendar = () => {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [events, setEvents] = useState([
    {
      date: `${year}-${String(month + 1).padStart(2, '0')}-15`,
      title: "Volunteer Orientation",
      desc: "New volunteer training at 10am.",
      icon: <MdEvent className="inline mr-1" />,
      color: "bg-purple-100 text-purple-700",
      type: "custom"
    }
  ]);
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [eventTitle, setEventTitle] = useState('');
  const [eventDesc, setEventDesc] = useState('');

  const daysInMonth = getDaysInMonth(month, year);
  const recEvents = recurringEvents(year, month);

  // Gather all events for a given date
  const getEventsForDate = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return [
      ...recEvents.filter(e => e.date === day),
      ...events.filter(e => e.date === dateStr)
    ];
  };

  // Handle day click
  const handleDayClick = (day) => setSelectedDay(day);

  // Calendar navigation
  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
      setSelectedDay(1);
    } else {
      setMonth(month - 1);
      setSelectedDay(1);
    }
  };
  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
      setSelectedDay(1);
    } else {
      setMonth(month + 1);
      setSelectedDay(1);
    }
  };

  // Add a custom event
  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!eventTitle || !selectedDay) return;
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
    setEvents([
      ...events,
      {
        date: dateStr,
        title: eventTitle,
        desc: eventDesc,
        icon: <MdAssignment className="inline mr-1" />,
        color: "bg-yellow-100 text-yellow-700",
        type: "custom"
      }
    ]);
    setEventTitle('');
    setEventDesc('');
  };

  // First day of the month (0=Sunday)
  const firstDay = getWeekday(year, month, 1);

  // Events for the selected day
  const selectedEvents = getEventsForDate(selectedDay);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-100 z-0" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[90vw] h-[90vw] max-w-[1000px] rounded-full bg-blue-300 opacity-10 blur-3xl z-0" />

      {/* Main Content: Flex container for calendar and event box */}
      <div className="relative z-10 px-2 sm:px-8 pt-10 pb-8 flex flex-col items-center justify-center min-h-screen">
        {/* Back Button */}
        <div className="w-full flex justify-start mb-10">
          <Link
            to="/"
            className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-5 py-2 rounded-full shadow hover:bg-blue-50 transition text-blue-700 font-semibold text-base border border-blue-100"
            style={{ minWidth: 160 }}
          >
            <MdArrowBack className="text-xl" />
            Dashboard
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-8 w-full max-w-5xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 drop-shadow-sm">
            Calendar
          </h1>
          <p className="mt-2 text-gray-600 text-sm sm:text-base">
            Track food bank events, recurring deliveries, and tasks.
          </p>
        </div>
        {/* Side by side cards */}
        <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl items-stretch justify-center">
          {/* Calendar Card */}
          <div className="flex-1 flex flex-col bg-white/80 backdrop-blur rounded-3xl shadow-lg p-6 border border-blue-100 min-w-[320px] max-w-[520px]">
            {/* Calendar Controls */}
            <div className="flex items-center justify-center gap-6 mb-6">
              <button onClick={prevMonth} className="text-blue-600 hover:text-blue-800 text-2xl font-bold px-2">
                <MdChevronLeft />
              </button>
              <div className="text-xl font-semibold text-gray-700">
                {new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' })}
              </div>
              <button onClick={nextMonth} className="text-blue-600 hover:text-blue-800 text-2xl font-bold px-2">
                <MdChevronRight />
              </button>
            </div>
            {/* Calendar Grid */}
            <div className="">
              <div className="grid grid-cols-7 text-center mb-2">
                {weekDays.map((wd) => (
                  <div key={wd} className="font-semibold text-blue-800 py-1">{wd}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {[...Array(firstDay)].map((_, idx) => (
                  <div key={`empty-${idx}`} />
                ))}
                {Array.from({ length: daysInMonth }, (_, i) => {
                  const day = i + 1;
                  const isToday = (day === today.getDate() && month === today.getMonth() && year === today.getFullYear());
                  const dayEvents = getEventsForDate(day);
                  return (
                    <div
                      key={day}
                      className={`relative rounded-lg p-1 min-h-[70px] border transition cursor-pointer
                        ${isToday ? "border-blue-400 bg-blue-100/70" : "border-transparent hover:bg-blue-50/60"}
                        ${day === selectedDay ? "ring-2 ring-blue-500" : ""}
                      `}
                      onClick={() => handleDayClick(day)}
                      title="View/Add events"
                    >
                      <div className="text-gray-700 font-semibold">{day}</div>
                      <div className="space-y-1 mt-1">
                        {dayEvents.map((ev, idx) => (
                          <div
                            key={idx}
                            className={`flex items-center rounded px-1 py-0.5 text-xs ${ev.color} mb-0.5`}
                          >
                            {ev.icon}
                            <span className="truncate">{ev.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Legend */}
            <div className="mt-6 flex flex-wrap gap-4 justify-center text-sm">
              <div className="flex items-center gap-2">
                <MdLocalShipping className="text-green-600" /> Food Truck Delivery (2nd Tuesday)
              </div>
              <div className="flex items-center gap-2">
                <MdInventory className="text-blue-600" /> Inventory Count (Last Day)
              </div>
              <div className="flex items-center gap-2">
                <MdAssignment className="text-yellow-600" /> Custom Task/Event
              </div>
            </div>
          </div>
          {/* Event Card */}
          <div className="flex-1 flex flex-col bg-white/80 backdrop-blur-lg shadow-lg rounded-3xl p-6 border border-blue-100 min-w-[320px] max-w-[520px]">
            {/* Control Bar */}
            <div className="flex items-center mb-4">
              <span className="font-bold text-blue-700 text-lg flex-1">Events for</span>
              <span className="text-gray-700 font-semibold">{`${year}-${String(month + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`}</span>
            </div>
            {/* Event List */}
            <div className="flex-1 overflow-y-auto mb-4 min-h-[100px]">
              {selectedEvents.length === 0 ? (
                <div className="text-gray-400 text-center py-8">No events for this day.</div>
              ) : (
                <ul className="space-y-3">
                  {selectedEvents.map((ev, idx) => (
                    <li key={idx} className={`flex items-start gap-2 rounded-lg px-3 py-2 ${ev.color}`}>
                      {ev.icon}
                      <div>
                        <div className="font-semibold">{ev.title}</div>
                        {ev.desc && <div className="text-xs text-gray-600">{ev.desc}</div>}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {/* Add Event Form */}
            <form onSubmit={handleAddEvent} className="border-t pt-4 mt-4">
              <div className="flex items-center gap-2 mb-2">
                <MdAdd className="text-blue-500 text-xl" />
                <input
                  className="flex-1 px-2 py-1 rounded border border-gray-200 focus:ring-blue-200 text-sm"
                  placeholder="New event/task"
                  value={eventTitle}
                  onChange={e => setEventTitle(e.target.value)}
                  required
                />
              </div>
              <textarea
                className="w-full px-2 py-1 rounded border border-gray-200 focus:ring-blue-200 text-sm mb-2"
                placeholder="Description (optional)"
                value={eventDesc}
                onChange={e => setEventDesc(e.target.value)}
                rows={2}
              />
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-1.5 rounded font-semibold transition text-sm"
              >
                Add Event
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;

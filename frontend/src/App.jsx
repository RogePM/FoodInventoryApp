import React from 'react'
import { Route, Routes } from 'react-router-dom'


import Home from './pages/Home'
import AddItems from './pages/addItems'
import CheckoutItems from './pages/CheckoutItems'
import Inventory from './pages/Inventory'
import RecentChanges from './pages/RecentChanges'
import Settings from './pages/Settings'
import Calendar from './pages/Calendar'


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/add-items" element={<AddItems />} />
      <Route path="/checkout-items" element={<CheckoutItems />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/recent-changes" element={<RecentChanges />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/calendar" element={<Calendar />} />
    </Routes>
  )
}

export default App

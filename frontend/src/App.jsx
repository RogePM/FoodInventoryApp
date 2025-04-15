import React from 'react'
import { Route, Routes } from 'react-router-dom'


import Home from './pages/Home'
import AddItems from './pages/addItems'
import CheckoutItems from './pages/CheckoutItems'
import Inventory from './pages/Inventory'
import RecentChanges from './pages/RecentChanges'
import Settings from './pages/Settings'
import Calendar from './pages/Calendar'
import DryGoodsPanel from './pages/DryGoodsPanel';
import AddDryGoodsForm from './pages/AddDryGoodsForm';
import CheckoutDryGoodsPanel from './pages/CheckoutDryGoodsPanel';
import CheckoutDryGoodsForm from './pages/CheckoutDryGoodsForm';

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
      <Route path="/add-items">
        <Route index element={<AddItems />} /> {/* Handles /add-items */}
        <Route path="dry-goods" element={<DryGoodsPanel />} />
        <Route path="dry-goods/form" element={<AddDryGoodsForm />} />
      </Route>
      <Route path="/checkout-items">
        <Route index element={<CheckoutItems />} />
        <Route path="dry-goods" element={<CheckoutDryGoodsPanel />} />
        <Route path="dry-goods/form" element={<CheckoutDryGoodsForm />} />
        
      </Route>
    </Routes>
  )
}

export default App

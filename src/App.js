import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Material from './components/Material'
import User from './components/User'
import PublicRoute from './config/PublicRoute'
import PrivateRoute from './config/PrivateRoute'
import Warehouse from './components/Warehouse'
import Transaksi from './components/Transaksi'
import Profile from './components/Profile'
function App() {
  return (
    <Routes>
      <Route element={<PublicRoute/>}>
      <Route path="/login" element={<Login />} />
      </Route>
      <Route element={<PrivateRoute/>}>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/material" element={<Material />} />
      <Route exact path="/warehouse" element={<Warehouse />} />
      <Route exact path="/transaksi" element={<Transaksi />} />
      <Route exact path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  )
}
export default App
// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

// Public Pages
import Home from './pages/Home/Index';
import Demo from './pages/Demo/Index';
import About from './pages/About/Index';
import Auth from './pages/Auth/Index';

// Dashboard Shell

// Dashboard Sub-Pages
// Corrected imports based on you file tree image

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES (With Header/Footer) */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/about" element={<About />} />
          <Route path="/auth" element={<Auth />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

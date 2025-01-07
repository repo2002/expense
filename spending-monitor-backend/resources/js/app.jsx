import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Login from './components/Login';
import Navbar from './components/Navbar';

const container = document.getElementById('app');
const root = createRoot(container);

root.render(
    <>
        
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
            
        </BrowserRouter>
    </>
);
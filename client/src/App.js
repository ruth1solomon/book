import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppointmentForm from './AppointmentForm';
import Dashboard from './Dashboard';
import DoneAppointmentsPage from './DoneAppointmentsPage';
import CalendarPage from './CalendarPage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import HomePage from './HomePage';

function App() {
  return (
    <div className='bg-rose-50'>
    <BrowserRouter>
      <Routes >
        <Route path="/" element={<HomePage />} />
        <Route path="/book" element={<AppointmentForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/done" element={<DoneAppointmentsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

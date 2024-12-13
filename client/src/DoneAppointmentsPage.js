import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import butterfly from './Images/Butterfly1.png';

const DoneAppointmentsPage = () => {
  const [groupedAppointments, setGroupedAppointments] = useState({});
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    const fetchDoneAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/appointments/done');
        const appointments = response.data;

         // Group appointments by name or phone
      const grouped = appointments.reduce((acc, appointment) => {
        const existingKey = Object.keys(acc).find(
          (key) =>
            key.includes(appointment.fullName) || key.includes(appointment.phoneNumber)
        );

        if (existingKey) {
          acc[existingKey].push(appointment);
        } else {
          const key = `${appointment.fullName} (${appointment.phoneNumber})`;
          acc[key] = [appointment];
        }

        return acc;
      }, {});

      setGroupedAppointments(grouped);
    } catch (error) {
      console.error('Error fetching done appointments:', error);
    }
  };
  fetchDoneAppointments();
}, []);

  // Calculate stars for a customer
  const calculateStars = (count) => {
    if (count >= 25) return 5;
    if (count >= 20) return 4;
    if (count >= 15) return 3;
    if (count >= 10) return 2;
    if (count >= 5) return 1;
    return 0;
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6 ">
        <h2 className="text-3xl font-bold mb-6 text-center text-brown-800">Completed Appointments</h2>
        <div className="shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full bg-white ">
            <thead>
              <tr className="bg-pink-600 text-white text-md font-semibold text-left">
                <th className="p-4">Customer</th>
                <th className="p-4">Total Appointments</th>
                <th className="p-4">Stars</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(groupedAppointments).length > 0 ? (
                Object.entries(groupedAppointments).map(([customer, appointments]) => (
                  <tr key={customer} className="hover:bg-gray-100 border-b">
                    <td className="p-4">{customer}</td>
                    <td className="p-4">{appointments.length}</td>
                    <td className="p-4">
                      {'⭐'.repeat(calculateStars(appointments.length))}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => setSelectedCustomer({ customer, appointments })}
                        className="bg-pink-500 text-white px-4 py-2 rounded"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-4 text-center">
                    No completed appointments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal to display selected customer's appointments */}
        {selectedCustomer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white w-full max-w-3xl p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-pink-500">
                Appointments for {selectedCustomer.customer}
              </h3>
              <table className="min-w-full bg-gray-100">
                <thead>
                  <tr className="bg-gray-300 text-gray-700 text-md font-semibold text-left">
                    <th className="p-4">Service</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Time</th>
                    <th className="p-4">Payment</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedCustomer.appointments.map((appointment) => (
                    <tr key={appointment._id} className="hover:bg-gray-200 border-b">
                      <td className="p-4">{appointment.service}</td>
                      <td className="p-4">{new Date(appointment.date).toLocaleDateString()}</td>
                      <td className="p-4">{appointment.time}</td>
                      <td className="p-4">{appointment.payment}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="bg-red-600 text-white px-4 py-2 rounded mt-4"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="flex">
   <img
    src={butterfly}
    alt="Butterfly"
    className="w-full max-w-md h-auto ml-auto"
  />
</div>
    </div>
  );
};

export default DoneAppointmentsPage;


/*import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import butterfly from './Images/dd.png';

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
              <tr className="bg-soft-pink text-black text-md font-semibold text-left">
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
                        className="bg-burgendy text-white px-4 py-2 rounded"
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

        
        {selectedCustomer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white w-full max-w-3xl p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-black">
                Appointments for {selectedCustomer.customer}
              </h3>
              <table className="min-w-full bg-gray-100">
                <thead>
                  <tr className="bg-soft-pink text-black text-md font-semibold text-left">
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

export default DoneAppointmentsPage;*/
import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

import { Search } from 'lucide-react'; 
import axios from 'axios';
import Navbar from './Navbar';
import butterfly from './Images/dd.png';

const DoneAppointmentsPage = () => {
  const [groupedAppointments, setGroupedAppointments] = useState({});
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchDoneAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/appointments/done');
        const appointments = response.data;

        const grouped = appointments.reduce((acc, appointment) => {
          const key = `${appointment.fullName} (${appointment.phoneNumber})`;
          if (!acc[key]) acc[key] = { appointments: [], totalPayment: 0 };
          acc[key].appointments.push(appointment);
          acc[key].totalPayment += parseFloat(appointment.payment) || 0;
          return acc;
        }, {});
        
        setGroupedAppointments(grouped);
      } catch (error) {
        console.error('Error fetching done appointments:', error);
      }
    };

    fetchDoneAppointments();
  }, []);

  const calculateStars = (payment) => {
    if (payment >= 150000) return 5;
    if (payment >= 110000) return 4;
    if (payment >= 90000) return 3;
    if (payment >= 70000) return 2;
    if (payment >= 50000) return 1;
    return 0;
  };

  const filteredAppointments = Object.entries(groupedAppointments).filter(([customer]) =>
    customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold mb-2 text-center text-brown-800">Completed Appointments</h2>

        {/* Search Bar */}
        
        <div className="flex justify-end mb-4 ">
  <div className="flex items-center border border-gray-400 rounded bg-white px-2 w-80 focus-within:ring-2 focus-within:ring-gray-600">
    <Search className="w-5 h-5 text-gray-500 mr-2 " />
    <input
      type="text"
      placeholder="Search by customer name or phone..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full py-2 focus:outline-none"
    />
  </div>
</div>



        <div className="shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-soft-pink text-black text-md font-semibold text-left">
                <th className="p-4">Customer</th>
                <th className="p-4">Total Appointments</th>
                <th className="p-4">Total Payment</th>
                <th className="p-4">Stars</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map(([customer, { appointments, totalPayment }]) => (
                  <tr key={customer} className="hover:bg-gray-100 border-b">
                    <td className="p-4">{customer}</td>
                    <td className="p-4">{appointments.length}</td>
                    <td className="p-4">{totalPayment.toLocaleString()} ETB</td>
                    <td className="p-4">
                      {'⭐'.repeat(calculateStars(totalPayment))}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => setSelectedCustomer({ customer, appointments })}
                        className="bg-burgendy text-white px-4 py-2 rounded"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-4 text-center">
                    No completed appointments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {selectedCustomer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white w-full max-w-3xl p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-black">
                Appointments for {selectedCustomer.customer}
              </h3>
              <table className="min-w-full bg-gray-100">
                <thead>
                  <tr className="bg-soft-pink text-black text-md font-semibold text-left">
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
                className="bg-red-800 text-white px-4 py-2 rounded mt-4"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

     
      {/* Payment Bar Chart */}
{filteredAppointments.length > 0 && (
  <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-xl font-semibold mb-4 text-center">Total Payment by Customer</h3>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={filteredAppointments.map(([customer, { totalPayment }]) => ({
          name: customer,
          payment: totalPayment,
        }))}
        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} angle={-25} textAnchor="end" interval={0} height={80} />
        <YAxis />
        <Tooltip />
        <Bar dataKey="payment" fill="#A52A2A" />
      </BarChart>
    </ResponsiveContainer>
  </div>
)}
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



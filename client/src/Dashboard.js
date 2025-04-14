
/*import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditAppointmentModal from './EditAppointmentModal';
import Navbar from './Navbar';
import butterfly from './Images/dd.png';

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);
  
  const [alert, setAlert] = useState({
    message: '',
    type: '', // 'success' or 'error'
    action: '', // 'cancel' or 'done'
  });


// Fetch appointments on component mount
useEffect(() => {
  const fetchAppointments = async () => {
    const response = await axios.get('http://localhost:5000/api/appointments');

    // Sort appointments by the nearest date (earlier dates come first)
    const sortedAppointments = response.data.sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateA - dateB; // Change to ascending order
    });

    setAppointments(sortedAppointments);
  };

  fetchAppointments();
}, []);



  // Handle showing success message
  const showSuccessMessage = (message, action) => {
    setAlert({
      message,
      type: 'success',
      action,
    });
    setTimeout(() => {
      setAlert({ message: '', type: '', action: '' }); // Clear message after 3 seconds
    }, 3000);
  };

  // Mark appointment as done
  const handleMarkAsDone = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/appointments/${id}/done`);
      // Update the status of the marked appointment and remove it from the dashboard list
      setAppointments(appointments.filter(appointment =>
        appointment._id !== id
      ));
      showSuccessMessage('Appointment marked as done!', 'done');
    } catch (error) {
      console.error('Error marking as done', error);
    }
  };

  // Delete an appointment with confirmation
  const handleDelete = async (id) => {
    const confirmCancel = window.confirm(
      'Are you sure you want to cancel this appointment? This action cannot be undone.'
    );

    if (!confirmCancel) {
      return; // Exit the function if the user cancels the action
    }

    try {
      await axios.delete(`http://localhost:5000/api/appointments/${id}`);
      setAppointments(appointments.filter(appointment => appointment._id !== id));
      showSuccessMessage('Appointment canceled successfully!', 'cancel');
    } catch (error) {
      console.error('Error deleting appointment', error);
    }
  };

  // Open modal and set current appointment to be edited
  const handleEditClick = (appointment) => {
    setCurrentAppointment(appointment);  // Set the current appointment for editing
    setShowEditModal(true);  // Show the edit modal
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6 bg-soft-coral ">
        <h2 className="text-3xl font-bold mb-6 text-center text-brown-800">Dashboard - Appointments</h2>
        
        
        {alert.message && (
          <div className={`fixed top-5 left-1/2 transform -translate-x-1/2 w-full max-w-md p-4 mb-4 rounded-lg shadow-lg transition-all duration-500
            ${alert.action === 'cancel' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">
                {alert.action === 'cancel' ? '❌' : '😊'}
              </span>
              <span>{alert.message}</span>
            </div>
          </div>
        )}
      <div className=' shadow-md rounded-lg overflow-hidden'>
        <table className="table-auto w-full bg-white rounded-xl">
          <thead>
            <tr className='bg-soft-pink text-black text-md font-semibold '>
              <th className="p-4">Full Name</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Service</th>
              <th className="p-4">Date</th>
              <th className="p-4">Time</th>
              <th className="p-4">Payment</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(appointment => (
              <tr key={appointment._id} className="text-center text-black  hover:bg-gray-100 border-b">
                <td className="p-4">{appointment.fullName}</td>
                <td className="p-4">{appointment.phoneNumber}</td>
                <td className="p-4">{appointment.service}</td>
                <td className="p-4">{new Date(appointment.date).toLocaleDateString()}</td>
                <td className="p-4">{appointment.time}</td>
                <td className="p-4">{appointment.payment}</td>
                <td className="p-4">{appointment.status}</td>
                <td className="p-4">
                  <button 
                    className="bg-green-700 hover:bg-green-500 text-white p-1 rounded mx-2 my-1"
                    onClick={() => handleMarkAsDone(appointment._id)}
                  >
                    Done
                  </button>
                  <button
                    className="bg-blue-700 hover:bg-blue-500 text-white p-1 rounded mx-2 my-1"
                    onClick={() => handleEditClick(appointment)}
                  >
                    Edit
                  </button>
                  <button 
                    className="bg-red-700 hover:bg-red-500 text-white p-1 rounded mx-2 my-1"
                    onClick={() => handleDelete(appointment._id)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        
        {currentAppointment && (
          <EditAppointmentModal
            currentAppointment={currentAppointment}
            showEditModal={showEditModal}
            setShowEditModal={setShowEditModal}
            fetchAppointments={() => {
              const fetchAppointments = async () => {
                const response = await axios.get('http://localhost:5000/api/appointments');
                setAppointments(response.data);
              };
              fetchAppointments();
            }}
          />
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

export default Dashboard;*/

/*import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditAppointmentModal from './EditAppointmentModal';
import Navbar from './Navbar';
import butterfly from './Images/dd.png';

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);
  
  const [alert, setAlert] = useState({
    message: '',
    type: '', // 'success' or 'error'
    action: '', // 'cancel' or 'done'
  });

  // Fetch appointments on component mount
  useEffect(() => {
    const fetchAppointments = async () => {
      const response = await axios.get('http://localhost:5000/api/appointments');

      // Sort appointments by the nearest date (earlier dates come first)
      
      const sortedAppointments = response.data.sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateA - dateB; // Change to ascending order
      });
      setAppointments(sortedAppointments);
    };

    fetchAppointments();
  }, []);

  // Handle showing success message
  const showSuccessMessage = (message, action) => {
    setAlert({
      message,
      type: 'success',
      action,
    });
    setTimeout(() => {
      setAlert({ message: '', type: '', action: '' }); // Clear message after 3 seconds
    }, 3000);
  };

  // Mark appointment as done
  const handleMarkAsDone = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/appointments/${id}/done`);
      // Update the status of the marked appointment and remove it from the dashboard list
      setAppointments(appointments.filter(appointment => appointment._id !== id));
      showSuccessMessage('Appointment marked as done!', 'done');
    } catch (error) {
      console.error('Error marking as done', error);
    }
  };

  // Delete an appointment with confirmation
  const handleDelete = async (id) => {
    const confirmCancel = window.confirm(
      'Are you sure you want to cancel this appointment? This action cannot be undone.'
    );

    if (!confirmCancel) {
      return; // Exit the function if the user cancels the action
    }

    try {
      await axios.delete(`http://localhost:5000/api/appointments/${id}`);
      setAppointments(appointments.filter(appointment => appointment._id !== id));
      showSuccessMessage('Appointment canceled successfully!', 'cancel');
    } catch (error) {
      console.error('Error deleting appointment', error);
    }
  };

  // Open modal and set current appointment to be edited
  const handleEditClick = (appointment) => {
    setCurrentAppointment(appointment);  // Set the current appointment for editing
    setShowEditModal(true);  // Show the edit modal
  };

  

  const calculateRemainingBalance = (appointment) => {
    const totalPayment = parseFloat(appointment.payment) || 0;
    const discount = parseFloat(appointment.discount) || 0;
    const paidAmount = parseFloat(appointment.paidAmount) || 0;
  
    const discountedTotal = totalPayment - (totalPayment * discount) / 100;
    const remainingBalance = discountedTotal - paidAmount;
  
    return isNaN(remainingBalance) ? '0.00' : remainingBalance.toFixed(2);
  };
  

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6 bg-soft-coral ">
        <h2 className="text-3xl font-bold mb-6 text-center text-brown-800">Dashboard - Appointments</h2>
        
        
        {alert.message && (
          <div className={`fixed top-5 left-1/2 transform -translate-x-1/2 w-full max-w-md p-4 mb-4 rounded-lg shadow-lg transition-all duration-500
            ${alert.action === 'cancel' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">
                {alert.action === 'cancel' ? '❌' : '😊'}
              </span>
              <span>{alert.message}</span>
            </div>
          </div>
        )}
        
        <div className='shadow-md rounded-lg overflow-hidden'>
          <table className="table-auto w-full bg-white rounded-xl">
            <thead>
              <tr className='bg-soft-pink text-black text-md font-semibold '>
                <th className="p-4">Full Name</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Service</th>
                <th className="p-4">Date</th>
                <th className="p-4">Time</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Discount (%)</th> 
                <th className="p-4">Paid</th>
                <th className="p-4">Remaining</th> 
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(appointment => (
                <tr key={appointment._id} className="text-center text-black hover:bg-gray-100 border-b">
                  <td className="p-4">{appointment.fullName}</td>
                  <td className="p-4">{appointment.phoneNumber}</td>
                  <td className="p-4">{appointment.service}</td>
                  <td className="p-4">{new Date(appointment.date).toLocaleDateString()}</td>
                  <td className="p-4">{appointment.time}</td>
                  <td className="p-4">{appointment.payment}</td>
                  <td className="p-4 text-green-600 font-bold">
                     {appointment.discount}%
                  </td>
                  <td className="p-4">{appointment.paidAmount}</td>
                  <td className="p-4">${calculateRemainingBalance(appointment)}</td> 
                  <td className="p-4">{appointment.status}</td>
                  <td className="p-4">
                    <button 
                      className="bg-green-700 hover:bg-green-500 text-white p-1 rounded mx-2 my-1"
                      onClick={() => handleMarkAsDone(appointment._id)}
                    >
                      Done
                    </button>
                    <button
                      className="bg-blue-700 hover:bg-blue-500 text-white p-1 rounded mx-2 my-1"
                      onClick={() => handleEditClick(appointment)}
                    >
                      Edit
                    </button>
                    <button 
                      className="bg-red-700 hover:bg-red-500 text-white p-1 rounded mx-2 my-1"
                      onClick={() => handleDelete(appointment._id)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        
        {currentAppointment && (
          <EditAppointmentModal
            currentAppointment={currentAppointment}
            showEditModal={showEditModal}
            setShowEditModal={setShowEditModal}
            fetchAppointments={() => {
              const fetchAppointments = async () => {
                const response = await axios.get('http://localhost:5000/api/appointments');
                setAppointments(response.data);
              };
              fetchAppointments();
            }}
          />
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

export default Dashboard;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditAppointmentModal from './EditAppointmentModal';
import Navbar from './Navbar';
import { FaCheck, FaTimes, FaPen, FaBell } from 'react-icons/fa';
import butterfly from './Images/dd.png';

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState(3);

  const [alert, setAlert] = useState({
    message: '',
    type: '',
    action: '',
  });

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/appointments');
        const sortedAppointments = response.data.sort((a, b) => 
          new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`)
        );
        setAppointments(sortedAppointments);
        setFilteredAppointments(sortedAppointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = appointments.filter(
      (appointment) =>
        appointment.fullName.toLowerCase().includes(query) ||
        appointment.phoneNumber.includes(query)
    );
    setFilteredAppointments(filtered);
  };

  const showSuccessMessage = (message, action) => {
    setAlert({ message, type: 'success', action });
    setTimeout(() => setAlert({ message: '', type: '', action: '' }), 3000);
  };

  const handleMarkAsDone = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/appointments/${id}/done`);
      setAppointments(appointments.filter((appointment) => appointment._id !== id));
      setFilteredAppointments(filteredAppointments.filter((appointment) => appointment._id !== id));
      showSuccessMessage('Appointment marked as done!', 'done');
    } catch (error) {
      console.error('Error marking as done', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/appointments/${id}`);
      setAppointments(appointments.filter((appointment) => appointment._id !== id));
      setFilteredAppointments(filteredAppointments.filter((appointment) => appointment._id !== id));
      showSuccessMessage('Appointment canceled successfully!', 'cancel');
    } catch (error) {
      console.error('Error deleting appointment', error);
    }
  };

  const handleEditClick = (appointment) => {
    setCurrentAppointment(appointment);
    setShowEditModal(true);
  };

  const calculateRemainingBalance = (appointment) => {
    const totalPayment = parseFloat(appointment.payment) || 0;
    const discount = parseFloat(appointment.discount) || 0;
    const paidAmount = parseFloat(appointment.paidAmount) || 0;
    const discountedTotal = totalPayment - (totalPayment * discount) / 100;
    const remainingBalance = discountedTotal - paidAmount;
    return isNaN(remainingBalance) ? '0.00' : remainingBalance.toFixed(2);
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6 bg-soft-coral">
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-brown-800">Dashboard - Appointments</h2>

          
          <div className="flex items-center space-x-4">
           
            <div className="relative">
              <FaBell className="text-2xl text-gray-700 cursor-pointer" />
              {notifications > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2">
                  {notifications}
                </span>
              )}
            </div>

            
            <input
              type="text"
              placeholder="Search by name or phone..."
              value={searchQuery}
              onChange={handleSearch}
              className="p-2 border rounded-lg text-lg"
            />
          </div>
        </div>

        {alert.message && (
          <div
            className={`fixed top-5 left-1/2 transform -translate-x-1/2 w-full max-w-md p-4 mb-4 rounded-lg shadow-lg transition-all duration-500 ${
              alert.action === 'cancel' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{alert.action === 'cancel' ? '❌' : '😊'}</span>
              <span>{alert.message}</span>
            </div>
          </div>
        )}

        <div className="shadow-md rounded-lg overflow-hidden">
          <table className="table-auto w-full bg-white rounded-xl">
            <thead>
              <tr className="bg-soft-pink text-black text-md font-semibold">
                <th className="p-4">Full Name</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Service</th>
                <th className="p-4">Date</th>
                <th className="p-4">Time</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Discount (%)</th>
                <th className="p-4">Paid</th>
                <th className="p-4">Remaining</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appointment) => (
                <tr key={appointment._id} className="text-center text-black hover:bg-gray-100 border-b">
                  <td className="p-4">{appointment.fullName}</td>
                  <td className="p-4">{appointment.phoneNumber}</td>
                  <td className="p-4">{appointment.service}</td>
                  <td className="p-4">{new Date(appointment.date).toLocaleDateString()}</td>
                  <td className="p-4">{appointment.time}</td>
                  <td className="p-4">{appointment.payment}</td>
                  <td className="p-4 text-green-600 font-bold">{appointment.discount}%</td>
                  <td className="p-4">{appointment.paidAmount}</td>
                  <td className="p-4">${calculateRemainingBalance(appointment)}</td>
                  <td className="p-4">{appointment.status}</td>
                  <td className="p-2 flex justify-center space-x-1">
                    <button className="bg-green-600 hover:bg-green-500 text-white p-2 rounded-lg" onClick={() => handleMarkAsDone(appointment._id)}>
                      <FaCheck />
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-lg" onClick={() => handleEditClick(appointment)}>
                      <FaPen />
                    </button>
                    <button className="bg-red-600 hover:bg-red-500 text-white p-2 rounded-lg" onClick={() => handleDelete(appointment._id)}>
                      <FaTimes size={20}/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {currentAppointment && (
          <EditAppointmentModal
            currentAppointment={currentAppointment}
            showEditModal={showEditModal}
            setShowEditModal={setShowEditModal}
          />
        )}
      </div>

      <div className="flex">
        <img src={butterfly} alt="Butterfly" className="w-full max-w-md h-auto ml-auto" />
      </div>
    </div>
  );
};

export default Dashboard;*/
/*import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditAppointmentModal from './EditAppointmentModal';
import Navbar from './Navbar';
import { FaCheck, FaTimes, FaPen, FaBell } from 'react-icons/fa';
import butterfly from './Images/dd.png';

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/appointments');
        const sortedAppointments = response.data.sort((a, b) => 
          new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`)
        );
        setAppointments(sortedAppointments);
        setFilteredAppointments(sortedAppointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = appointments.filter(
      (appointment) =>
        appointment.fullName.toLowerCase().includes(query) ||
        appointment.phoneNumber.includes(query)
    );
    setFilteredAppointments(filtered);
  };

  const addNotification = (message) => {
    setNotifications((prev) => [...prev, message]);
  };

  const handleMarkAsDone = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/appointments/${id}/done`);
      const updatedAppointments = appointments.filter((appointment) => appointment._id !== id);
      setAppointments(updatedAppointments);
      setFilteredAppointments(updatedAppointments);

      const doneAppointment = appointments.find((a) => a._id === id);
      if (doneAppointment) {
        addNotification(`${doneAppointment.fullName}'s appointment was marked as done.`);
      }
    } catch (error) {
      console.error('Error marking as done', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/appointments/${id}`);
      const updatedAppointments = appointments.filter((appointment) => appointment._id !== id);
      setAppointments(updatedAppointments);
      setFilteredAppointments(updatedAppointments);

      const deletedAppointment = appointments.find((a) => a._id === id);
      if (deletedAppointment) {
        addNotification(`${deletedAppointment.fullName}'s appointment was canceled.`);
      }
    } catch (error) {
      console.error('Error deleting appointment', error);
    }
  };

  const handleEditComplete = (updatedAppointment) => {
    const oldAppointment = appointments.find(a => a._id === updatedAppointment._id);
    if (!oldAppointment) return;

    const changes = [];
    if (oldAppointment.payment !== updatedAppointment.payment) {
      changes.push(`Payment was updated to $${updatedAppointment.payment}`);
    }
    if (oldAppointment.service !== updatedAppointment.service) {
      changes.push(`Service changed to ${updatedAppointment.service}`);
    }
    if (oldAppointment.time !== updatedAppointment.time) {
      changes.push(`Time updated to ${updatedAppointment.time}`);
    }

    if (changes.length > 0) {
      addNotification(`${updatedAppointment.fullName}'s appointment: ${changes.join(', ')}`);
    }

    setAppointments(
      appointments.map((appointment) =>
        appointment._id === updatedAppointment._id ? updatedAppointment : appointment
      )
    );
    setFilteredAppointments(
      filteredAppointments.map((appointment) =>
        appointment._id === updatedAppointment._id ? updatedAppointment : appointment
      )
    );
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6 bg-soft-coral">
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-brown-800">Dashboard - Appointments</h2>

          
          <div className="flex items-center space-x-4 relative">
            
            <div className="relative cursor-pointer" onClick={() => setShowNotifications(!showNotifications)}>
              <FaBell className="text-2xl text-gray-700" />
              {notifications.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2">
                  {notifications.length}
                </span>
              )}
            </div>

            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-64 bg-white border shadow-lg rounded-lg z-10">
                <div className="p-2 text-gray-800 font-semibold border-b">Notifications</div>
                {notifications.length > 0 ? (
                  notifications.map((note, index) => (
                    <div key={index} className="p-2 border-b text-gray-700">
                      {note}
                    </div>
                  ))
                ) : (
                  <div className="p-2 text-gray-500">No new notifications</div>
                )}
                <button
                  className="w-full p-2 bg-red-600 text-white rounded-b-lg hover:bg-red-500"
                  onClick={() => setNotifications([])}
                >
                  Clear All
                </button>
              </div>
            )}

            
            <input
              type="text"
              placeholder="Search by name or phone..."
              value={searchQuery}
              onChange={handleSearch}
              className="p-2 border rounded-lg text-lg"
            />
          </div>
        </div>

        
        <div className="shadow-md rounded-lg overflow-hidden">
          <table className="table-auto w-full bg-white rounded-xl">
            <thead>
              <tr className="bg-soft-pink text-black text-md font-semibold">
                <th className="p-2">Full Name</th>
                <th className="p-2">Phone</th>
                <th className="p-2">Service</th>
                <th className="p-2">Date</th>
                <th className="p-2">Time</th>
                <th className="p-2">Payment</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appointment) => (
                <tr key={appointment._id} className="text-center text-black hover:bg-gray-100 border-b">
                  <td className="p-2">{appointment.fullName}</td>
                  <td className="p-2">{appointment.phoneNumber}</td>
                  <td className="p-2">{appointment.service}</td>
                  <td className="p-2">{new Date(appointment.date).toLocaleDateString()}</td>
                  <td className="p-2">{appointment.time}</td>
                  <td className="p-2">{appointment.payment}</td>
                  <td className="p-2 flex justify-center space-x-1">
                    <button className="bg-green-600 text-white p-2 rounded-lg" onClick={() => handleMarkAsDone(appointment._id)}>
                      <FaCheck />
                    </button>
                    <button className="bg-blue-600 text-white p-2 rounded-lg" onClick={() => setCurrentAppointment(appointment)}>
                      <FaPen />
                    </button>
                    <button className="bg-red-600 text-white p-2 rounded-lg" onClick={() => handleDelete(appointment._id)}>
                      <FaTimes />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {currentAppointment && (
          <EditAppointmentModal currentAppointment={currentAppointment} setShowEditModal={setShowEditModal} onEditComplete={handleEditComplete} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;*/

/*import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditAppointmentModal from './EditAppointmentModal';
import Navbar from './Navbar';
import { FaCheck, FaTimes, FaPen, FaBell } from 'react-icons/fa';
import butterfly from './Images/dd.png';

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/appointments');
        const sortedAppointments = response.data.sort((a, b) => 
          new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`)
        );
        setAppointments(sortedAppointments);
        setFilteredAppointments(sortedAppointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);





  
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = appointments.filter(
      (appointment) =>
        appointment.fullName.toLowerCase().includes(query) ||
        appointment.phoneNumber.includes(query)
    );
    setFilteredAppointments(filtered);
  };

  const addNotification = (message) => {
    const today = new Date().toISOString().split('T')[0];
    setNotifications((prev) => [...prev, { message, date: today }]);
    setUnreadCount((prev) => prev + 1);
  };

  const handleBellClick = () => {
    setShowNotifications((prev) => !prev);
    setUnreadCount(0);
  };

  const handleMarkAsDone = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/appointments/${id}/done`);
      const updatedAppointments = appointments.filter((appointment) => appointment._id !== id);
      setAppointments(updatedAppointments);
      setFilteredAppointments(updatedAppointments);

      const doneAppointment = appointments.find((a) => a._id === id);
      if (doneAppointment) {
        addNotification(`${doneAppointment.fullName}'s appointment was marked as done.`);
      }
    } catch (error) {
      console.error('Error marking as done', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/appointments/${id}`);
      const updatedAppointments = appointments.filter((appointment) => appointment._id !== id);
      setAppointments(updatedAppointments);
      setFilteredAppointments(updatedAppointments);

      const deletedAppointment = appointments.find((a) => a._id === id);
      if (deletedAppointment) {
        addNotification(`${deletedAppointment.fullName}'s appointment was canceled.`);
      }
    } catch (error) {
      console.error('Error deleting appointment', error);
    }
  };

  const handleEditComplete = (updatedAppointment) => {
    const oldAppointment = appointments.find(a => a._id === updatedAppointment._id);
    if (!oldAppointment) return;

    const changes = [];
    if (oldAppointment.payment !== updatedAppointment.payment) {
      changes.push(`Payment updated to $${updatedAppointment.payment}`);
    }
    if (oldAppointment.service !== updatedAppointment.service) {
      changes.push(`Service changed to ${updatedAppointment.service}`);
    }
    if (oldAppointment.time !== updatedAppointment.time) {
      changes.push(`Time updated to ${updatedAppointment.time}`);
    }

    if (changes.length > 0) {
      addNotification(`${updatedAppointment.fullName}'s appointment: ${changes.join(', ')}`);
    }

    setAppointments(
      appointments.map((appointment) =>
        appointment._id === updatedAppointment._id ? updatedAppointment : appointment
      )
    );
    setFilteredAppointments(
      filteredAppointments.map((appointment) =>
        appointment._id === updatedAppointment._id ? updatedAppointment : appointment
      )
    );
  };
  const calculateRemainingBalance = (appointment) => {
    const totalPayment = parseFloat(appointment.payment) || 0;
    const discount = parseFloat(appointment.discount) || 0;
    const paidAmount = parseFloat(appointment.paidAmount) || 0;
    const discountedTotal = totalPayment - (totalPayment * discount) / 100;
    const remainingBalance = discountedTotal - paidAmount;
    return isNaN(remainingBalance) ? '0.00' : remainingBalance.toFixed(2);
  };
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6 bg-soft-coral">
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-brown-800">Dashboard - Appointments</h2>

         
          <div className="flex items-center space-x-4 relative">
            
            <div className="relative cursor-pointer" onClick={handleBellClick}>
              <FaBell className="text-2xl text-gray-700" />
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2">
                  {unreadCount}
                </span>
              )}
            </div>

            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-64 bg-white border shadow-lg rounded-lg z-10">
                <div className="p-2 text-gray-800 font-semibold border-b">Today’s Notifications</div>
                {notifications.filter(n => n.date === new Date().toISOString().split('T')[0]).length > 0 ? (
                  notifications
                    .filter(n => n.date === new Date().toISOString().split('T')[0])
                    .map((note, index) => (
                      <div key={index} className="p-2 border-b text-gray-700">
                        {note.message}
                      </div>
                    ))
                ) : (
                  <div className="p-2 text-gray-500">No new notifications</div>
                )}
              </div>
            )}

           
            <input
              type="text"
              placeholder="Search by name or phone..."
              value={searchQuery}
              onChange={handleSearch}
              className="p-2 border rounded-lg text-lg"
            />
          </div>
        </div>

        
        <div className="shadow-md rounded-lg overflow-hidden">
          <table className="table-auto w-full bg-white rounded-xl">
            <thead>
              <tr className="bg-soft-pink text-black text-md font-semibold">
                <th className="p-2">Full Name</th>
                <th className="p-2">Phone</th>
                <th className="p-2">Service</th>
                <th className="p-2">Date</th>
                <th className="p-2">Time</th>
                <th className="p-2">Payment</th>
                <th className="p-4">Discount (%)</th>
                <th className="p-4">Paid</th>
                <th className="p-4">Remaining</th>
                <th className='p-4'>Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appointment) => (
                <tr key={appointment._id} className="text-center text-black hover:bg-gray-100 border-b">
                  <td className="p-2">{appointment.fullName}</td>
                  <td className="p-2">{appointment.phoneNumber}</td>
                  <td className="p-2">{appointment.service}</td>
                  <td className="p-2">{new Date(appointment.date).toLocaleDateString()}</td>
                  <td className="p-2">{appointment.time}</td>
                  <td className="p-2">{appointment.payment}</td>
                  <td className="p-4 text-green-600 font-bold">{appointment.discount}%</td>
                  <td className="p-4">{appointment.paidAmount}</td>
                  <td className="p-4">${calculateRemainingBalance(appointment)}</td>
                  <td className="p-4">{appointment.status}</td>
                  <td className="p-2 flex justify-center space-x-1">
                    <button className="bg-green-600 text-white p-2 rounded-lg" onClick={() => handleMarkAsDone(appointment._id)}>
                      <FaCheck />
                    </button>
                    <button
  className="bg-blue-600 text-white p-2 rounded-lg"
  onClick={() => {
    setCurrentAppointment(appointment);
    setShowEditModal(true); // Open the modal
  }}
>
  <FaPen />
</button>
                    <button className="bg-red-600 text-white p-2 rounded-lg" onClick={() => handleDelete(appointment._id)}>
                      <FaTimes />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showEditModal && currentAppointment && (
  <EditAppointmentModal
    currentAppointment={currentAppointment}
    setShowEditModal={setShowEditModal}
    onEditComplete={handleEditComplete}
  />
)}
      </div>
    </div>
  );
};

export default Dashboard;*/



/*import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditAppointmentModal from './EditAppointmentModal';
import Navbar from './Navbar';
import { FaCheck, FaTimes, FaPen, FaBell } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('notifications');
    return saved ? JSON.parse(saved) : [];
  });
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

  // Save notifications to localStorage
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
    setUnreadCount(notifications.filter(n => !n.read).length);
  }, [notifications]);

  // Fetch and sort appointments by date (newest first)
  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/appointments');
      const sorted = response.data.sort((a, b) => {
        // Create date objects for comparison
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateB - dateA; // Sort descending (newest first)
      });
      setAppointments(sorted);
      setFilteredAppointments(sorted);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error('Failed to load appointments');
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Add notification
  const addNotification = (message) => {
    const newNotification = {
      message,
      timestamp: new Date().toISOString(),
      read: false,
      id: Date.now()
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const handleBellClick = () => {
    setShowNotifications(prev => !prev);
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Appointment actions
  const handleMarkAsDone = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/appointments/${id}/done`);
      const doneAppointment = appointments.find(a => a._id === id);
      
      setAppointments(prev => prev.filter(a => a._id !== id));
      setFilteredAppointments(prev => prev.filter(a => a._id !== id));
      
      addNotification(`✅ ${doneAppointment.fullName}'s appointment marked as completed`);
      toast.success('Appointment marked as done successfully!');
    } catch (error) {
      console.error('Error marking as done', error);
      toast.error('Failed to mark appointment as done');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;

    try {
      const deletedAppointment = appointments.find(a => a._id === id);
      await axios.delete(`http://localhost:5000/api/appointments/${id}`);
      
      setAppointments(prev => prev.filter(a => a._id !== id));
      setFilteredAppointments(prev => prev.filter(a => a._id !== id));
      
      addNotification(`❌ ${deletedAppointment.fullName}'s appointment was canceled`);
      toast.success('Appointment deleted successfully!');
    } catch (error) {
      console.error('Error deleting appointment', error);
      toast.error('Failed to delete appointment');
    }
  };

  const handleEditComplete = (updatedAppointment) => {
    const oldAppointment = appointments.find(a => a._id === updatedAppointment._id);
    const changes = [];

    // Track specific changes for notification
    if (oldAppointment.payment !== updatedAppointment.payment) {
      changes.push(`payment updated from $${oldAppointment.payment} to $${updatedAppointment.payment}`);
    }
    if (oldAppointment.service !== updatedAppointment.service) {
      changes.push(`service changed from "${oldAppointment.service}" to "${updatedAppointment.service}"`);
    }
    if (oldAppointment.time !== updatedAppointment.time) {
      changes.push(`time changed from ${oldAppointment.time} to ${updatedAppointment.time}`);
    }
    if (oldAppointment.date !== updatedAppointment.date) {
      const oldDate = new Date(oldAppointment.date).toLocaleDateString();
      const newDate = new Date(updatedAppointment.date).toLocaleDateString();
      changes.push(`date changed from ${oldDate} to ${newDate}`);
    }

    if (changes.length > 0) {
      addNotification(`✏️ ${updatedAppointment.fullName}'s appointment: ${changes.join(', ')}`);
    }

    // Update and re-sort appointments
    const updated = appointments.map(a => 
      a._id === updatedAppointment._id ? updatedAppointment : a
    ).sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateB - dateA; // Sort descending (newest first)
    });

    setAppointments(updated);
    setFilteredAppointments(updated);
    toast.success('Appointment updated successfully!');
  };

  // Helper functions
  const calculateRemainingBalance = (appointment) => {
    const total = parseFloat(appointment.payment) || 0;
    const paid = parseFloat(appointment.paidAmount) || 0;
    const discount = parseFloat(appointment.discount) || 0;
    const discountedTotal = total - (total * discount / 100);
    const remaining = discountedTotal - paid;
    return Math.max(0, remaining).toFixed(2);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const clearNotifications = () => {
    if (window.confirm('Clear all notifications?')) {
      setNotifications([]);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6 bg-soft-coral">
        
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-brown-800">Appointment Dashboard</h2>
          
          <div className="flex items-center space-x-4 relative">
            
            <div className="relative cursor-pointer" onClick={handleBellClick}>
              <FaBell className="text-2xl text-gray-700" />
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2">
                  {unreadCount}
                </span>
              )}
            </div>

            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white border shadow-lg rounded-lg z-10 max-h-96 overflow-y-auto">
                <div className="p-3 flex justify-between items-center border-b">
                  <span className="font-semibold">Recent Changes</span>
                  <button 
                    onClick={clearNotifications}
                    className="text-xs text-blue-600 hover:text-blue-800"
                  >
                    Clear All
                  </button>
                </div>
                {notifications.length > 0 ? (
                  notifications.map((note) => (
                    <div 
                      key={note.id} 
                      className={`p-3 border-b text-sm ${note.read ? 'bg-white' : 'bg-blue-50'}`}
                    >
                      <div className="text-xs text-gray-500 mb-1">
                        {new Date(note.timestamp).toLocaleString()}
                      </div>
                      <div>{note.message}</div>
                    </div>
                  ))
                ) : (
                  <div className="p-3 text-gray-500 text-center">No notifications yet</div>
                )}
              </div>
            )}

            
            <input
              type="text"
              placeholder="Search appointments..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setFilteredAppointments(
                  appointments.filter(a =>
                    a.fullName.toLowerCase().includes(e.target.value.toLowerCase()) ||
                    a.phoneNumber.includes(e.target.value) ||
                    a.service.toLowerCase().includes(e.target.value.toLowerCase())
                  )
                );
              }}
              className="p-2 border rounded-lg text-lg w-64"
            />
          </div>
        </div>

        
        <div className="shadow-md rounded-lg overflow-hidden">
          <table className="table-auto w-full bg-white rounded-xl">
            <thead className="bg-soft-pink text-black">
              <tr>
                {['Name', 'Phone', 'Service', 'Date', 'Time', 'Total', 'Discount', 'Paid', 'Remaining', 'Status', 'Actions'].map((header) => (
                  <th key={header} className="p-3 text-left">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appointment) => (
                <tr key={appointment._id} className="hover:bg-gray-50 border-b">
                  <td className="p-3">{appointment.fullName}</td>
                  <td className="p-3">{appointment.phoneNumber}</td>
                  <td className="p-3">{appointment.service}</td>
                  <td className="p-3">{formatDate(appointment.date)}</td>
                  <td className="p-3">{appointment.time}</td>
                  <td className="p-3">${appointment.payment}</td>
                  <td className="p-3 text-green-600">{appointment.discount}%</td>
                  <td className="p-3">${appointment.paidAmount || '0.00'}</td>
                  <td className="p-3">${calculateRemainingBalance(appointment)}</td>
                  <td className="p-3">{appointment.status || 'Pending'}</td>
                  <td className="p-3 flex space-x-2">
                    <button
                      className="p-2 rounded-lg bg-green-100 text-green-800 hover:bg-green-200"
                      onClick={() => handleMarkAsDone(appointment._id)}
                      title="Mark as done"
                    >
                      <FaCheck />
                    </button>
                    <button
                      className="p-2 rounded-lg bg-blue-100 text-blue-800 hover:bg-blue-200"
                      onClick={() => {
                        setCurrentAppointment(appointment);
                        setShowEditModal(true);
                      }}
                      title="Edit appointment"
                    >
                      <FaPen />
                    </button>
                    <button
                      className="p-2 rounded-lg bg-red-100 text-red-800 hover:bg-red-200"
                      onClick={() => handleDelete(appointment._id)}
                      title="Cancel appointment"
                    >
                      <FaTimes />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showEditModal && currentAppointment && (
          <EditAppointmentModal
            currentAppointment={currentAppointment}
            setShowEditModal={setShowEditModal}
            fetchAppointments={fetchAppointments}
            onEditComplete={handleEditComplete}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;*/


/*import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditAppointmentModal from './EditAppointmentModal';
import Navbar from './Navbar';
import { FaCheck, FaTimes, FaPen, FaBell } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('notifications');
    return saved ? JSON.parse(saved) : [];
  });
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

  // Save notifications to localStorage
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
    setUnreadCount(notifications.filter(n => !n.read).length);
  }, [notifications]);

  // Fetch and sort appointments by date (newest first)
  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/appointments');
      const sorted = response.data.sort((a, b) => {
        // Create date objects for comparison
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateB - dateA; // Sort descending (newest first)
      });
      setAppointments(sorted);
      setFilteredAppointments(sorted);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error('Failed to load appointments');
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Add notification
  const addNotification = (message) => {
    const newNotification = {
      message,
      timestamp: new Date().toISOString(),
      read: false,
      id: Date.now()
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const handleBellClick = () => {
    setShowNotifications(prev => !prev);
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Appointment actions
  const handleMarkAsDone = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/appointments/${id}/done`);
      const doneAppointment = appointments.find(a => a._id === id);
      
      setAppointments(prev => prev.filter(a => a._id !== id));
      setFilteredAppointments(prev => prev.filter(a => a._id !== id));
      
      addNotification(`✅ ${doneAppointment.fullName}'s appointment marked as completed`);
      toast.success('Appointment marked as done successfully!');
    } catch (error) {
      console.error('Error marking as done', error);
      toast.error('Failed to mark appointment as done');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;

    try {
      const deletedAppointment = appointments.find(a => a._id === id);
      await axios.delete(`http://localhost:5000/api/appointments/${id}`);
      
      setAppointments(prev => prev.filter(a => a._id !== id));
      setFilteredAppointments(prev => prev.filter(a => a._id !== id));
      
      addNotification(`❌ ${deletedAppointment.fullName}'s appointment was canceled`);
      toast.success('Appointment deleted successfully!');
    } catch (error) {
      console.error('Error deleting appointment', error);
      toast.error('Failed to delete appointment');
    }
  };

  const handleEditComplete = (updatedAppointment) => {
    const oldAppointment = appointments.find(a => a._id === updatedAppointment._id);
    const changes = [];

    // Track specific changes for notification
    if (oldAppointment.payment !== updatedAppointment.payment) {
      changes.push(`payment updated from $${oldAppointment.payment} to $${updatedAppointment.payment}`);
    }
    if (oldAppointment.service !== updatedAppointment.service) {
      changes.push(`service changed from "${oldAppointment.service}" to "${updatedAppointment.service}"`);
    }
    if (oldAppointment.time !== updatedAppointment.time) {
      changes.push(`time changed from ${oldAppointment.time} to ${updatedAppointment.time}`);
    }
    if (oldAppointment.date !== updatedAppointment.date) {
      const oldDate = new Date(oldAppointment.date).toLocaleDateString();
      const newDate = new Date(updatedAppointment.date).toLocaleDateString();
      changes.push(`date changed from ${oldDate} to ${newDate}`);
    }

    if (changes.length > 0) {
      addNotification(`✏️ ${updatedAppointment.fullName}'s appointment: ${changes.join(', ')}`);
    }

    // Update and re-sort appointments
    const updated = appointments.map(a => 
      a._id === updatedAppointment._id ? updatedAppointment : a
    ).sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateB - dateA; // Sort descending (newest first)
    });

    setAppointments(updated);
    setFilteredAppointments(updated);
    toast.success('Appointment updated successfully!');
  };

  // Helper functions
  const calculateRemainingBalance = (appointment) => {
    const total = parseFloat(appointment.payment) || 0;
    const paid = parseFloat(appointment.paidAmount) || 0;
    const discount = parseFloat(appointment.discount) || 0;
    const discountedTotal = total - (total * discount / 100);
    const remaining = discountedTotal - paid;
    return Math.max(0, remaining).toFixed(2);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const clearNotifications = () => {
    if (window.confirm('Clear all notifications?')) {
      setNotifications([]);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6 bg-soft-coral">
        
       
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-brown-800">Appointment Dashboard</h2>
          
          <div className="flex items-center space-x-4 relative">
           
            <div className="relative cursor-pointer" onClick={handleBellClick}>
              <FaBell className="text-2xl text-gray-700" />
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2">
                  {unreadCount}
                </span>
              )}
            </div>

           
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white border shadow-lg rounded-lg z-10 max-h-96 overflow-y-auto">
                <div className="p-3 flex justify-between items-center border-b">
                  <span className="font-semibold">Recent Changes</span>
                  <button 
                    onClick={clearNotifications}
                    className="text-xs text-blue-600 hover:text-blue-800"
                  >
                    Clear All
                  </button>
                </div>
                {notifications.length > 0 ? (
                  notifications.map((note) => (
                    <div 
                      key={note.id} 
                      className={`p-3 border-b text-sm ${note.read ? 'bg-white' : 'bg-blue-50'}`}
                    >
                      <div className="text-xs text-gray-500 mb-1">
                        {new Date(note.timestamp).toLocaleString()}
                      </div>
                      <div>{note.message}</div>
                    </div>
                  ))
                ) : (
                  <div className="p-3 text-gray-500 text-center">No notifications yet</div>
                )}
              </div>
            )}

            
            <input
              type="text"
              placeholder="Search appointments..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setFilteredAppointments(
                  appointments.filter(a =>
                    a.fullName.toLowerCase().includes(e.target.value.toLowerCase()) ||
                    a.phoneNumber.includes(e.target.value) ||
                    a.service.toLowerCase().includes(e.target.value.toLowerCase())
                  )
                );
              }}
              className="p-2 border rounded-lg text-lg w-64"
            />
          </div>
        </div>

        
        <div className="shadow-md rounded-lg overflow-hidden">
          <table className="table-auto w-full bg-white rounded-xl">
            <thead className="bg-soft-pink text-black">
              <tr>
                {['Name', 'Phone', 'Service', 'Date', 'Time', 'Total', 'Discount', 'Paid', 'Remaining', 'Status', 'Actions'].map((header) => (
                  <th key={header} className="p-3 text-left">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appointment) => (
                <tr key={appointment._id} className="hover:bg-gray-50 border-b">
                  <td className="p-3">{appointment.fullName}</td>
                  <td className="p-3">{appointment.phoneNumber}</td>
                  <td className="p-3">{appointment.service}</td>
                  <td className="p-3">{formatDate(appointment.date)}</td>
                  <td className="p-3">{appointment.time}</td>
                  <td className="p-3">${appointment.payment}</td>
                  <td className="p-3 text-green-600">{appointment.discount}%</td>
                  <td className="p-3">${appointment.paidAmount || '0.00'}</td>
                  <td className="p-3">${calculateRemainingBalance(appointment)}</td>
                  <td className="p-3">{appointment.status || 'Pending'}</td>
                  <td className="p-3 flex space-x-2">
                    <button
                      className="p-2 rounded-lg bg-green-100 text-green-800 hover:bg-green-200"
                      onClick={() => handleMarkAsDone(appointment._id)}
                      title="Mark as done"
                    >
                      <FaCheck />
                    </button>
                    <button
                      className="p-2 rounded-lg bg-blue-100 text-blue-800 hover:bg-blue-200"
                      onClick={() => {
                        setCurrentAppointment(appointment);
                        setShowEditModal(true);
                      }}
                      title="Edit appointment"
                    >
                      <FaPen />
                    </button>
                    <button
                      className="p-2 rounded-lg bg-red-100 text-red-800 hover:bg-red-200"
                      onClick={() => handleDelete(appointment._id)}
                      title="Cancel appointment"
                    >
                      <FaTimes />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showEditModal && currentAppointment && (
          <EditAppointmentModal
            currentAppointment={currentAppointment}
            setShowEditModal={setShowEditModal}
            fetchAppointments={fetchAppointments}
            onEditComplete={handleEditComplete}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;*/
/*import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditAppointmentModal from './EditAppointmentModal';
import Navbar from './Navbar';
import { FaCheck, FaTimes, FaPen, FaBell } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('notifications');
    return saved ? JSON.parse(saved) : [];
  });
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

  // Save notifications to localStorage
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
    setUnreadCount(notifications.filter(n => !n.read).length);
  }, [notifications]);

  // Fetch and sort appointments by date (newest first)
  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/appointments');
      const sorted = response.data.sort((a, b) => {
        // Create date objects for comparison
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateB - dateA; // Sort descending (newest first)
      });
      setAppointments(sorted);
      setFilteredAppointments(sorted);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error('Failed to load appointments');
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Add notification
  const addNotification = (message) => {
    const newNotification = {
      message,
      timestamp: new Date().toISOString(),
      read: false,
      id: Date.now()
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const handleBellClick = () => {
    setShowNotifications(prev => !prev);
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Appointment actions
  const handleMarkAsDone = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/appointments/${id}/done`);
      const doneAppointment = appointments.find(a => a._id === id);
      
      setAppointments(prev => prev.filter(a => a._id !== id));
      setFilteredAppointments(prev => prev.filter(a => a._id !== id));
      
      addNotification(`✅ ${doneAppointment.fullName}'s appointment marked as completed`);
      toast.success('Appointment marked as done successfully!');
    } catch (error) {
      console.error('Error marking as done', error);
      toast.error('Failed to mark appointment as done');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;

    try {
      const deletedAppointment = appointments.find(a => a._id === id);
      await axios.delete(`http://localhost:5000/api/appointments/${id}`);
      
      setAppointments(prev => prev.filter(a => a._id !== id));
      setFilteredAppointments(prev => prev.filter(a => a._id !== id));
      
      addNotification(`❌ ${deletedAppointment.fullName}'s appointment was canceled`);
      toast.success('Appointment deleted successfully!');
    } catch (error) {
      console.error('Error deleting appointment', error);
      toast.error('Failed to delete appointment');
    }
  };

  const handleEditComplete = (oldAppointment, updatedAppointment) => {
    const changes = [];
  
    // Track changes using the passed oldAppointment and updatedAppointment
    if (oldAppointment.payment !== updatedAppointment.payment) {
      changes.push(`payment updated from $${oldAppointment.payment} to $${updatedAppointment.payment}`);
    }
    if (oldAppointment.service !== updatedAppointment.service) {
      changes.push(`service changed from "${oldAppointment.service}" to "${updatedAppointment.service}"`);
    }
    if (oldAppointment.time !== updatedAppointment.time) {
      changes.push(`time changed from ${oldAppointment.time} to ${updatedAppointment.time}`);
    }
    if (oldAppointment.date !== updatedAppointment.date) {
      const oldDate = new Date(oldAppointment.date).toLocaleDateString();
      const newDate = new Date(updatedAppointment.date).toLocaleDateString();
      changes.push(`date changed from ${oldDate} to ${newDate}`);
    }
  
    if (changes.length > 0) {
      addNotification(`✏️ ${updatedAppointment.fullName}'s appointment: ${changes.join(', ')}`);
    }
  
    toast.success('Appointment updated successfully!');
  };

  // Helper functions
  const calculateRemainingBalance = (appointment) => {
    const total = parseFloat(appointment.payment) || 0;
    const paid = parseFloat(appointment.paidAmount) || 0;
    const discount = parseFloat(appointment.discount) || 0;
    const discountedTotal = total - (total * discount / 100);
    const remaining = discountedTotal - paid;
    return Math.max(0, remaining).toFixed(2);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const clearNotifications = () => {
    if (window.confirm('Clear all notifications?')) {
      setNotifications([]);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6 bg-soft-coral">
        
       
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-brown-800">Appointment Dashboard</h2>
          
          <div className="flex items-center space-x-4 relative">
            
            <div className="relative cursor-pointer" onClick={handleBellClick}>
              <FaBell className="text-2xl text-gray-700" />
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2">
                  {unreadCount}
                </span>
              )}
            </div>

           
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white border shadow-lg rounded-lg z-10 max-h-96 overflow-y-auto">
                <div className="p-3 flex justify-between items-center border-b">
                  <span className="font-semibold">Recent Changes</span>
                  <button 
                    onClick={clearNotifications}
                    className="text-xs text-blue-600 hover:text-blue-800"
                  >
                    Clear All
                  </button>
                </div>
                {notifications.length > 0 ? (
                  notifications.map((note) => (
                    <div 
                      key={note.id} 
                      className={`p-3 border-b text-sm ${note.read ? 'bg-white' : 'bg-blue-50'}`}
                    >
                      <div className="text-xs text-gray-500 mb-1">
                        {new Date(note.timestamp).toLocaleString()}
                      </div>
                      <div>{note.message}</div>
                    </div>
                  ))
                ) : (
                  <div className="p-3 text-gray-500 text-center">No notifications yet</div>
                )}
              </div>
            )}

         
            <input
              type="text"
              placeholder="Search appointments..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setFilteredAppointments(
                  appointments.filter(a =>
                    a.fullName.toLowerCase().includes(e.target.value.toLowerCase()) ||
                    a.phoneNumber.includes(e.target.value) ||
                    a.service.toLowerCase().includes(e.target.value.toLowerCase())
                  )
                );
              }}
              className="p-2 border rounded-lg text-lg w-64"
            />
          </div>
        </div>

        
        <div className="shadow-md rounded-lg overflow-hidden">
          <table className="table-auto w-full bg-white rounded-xl">
            <thead className="bg-soft-pink text-black">
              <tr>
                {['Name', 'Phone', 'Service', 'Date', 'Time', 'Total', 'Discount', 'Paid', 'Remaining', 'Status', 'Actions'].map((header) => (
                  <th key={header} className="p-3 text-left">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appointment) => (
                <tr key={appointment._id} className="hover:bg-gray-50 border-b">
                  <td className="p-3">{appointment.fullName}</td>
                  <td className="p-3">{appointment.phoneNumber}</td>
                  <td className="p-3">{appointment.service}</td>
                  <td className="p-3">{formatDate(appointment.date)}</td>
                  <td className="p-3">{appointment.time}</td>
                  <td className="p-3">${appointment.payment}</td>
                  <td className="p-3 text-green-600">{appointment.discount}%</td>
                  <td className="p-3">${appointment.paidAmount || '0.00'}</td>
                  <td className="p-3">${calculateRemainingBalance(appointment)}</td>
                  <td className="p-3">{appointment.status || 'Pending'}</td>
                  <td className="p-3 flex space-x-2">
                    <button
                      className="p-2 rounded-lg bg-green-100 text-green-800 hover:bg-green-200"
                      onClick={() => handleMarkAsDone(appointment._id)}
                      title="Mark as done"
                    >
                      <FaCheck />
                    </button>
                    <button
                      className="p-2 rounded-lg bg-blue-100 text-blue-800 hover:bg-blue-200"
                      onClick={() => {
                        setCurrentAppointment(appointment);
                        setShowEditModal(true);
                      }}
                      title="Edit appointment"
                    >
                      <FaPen />
                    </button>
                    <button
                      className="p-2 rounded-lg bg-red-100 text-red-800 hover:bg-red-200"
                      onClick={() => handleDelete(appointment._id)}
                      title="Cancel appointment"
                    >
                      <FaTimes />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showEditModal && currentAppointment && (
          <EditAppointmentModal
            currentAppointment={currentAppointment}
            setShowEditModal={setShowEditModal}
            fetchAppointments={fetchAppointments}
            onEditComplete={handleEditComplete}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;*/

import React, { useEffect,useRef, useState } from 'react';
import { Search } from 'lucide-react'; 
import axios from 'axios';
import Navbar from './Navbar';
import EditAppointmentModal from './EditAppointmentModal';
import { FaCheck, FaTimes, FaPen, FaBell } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentAppointment, setCurrentAppointment] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Notifications state
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('notifications');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading notifications:', error);
      return [];
    }
  });

  const [unreadCount, setUnreadCount] = useState(0);

  // Update unread notifications count
  useEffect(() => {
    setUnreadCount(notifications.filter(n => !n.read).length);
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);


const fetchAppointments = async () => {
  try {
    const { data } = await axios.get('http://localhost:5000/api/appointments');

    // Sort by most recent date
    const sortedData = data.sort((a, b) => new Date(a.date) - new Date(b.date));


    // Get previously notified appointment IDs from localStorage
    const notifiedIds = JSON.parse(localStorage.getItem('notifiedAppointments') || '[]');

    // Check for truly new appointments
    const newAppointments = sortedData.filter(a => !notifiedIds.includes(a._id));

    // Add notifications for new ones
    newAppointments.forEach(app => {
      addNotification(`📅 New appointment booked by ${app.fullName}`);
    });

    // Update notified list
    const updatedNotifiedIds = [...new Set([...notifiedIds, ...newAppointments.map(a => a._id)])];
    localStorage.setItem('notifiedAppointments', JSON.stringify(updatedNotifiedIds));

    // Set state with sorted data
    setAppointments(sortedData);
    setFilteredAppointments(sortedData);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    toast.error('Failed to load appointments.');
  }
};


useEffect(() => {
  fetchAppointments();
}, []);


  const addNotification = (message) => {
    const newNotification = { id: Date.now(), message, timestamp: new Date().toISOString(), read: false };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const handleBellClick = () => {
    setShowNotifications(prev => !prev);

    
    if (!showNotifications) {
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    }
  };

  const calculateRemainingBalance = (appointment) => {
    const total = parseFloat(appointment.payment) || 0;
    const paid = parseFloat(appointment.paidAmount) || 0;
    const discount = parseFloat(appointment.discount) || 0;
    const discountedTotal = total - (total * discount / 100);
    const remaining = discountedTotal - paid;
    return Math.max(0, remaining).toFixed(2);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const clearNotifications = () => {
    if (window.confirm('Clear all notifications?')) {
      setNotifications([]);
    }
  };
  
  const handleMarkAsDone = async (id) => {
    const appointment = appointments.find(a => a._id === id);
    const remaining = parseFloat(calculateRemainingBalance(appointment));
  
    if (remaining > 0) {
      toast.error('❌ First complete your payment before marking as done.');
      return;
    }
  
    try {
      await axios.put(`http://localhost:5000/api/appointments/${id}/done`);
      const updatedAppointments = appointments.map(a =>
        a._id === id ? { ...a, status: 'Completed' } : a
      );
      setAppointments(updatedAppointments);
      setFilteredAppointments(updatedAppointments);
  
      addNotification(`✅ ${appointment.fullName}'s appointment marked as completed.`);
      toast.success('Appointment marked as done!');
    } catch (error) {
      console.error('Error marking appointment as done:', error);
      toast.error('Failed to mark as done.');
    }
  };
  

  // Delete appointment

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;
  
    try {
      await axios.delete(`http://localhost:5000/api/appointments/${id}`);
      const updatedAppointments = appointments.filter(a => a._id !== id);
      setAppointments(updatedAppointments);
      setFilteredAppointments(updatedAppointments);
  
      const deletedAppointment = appointments.find(a => a._id === id);
      addNotification(`❌ ${deletedAppointment.fullName}'s appointment was canceled.`);
      toast.error('❌ Appointment deleted successfully!');
    } catch (error) {
      console.error('Error deleting appointment:', error);
      toast.error('Failed to delete appointment.');
    }
  };
  

  const handleEditComplete = (original, updated) => {
    const changes = [];
  
    // Merge updated fields into original safely
    const merged = {
      ...original,
      ...updated
    };
  
    const displayName = merged.fullName ?? 'Unknown';
  
    // Helper for field comparison
    const compareField = (field, label, formatter = v => v) => {
      const originalVal = original[field];
      const newVal = merged[field];
  
      if (String(originalVal) !== String(newVal)) {
        changes.push(`${label} from ${formatter(originalVal)} to ${formatter(newVal)}`);
      }
    };
  
    // Field comparisons
    compareField('fullName', 'Name', v => `"${v}"`);
    compareField('phoneNumber', 'Phone number', v => `"${v}"`);
    compareField('service', 'Service', v => `"${v}"`);
  
    // Numeric formatting
    const formatCurrency = v => `$${parseFloat(v || 0).toFixed(2)}`;
    const formatPercent = v => `${parseFloat(v || 0)}%`;
  
    compareField('payment', 'Payment', formatCurrency);
    compareField('paidAmount', 'Paid amount', formatCurrency);
    compareField('discount', 'Discount', formatPercent);
  
    // Safe date formatting
    const formatDateSafe = date => {
      try {
        const d = new Date(date);
        return isNaN(d) ? 'Invalid Date' : d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
      } catch {
        return 'Invalid Date';
      }
    };
  
    compareField('date', 'Date', formatDateSafe);
    compareField('time', 'Time', v => v || 'Not set');
  
    // Notification message
    const message = changes.length > 0
      ? `✏️ ${displayName}: Updated ${changes.join(', ')}`
      : `✏️ ${displayName} saved with no changes`;
  
    addNotification(message);
  
    // Update state
    const cleanedUpdate = {
      ...original,
      ...updated,
      payment: parseFloat(merged.payment) || 0,
      paidAmount: parseFloat(merged.paidAmount) || 0,
      discount: parseFloat(merged.discount) || 0
    };
  
    setAppointments(prev => prev.map(a => a._id === cleanedUpdate._id ? cleanedUpdate : a));
    setFilteredAppointments(prev => prev.map(a => a._id === cleanedUpdate._id ? cleanedUpdate : a));
  };
  
  const notificationRef = useRef(null);

useEffect(() => {
  const handleClickOutside = (event) => {
    if (notificationRef.current && !notificationRef.current.contains(event.target)) {
      setShowNotifications(false);
    }
  };

  if (showNotifications) {
    document.addEventListener('mousedown', handleClickOutside);
  } else {
    document.removeEventListener('mousedown', handleClickOutside);
  }

  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, [showNotifications]);

  return (
    <div>
    <Navbar />
    <div className="container mx-auto p-6 bg-soft-coral">
      
     
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-brown-800">Appointment Dashboard</h2>
        
        <div className="flex items-center space-x-4 relative">
          
<div ref={notificationRef} className="relative">
  {/* Bell Icon */}
  <div className="cursor-pointer" onClick={handleBellClick}>
    <FaBell className="text-2xl text-gray-700" />
    {unreadCount > 0 && (
      <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-2">
        {unreadCount}
      </span>
    )}
  </div>

  {/* Notification Dropdown */}
  {showNotifications && (
    <div className="absolute top-8 right-0 w-80 bg-white border shadow-lg rounded-lg z-50 max-h-96 overflow-y-auto">
      <div className="p-3 flex justify-between items-center border-b">
        <span className="font-semibold">Recent Changes</span>
        <button 
          onClick={clearNotifications}
          className="text-xs text-blue-600 hover:text-blue-800"
        >
          Clear All
        </button>
      </div>
      {notifications.length > 0 ? (
        notifications.map((note) => (
          <div 
            key={note.id} 
            className={`p-3 border-b text-sm ${note.read ? 'bg-white' : 'bg-blue-50'}`}
          >
            <div className="text-xs text-gray-500 mb-1">
              {new Date(note.timestamp).toLocaleString()}
            </div>
            <div>{note.message}</div>
          </div>
        ))
      ) : (
        <div className="p-3 text-gray-500 text-center">No notifications yet</div>
      )}
    </div>
  )}
</div>

<div className="flex items-center border border-blue-400 rounded-lg px-3 py-2 w-72 shadow-sm bg-white">
  <Search className="w-5 h-5 text-gray-500 mr-2" />
  <input
    type="text"
    placeholder="Search appointments..."
    value={searchQuery}
    onChange={(e) => {
      setSearchQuery(e.target.value);
      setFilteredAppointments(
        appointments.filter(a =>
          a.fullName.toLowerCase().includes(e.target.value.toLowerCase()) ||
          a.phoneNumber.includes(e.target.value) ||
          a.service.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    }}
    className="flex-grow focus:outline-none text-sm text-gray-800 placeholder-gray-400 bg-transparent"
  />
</div>

        </div>
      </div>

      
      <div className="shadow-md rounded-lg overflow-hidden">
        <table className="table-auto w-full bg-white rounded-xl">
          <thead className="bg-soft-pink text-black">
            <tr>
              {['Name', 'Phone', 'Service', 'Date', 'Time', 'Total', 'Discount', 'Paid', 'Remaining', 'Status', 'Actions'].map((header) => (
                <th key={header} className="p-3 text-left">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((appointment) => (
              <tr key={appointment._id} className="hover:bg-gray-50 border-b">
                <td className="p-3">{appointment.fullName}</td>
                <td className="p-3">{appointment.phoneNumber}</td>
                <td className="p-3">{appointment.service}</td>
                <td className="p-3">{formatDate(appointment.date)}</td>
                <td className="p-3">{appointment.time}</td>
                <td className="p-3">${appointment.payment}</td>
                <td className="p-3 text-green-600">{appointment.discount}%</td>
                <td className="p-3">${appointment.paidAmount || '0.00'}</td>
                <td className="p-3">${calculateRemainingBalance(appointment)}</td>
                <td className="p-3">{appointment.status || 'Pending'}</td>
                <td className="p-3 flex space-x-2">
                  <button
                    className="p-2 rounded-lg bg-green-100 text-green-800 hover:bg-green-200"
                    onClick={() => handleMarkAsDone(appointment._id)}
                    title="Mark as done"
                  >
                    <FaCheck />
                  </button>
                  <button
                    className="p-2 rounded-lg bg-blue-100 text-blue-800 hover:bg-blue-200"
                    onClick={() => {
                      setCurrentAppointment(appointment);
                      setShowEditModal(true);
                    }}
                    title="Edit appointment"
                  >
                    <FaPen />
                  </button>
                  <button
                    className="p-2 rounded-lg bg-red-100 text-red-800 hover:bg-red-200"
                    onClick={() => handleDelete(appointment._id)}
                    title="Cancel appointment"
                  >
                    <FaTimes />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showEditModal && currentAppointment && (
        <EditAppointmentModal
          currentAppointment={currentAppointment}
          setShowEditModal={setShowEditModal}
          fetchAppointments={fetchAppointments}
          onEditComplete={handleEditComplete}
        />
      )}
    </div>
  </div>
);
};



export default Dashboard;

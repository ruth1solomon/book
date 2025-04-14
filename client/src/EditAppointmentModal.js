
/*import { useState, useEffect } from 'react';
import axios from 'axios';

const EditAppointmentModal = ({
  currentAppointment,
  showEditModal,
  setShowEditModal,
  fetchAppointments,
}) => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [service, setService] = useState('');
  const [payment, setPayment] = useState('');
  
  const [error, setError] = useState('');

  // Update the form fields when currentAppointment changes
  useEffect(() => {
    if (currentAppointment) {
      setFullName(currentAppointment.fullName || '');
      setPhoneNumber(currentAppointment.phoneNumber || '');
      setDate(currentAppointment.date || '');
      setTime(currentAppointment.time || '');
      setService(currentAppointment.service || '');
      setPayment(currentAppointment.payment || '');
      setError(''); // Clear any previous errors
    }
  }, [currentAppointment]);

  // Handle updating the appointment

  const handleUpdate = async () => {
    if (!fullName || !phoneNumber || !date || !time || !service || !payment) {
      setError('All fields are required.');
      return;
    }
  
    try {
      // Fetch all appointments to check for conflicts
      const { data: appointments } = await axios.get('http://localhost:5000/api/appointments');
  
      // Check if the edited appointment conflicts with another
      const isConflict = appointments.some(
        (appointment) =>
          appointment._id !== currentAppointment._id && // Exclude the current appointment being edited
          appointment.date === date &&
          appointment.time === time &&
          appointment.service === service
      );
  
      if (isConflict) {
        setError('This service is already booked for the selected date and time.');
        return;
      }


      
  
      // Proceed to update the appointment
      await axios.put(`http://localhost:5000/api/appointments/${currentAppointment._id}`, {
        fullName,
        phoneNumber,
        date,
        time,
        service,
        payment,
        
      });
  
      fetchAppointments(); // Refresh the appointments list after update
      setShowEditModal(false); // Close the modal
    } catch (error) {
      console.error('Error updating appointment:', error);
      setError('Failed to update appointment. Please try again.');
    }
  };
  



 

  // Close modal when clicking outside the modal content
  const handleOutsideClick = (e) => {
    if (e.target.id === 'edit-modal-overlay') {
      setShowEditModal(false);
    }
  };

  return showEditModal ? (
    <div
      id="edit-modal-overlay"
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={handleOutsideClick}
      role="dialog"
      aria-labelledby="edit-appointment-title"
      aria-modal="true"
    >
      <div className="bg-white p-8 rounded-lg w-full max-w-lg">
        <h2
          id="edit-appointment-title"
          className="text-xl font-bold mb-4 text-black"
        >
          Edit Appointment
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form>
          <div className="mb-4">
            <label className="block text-black">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3 py-2 border rounded text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black">Phone Number</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-3 py-2 border rounded text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border rounded text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-3 py-2 border rounded text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black">Service</label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full px-3 py-2 border rounded text-black"
            >
              <option value="" disabled>
                Select a Service
              </option>
              <option value="Golden Bridal">Golden Bridal</option>
              <option value="Premium Bridal">Premium Bridal</option>
              <option value="Silver Studio">Silver Studio</option>
              <option value="Golden Studio">Golden Studio</option>
              <option value="Platinium Studio">Platinium Studio</option>
              <option value="Refreshment">Refreshment</option>
              <option value="Natural Makeup">Natural Makeup</option>
            </select>
          </div>


          
          <div className="mb-4">
            <label className="block text-black">Payment</label>
            <input
              type="text"
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
              className="w-full px-3 py-2 border rounded text-black"
            />
          </div>
          <button
            type="button"
            onClick={handleUpdate}
            className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-700"
          >
            Update
          </button>
          <button
            type="button"
            onClick={() => setShowEditModal(false)}
            className="ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  ) : null;
};

export default EditAppointmentModal;



anothercode
import { useState, useEffect } from 'react';
import axios from 'axios';

const EditAppointmentModal = ({
  currentAppointment,
  showEditModal,
  setShowEditModal,
  fetchAppointments,
}) => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [service, setService] = useState('');
  const [payment, setPayment] = useState('');
  const [discount, setDiscount] = useState('none');
  const [error, setError] = useState('');

  useEffect(() => {
    if (currentAppointment) {
      setFullName(currentAppointment.fullName || '');
      setPhoneNumber(currentAppointment.phoneNumber || '');
      setDate(currentAppointment.date || '');
      setTime(currentAppointment.time || '');
      setService(currentAppointment.service || '');
      setPayment(currentAppointment.payment || '');
      setDiscount(currentAppointment.discount || 'none');
      setError('');
    }
  }, [currentAppointment]);

  const calculateDiscountedPrice = (amount) => {
    let discountRate = 0;
    switch (discount) {
      case 'loyalty':
        discountRate = 0.15;
        break;
      case 'bronze':
        discountRate = 0.1;
        break;
      case 'custom':
        discountRate = 0.2;
        break;
      default:
        discountRate = 0;
    }
    return amount - amount * discountRate;
  };

  const handleUpdate = async () => {
    if (!fullName || !phoneNumber || !date || !time || !service || !payment) {
      setError('All fields are required.');
      return;
    }

    try {
      const { data: appointments } = await axios.get('http://localhost:5000/api/appointments');

      const isConflict = appointments.some(
        (appointment) =>
          appointment._id !== currentAppointment._id &&
          appointment.date === date &&
          appointment.time === time &&
          appointment.service === service
      );

      if (isConflict) {
        setError('This service is already booked for the selected date and time.');
        return;
      }

      const discountedPayment = calculateDiscountedPrice(parseFloat(payment));

      await axios.put(`http://localhost:5000/api/appointments/${currentAppointment._id}`, {
        fullName,
        phoneNumber,
        date,
        time,
        service,
        payment: discountedPayment.toFixed(2),
        discount,
      });

      fetchAppointments();
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating appointment:', error);
      setError('Failed to update appointment. Please try again.');
    }
  };

  const handleOutsideClick = (e) => {
    if (e.target.id === 'edit-modal-overlay') {
      setShowEditModal(false);
    }
  };

  return showEditModal ? (
    <div
      id="edit-modal-overlay"
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={handleOutsideClick}
      role="dialog"
      aria-labelledby="edit-appointment-title"
      aria-modal="true"
    >
      <div className="bg-white p-8 rounded-lg w-full max-w-lg">
        <h2 id="edit-appointment-title" className="text-xl font-bold mb-4 text-black">
          Edit Appointment
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form>
          <div className="mb-4">
            <label className="block text-black">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3 py-2 border rounded text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black">Phone Number</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-3 py-2 border rounded text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border rounded text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-3 py-2 border rounded text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black">Service</label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full px-3 py-2 border rounded text-black"
            >
              <option value="" disabled>Select a Service</option>
              <option value="Golden Bridal">Golden Bridal</option>
              <option value="Premium Bridal">Premium Bridal</option>
              <option value="Silver Studio">Silver Studio</option>
              <option value="Golden Studio">Golden Studio</option>
              <option value="Platinium Studio">Platinium Studio</option>
              <option value="Refreshment">Refreshment</option>
              <option value="Natural Makeup">Natural Makeup</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-black">Discount</label>
            <select
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="w-full px-3 py-2 border rounded text-black"
            >
              <option value="none">No Discount</option>
              <option value="loyalty">Loyalty (15%)</option>
              <option value="bronze">Bronze (10%)</option>
              <option value="custom">Custom (20%)</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-black">Payment</label>
            <input
              type="text"
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
              className="w-full px-3 py-2 border rounded text-black"
            />
          </div>
          <button
            type="button"
            onClick={handleUpdate}
            className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-700"
          >
            Update
          </button>
          <button
            type="button"
            onClick={() => setShowEditModal(false)}
            className="ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  ) : null;
};

export default EditAppointmentModal;

even better

import { useState, useEffect } from 'react';
import axios from 'axios';

const EditAppointmentModal = ({
  currentAppointment,
  showEditModal,
  setShowEditModal,
  fetchAppointments,
}) => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [service, setService] = useState('');
  const [payment, setPayment] = useState('');
  const [discount, setDiscount] = useState(0); // Discount as percentage
  const [error, setError] = useState('');

  useEffect(() => {
    if (currentAppointment) {
      setFullName(currentAppointment.fullName || '');
      setPhoneNumber(currentAppointment.phoneNumber || '');
      setDate(currentAppointment.date || '');
      setTime(currentAppointment.time || '');
      setService(currentAppointment.service || '');
      setPayment(currentAppointment.payment || '');
      setDiscount(currentAppointment.discount || 0); // Ensure discount is a number
      setError('');
    }
  }, [currentAppointment]);

  const handleUpdate = async () => {
    if (!fullName || !phoneNumber || !date || !time || !service || !payment) {
      setError('All fields are required.');
      return;
    }

    try {
      const { data: appointments } = await axios.get('http://localhost:5000/api/appointments');

      const isConflict = appointments.some(
        (appointment) =>
          appointment._id !== currentAppointment._id &&
          appointment.date === date &&
          appointment.time === time &&
          appointment.service === service
      );

      if (isConflict) {
        setError('This service is already booked for the selected date and time.');
        return;
      }

      // Calculate discounted payment
      const paymentAmount = parseFloat(payment);
      const discountedPayment = paymentAmount - (paymentAmount * discount) / 100;

      await axios.put(`http://localhost:5000/api/appointments/${currentAppointment._id}`, {
        fullName,
        phoneNumber,
        date,
        time,
        service,
        payment: discountedPayment.toFixed(2), // Send final discounted amount
        discount,
      });

      fetchAppointments();
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating appointment:', error);
      setError('Failed to update appointment. Please try again.');
    }
  };

  return showEditModal ? (
    <div
      id="edit-modal-overlay"
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={(e) => e.target.id === 'edit-modal-overlay' && setShowEditModal(false)}
    >
      <div className="bg-white p-8 rounded-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4 text-black">Edit Appointment</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form>
          <div className="mb-4">
            <label className="block text-black">Full Name</label>
            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full px-3 py-2 border rounded text-black" />
          </div>
          <div className="mb-4">
            <label className="block text-black">Phone Number</label>
            <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="w-full px-3 py-2 border rounded text-black" />
          </div>
          <div className="mb-4">
            <label className="block text-black">Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-3 py-2 border rounded text-black" />
          </div>
          <div className="mb-4">
            <label className="block text-black">Time</label>
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full px-3 py-2 border rounded text-black" />
          </div>
          <div className="mb-4">
            <label className="block text-black">Service</label>
            <select value={service} onChange={(e) => setService(e.target.value)} className="w-full px-3 py-2 border rounded text-black">
              <option value="" disabled>Select a Service</option>
              <option value="Golden Bridal">Golden Bridal</option>
              <option value="Premium Bridal">Premium Bridal</option>
              <option value="Silver Studio">Silver Studio</option>
              <option value="Golden Studio">Golden Studio</option>
              <option value="Platinium Studio">Platinium Studio</option>
              <option value="Refreshment">Refreshment</option>
              <option value="Natural Makeup">Natural Makeup</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-black">Payment</label>
            <input type="number" value={payment} onChange={(e) => setPayment(e.target.value)} className="w-full px-3 py-2 border rounded text-black" />
          </div>
          <div className="mb-4">
            <label className="block text-black">Discount</label>
            <select value={discount} onChange={(e) => setDiscount(Number(e.target.value))} className="w-full px-3 py-2 border rounded text-black">
              <option value={0}>No Discount</option>
              <option value={15}>Loyalty (15%)</option>
              <option value={10}>Bronze (10%)</option>
              <option value={20}>Custom Discount (20%)</option>
            </select>
          </div>
          <button type="button" onClick={handleUpdate} className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-700">Update</button>
          <button type="button" onClick={() => setShowEditModal(false)} className="ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700">Cancel</button>
        </form>
      </div>
    </div>
  ) : null;
};

export default EditAppointmentModal;

//This code is great 
import { useState, useEffect } from 'react';
import axios from 'axios';

const EditAppointmentModal = ({
  currentAppointment,
  showEditModal,
  setShowEditModal,
  fetchAppointments,
}) => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [service, setService] = useState('');
  const [payment, setPayment] = useState('');
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [hasUnread, setHasUnread] = useState(false);
  const [showNotificationList, setShowNotificationList] = useState(false);

  useEffect(() => {
    if (currentAppointment) {
      setFullName(currentAppointment.fullName || '');
      setPhoneNumber(currentAppointment.phoneNumber || '');
      setDate(currentAppointment.date || '');
      setTime(currentAppointment.time || '');
      setService(currentAppointment.service || '');
      setPayment(currentAppointment.payment || '');
      setDiscount(currentAppointment.discount || 0);
      setError('');
    }
  }, [currentAppointment]);

  const handleUpdate = async () => {
    if (!fullName || !phoneNumber || !date || !time || !service || !payment) {
      setError('All fields are required.');
      return;
    }
  
    try {
      const { data: appointments } = await axios.get('http://localhost:5000/api/appointments');
  
      const isConflict = appointments.some(
        (appointment) =>
          appointment._id !== currentAppointment._id &&
          appointment.date === date &&
          appointment.time === time &&
          appointment.service === service
      );
  
      if (isConflict) {
        setError('This service is already booked for the selected date and time.');
        return;
      }
  
      const paymentAmount = parseFloat(payment);
      const discountedPayment = paymentAmount - (paymentAmount * discount) / 100;
  
      const updatedFields = [];
      if (fullName !== currentAppointment.fullName) updatedFields.push('Full Name');
      if (phoneNumber !== currentAppointment.phoneNumber) updatedFields.push('Phone Number');
      if (date !== currentAppointment.date) updatedFields.push('Date');
      if (time !== currentAppointment.time) updatedFields.push('Time');
      if (service !== currentAppointment.service) updatedFields.push('Service');
      if (discountedPayment.toFixed(2) !== currentAppointment.payment) updatedFields.push('Payment');
      if (discount !== currentAppointment.discount) updatedFields.push('Discount');
  
      if (updatedFields.length === 0) {
        setError('No changes were made.');
        return;
      }
  
      await axios.put(`http://localhost:5000/api/appointments/${currentAppointment._id}`, {
        fullName,
        phoneNumber,
        date,
        time,
        service,
        payment: discountedPayment.toFixed(2),
        discount,
      });
  
      fetchAppointments();
      setShowEditModal(false);
  
      setSuccessMessage('Appointment updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
  
      const newNotification = {
        id: Date.now(),
        message: `Updated: ${fullName} at ${time} - ${updatedFields.join(', ')}`,
      };
  
      setNotifications((prev) => [newNotification, ...prev]);
      setHasUnread(true); // Mark notifications as unread
    } catch (error) {
      console.error('Error updating appointment:', error);
      setError('Failed to update appointment. Please try again.');
    }
  };
  

  const toggleNotifications = () => {
    setShowNotificationList(!showNotificationList);
    setHasUnread(false); // Mark as read
  };

  return (
    <>
      
      <div className="fixed top-4 right-6">
        <button onClick={toggleNotifications} className="relative bg-gray-800 text-white p-2 rounded-full">
          🔔
          {hasUnread && <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>}
        </button>

        {showNotificationList && (
          <div className="absolute right-0 mt-2 w-80 bg-white text-black p-4 rounded-lg shadow-lg">
            <h3 className="font-bold text-gray-700 mb-2">Today's Updates</h3>
            {notifications.length > 0 ? (
              notifications.map((note) => (
                <div key={note.id} className="p-2 border-b last:border-none">
                  📅 {note.message}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No updates yet.</p>
            )}
          </div>
        )}
      </div>

      {showEditModal && (
        <div
          id="edit-modal-overlay"
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={(e) => e.target.id === 'edit-modal-overlay' && setShowEditModal(false)}
        >
          <div className="bg-white p-8 rounded-lg w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4 text-black">Edit Appointment</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

            <form>
              <div className="mb-4">
                <label className="block text-black">Full Name</label>
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full px-3 py-2 border rounded text-black" />
              </div>
              <div className="mb-4">
                <label className="block text-black">Phone Number</label>
                <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="w-full px-3 py-2 border rounded text-black" />
              </div>
              <div className="mb-4">
                <label className="block text-black">Date</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-3 py-2 border rounded text-black" />
              </div>
              <div className="mb-4">
                <label className="block text-black">Time</label>
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full px-3 py-2 border rounded text-black" />
              </div>
              <div className="mb-4">
                <label className="block text-black">Service</label>
                <select value={service} onChange={(e) => setService(e.target.value)} className="w-full px-3 py-2 border rounded text-black">
                  <option value="" disabled>Select a Service</option>
                  <option value="Golden Bridal">Golden Bridal</option>
                  <option value="Premium Bridal">Premium Bridal</option>
                  <option value="Silver Studio">Silver Studio</option>
                  <option value="Golden Studio">Golden Studio</option>
                  <option value="Platinium Studio">Platinium Studio</option>
                  <option value="Refreshment">Refreshment</option>
                  <option value="Natural Makeup">Natural Makeup</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-black">Payment</label>
                <input type="number" value={payment} onChange={(e) => setPayment(e.target.value)} className="w-full px-3 py-2 border rounded text-black" />
              </div>
              <div className="mb-4">
                <label className="block text-black">Discount</label>
                <select value={discount} onChange={(e) => setDiscount(Number(e.target.value))} className="w-full px-3 py-2 border rounded text-black">
                  <option value={0}>No Discount</option>
                  <option value={15}>Loyalty (15%)</option>
                  <option value={10}>Bronze (10%)</option>
                  <option value={20}>Custom Discount (20%)</option>
                </select>
              </div>
              <button type="button" onClick={handleUpdate} className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-700">Update</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditAppointmentModal;


import { useState, useEffect } from 'react';
import axios from 'axios';

const EditAppointmentModal = ({
  currentAppointment,
  showEditModal,
  setShowEditModal,
  fetchAppointments,
  notifications=[],
  setNotifications,
  hasUnread,
  setHasUnread,
}) => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [service, setService] = useState('');
  const [payment, setPayment] = useState('');
  const [amountPaid, setAmountPaid] = useState('');
  const [remainingBalance, setRemainingBalance] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showNotificationList, setShowNotificationList] = useState(false);

  useEffect(() => {
    if (currentAppointment) {
      setFullName(currentAppointment.fullName || '');
      setPhoneNumber(currentAppointment.phoneNumber || '');
      setDate(currentAppointment.date || '');
      setTime(currentAppointment.time || '');
      setService(currentAppointment.service || '');
      setPayment(currentAppointment.payment || '');
      setAmountPaid(currentAppointment.amountPaid || '');
      setDiscount(currentAppointment.discount || 0);
      calculateRemainingBalance(currentAppointment.payment, currentAppointment.amountPaid);
      setError('');
    }
  }, [currentAppointment]);

  const calculateRemainingBalance = (total, paid) => {
    const remaining = parseFloat(total || 0) - parseFloat(paid || 0);
    setRemainingBalance(remaining >= 0 ? remaining.toFixed(2) : '0.00');
  };

  const handleUpdate = async () => {
    if (!fullName || !phoneNumber || !date || !time || !service || !payment || !amountPaid) {
      setError('All fields are required.');
      return;
    }

    try {
      const paymentAmount = parseFloat(payment);
      const paidAmount = parseFloat(amountPaid);
      const discountedPayment = paymentAmount - (paymentAmount * discount) / 100;
      const remaining = discountedPayment - paidAmount;

      await axios.put(`http://localhost:5000/api/appointments/${currentAppointment._id}`, {
        fullName,
        phoneNumber,
        date,
        time,
        service,
        payment: discountedPayment.toFixed(2),
        amountPaid: paidAmount.toFixed(2),
        remainingBalance: remaining.toFixed(2),
        discount,
      });

      fetchAppointments();
      setShowEditModal(false);
      setSuccessMessage('Appointment updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);

      const newNotification = {
        id: Date.now(),
        message: `Updated: ${fullName} at ${time} - Appointment details changed.`,
      };

      setNotifications((prev) => [newNotification, ...prev]);
      setHasUnread(true);
    } catch (error) {
      console.error('Error updating appointment:', error);
      setError('Failed to update appointment. Please try again.');
    }
  };

  const toggleNotifications = () => {
    setShowNotificationList(!showNotificationList);
    setHasUnread(false);
  };

  return (
    <>
      
      <div className="fixed top-4 right-6">
        <button onClick={toggleNotifications} className="relative bg-gray-800 text-white p-2 rounded-full">
          🔔
          {hasUnread && <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>}
        </button>

        {showNotificationList && (
          <div className="absolute right-0 mt-2 w-80 bg-white text-black p-4 rounded-lg shadow-lg">
            <h3 className="font-bold text-gray-700 mb-2">Today's Updates</h3>
            {notifications.length > 0 ? (
              notifications.map((note) => (
                <div key={note.id} className="p-2 border-b last:border-none">
                  📅 {note.message}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No updates yet.</p>
            )}
          </div>
        )}
      </div>
      {showEditModal && (
        <div
          id="edit-modal-overlay"
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={(e) => e.target.id === 'edit-modal-overlay' && setShowEditModal(false)}
        >
          <div className="bg-white p-8 rounded-lg w-full max-w-4xl">
            <h2 className="text-xl font-bold mb-4 text-black">Edit Appointment</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

            <form className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-black">Full Name</label>
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full px-3 py-2 border rounded text-black" />
              </div>
              <div>
                <label className="block text-black">Phone Number</label>
                <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="w-full px-3 py-2 border rounded text-black" />
              </div>
              <div>
                <label className="block text-black">Date</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-3 py-2 border rounded text-black" />
              </div>
              <div>
                <label className="block text-black">Time</label>
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full px-3 py-2 border rounded text-black" />
              </div>
              <div>
                <label className="block text-black">Service</label>
                <select value={service} onChange={(e) => setService(e.target.value)} className="w-full px-3 py-2 border rounded text-black">
                  <option value="" disabled>Select a Service</option>
                  <option value="Golden Bridal">Golden Bridal</option>
                  <option value="Premium Bridal">Premium Bridal</option>
                  <option value="Silver Studio">Silver Studio</option>
                  <option value="Golden Studio">Golden Studio</option>
                  <option value="Platinum Studio">Platinum Studio</option>
                  <option value="Refreshment">Refreshment</option>
                  <option value="Natural Makeup">Natural Makeup</option>
                </select>
              </div>
              <div>
                <label className="block text-black">Total Payment</label>
                <input type="number" value={payment} onChange={(e) => { setPayment(e.target.value); calculateRemainingBalance(e.target.value, amountPaid); }} className="w-full px-3 py-2 border rounded text-black" />
              </div>
              <div>
                <label className="block text-black">Amount Paid</label>
                <input type="number" value={amountPaid} onChange={(e) => { setAmountPaid(e.target.value); calculateRemainingBalance(payment, e.target.value); }} className="w-full px-3 py-2 border rounded text-black" />
              </div>
              <div>
                <label className="block text-black">Remaining Balance</label>
                <input type="text" value={remainingBalance} readOnly className="w-full px-3 py-2 border rounded bg-gray-100 text-black" />
              </div>
              <div className="col-span-2 flex justify-end">
                <button type="button" onClick={handleUpdate} className="bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-700">Update</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditAppointmentModal;*/
/*import { useState, useEffect } from 'react';
import axios from 'axios';

const EditAppointmentModal = ({
  currentAppointment,
  showEditModal,
  setShowEditModal,
  fetchAppointments,
}) => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [service, setService] = useState('');
  const [payment, setPayment] = useState('');
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [hasUnread, setHasUnread] = useState(false);
  const [showNotificationList, setShowNotificationList] = useState(false);
  const [amountPaid, setAmountPaid] = useState('');
  const [remainingBalance, setRemainingBalance] = useState(0);
  

  useEffect(() => {
    if (currentAppointment) {
      setFullName(currentAppointment.fullName || '');
      setPhoneNumber(currentAppointment.phoneNumber || '');
      setDate(currentAppointment.date || '');
      setTime(currentAppointment.time || '');
      setService(currentAppointment.service || '');
      setPayment(currentAppointment.payment || '');
      setAmountPaid(currentAppointment.amountPaid || '');
      setDiscount(currentAppointment.discount || 0);
      calculateRemainingBalance(currentAppointment.payment, currentAppointment.amountPaid);
      
      setError('');
    }
  }, [currentAppointment]);

  const calculateRemainingBalance = (total, paid) => {
    const remaining = parseFloat(total || 0) - parseFloat(paid || 0);
    setRemainingBalance(remaining >= 0 ? remaining.toFixed(2) : '0.00');
  };

  const handleUpdate = async () => {
    if (!fullName || !phoneNumber || !date || !time || !service || !payment) {
      setError('All fields are required.');
      return;
    }
  
    try {
      const { data: appointments } = await axios.get('http://localhost:5000/api/appointments');
  
      const isConflict = appointments.some(
        (appointment) =>
          appointment._id !== currentAppointment._id &&
          appointment.date === date &&
          appointment.time === time &&
          appointment.service === service
      );
  
      if (isConflict) {
        setError('This service is already booked for the selected date and time.');
        return;
      }
  
      const paymentAmount = parseFloat(payment);
      const paidAmount = parseFloat(amountPaid);
      const discountedPayment = paymentAmount - (paymentAmount * discount) / 100;
      const remaining = discountedPayment - paidAmount;
      const updatedFields = [];
      if (fullName !== currentAppointment.fullName) updatedFields.push('Full Name');
      if (phoneNumber !== currentAppointment.phoneNumber) updatedFields.push('Phone Number');
      if (date !== currentAppointment.date) updatedFields.push('Date');
      if (time !== currentAppointment.time) updatedFields.push('Time');
      if (service !== currentAppointment.service) updatedFields.push('Service');
      if (discountedPayment.toFixed(2) !== currentAppointment.payment) updatedFields.push('Payment');
      if (discount !== currentAppointment.discount) updatedFields.push('Discount');
  
      if (updatedFields.length === 0) {
        setError('No changes were made.');
        return;
      }
  
      await axios.put(`http://localhost:5000/api/appointments/${currentAppointment._id}`, {
        fullName,
        phoneNumber,
        date,
        time,
        service,
        payment: discountedPayment.toFixed(2),
        amountPaid: paidAmount.toFixed(2),
        remainingBalance: remaining.toFixed(2),
        discount,
      });
  
      fetchAppointments();
      setShowEditModal(false);
  
      setSuccessMessage('Appointment updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
  
      const newNotification = {
        id: Date.now(),
        message: `Updated: ${fullName} at ${time} - ${updatedFields.join(', ')}`,
      };
  
      setNotifications((prev) => [newNotification, ...prev]);
      setHasUnread(true); // Mark notifications as unread
    } catch (error) {
      console.error('Error updating appointment:', error);
      setError('Failed to update appointment. Please try again.');
    }
  };
  

  const toggleNotifications = () => {
    setShowNotificationList(!showNotificationList);
    setHasUnread(false); // Mark as read
  };

  return (
    <>
      
      <div className="fixed top-4 right-6">
        <button onClick={toggleNotifications} className="relative bg-gray-800 text-white p-2 rounded-full">
          🔔
          {hasUnread && <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>}
        </button>

        {showNotificationList && (
          <div className="absolute right-0 mt-2 w-80 bg-white text-black p-4 rounded-lg shadow-lg">
            <h3 className="font-bold text-gray-700 mb-2">Today's Updates</h3>
            {notifications.length > 0 ? (
              notifications.map((note) => (
                <div key={note.id} className="p-2 border-b last:border-none">
                  📅 {note.message}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No updates yet.</p>
            )}
          </div>
        )}
      </div>

      {showEditModal && (
        <div
          id="edit-modal-overlay"
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={(e) => e.target.id === 'edit-modal-overlay' && setShowEditModal(false)}
        >
          <div className="bg-white p-8 rounded-lg w-full max-w-4xl">
            <h2 className="text-xl font-bold mb-4 text-black">Edit Appointment</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
            <form className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-black">Full Name</label>
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full px-3 py-2 border rounded text-black" />
              </div>
              <div>
                <label className="block text-black">Phone Number</label>
                <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="w-full px-3 py-2 border rounded text-black" />
              </div>
              <div>
                <label className="block text-black">Date</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-3 py-2 border rounded text-black" />
              </div>
              <div>
                <label className="block text-black">Time</label>
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full px-3 py-2 border rounded text-black" />
              </div>
              <div>
                <label className="block text-black">Service</label>
                <select value={service} onChange={(e) => setService(e.target.value)} className="w-full px-3 py-2 border rounded text-black">
                  <option value="" disabled>Select a Service</option>
                  <option value="Golden Bridal">Golden Bridal</option>
                  <option value="Premium Bridal">Premium Bridal</option>
                  <option value="Silver Studio">Silver Studio</option>
                  <option value="Golden Studio">Golden Studio</option>
                  <option value="Platinum Studio">Platinum Studio</option>
                  <option value="Refreshment">Refreshment</option>
                  <option value="Natural Makeup">Natural Makeup</option>
                </select>
              </div>
              <div>
                <label className="block text-black">Total Payment</label>
                <input type="number" value={payment} onChange={(e) => { setPayment(e.target.value); calculateRemainingBalance(e.target.value, amountPaid); }} className="w-full px-3 py-2 border rounded text-black" />
              </div>
              <div>
                <label className="block text-black">Amount Paid</label>
                <input type="number" value={amountPaid} onChange={(e) => { setAmountPaid(e.target.value); calculateRemainingBalance(payment, e.target.value); }} className="w-full px-3 py-2 border rounded text-black" />
              </div>
              <div>
                <label className="block text-black">Remaining Balance</label>
                <input type="text" value={remainingBalance} readOnly className="w-full px-3 py-2 border rounded bg-gray-100 text-black" />
              </div>
              <div className="col-span-2 flex justify-end">
                <button type="button" onClick={handleUpdate} className="bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-700">Update</button>
                <button type="button" onClick={() => setShowEditModal(false)} className="ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"> Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditAppointmentModal;*/





/*import React, { useState } from 'react';
import axios from 'axios';

const EditAppointmentModal = ({ currentAppointment, setShowEditModal, onEditComplete }) => {
  const [formData, setFormData] = useState({
    fullName: currentAppointment.fullName,
    phoneNumber: currentAppointment.phoneNumber,
    service: currentAppointment.service,
    date: currentAppointment.date,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/appointments/${currentAppointment._id}`, formData);
      onEditComplete(response.data);
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Appointment</h2>

        <form onSubmit={handleSubmit}>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="border p-2 w-full mb-4" />
          <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="border p-2 w-full mb-4" />
          <input type="text" name="service" value={formData.service} onChange={handleChange} className="border p-2 w-full mb-4" />
          <input type="date" name="date" value={formData.date} onChange={handleChange} className="border p-2 w-full mb-4" />

          <div className="flex justify-end">
            <button type="button" className="bg-gray-400 text-white px-4 py-2 mr-2 rounded" onClick={() => setShowEditModal(false)}>
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAppointmentModal;*/
/*import React, { useState, useEffect } from "react";
import axios from "axios";

const EditAppointmentModal = ({ currentAppointment, setShowEditModal, onEditComplete, appointments = [] }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    service: "",
    date: "",
    time: "",
    payment: "",
    paidAmount: "",
    discount: "",
    remainingBalance: "0.00",
  });

  useEffect(() => {
    if (currentAppointment) {
      setFormData({
        fullName: currentAppointment.fullName || "",
        phoneNumber: currentAppointment.phoneNumber || "",
        service: currentAppointment.service || "",
        date: currentAppointment.date
          ? new Date(currentAppointment.date).toISOString().split("T")[0]
          : "",
        time: currentAppointment.time || "",
        payment: currentAppointment.payment || "",
        paidAmount: currentAppointment.paidAmount || "",
        discount: currentAppointment.discount || "",
        remainingBalance: calculateRemainingBalance(
          currentAppointment.payment,
          currentAppointment.paidAmount,
          currentAppointment.discount
        ),
      });
    }
  }, [currentAppointment]);

  const calculateRemainingBalance = (total, paid, discount) => {
    const discountedTotal = parseFloat(total || 0) - (parseFloat(total || 0) * parseFloat(discount || 0)) / 100;
    const remaining = discountedTotal - parseFloat(paid || 0);
    return remaining >= 0 ? remaining.toFixed(2) : "0.00";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };

    if (["payment", "paidAmount", "discount"].includes(name)) {
      updatedForm.remainingBalance = calculateRemainingBalance(
        updatedForm.payment,
        updatedForm.paidAmount,
        updatedForm.discount
      );
    }

    setFormData(updatedForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!Array.isArray(appointments)) {
      console.error("Invalid appointments data:", appointments);
      alert("Error: Unable to validate appointments. Please refresh and try again.");
      return;
    }
  
    const today = new Date().setHours(0, 0, 0, 0);
    const selectedDate = new Date(formData.date).setHours(0, 0, 0, 0);
  
    if (selectedDate < today) {
      alert("You cannot edit an appointment to a past date.");
      return;
    }
  
    const conflicts = appointments.some(
      (appointment) =>
        appointment._id !== currentAppointment._id &&
        appointment.date === formData.date &&
        appointment.time === formData.time
    );
  
    if (conflicts) {
      alert("The selected date and time are already booked. Please choose a different time.");
      return;
    }
  
    try {
      const response = await axios.put(
        `http://localhost:5000/api/appointments/${currentAppointment._id}`,
        formData
      );
  
      // ✅ Update the dashboard state without refreshing
      onEditComplete((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === currentAppointment._id ? response.data : appointment
        )
      );
  
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating appointment:", error.response?.data || error.message);
      alert("Failed to update appointment. Please try again.");
    }
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-black">Edit Appointment</h2>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="border p-2 w-full" placeholder="Full Name" />
          <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="border p-2 w-full" placeholder="Phone Number" />
          <input type="date" name="date" value={formData.date} onChange={handleChange} className="border p-2 w-full" />
          <input type="time" name="time" value={formData.time} onChange={handleChange} className="border p-2 w-full" />

          <select name="service" value={formData.service} onChange={handleChange} className="border p-2 w-full">
            <option value="" disabled>Select a Service</option>
            <option value="Golden Bridal">Golden Bridal</option>
            <option value="Premium Bridal">Premium Bridal</option>
            <option value="Silver Studio">Silver Studio</option>
            <option value="Golden Studio">Golden Studio</option>
            <option value="Platinum Studio">Platinum Studio</option>
            <option value="Refreshment">Refreshment</option>
            <option value="Natural Makeup">Natural Makeup</option>
          </select>

          <input type="number" name="payment" value={formData.payment} onChange={handleChange} className="border p-2 w-full" placeholder="Total Payment" />
          <input type="number" name="paidAmount" value={formData.paidAmount} onChange={handleChange} className="border p-2 w-full" placeholder="Amount Paid" />
          <input type="number" name="discount" value={formData.discount} onChange={handleChange} className="border p-2 w-full" placeholder="Discount (%)" />

          <p className="text-lg font-semibold text-black">Remaining Balance: ${formData.remainingBalance}</p>

          <div className="flex justify-end">
            <button type="button" className="bg-gray-400 text-white px-4 py-2 mr-2 rounded" onClick={() => setShowEditModal(false)}>
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAppointmentModal;*/
/*import React, { useState, useEffect } from "react";
import axios from "axios";

const EditAppointmentModal = ({ currentAppointment, setShowEditModal, onEditComplete, appointments = [] }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    service: "",
    date: "",
    time: "",
    payment: "",
    paidAmount: "",
    discount: "",
    remainingBalance: "0.00",
  });

  const [message, setMessage] = useState(null); // For success/error messages

  useEffect(() => {
    if (currentAppointment) {
      setFormData({
        fullName: currentAppointment.fullName || "",
        phoneNumber: currentAppointment.phoneNumber || "",
        service: currentAppointment.service || "",
        date: currentAppointment.date
          ? new Date(currentAppointment.date).toISOString().split("T")[0]
          : "",
        time: currentAppointment.time || "",
        payment: currentAppointment.payment || "",
        paidAmount: currentAppointment.paidAmount || "",
        discount: currentAppointment.discount || "",
        remainingBalance: calculateRemainingBalance(
          currentAppointment.payment,
          currentAppointment.paidAmount,
          currentAppointment.discount
        ),
      });
    }
  }, [currentAppointment]);

  const calculateRemainingBalance = (total, paid, discount) => {
    const discountedTotal = parseFloat(total || 0) - (parseFloat(total || 0) * parseFloat(discount || 0)) / 100;
    const remaining = discountedTotal - parseFloat(paid || 0);
    return remaining >= 0 ? remaining.toFixed(2) : "0.00";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };

    if (["payment", "paidAmount", "discount"].includes(name)) {
      updatedForm.remainingBalance = calculateRemainingBalance(
        updatedForm.payment,
        updatedForm.paidAmount,
        updatedForm.discount
      );
    }

    setFormData(updatedForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!Array.isArray(appointments)) {
      console.error("Invalid appointments data:", appointments);
      alert("Error: Unable to validate appointments. Please refresh and try again.");
      return;
    }

    const today = new Date().setHours(0, 0, 0, 0);
    const selectedDate = new Date(formData.date).setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      alert("You cannot edit an appointment to a past date.");
      return;
    }

    // ❌ Check for scheduling conflicts
    const conflictExists = appointments.some(
      (appointment) =>
        appointment._id !== currentAppointment._id &&
        appointment.date === formData.date &&
        appointment.time === formData.time
    );

    if (conflictExists) {
      alert("The selected date and time are already booked. Please choose a different time.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/appointments/${currentAppointment._id}`,
        formData
      );

      // ✅ Update appointments list immediately without refreshing
      onEditComplete((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === currentAppointment._id ? response.data : appointment
        )
      );

      setMessage("Appointment updated successfully!"); // Show success message

      setTimeout(() => {
        setShowEditModal(false);
      }, 1500); // Close modal after 1.5 seconds
    } catch (error) {
      console.error("Error updating appointment:", error.response?.data || error.message);
      alert("Failed to update appointment. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-black">Edit Appointment</h2>

        {message && <p className="text-green-600 text-sm mb-3">{message}</p>}

        <form onSubmit={handleSubmit} className="grid gap-4">
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="border p-2 w-full" placeholder="Full Name" />
          <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="border p-2 w-full" placeholder="Phone Number" />
          <input type="date" name="date" value={formData.date} onChange={handleChange} className="border p-2 w-full" />
          <input type="time" name="time" value={formData.time} onChange={handleChange} className="border p-2 w-full" />

          <select name="service" value={formData.service} onChange={handleChange} className="border p-2 w-full">
            <option value="" disabled>Select a Service</option>
            <option value="Golden Bridal">Golden Bridal</option>
            <option value="Premium Bridal">Premium Bridal</option>
            <option value="Silver Studio">Silver Studio</option>
            <option value="Golden Studio">Golden Studio</option>
            <option value="Platinum Studio">Platinum Studio</option>
            <option value="Refreshment">Refreshment</option>
            <option value="Natural Makeup">Natural Makeup</option>
          </select>

          <input type="number" name="payment" value={formData.payment} onChange={handleChange} className="border p-2 w-full" placeholder="Total Payment" />
          <input type="number" name="paidAmount" value={formData.paidAmount} onChange={handleChange} className="border p-2 w-full" placeholder="Amount Paid" />
          <input type="number" name="discount" value={formData.discount} onChange={handleChange} className="border p-2 w-full" placeholder="Discount (%)" />

          <p className="text-lg font-semibold text-black">Remaining Balance: ${formData.remainingBalance}</p>

          <div className="flex justify-end">
            <button type="button" className="bg-gray-400 text-white px-4 py-2 mr-2 rounded" onClick={() => setShowEditModal(false)}>
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAppointmentModal;*/

/*import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditAppointmentModal = ({
  currentAppointment,
  showEditModal,
  setShowEditModal,
  fetchAppointments = () => {}, // Provide default function to prevent errors
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    date: '',
    time: '',
    service: '',
    payment: '',
    paidAmount: '',
    discount: '',
    remainingBalance: '0.00'
  });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatLocalDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const calculateRemainingBalance = () => {
      const total = parseFloat(formData.payment) || 0;
      const paid = parseFloat(formData.paidAmount) || 0;
      const discount = parseFloat(formData.discount) || 0;
      
      const discountedTotal = total - (total * discount / 100);
      const remaining = discountedTotal - paid;
      return Math.max(0, remaining).toFixed(2);
    };

    setFormData(prev => ({
      ...prev,
      remainingBalance: calculateRemainingBalance()
    }));
  }, [formData.payment, formData.paidAmount, formData.discount]);

  useEffect(() => {
    if (currentAppointment) {
      setFormData({
        fullName: currentAppointment.fullName || '',
        phoneNumber: currentAppointment.phoneNumber || '',
        date: currentAppointment.date 
          ? formatLocalDate(new Date(currentAppointment.date))
          : '',
        time: currentAppointment.time ? currentAppointment.time.slice(0,5) : '',
        service: currentAppointment.service || '',
        payment: currentAppointment.payment || '',
        paidAmount: currentAppointment.paidAmount || '',
        discount: currentAppointment.discount || '',
        remainingBalance: '0.00'
      });
      setError('');
    }
  }, [currentAppointment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    setIsSubmitting(true);
    setError('');

    // Validate required fields
    const requiredFields = ['fullName', 'phoneNumber', 'date', 'time', 'service', 'payment'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      setError(`Missing required fields: ${missingFields.join(', ')}`);
      setIsSubmitting(false);
      return;
    }

    // Validate date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(formData.date);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      setError('Cannot schedule in the past');
      setIsSubmitting(false);
      return;
    }

    try {
      // Check for time slot conflicts
      const { data: appointments } = await axios.get('http://localhost:5000/api/appointments');
      
      const isConflict = appointments.some(
        (appointment) =>
          appointment._id !== currentAppointment._id &&
          formatLocalDate(new Date(appointment.date)) === formData.date &&
          appointment.time.slice(0,5) === formData.time
      );

      if (isConflict) {
        setError('This time slot is already booked');
        setIsSubmitting(false);
        return;
      }

      // Update appointment
      await axios.put(
        `http://localhost:5000/api/appointments/${currentAppointment._id}`, 
        {
          ...formData,
          time: formData.time.includes(':') ? formData.time : `${formData.time}:00`
        }
      );
      
      // Refresh appointments list
      // Refresh appointments list
    if (typeof fetchAppointments === 'function') {
      await fetchAppointments();
    }
    
    // Show success message
    toast.success('Appointment updated successfully!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    // Close modal
    setShowEditModal(false);
    
  } catch (error) {
    console.error('Update error:', error);
    setError(error.response?.data?.message || 'Failed to update appointment');
    toast.error('Failed to update appointment', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  } finally {
    setIsSubmitting(false);
  }
};

  const handleOutsideClick = (e) => {
    if (e.target.id === 'edit-modal-overlay') {
      setShowEditModal(false);
    }
  };

  return (
    <div
      id="edit-modal-overlay"
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 overflow-auto"
      onClick={handleOutsideClick}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl landscape:w-full landscape:max-w-5xl">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Appointment</h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Time</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
            </div>

            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Service</label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                >
                  <option value="" disabled>Select Service</option>
                  <option value="Golden Bridal">Golden Bridal</option>
                  <option value="Premium Bridal">Premium Bridal</option>
                  <option value="Silver Studio">Silver Studio</option>
                  <option value="Golden Studio">Golden Studio</option>
                  <option value="Platinium Studio">Platinium Studio</option>
                  <option value="Refreshment">Refreshment</option>
                  <option value="Natural Makeup">Natural Makeup</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Total Payment ($)</label>
                <input
                  type="number"
                  name="payment"
                  value={formData.payment}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                  min="0"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Amount Paid ($)</label>
                <input
                  type="number"
                  name="paidAmount"
                  value={formData.paidAmount}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                  min="0"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Discount (%)</label>
                <input
                  type="number"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  min="0"
                  max="100"
                />
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <label className="block text-gray-700 font-semibold mb-1">Remaining Balance</label>
                <div className="text-xl font-bold text-blue-600">
                  ${formData.remainingBalance}
                </div>
              </div>
            </div>
          </div>


          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={() => setShowEditModal(false)}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Updating...' : 'Update Appointment'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAppointmentModal;*/
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditAppointmentModal = ({
  currentAppointment,
  showEditModal,
  setShowEditModal,
  fetchAppointments = () => {}, // Default function to prevent errors
  onEditComplete, // Pass function to update UI in parent
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    date: '',
    time: '',
    service: '',
    payment: '',
    paidAmount: '',
    discount: '',
    remainingBalance: '0.00'
  });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);


  useEffect(() => {
    const payment = parseFloat(formData.payment) || 0;
    const paidAmount = parseFloat(formData.paidAmount) || 0;
    const discount = parseFloat(formData.discount) || 0;
  
    const discountedAmount = payment * (discount / 100);
    const remaining = payment - discountedAmount - paidAmount;
  
    setFormData(prev => ({
      ...prev,
      remainingBalance: remaining > 0 ? remaining.toFixed(2) : '0.00'
    }));
  }, [formData.payment, formData.paidAmount, formData.discount]);
  


  useEffect(() => {
    if (currentAppointment) {
      setFormData({
        fullName: currentAppointment.fullName || '',
        phoneNumber: currentAppointment.phoneNumber || '',
        date: currentAppointment.date ? formatLocalDate(currentAppointment.date) : '',
        time: currentAppointment.time ? currentAppointment.time.slice(0, 5) : '',
        service: currentAppointment.service || '',
        payment: currentAppointment.payment || '',
        paidAmount: currentAppointment.paidAmount || '',
        discount: currentAppointment.discount || '',
        remainingBalance: '0.00'
      });
      setError('');
    }
  }, [currentAppointment]);

  const formatLocalDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    return d.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    setIsSubmitting(true);
    setError('');

    const requiredFields = ['fullName', 'phoneNumber', 'date', 'time', 'service', 'payment'];
    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
      setError(`Missing required fields: ${missingFields.join(', ')}`);
      setIsSubmitting(false);
      return;
    }

    try {
      // Check for time slot conflicts
      const { data: appointments } = await axios.get('http://localhost:5000/api/appointments');
      const isConflict = appointments.some(
        (appointment) =>
          appointment._id !== currentAppointment._id &&
          formatLocalDate(appointment.date) === formData.date &&
          appointment.time.slice(0, 5) === formData.time
      );

      if (isConflict) {
        setError('This time slot is already booked');
        setIsSubmitting(false);
        return;
      }

      // Update appointment in the database
      const response = await axios.put(
        `http://localhost:5000/api/appointments/${currentAppointment._id}`,
        {
          ...formData,
          time: formData.time.includes(':') ? formData.time : `${formData.time}:00`
        }
      );

      const updatedAppointment = response.data;

      // Notify parent about the update
      if (onEditComplete) {
        onEditComplete(currentAppointment, updatedAppointment);
      }

      // Refresh appointments list
      await fetchAppointments();

      // **Send Notification for Dashboard**
      await axios.post('http://localhost:5000/api/notifications', {
        message: `Appointment updated for ${formData.fullName} on ${formData.date} at ${formData.time}`,
        type: 'appointment-update',
        timestamp: new Date().toISOString()
      });

      // Show success toast
      toast.success('Appointment updated successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Close modal
      setShowEditModal(false);

    } catch (error) {
      console.error('Update error:', error);
      setError(error.response?.data?.message || 'Failed to update appointment');
      toast.error('Failed to update appointment', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOutsideClick = (e) => {
    if (e.target.id === 'edit-modal-overlay') {
      setShowEditModal(false);
    }
  };

 

  return (
    <div
      id="edit-modal-overlay"
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 overflow-auto"
      onClick={handleOutsideClick}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl landscape:w-full landscape:max-w-5xl">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Appointment</h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Time</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
            </div>

            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Service</label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                >
                  <option value="" disabled>Select Service</option>
                  <option value="Golden Bridal">Golden Bridal</option>
                  <option value="Premium Bridal">Premium Bridal</option>
                  <option value="Silver Studio">Silver Studio</option>
                  <option value="Golden Studio">Golden Studio</option>
                  <option value="Platinium Studio">Platinium Studio</option>
                  <option value="Refreshment">Refreshment</option>
                  <option value="Natural Makeup">Natural Makeup</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Total Payment ($)</label>
                <input
                  type="number"
                  name="payment"
                  value={formData.payment}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                  min="0"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Amount Paid ($)</label>
                <input
                  type="number"
                  name="paidAmount"
                  value={formData.paidAmount}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                  min="0"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Discount (%)</label>
                <input
                  type="number"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  min="0"
                  max="100"
                />
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <label className="block text-gray-700 font-semibold mb-1">Remaining Balance</label>
                <div className="text-xl font-bold text-blue-600">
                  ${formData.remainingBalance}
                </div>
              </div>
            </div>
          </div>


          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={() => setShowEditModal(false)}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Updating...' : 'Update Appointment'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAppointmentModal;

       
       

          
          
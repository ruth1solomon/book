
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
  



  /*
  const handleUpdate = async () => {
    if (!fullName || !phoneNumber || !date || !time || !service || !payment) {
      setError('All fields are required.');
      return;
    }

    try {
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
*/

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


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import butterfly from './Images/Butterfly1.png';

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    services: [], // Ensure services is always an array
    payment: '',
  });

  const [serviceDetails, setServiceDetails] = useState({});
  const [appointments, setAppointments] = useState([]); // Store existing appointments
  const [alert, setAlert] = useState({ message: '', type: '' }); // For success/error messages

  const servicesList = [
    'Bridal Makeup',
    'Natural Makeup',
    'Hair Styling',
    'Facial Treatment',
    'Manicure',
    'Pedicure',
    'Lashes',
  ];

  // Fetch existing appointments on component mount
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/appointments');
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
    fetchAppointments();
  }, []);

  const handleServiceToggle = (service) => {
    const newServices = formData.services.includes(service)
      ? formData.services.filter((s) => s !== service)
      : [...formData.services, service];

    setFormData({ ...formData, services: newServices });

    if (!formData.services.includes(service)) {
      setServiceDetails({
        ...serviceDetails,
        [service]: { date: '', time: '' },
      });
    } else {
      const updatedServiceDetails = { ...serviceDetails };
      delete updatedServiceDetails[service];
      setServiceDetails(updatedServiceDetails);
    }
  };

  const handleServiceDateTimeChange = (service, key, value) => {
    setServiceDetails({
      ...serviceDetails,
      [service]: { ...serviceDetails[service], [key]: value },
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  


  // Check for past dates
  const today = new Date();
  const isPastDate = formData.services.some((service) => {
    const serviceDate = new Date(serviceDetails[service]?.date);
    return serviceDate < today.setHours(0, 0, 0, 0);
  });

  if (isPastDate) {
    setAlert({
      message: 'You cannot book appointments in the past. Please select a future date.',
      type: 'error',
    });
    return;
  }



    // Validate for conflicts
    const conflicts = formData.services.some((service) => {
      const { date, time } = serviceDetails[service] || {};
      return appointments.some(
        (appointment) =>
          appointment.service === service &&
          appointment.date === date &&
          appointment.time === time
      );
    });
  
    if (conflicts) {
      setAlert({
        message: 'The selected time slot for one or more services is already booked. Please choose a different time.',
        type: 'error',
      });
      return;
    }
  
    // Prepare data for submission
    const appointmentData = formData.services.map((service) => ({
      fullName: formData.fullName,
      phoneNumber: formData.phoneNumber,
      service,
      date: serviceDetails[service]?.date,
      time: serviceDetails[service]?.time,
      payment: formData.payment,
    }));
  
    try {
      const response = await axios.post('http://localhost:5000/api/appointments/create', appointmentData);
      console.log('Response:', response); // Log response
  
      setAlert({
        message: 'Appointment booked successfully!',
        type: 'success',
      });
  
      // Reset form after success
      setFormData({
        fullName: '',
        phoneNumber: '',
        services: [],
        payment: '',
      });
      setServiceDetails({});
  
      // Fetch updated appointments
      const updatedAppointments = await axios.get('http://localhost:5000/api/appointments');
      setAppointments(updatedAppointments.data);
    } catch (error) {
      console.error('Error booking the appointment:', error.response.data); // Log error response
      setAlert({
        message: 'There was an error booking the appointment. Please try again.',
        type: 'error',
      });
    }
  };
  

  return (
    <div>
      <Navbar />

      {alert.message && (
        <div
          className={`fixed top-5 left-1/2 transform -translate-x-1/2 w-full max-w-md p-4 mb-4 rounded-lg shadow-lg bg-white-chocolate ${
            alert.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {alert.message}
        </div>
      )}

      <form
        className="max-w-4xl mx-auto bg-rose-50 p-6 rounded-2xl text-black my-10 border border-gray-500 "
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl mb-6 text-brown-800 text-center font-bold">Book an Appointment</h2>

        <div className="flex flex-wrap">
          <div className="w-1/2 p-2">
            <label className="block text-brown-800">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-2 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 rounded"
              required
            />
          </div>
          <div className="w-1/2 p-2">
            <label className="block text-brown-800">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full p-2 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 rounded"
              required
            />
          </div>
        </div>

        <div className="p-2">
          <label className="block text-brown-800">Services</label>
          <div className="grid grid-cols-4 gap-4">
            {servicesList.map((service) => (
              <div key={service}>
                <input
                  type="checkbox"
                  id={service}
                  checked={formData.services.includes(service)}
                  onChange={() => handleServiceToggle(service)}
                />
                <label htmlFor={service} className="ml-2 text-brown-800">
                  {service}
                </label>
                {formData.services.includes(service) && (
                  <div className="mt-2">
                    <label className="block text-brown-800">Date</label>
                    <input
                      type="date"
                      value={serviceDetails[service]?.date || ''}
                      onChange={(e) => handleServiceDateTimeChange(service, 'date', e.target.value)}
                      className="w-full p-2 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 rounded"
                      required
                    />
                    <label className="block text-brown-800">Time</label>
                    <input
                      type="time"
                      value={serviceDetails[service]?.time || ''}
                      onChange={(e) => handleServiceDateTimeChange(service, 'time', e.target.value)}
                      className="w-full p-2 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 rounded"
                      required
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-2">
          <label className="block text-brown-800">Payment</label>
          <input
            type="text"
            name="payment"
            value={formData.payment}
            onChange={handleChange}
            className="w-full p-2 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 rounded"
            required
          />
        </div>

        <div className="flex justify-center">
  <button type="submit" className="bg-pink-500 px-6 py-2 rounded-2xl text-white font-medium hover:bg-pink-600 mt-4">
    Book Now
  </button>
</div>
      </form>
      
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

export default AppointmentForm;



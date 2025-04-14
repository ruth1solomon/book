/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import butterfly from './Images/dd.png';
import BridalServices from './BridalServices';

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
    'Golden Bridal ',
    'Premium Bridal ',  
    'Silver Studio',
    'Golden Studio',
    'Platinium Studio',
    'Refreshment',
    'Natural Makeup',

    'Meles',
    'Loyality Discount',
    'Bronze Discount',
    'Family Package',
    'Custom Discount',
    'sisters Discount same day '
    

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
          className={`fixed top-5 left-1/2 transform -translate-x-1/2 w-full max-w-md p-4 mb-4 rounded-lg shadow-lg bg-soft-coral ${
            alert.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {alert.message}
        </div>
      )}

      <form
        className="max-w-4xl mx-auto bg-soft-coral p-6 rounded-2xl text-black my-10 border border-gray-500 "
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
              className="w-full p-2 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-burgendy rounded"
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
              className="w-full p-2 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-burgendy rounded"
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
                      className="w-full p-2 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-burgendy rounded"
                      required
                    />
                    <label className="block text-brown-800">Time</label>
                    <input
                      type="time"
                      value={serviceDetails[service]?.time || ''}
                      onChange={(e) => handleServiceDateTimeChange(service, 'time', e.target.value)}
                      className="w-full p-2 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-burgendy rounded"
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
            className="w-full p-2 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-burgendy rounded"
            required
          />
        </div>

        <div className="flex justify-center">
  <button type="submit" className="bg-burgendy px-6 py-2 rounded-2xl text-white font-medium hover:bg-gold mt-4">
    Book Now
  </button>
</div>
      </form>
      
  

<BridalServices/>
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

export default AppointmentForm;*/





/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import butterfly from './Images/dd.png';
import BridalServices from './BridalServices';

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    services: [],
    discount:[],
    payment: '',
  });

  const [serviceDetails, setServiceDetails] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [alert, setAlert] = useState({ message: '', type: '' });

  const discountServices = ['Loyality Discount', 'Bronze Discount', 'Family Package', 'Custom Discount'];

  const servicesList = [
    'Golden Bridal ',
    'Premium Bridal ',
    'Silver Studio',
    'Golden Studio',
    'Platinium Studio',
    'Refreshment',
    'Natural Makeup',
    'Meles መልስ',
    
  ];

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



  const discountRates = {
    "Loyality Discount": 10, // 10% discount
    "Bronze Discount": 5,    // 5% discount
    "Custom Discount": 15    // 15% discount
  };
  
 
  const handleServiceToggle = (service) => {
    const newServices = formData.services.includes(service)
      ? formData.services.filter((s) => s !== service)
      : [...formData.services, service];

    setFormData({ ...formData, services: newServices });
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

 //this is added
 const handleDiscountChange = (e) => {
  const selectedDiscount = e.target.value;
  setFormData({ ...formData, discount: selectedDiscount });

  if (selectedDiscount) {
    setAlert({
      message: `You have received a ${selectedDiscount}% discount! This has been added to the dashboard.`,
      type: 'success',
    });

    setTimeout(() => {
      setAlert({ message: '', type: '' });
    }, 3000);
  }
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
        message: "You cannot book appointments in the past. Please select a future date.",
        type: "error",
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
        message: "The selected time slot for one or more services is already booked. Please choose a different time.",
        type: "error",
      });
      return;
    }
  
    // Calculate discount amount
    const selectedDiscount = formData.services.find((service) => discountRates[service]) || 0;
    const discountPercentage = discountRates[selectedDiscount] || 0;
  
    // Prepare data for submission
    const appointmentData = formData.services.map((service) => ({
      fullName: formData.fullName,
      phoneNumber: formData.phoneNumber,
      service,
      date: serviceDetails[service]?.date,
      time: serviceDetails[service]?.time,
      payment: formData.payment,
      discount: formData.discount, // Send discount to backend
    }));
  
    try {
      const response = await axios.post("http://localhost:5000/api/appointments/create", appointmentData);
      console.log("Response:", response);
  
      setAlert({
        message: "Appointment booked successfully !",
        type: "success",
      });
  
      // Reset form after success
      setFormData({
        fullName: "",
        phoneNumber: "",
        services: [],
        payment: "",
        discount: 0,
      });
      setServiceDetails({});
  
      // Fetch updated appointments (including discount updates for the dashboard)
      const updatedAppointments = await axios.get("http://localhost:5000/api/appointments");
      setAppointments(updatedAppointments.data);
    } catch (error) {
      console.error("Error booking the appointment:", error.response?.data);
      setAlert({
        message: "There was an error booking the appointment. Please try again.",
        type: "error",
      });
    }
  };
  

  return (
    <div>
      <Navbar />

      {alert.message && (
        <div className={`fixed top-5 left-1/2 transform -translate-x-1/2 w-full max-w-md p-4 mb-4 rounded-lg shadow-lg ${
          alert.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {alert.message}
        </div>
      )}

      <form className="max-w-4xl mx-auto bg-soft-coral p-6 rounded-2xl text-black my-10 border border-gray-500" onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-6 text-brown-800 text-center font-bold">Book an Appointment</h2>

        <div className="flex flex-wrap">
          <div className="w-1/2 p-2">
            <label className="block text-md font-semibold">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-2 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-burgendy rounded"
              required
            />
          </div>
          <div className="w-1/2 p-2">
            <label className="block text-md font-semibold">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full p-2 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-burgendy rounded"
              required
            />
          </div>
        </div>

        <div className="p-2">
          <label className="block text-md font-semibold my-2">Services</label>
          <div className="grid grid-cols-4 gap-4">
            {servicesList.map((service) => (
              <div key={service}>
                <input
                  type="checkbox"
                  id={service}
                  checked={formData.services.includes(service)}
                  onChange={() => handleServiceToggle(service)}
                />
                <label htmlFor={service} className="ml-2 text-brown-800">{service}</label>

                {formData.services.includes(service) && discountServices.includes(service) && (
                  <p className="text-green-700 text-sm mt-1">You have a 10% discount. Add note in the dashboard.</p>
                )}

                {formData.services.includes(service) && !discountServices.includes(service) && (
                  <div className="mt-2">
                    <label className="block text-brown-800">Date</label>
                    <input
                      type="date"
                      value={serviceDetails[service]?.date || ''}
                      onChange={(e) => handleServiceDateTimeChange(service, 'date', e.target.value)}
                      className="w-full p-2 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-burgendy rounded"
                      required
                    />
                    <label className="block text-brown-800">Time</label>
                    <input
                      type="time"
                      value={serviceDetails[service]?.time || ''}
                      onChange={(e) => handleServiceDateTimeChange(service, 'time', e.target.value)}
                      className="w-full p-2 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-burgendy rounded"
                      required
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>



      <div className='p-2'> 
          <h3 className="text-md font-semibold mt-4 mb-2">Select Discount</h3>
          <div className='flex m-3 '>
            {Object.entries(discountRates).map(([name, rate]) => (
              <label key={name} className="block mx-4">
                <input
                  type="radio"
                  name="discount"
                  value={rate}
                  checked={formData.discount === String(rate)}
                  onChange={handleDiscountChange}
                />
                <span className="ml-2">{name} ({rate}%)</span>
              </label>
            ))}
          </div>
        </div>




      <div className="p-2">
          <label className="block text-md font-semibold">Payment</label>
          <input
            type="text"
            name="payment"
            value={formData.payment}
            onChange={handleChange}
            className="w-full p-2 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-burgendy rounded"
            required
          />
        </div>

        <div className="flex justify-center">
          <button type="submit" className="bg-burgendy px-6 py-2 rounded-2xl text-white font-medium hover:bg-gold mt-4">
            Book Now
          </button>
        </div>
      </form>

      <BridalServices />
      <img src={butterfly} alt="Butterfly" className="w-full max-w-md h-auto ml-auto" />
    </div>
  );
};

export default AppointmentForm;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import butterfly from './Images/dd.png';
import BridalServices from './BridalServices';

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    services: [],
    discount: '',
    payment: '',
    paidAmount: '', // New field for amount already paid
  });

  const [serviceDetails, setServiceDetails] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [alert, setAlert] = useState({ message: '', type: '' });

  const discountServices = ['Loyality Discount', 'Bronze Discount', 'Family Package', 'Custom Discount'];

  const servicesList = [
    'Golden Bridal ',
    'Premium Bridal ',
    'Silver Studio',
    'Golden Studio',
    'Platinium Studio',
    'Refreshment',
    'Natural Makeup',
    'Meles መልስ',
  ];

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

  const discountRates = {
    "Loyality Discount": 10, // 10% discount
    "Bronze Discount": 5,    // 5% discount
    "Custom Discount": 15    // 15% discount
  };

  const handleServiceToggle = (service) => {
    const newServices = formData.services.includes(service)
      ? formData.services.filter((s) => s !== service)
      : [...formData.services, service];

    setFormData({ ...formData, services: newServices });
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

  const handleDiscountChange = (e) => {
    const selectedDiscount = e.target.value;
    setFormData({ ...formData, discount: selectedDiscount });

    if (selectedDiscount) {
      setAlert({
        message: `You have received a ${selectedDiscount}% discount! This has been added to the dashboard.`,
        type: 'success',
      });

      setTimeout(() => {
        setAlert({ message: '', type: '' });
      }, 3000);
    }
  };

  // Calculate total payment after discount
  const calculatePayment = () => {
    const totalServiceCost = formData.services.length * 100; // Assuming each service costs 100
    const discountAmount = (totalServiceCost * (parseFloat(formData.discount) || 0)) / 100;
    const totalAmount = totalServiceCost - discountAmount;
    return totalAmount;
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
        message: "You cannot book appointments in the past. Please select a future date.",
        type: "error",
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
        message: "The selected time slot for one or more services is already booked. Please choose a different time.",
        type: "error",
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
      discount: formData.discount,
    }));

    try {
      const response = await axios.post("http://localhost:5000/api/appointments/create", appointmentData);
      console.log("Response:", response);

      setAlert({
        message: "Appointment booked successfully !",
        type: "success",
      });

      // Reset form after success
      setFormData({
        fullName: "",
        phoneNumber: "",
        services: [],
        payment: "",
        paidAmount: "",
        discount: 0,
      });
      setServiceDetails({});

      // Fetch updated appointments
      const updatedAppointments = await axios.get("http://localhost:5000/api/appointments");
      setAppointments(updatedAppointments.data);
    } catch (error) {
      console.error("Error booking the appointment:", error.response?.data);
      setAlert({
        message: "There was an error booking the appointment. Please try again.",
        type: "error",
      });
    }
  };

  const totalPayment = calculatePayment();
  const balanceToPay = totalPayment - (parseFloat(formData.paidAmount) || 0);

  return (
    <div>
      <Navbar />
      {alert.message && (
        <div className={`fixed top-5 left-1/2 transform -translate-x-1/2 w-full max-w-md p-4 mb-4 rounded-lg shadow-lg ${alert.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {alert.message}
        </div>
      )}

      <form className="max-w-4xl mx-auto bg-soft-coral p-6 rounded-2xl text-black my-10 border border-gray-500" onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-6 text-brown-800 text-center font-bold">Book an Appointment</h2>

        <div className="flex flex-wrap">
          <div className="w-1/2 p-2">
            <label className="block text-md font-semibold">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-2 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-burgendy rounded"
              required
            />
          </div>
          <div className="w-1/2 p-2">
            <label className="block text-md font-semibold">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full p-2 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-burgendy rounded"
              required
            />
          </div>
        </div>

        <div className="p-2">
          <label className="block text-md font-semibold my-2">Services</label>
          <div className="grid grid-cols-4 gap-4">
            {servicesList.map((service) => (
              <div key={service}>
                <input
                  type="checkbox"
                  id={service}
                  checked={formData.services.includes(service)}
                  onChange={() => handleServiceToggle(service)}
                />
                <label htmlFor={service} className="ml-2 text-brown-800">{service}</label>

                {formData.services.includes(service) && discountServices.includes(service) && (
                  <p className="text-green-700 text-sm mt-1">You have a 10% discount. Add note in the dashboard.</p>
                )}

                {formData.services.includes(service) && !discountServices.includes(service) && (
                  <div className="mt-2">
                    <label className="block text-brown-800">Date</label>
                    <input
                      type="date"
                      value={serviceDetails[service]?.date || ''}
                      onChange={(e) => handleServiceDateTimeChange(service, 'date', e.target.value)}
                      className="w-full p-2 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-burgendy rounded"
                      required
                    />
                    <label className="block text-brown-800">Time</label>
                    <input
                      type="time"
                      value={serviceDetails[service]?.time || ''}
                      onChange={(e) => handleServiceDateTimeChange(service, 'time', e.target.value)}
                      className="w-full p-2 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-burgendy rounded"
                      required
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-2">
          <h3 className="text-md font-semibold mt-4 mb-2">Select Discount</h3>
          <div className="flex m-3">
            {Object.entries(discountRates).map(([name, rate]) => (
              <label key={name} className="block mx-4">
                <input
                  type="radio"
                  name="discount"
                  value={rate}
                  checked={formData.discount === String(rate)}
                  onChange={handleDiscountChange}
                />
                <span className="ml-2">{name} ({rate}%)</span>
              </label>
            ))}
          </div>
        </div>

        <div className="p-2">
          <label className="block text-md font-semibold">Payment</label>
          <input
            type="text"
            name="payment"
            value={formData.payment}
            onChange={handleChange}
            className="w-full p-2 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-burgendy rounded"
            required
          />
        </div>

        <div className="p-2">
          <label className="block text-md font-semibold">Amount Paid</label>
          <input
            type="text"
            name="paidAmount"
            value={formData.paidAmount}
            onChange={handleChange}
            className="w-full p-2 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-burgendy rounded"
            required
          />
        </div>

        <div className="p-2">
          <h4>Total Payment: ${totalPayment}</h4>
          <h4>Amount Paid: ${formData.paidAmount}</h4>
          <h4>Balance to Pay: ${balanceToPay}</h4>
        </div>

        <div className="flex justify-center">
          <button type="submit" className="bg-burgendy px-6 py-2 rounded-2xl text-white font-medium hover:bg-gold mt-4">
            Book Now
          </button>
        </div>
      </form>

      <BridalServices />
      <img src={butterfly} alt="Butterfly" className="w-full max-w-md h-auto ml-auto" />
    </div>
  );
};

export default AppointmentForm;*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import butterfly from './Images/dd.png';
import BridalServices from './BridalServices';

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    services: [],
    discount: '',
  });

  const [serviceDetails, setServiceDetails] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [alert, setAlert] = useState({ message: '', type: '' });

  const discountServices = ['Loyality Discount', 'Bronze Discount', 'Family Package', 'Custom Discount'];

  const servicesList = [
    'Golden Bridal ',
    'Premium Bridal ',
    'Silver Studio',
    'Golden Studio',
    'Platinium Studio',
    'Refreshment',
    'Natural Makeup',
    'Meles መልስ',
  ];

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

    // Initialize service details if the service is selected
    if (!formData.services.includes(service)) {
      setServiceDetails(prevDetails => ({
        ...prevDetails,
        [service]: { date: '', time: '', payment: '', discount: '', paidAmount: '' },
      }));
    } else {
      // Remove service details if the service is deselected
      const { [service]: removedService, ...rest } = serviceDetails;
      setServiceDetails(rest);
    }
  };

  const handleServiceDateTimeChange = (service, key, value) => {
    setServiceDetails({
      ...serviceDetails,
      [service]: { ...serviceDetails[service], [key]: value },
    });
  };

  const handleServicePaymentChange = (service, payment) => {
    setServiceDetails({
      ...serviceDetails,
      [service]: { ...serviceDetails[service], payment },
    });
  };

  const handleServiceDiscountChange = (service, discount) => {
    setServiceDetails({
      ...serviceDetails,
      [service]: { ...serviceDetails[service], discount },
    });
  };

  const handleServicePaidAmountChange = (service, paidAmount) => {
    setServiceDetails({
      ...serviceDetails,
      [service]: { ...serviceDetails[service], paidAmount },
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 

  // Calculate total payment after discount
  const calculatePayment = () => {
    const totalServiceCost = formData.services.reduce((total, service) => {
      const servicePayment = parseFloat(serviceDetails[service]?.payment) || 0;
      const serviceDiscount = parseFloat(serviceDetails[service]?.discount) || 0;
      return total + (servicePayment - (servicePayment * serviceDiscount) / 100);
    }, 0);
    return totalServiceCost;
  };

  // Calculate total paid amount
  const calculateTotalPaidAmount = () => {
    const totalPaid = formData.services.reduce((total, service) => {
      const paidAmount = parseFloat(serviceDetails[service]?.paidAmount) || 0;
      return total + paidAmount;
    }, 0);
    return totalPaid;
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
        message: "You cannot book appointments in the past. Please select a future date.",
        type: "error",
      });
      return;
    }
  
    // Ensure appointments are loaded before checking conflicts
    if (!appointments || appointments.length === 0) {
      console.log("No existing appointments found.");
    } else {
      console.log("Existing Appointments:", appointments);
    }
  
    // Function to format date into YYYY-MM-DD format
    const formatDate = (date) => {
      return new Date(date).toISOString().split("T")[0]; // Ensures the format is the same
    };
  
    // Validate for conflicts (any service at the same date and time)
    const conflicts = formData.services.some((service) => {
      const selectedDate = formatDate(serviceDetails[service]?.date);
      const selectedTime = serviceDetails[service]?.time;
  
      return appointments.some((appointment) => {
        const bookedDate = formatDate(appointment.date);
        const bookedTime = appointment.time;
  
        return bookedDate === selectedDate && bookedTime === selectedTime;
      });
    });
  
    if (conflicts) {
      setAlert({
        message: "The selected date and time are already booked. Please choose a different time.",
        type: "error",
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
      payment: serviceDetails[service]?.payment,
      discount: serviceDetails[service]?.discount,
      paidAmount: serviceDetails[service]?.paidAmount,
    }));
  
    try {
      const response = await axios.post(
        "http://localhost:5000/api/appointments/create",
        appointmentData
      );
      console.log("Response:", response);
  
      setAlert({
        message: "Appointment booked successfully!",
        type: "success",
      });
  
      // Reset form after success
      setFormData({
        fullName: "",
        phoneNumber: "",
        services: [],
        discount: 0,
      });
      setServiceDetails({});
  
      // Fetch updated appointments
      const updatedAppointments = await axios.get("http://localhost:5000/api/appointments");
      setAppointments(updatedAppointments.data);
    } catch (error) {
      console.error("Error booking the appointment:", error.response?.data);
      setAlert({
        message: "There was an error booking the appointment. Please try again.",
        type: "error",
      });
    }
  };
  

  const totalPayment = calculatePayment();
  const totalPaidAmount = calculateTotalPaidAmount();
  const balanceToPay = totalPayment - totalPaidAmount;

  return (
    <div>
      <Navbar />
      {alert.message && (
        <div className={`fixed top-5 left-1/2 transform -translate-x-1/2 w-full max-w-md p-4 mb-4 rounded-lg shadow-lg ${alert.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {alert.message}
        </div>
      )}

      <form className="max-w-4xl mx-auto bg-soft-coral p-6 rounded-2xl text-black my-10 border border-gray-500" onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-6 text-brown-800 text-center font-bold">Book an Appointment</h2>

        <div className="flex flex-wrap">
          <div className="w-1/2 p-2">
            <label className="block text-md font-semibold">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-2 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-burgendy rounded"
              required
            />
          </div>
          <div className="w-1/2 p-2">
            <label className="block text-md font-semibold">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full p-2 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-burgendy rounded"
              required
            />
          </div>
        </div>

        <div className="p-2">
          <label className="block text-md font-semibold my-2">Services</label>
          <div className="grid grid-cols-4 gap-4">
            {servicesList.map((service) => (
              <div key={service}>
                <input
                  type="checkbox"
                  id={service}
                  checked={formData.services.includes(service)}
                  onChange={() => handleServiceToggle(service)}
                />
                <label htmlFor={service} className="ml-2 text-brown-800">{service}</label>

                {formData.services.includes(service) && discountServices.includes(service) && (
                  <p className="text-green-700 text-sm mt-1">You have a 10% discount. Add note in the dashboard.</p>
                )}

                {formData.services.includes(service) && !discountServices.includes(service) && (
                  <div className="mt-2">
                    <label className="block text-brown-800">Date</label>
                    <input
                      type="date"
                      value={serviceDetails[service]?.date || ''}
                      onChange={(e) => handleServiceDateTimeChange(service, 'date', e.target.value)}
                      className="w-full p-2 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-burgendy rounded"
                      required
                    />
                    <label className="block text-brown-800">Time</label>
                    <input
                      type="time"
                      value={serviceDetails[service]?.time || ''}
                      onChange={(e) => handleServiceDateTimeChange(service, 'time', e.target.value)}
                      className="w-full p-2 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-burgendy rounded"
                      required
                    />
                    <label className="block text-brown-800">Payment</label>
                    <input
                      type="number"
                      value={serviceDetails[service]?.payment || ''}
                      onChange={(e) => handleServicePaymentChange(service, e.target.value)}
                      className="w-full p-2 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-burgendy rounded"
                      required
                    />
                    <label className="block text-brown-800">Discount (%)</label>
                    <input
                      type="number"
                      value={serviceDetails[service]?.discount || ''}
                      onChange={(e) => handleServiceDiscountChange(service, e.target.value)}
                      className="w-full p-2 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-burgendy rounded"
                      required
                    />
                    <label className="block text-brown-800">Paid Amount</label>
                    <input
                      type="number"
                      value={serviceDetails[service]?.paidAmount || ''}
                      onChange={(e) => handleServicePaidAmountChange(service, e.target.value)}
                      className="w-full p-2 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-burgendy rounded"
                      required
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        

        <div className="p-2">
          <h4>Total Payment: ${totalPayment.toFixed(2)}</h4>
          <h4>Total Paid Amount: ${totalPaidAmount.toFixed(2)}</h4>
          <h4>Balance to Pay: ${balanceToPay.toFixed(2)}</h4>
        </div>

        <div className="flex justify-center">
          <button type="submit" className="bg-burgendy px-6 py-2 rounded-2xl text-white font-medium hover:bg-gold mt-4">
            Book Now
          </button>
        </div>
      </form>

      <BridalServices />
      <img src={butterfly} alt="Butterfly" className="w-full max-w-md h-auto ml-auto" />
    </div>
  );
};

export default AppointmentForm;
/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import butterfly from './Images/dd.png';
import BridalServices from './BridalServices';

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    services: [],
    
  });

  const [serviceDetails, setServiceDetails] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [alert, setAlert] = useState({ message: '', type: '' });

  const discountServices = ['Loyality Discount', 'Bronze Discount', 'Family Package', 'Custom Discount'];

  const servicesList = [
    'Golden Bridal ',
    'Premium Bridal ',
    'Silver Studio',
    'Golden Studio',
    'Platinium Studio',
    'Refreshment',
    'Natural Makeup',
    'Meles መልስ',
  ];

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

  const discountRates = {
    "Loyality Discount": 10, // 10% discount
    "Bronze Discount": 5,    // 5% discount
    "Custom Discount": 15    // 15% discount
  };

  const handleServiceToggle = (service) => {
    const newServices = formData.services.includes(service)
      ? formData.services.filter((s) => s !== service)
      : [...formData.services, service];

    setFormData({ ...formData, services: newServices });

    // Initialize service details if the service is selected
    if (!formData.services.includes(service)) {
      setServiceDetails(prevDetails => ({
        ...prevDetails,
        [service]: { date: '', time: '', payment: '', discount: '', paidAmount: '' },
      }));
    } else {
      // Remove service details if the service is deselected
      const { [service]: removedService, ...rest } = serviceDetails;
      setServiceDetails(rest);
    }
  };

  const handleServiceDateTimeChange = (service, key, value) => {
    setServiceDetails({
      ...serviceDetails,
      [service]: { ...serviceDetails[service], [key]: value },
    });
  };

  const handleServicePaymentChange = (service, payment) => {
    setServiceDetails({
      ...serviceDetails,
      [service]: { ...serviceDetails[service], payment },
    });
  };

  const handleServiceDiscountChange = (service, discount) => {
    setServiceDetails({
      ...serviceDetails,
      [service]: { ...serviceDetails[service], discount },
    });
  };

  const handleServicePaidAmountChange = (service, paidAmount) => {
    setServiceDetails({
      ...serviceDetails,
      [service]: { ...serviceDetails[service], paidAmount },
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDiscountChange = (e) => {
    const selectedDiscount = e.target.value;
    setFormData({ ...formData, discount: selectedDiscount });

    if (selectedDiscount) {
      setAlert({
        message: `You have received a ${selectedDiscount}% discount! This has been added to the dashboard.`,
        type: 'success',
      });

      setTimeout(() => {
        setAlert({ message: '', type: '' });
      }, 3000);
    }
  };

  // Calculate total payment after discount
  const calculatePayment = () => {
    const totalServiceCost = formData.services.reduce((total, service) => {
      const servicePayment = parseFloat(serviceDetails[service]?.payment) || 0;
      const serviceDiscount = parseFloat(serviceDetails[service]?.discount) || 0;
      return total + (servicePayment - (servicePayment * serviceDiscount) / 100);
    }, 0);
    return totalServiceCost;
  };

  // Calculate total paid amount
  const calculateTotalPaidAmount = () => {
    const totalPaid = formData.services.reduce((total, service) => {
      const paidAmount = parseFloat(serviceDetails[service]?.paidAmount) || 0;
      return total + paidAmount;
    }, 0);
    return totalPaid;
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
        message: "You cannot book appointments in the past. Please select a future date.",
        type: "error",
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
        message: "The selected time slot for one or more services is already booked. Please choose a different time.",
        type: "error",
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
      payment: serviceDetails[service]?.payment,
      discount: serviceDetails[service]?.discount,
      paidAmount: serviceDetails[service]?.paidAmount,
    }));
  
    try {
      const response = await axios.post("http://localhost:5000/api/appointments/create", appointmentData);
      console.log("Response:", response);
  
      setAlert({
        message: "Appointment booked successfully!",
        type: "success",
      });
  
      // Reset form after success
      setFormData({
        fullName: "",
        phoneNumber: "",
        services: [],
        discount: 0,
      });
      setServiceDetails({});
  
      // Fetch updated appointments
      const updatedAppointments = await axios.get("http://localhost:5000/api/appointments");
      setAppointments(updatedAppointments.data);
    } catch (error) {
      console.error("Error booking the appointment:", error.response?.data || error.message);
      setAlert({
        message: "There was an error booking the appointment. Please try again.",
        type: "error",
      });
    }
  };
  

  const totalPayment = calculatePayment();
  const totalPaidAmount = calculateTotalPaidAmount();
  const balanceToPay = totalPayment - totalPaidAmount;

  return (
    <div>
      <Navbar />
      {alert.message && (
        <div className={`fixed top-5 left-1/2 transform -translate-x-1/2 w-full max-w-md p-4 mb-4 rounded-lg shadow-lg ${alert.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {alert.message}
        </div>
      )}

      <form className="max-w-4xl mx-auto bg-soft-coral p-6 rounded-2xl text-black my-10 border border-gray-500" onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-6 text-brown-800 text-center font-bold">Book an Appointment</h2>

        <div className="flex flex-wrap">
          <div className="w-1/2 p-2">
            <label className="block text-md font-semibold">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-2 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-burgendy rounded"
              required
            />
          </div>
          <div className="w-1/2 p-2">
            <label className="block text-md font-semibold">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full p-2 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-burgendy rounded"
              required
            />
          </div>
        </div>

        <div className="p-2">
          <label className="block text-md font-semibold my-2">Services</label>
          <div className="grid grid-cols-4 gap-4">
            {servicesList.map((service) => (
              <div key={service}>
                <input
                  type="checkbox"
                  id={service}
                  checked={formData.services.includes(service)}
                  onChange={() => handleServiceToggle(service)}
                />
                <label htmlFor={service} className="ml-2 text-brown-800">{service}</label>

                {formData.services.includes(service) && !discountServices.includes(service) && (
                  <div className="mt-2">
                    <label className="block text-brown-800">Date</label>
                    <input
                      type="date"
                      value={serviceDetails[service]?.date || ''}
                      onChange={(e) => handleServiceDateTimeChange(service, 'date', e.target.value)}
                      className="w-full p-2 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-burgendy rounded"
                      required
                    />
                    <label className="block text-brown-800">Time</label>
                    <input
                      type="time"
                      value={serviceDetails[service]?.time || ''}
                      onChange={(e) => handleServiceDateTimeChange(service, 'time', e.target.value)}
                      className="w-full p-2 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-burgendy rounded"
                      required
                    />
                    <label className="block text-brown-800">Amount</label>
                    <input
                      type="number"
                      value={serviceDetails[service]?.payment || ''}
                      onChange={(e) => handleServicePaymentChange(service, e.target.value)}
                      className="w-full p-2 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-burgendy rounded"
                      required
                    />
                    <label className="block text-brown-800">Discount (%)</label>
                    <select
                      value={serviceDetails[service]?.discount || ''}
                      onChange={(e) => handleServiceDiscountChange(service, e.target.value)}
                      className="w-full p-2 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-burgendy rounded"
                    >
                      <option value="">None</option>
                      {discountServices.map((discountOption) => (
                        <option key={discountOption} value={discountRates[discountOption]}>
                          {discountOption}
                        </option>
                      ))}
                    </select>

                    <label className="block text-brown-800">Paid Amount</label>
                    <input
                      type="number"
                      value={serviceDetails[service]?.paidAmount || ''}
                      onChange={(e) => handleServicePaidAmountChange(service, e.target.value)}
                      className="w-full p-2 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-burgendy rounded"
                      required
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

       

        <div className="p-2 mt-4">
          <p className="text-lg font-semibold">Total Payment: ${totalPayment.toFixed(2)}</p>
          <p className="text-lg font-semibold">Total Paid: ${totalPaidAmount.toFixed(2)}</p>
          <p className="text-lg font-semibold">Balance to Pay: ${balanceToPay.toFixed(2)}</p>
        </div>

        <div className="p-2 mt-4">
          <button type="submit" className="w-full bg-burgendy text-white py-2 px-4 rounded">
            Book Appointment
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;*/






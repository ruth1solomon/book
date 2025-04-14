import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const { fullName, email, phone, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      console.log(res.data);
      navigate('/login');
    } catch (err) {
        console.error(err.response ? err.response.data : err.message);

    }
  };

  return (
    <div className="min-h-screen bg-soft-pink flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-black">Register</h1>
        <input
          type="text"
          name="fullName"
          value={fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full p-4 mb-4 border border-gray-300 rounded-lg"
          required
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-4 mb-4 border border-gray-300 rounded-lg"
          required
        />
        <input
          type="text"
          name="phone"
          value={phone}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full p-4 mb-4 border border-gray-300 rounded-lg"
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-4 mb-4 border border-gray-300 rounded-lg"
          required
        />
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          className="w-full p-4 mb-4 border border-gray-300 rounded-lg"
          required
        />
        <button type="submit" className=" bg-burgendy  ml-36 px-6 py-2 rounded-2xl text-white font-medium hover:bg-gold mt-2  transition duration-300 ease-in-out">Register</button>
      
      <p className="text-center mt-4 text-gray-500">
        Already have an account? <Link to="/login" className="text-burgendy hover:underline">Login</Link>
      </p>
      </form>
    </div>
  );
};

export default RegisterPage;

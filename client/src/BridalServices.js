/*import React from "react";
import { FaCrown, FaStar, FaHeart, FaSpa, FaCamera, FaGlassCheers } from "react-icons/fa";

const BridalServices = () => {
  return (
    <div className="bg-gray-100 p-8 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-pink-600">Bridal Services</h1>
      <div className="flex flex-wrap justify-center gap-8">
      
        <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-1/3">
          <div className="flex items-center mb-4">
            <FaCrown className="text-yellow-500 text-3xl mr-2" />
            <h2 className="text-2xl font-semibold text-gray-800">Premium Bridal</h2>
          </div>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center">
              <FaHeart className="text-pink-400 mr-2" /> Hair
            </li>
            <li className="flex items-center">
              <FaSpa className="text-purple-500 mr-2" /> Makeup
            </li>
            <li className="flex items-center">
              <FaStar className="text-yellow-400 mr-2" /> Nails
            </li>
            <li className="flex items-center">
              <FaHeart className="text-red-400 mr-2" /> Massage
            </li>
          </ul>
        </div>

      
        <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-1/3">
          <div className="flex items-center mb-4">
            <FaCrown className="text-yellow-400 text-3xl mr-2" />
            <h2 className="text-2xl font-semibold text-gray-800">Golden Bridal</h2>
          </div>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center">
              <FaSpa className="text-purple-500 mr-2" /> Makeup
            </li>
            <li className="flex items-center">
              <FaCamera className="text-blue-500 mr-2" /> Photography
            </li>
            <li className="flex items-center">
              <FaGlassCheers className="text-green-400 mr-2" /> Refreshment
            </li>
          </ul>
          <div className="mt-4 text-center text-lg text-gray-700">
            Price: <span className="font-bold text-pink-600">2000 Birr</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BridalServices;

import React from "react";
import { FaGem, FaStar, FaSpa, FaCamera, FaCut, FaPalette, FaHeart ,FaGlassCheers,FaCrown} from "react-icons/fa";

const ServiceCard = ({ title, price, services, icon: Icon, bgColor }) => (
  <div className={`p-3 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-200 ${bgColor} text-white`}>
    <div className="flex items-center mb-2">
      <Icon className="text-3xl mr-2" />
      <h3 className="text-sm font-semibold">{title}</h3>
    </div>
    <ul className="space-y-1 text-xs">
      {services.map((service, index) => (
        <li key={index} className="flex items-center">
          <FaStar className="mr-1 text-yellow-300" /> {service}
        </li>
      ))}
    </ul>
    <p className="mt-3 text-xs font-bold">Price: {price} ETB</p>
  </div>
);

const BridalServices = () => {
  const servicesData = [
    {
      title: "Premium Bridal",
      price: "2000",
      services: ["Hair", "Makeup", "Nail", "Massage"],
      icon: FaGem,
      bgColor: "bg-gradient-to-br from-pink-600 to-purple-600",
    },
    {
      title: "Golden Bridal",
      price: "2000",
      services: ["Makeup", "Photo", "Refreshment"],
      icon: FaCrown,
      bgColor: "bg-gradient-to-br from-yellow-500 to-orange-500",
    },
    {
      title: "Silver Studio",
      price: "24000",
      services: ["Hair", "Makeup"],
      icon: FaCamera ,
      bgColor: "bg-gradient-to-br from-gray-400 to-gray-700",
    },
    {
      title: "Golden Studio",
      price: "28000",
      services: ["Hair", "Makeup", "Manicure", "Pedicure", "Nail Color", "Refreshment"],
      icon: FaGlassCheers,
      bgColor: "bg-gradient-to-br from-yellow-500 to-red-500",
    },
    {
      title: "Platinum Studio",
      price: "35000",
      services: [
        "Hair",
        "Makeup",
        "Manicure",
        "Pedicure",
        "Nail Color",
        "Refreshment",
        "Morocco Special",
        "Massages Special",
      ],
      icon: FaGem,
      bgColor: "bg-gradient-to-br from-blue-600 to-purple-800",
    },
    {
      title: "Refreshment Package",
      price: "2000",
      services: ["Makeup Refresh", "Lotion"],
      icon: FaSpa,
      bgColor: "bg-gradient-to-br from-green-400 to-teal-500",
    },
  ];

  return (
    <div className="min-h-screen py-6">
      <h1 className="text-2xl font-bold text-center mb-8 ">Bridal & Studio Services</h1>
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-4">
        {servicesData.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            price={service.price}
            services={service.services}
            icon={service.icon}
            bgColor={service.bgColor}
          />
        ))}
      </div>
    </div>
  );
};

export default BridalServices;*/


// App.js
import React from "react";
import { FaCrown, FaCamera, FaStar, FaSpa } from "react-icons/fa";

const ServiceCard = ({ title, price, services, icon: Icon, iconColor, bgColor }) => (
  <div
    className={`p-3 rounded-md shadow-md transform hover:scale-105 transition-transform duration-200 ${bgColor} text-gray-900`}
  >
    <div className="flex items-center mb-2">
      <Icon className={`text-2xl mr-2 ${iconColor}`} />
      <h3 className="text-sm font-semibold">{title}</h3>
    </div>
    <ul className="space-y-1 text-xs">
      {services.map((service, index) => (
        <li key={index} className="flex items-center">
          <FaStar className="mr-1 text-yellow-400" /> {service}
        </li>
      ))}
    </ul>
    <p className="mt-3 text-xs font-bold">Price: {price} ETB</p>
  </div>
);

const BridalServices = () => {
  const servicesData = [
    {
      title: "Golden Bridal",
      price: "28000",
      services: [ "Hair",
        "Makeup",
        "Manicure",
        "Pedicure",
        
        ],
      icon: FaCrown,
      iconColor: "text-gold",
      bgColor: "bg-gradient-to-br from-pink-200 to-pink-100",
    },
    {
      title: "Premium Bridal",
      price: "35000",
      services: [ "Hair",
        "Makeup",
        "Manicure",
        "Pedicure",      
        "Refreshment",
        "Special Morocco ",
        "Special Massage ",
        "Wax ",
        ],
      icon: FaCrown,
      iconColor: "text-purple-500",
      bgColor: "bg-gradient-to-br from-pink-200 to-pink-100",
    },
   
    {
      title: "Refreshment Package",
      price: "8000",
      services: ["Makeup Refresh", "Lotion"],
      icon: FaSpa,
      iconColor: "text-green-400",
      bgColor: "bg-gradient-to-br from-pink-200 to-pink-100",
    },
    {
      title: "Silver Studio",
      price: "24000",
      services: ["Hair", "Makeup"],
      icon: FaCamera,
      iconColor: "text-gray-400",
      bgColor: "bg-gradient-to-br from-[#FADADD] to-[#F8D2D5]", 
    },
    {
      title: "Golden Studio",
      price: "28000",
      services: ["Hair", "Makeup", "Manicure", "Pedicure", "Nail Color", "Refreshment"],
      icon: FaCamera,
      iconColor: "text-yellow-500",
      bgColor: "bg-gradient-to-br from-[#FADADD] to-[#F8D2D5]", 
    },
    {
      title: "Platinum Studio",
      price: "35000",
      services: [
        "Hair",
        "Makeup",
        "Manicure",
        "Pedicure",
        "Refreshment",
        "Special Morocco ",
        "Special Massage ",
        "Wax ",
        "Refreshment ",
      ],
      icon: FaCamera,
      iconColor: "text-purple-500",
      bgColor: "bg-gradient-to-br from-[#FADADD] to-[#F8D2D5]", 
    },
   
  ];

  return (
    <div className="min-h-screen  py-6">
      
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
        {servicesData.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            price={service.price}
            services={service.services}
            icon={service.icon}
            iconColor={service.iconColor}
            bgColor={service.bgColor}
          />
        ))}
      </div>
    </div>
  );
};

export default BridalServices;


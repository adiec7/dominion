'use client';

import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const page = () => {
  const options = [
    "CEC Pastor",
    "State Pastor",
    "Provincial Pastor",
    "Chapter Pastor",
    "Pastor",
    "Leading Lady",
    "Member",
    "Guest"
  ];

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    category: '',
    errors: { // Track errors directly within formData
      firstname: '',
      lastname: '',
      email: '',
      phone: ''
    }
  });

  const validateForm = () => {
    const newErrors = {};

    if (formData.firstname.length < 3) {
      newErrors.firstname = 'Firstname must be at least 3 characters long';
    }

    if (formData.lastname.length < 3) {
      newErrors.lastname = 'Lastname must be at least 3 characters long';
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email must be a valid email address';
    }

    if (!/^\d{11}$/.test(formData.phone)) {
      newErrors.phone = 'Phone must be 11 digits long';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm(); 
    setFormData({ ...formData, errors }); // Update errors in state

    if (Object.values(errors).every((error) => error === '')) {
      try {
        const data = { ...formData }; // Send the entire formData
        delete data.errors; // Remove errors before sending
        const res = await axios.post(`https://dcaccomapi.onrender.com/attendee`, data);
        console.log(res.data);

      } catch (err) {
        console.error('Form submission error:', err);
      }
    } else {
      console.log('Form has errors');
    }
  };

  return (
    <div className=' h-screen w-full flex bg-neutral-50'>
  <div className=' p-8 md:p-20 w-full md:w-[60%] md:flex md:flex-col md:items-center'>
    <p className=' uppercase font-semibold'>step 2 of 2</p>

    <div className=' w-full bg-slate-200 rounded-2xl h-3 mt-5'>
      <div className=' w-full h-full bg-sky-500 rounded-2xl'></div>
    </div>

    <div className=' mt-10 w-full'>
      <form onSubmit={handleSubmit} className='signup-form flex gap-5 flex-col'> 
        <div> 
          <input 
            type="text" 
            name="firstname" 
            id="" 
            value={formData.firstname} 
            placeholder='Firstname' 
            onChange={handleChange} 
          />
          {formData.errors.firstname && <p className='text-red-500 text-xs mt-1'>{formData.errors.firstname}</p>} 
        </div>
        <div>
          <input 
            type="text" 
            name="lastname" 
            id="" 
            value={formData.lastname} 
            placeholder="Lastname" 
            onChange={handleChange} 
          />
          {formData.errors.lastname && <p className='text-red-500 text-xs mt-1'>{formData.errors.lastname}</p>} 
        </div>

        <div className=' flex flex-col signup-form gap-5 mt-5'>
          <div>
            <input 
              type="text" 
              placeholder='Email' 
              value={formData.email} 
              name='email' 
              onChange={handleChange} 
            />
            {formData.errors.email && <p className='text-red-500 text-xs mt-1'>{formData.errors.email}</p>} 
          </div>
          <div>
            <input 
              type="tel"  
              placeholder="Phone" 
              value={formData.phone} 
              name='phone' 
              onChange={handleChange} 
            />
            {formData.errors.phone && <p className='text-red-500 text-xs mt-1'>{formData.errors.phone}</p>} 
          </div>

          <select>
              {options.map((option, index) => (
                  <option key={index} value={option}>
                      {option}
                  </option>
              ))}
          </select>
        </div>

        <div className=' flex mt-10 gap-5 '>
          <Link href={'/register'} className='purple-btn '>
            Back
          </Link>
          <button type='submit' className='black-btn'> 
            Register
          </button>
        </div>
      </form>
    </div>
  </div>

  <div className=' hidden md:flex'>
    <Image src={'/assets/onboard/domi.png'} alt='' width={500} height={100} className=' h-screen w-full object-cover' />
  </div>
</div>

  );
};

export default page;

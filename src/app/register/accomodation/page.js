'use client';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const page = () => {
  const options = [
    'Hotel', 
    'hostels',
    'short let',
    'co-host'
  ];

  const [formData, setFormData] = useState({
    attendeeName: '',
    phone: '',
    accomodationType: ''
  });

  const [errors, setErrors] = useState({
    attendeeName: '',
    phone: '',
    accomodationType: ''
  });

  const validateForm = () => {
    const newErrors = {};

    if (formData.attendeeName.trim() === '') {
      newErrors.attendeeName = 'Name is required';
    }

    if (formData.phone.length !== 11 || isNaN(formData.phone)) {
      newErrors.phone = 'Please enter a valid 11-digit phone number';
    }

    if (formData.accomodationType === '') {
      newErrors.accomodationType = 'Please select an accommodation type';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { attendeeName, value } = e.target;
    setFormData({ ...formData, [attendeeName]: value });  
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    setErrors(errors);

    if (Object.values(errors).every((error) => error === '')) {
      try {
        const data = { ...formData };
        const res = await axios.post(`https://dcaccomapi.onrender.com/accomodation`, data);
        console.log(res.data);
      } catch (err) {
        console.error('Form submission error:', err);
      }
    } else {
      console.log('Form has errors');
    }
  };

  return (
    <div className='h-screen w-full flex bg-neutral-50'>
      <div className='p-8 md:p-20 w-full md:w-[60%] md:flex md:flex-col md:items-center'>
        <p className='uppercase font-semibold'>step 1 of 1</p>

        <div className='w-full bg-slate-200 rounded-2xl h-3 mt-5'>
          <div className='w-full h-full bg-sky-500 rounded-2xl'></div>
        </div>

        <div className='mt-10 w-full'>
          <form onSubmit={handleSubmit} className='flex flex-col signup-form gap-5 mt-5'>  
            <div>
              <input 
                type="text" 
                placeholder='Name' 
                name='name' 
                onChange={handleChange} 
              />
              {errors.name && <p className='text-red-500 text-xs mt-1'>{errors.name}</p>}
            </div>
            <div>
              <input 
                type="tel" 
                placeholder="Phone" 
                name='phone' 
                onChange={handleChange} 
              />
              {errors.phone && <p className='text-red-500 text-xs mt-1'>{errors.phone}</p>}
            </div>
            <div> {/* Wrapper for better error display */}
              <select name='accomodationType' onChange={handleChange}>
                <option value=''>Select Accommodation Type</option> 
                {options.map((option, index) => (
                  <option key={index} value={option}>
                      {option}
                  </option>
                ))}
              </select>
              {errors.accomodationType && <p className='text-red-500 text-xs mt-1'>{errors.accomodationType}</p>} 
            </div>


            <div className='flex mt-10 gap-5'>
              <Link href={'/'} className='purple-btn'>
                Back
              </Link>
              <button type='submit' className='black-btn'>Register</button> 
            </div>
          </form>
        </div>
      </div>

      <div className='hidden md:flex'>
        <Image 
          src={'/assets/onboard/domi.png'} 
          alt='' 
          width={500} 
          height={100} 
          className='h-screen w-full object-cover' 
        />
      </div>
    </div>
  );
};

export default page;

'use client';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const page = () => {
  const [formData, setFormData] = useState({
    groupName: '',
    groupLeaderName: '',
    groupLeaderContact: ''
  });

  const [errors, setErrors] = useState({
    groupName: '',
    groupLeaderName: '',
    groupLeaderContact: ''
  });

  const validateForm = () => {
    const newErrors = {};

    if (formData.groupName.trim() === '') {
      newErrors.groupName = 'Group name is required';
    }

    if (formData.groupLeaderName.trim() === '') {
      newErrors.groupLeaderName = 'Group leader name is required';
    }

    if (formData.groupLeaderContact.length !== 11 || isNaN(formData.groupLeaderContact)) {
      newErrors.groupLeaderContact = 'Please enter a valid 11-digit phone number';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    setErrors(errors);

    if (Object.values(errors).every((error) => error === '')) {
      try {
        const data = { ...formData };
        const res = await axios.post(`https://dcaccomapi.onrender.com/group`, data);
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
        <p className='uppercase font-semibold'>step 2 of 2</p>

        <div className='w-full bg-slate-200 rounded-2xl h-3 mt-5'>
          <div className='w-full h-full bg-sky-500 rounded-2xl'></div>
        </div>

        <div className='mt-10 w-full'>
          <form onSubmit={handleSubmit} className='flex flex-col signup-form gap-5 mt-5'>  
            <div>
              <input 
                type="text" 
                placeholder='Group Name' 
                name='groupName' 
                onChange={handleChange} 
              />
              {errors.groupName && <p className='text-red-500 text-xs mt-1'>{errors.groupName}</p>}
            </div>
            <div>
              <input 
                type="text" 
                placeholder="Group leader's name" 
                name='groupLeaderName' 
                onChange={handleChange} 
              />
              {errors.groupLeaderName && <p className='text-red-500 text-xs mt-1'>{errors.groupLeaderName}</p>}
            </div>
            <div>
              <input 
                type="tel"  
                placeholder="Group leaders's phone" 
                name='groupLeaderContact' 
                onChange={handleChange} 
              />
              {errors.groupLeaderContact && <p className='text-red-500 text-xs mt-1'>{errors.groupLeaderContact}</p>}
            </div>

            <div className='flex mt-10 gap-5'>
              <Link href={'/register'} className='purple-btn'>
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

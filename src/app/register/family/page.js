'use client';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const page = () => {
  const [formData, setFormData] = useState({
    name: '',
    spouseName: '',
    numChildren: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    spouseName: '',
    numChildren: ''
  });

  const validateForm = () => {
    const newErrors = {};

    if (formData.name.trim() === '') {
      newErrors.name = 'Name is required';
    }

    if (formData.spouseName.trim() === '') {
      newErrors.spouseName = 'Spouse name is required';
    }

    if (isNaN(formData.numChildren) || formData.numChildren < 0) {
      newErrors.numChildren = 'Please enter a valid number of children (0 or greater)';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'numChildren') {
      setFormData({ ...formData, numChildren: Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    setErrors(errors);

    if (Object.values(errors).every((error) => error === '')) {
      try {
        const data = { ...formData };
        const res = await axios.post(`https://dcaccomapi.onrender.com/family`, data);
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
              placeholder='Full Name' 
              name='name' 
              value={formData.name} 
              onChange={handleChange} 
            />
            {errors.name && <p className='text-red-500 text-xs mt-1'>{errors.name}</p>}
          </div>
          <div>
            <input 
              type="text" 
              placeholder="Spouse's name" 
              name='spouseName' 
              value={formData.spouseName} 
              onChange={handleChange} 
            />
            {errors.spouseName && <p className='text-red-500 text-xs mt-1'>{errors.spouseName}</p>}
          </div>
          <div>
            <input 
              type="number"  
              placeholder="Number of children" 
              name='numChildren' 
              value={formData.numChildren} 
              onChange={handleChange} 
            />
            {errors.numChildren && <p className='text-red-500 text-xs mt-1'>{errors.numChildren}</p>}
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


'use client'
import axios from 'axios';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { useState } from 'react';


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
        category: ''
      });
    
      const [errors, setErrors] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: ''
      });
    
      const validateEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
      };
    
      const validatePhone = (phone) => {
        return /^\d{11}$/.test(phone);
      };
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
        setErrors({
          ...errors,
          [name]: value.length < 3 ? `${name} must be at least 3 characters long` : ''
        });
    
        if (name === 'email') {
          setErrors({
            ...errors,
            email: !validateEmail(value) ? 'Email must be a valid email address' : ''
          });
        }
    
        if (name === 'phone') {
          setErrors({
            ...errors,
            phone: !validatePhone(value) ? 'Phone must be 11 characters long' : ''
          });
        }
      };

      const data = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        phone: formData.phone,
        category: formData.category
      }
    
      const handleSubmit = async(e) => {
        e.preventDefault();
        // Check if there are no errors
        if (Object.values(errors).every((error) => error === '')) {
          // Form submission logic
          // console.log(formData);

          const res = await axios.post(`https://dcaccomapi.onrender.com/attendee`, data)

          console.log(res.data)

        } else {
          // Display error messages
          console.log('Form has errors');
        }
      };
  return (
    <div className=' h-screen w-full flex bg-neutral-50'>
    <div className=' p-8 md:p-20 w-full md:w-[60%] md:flex md:flex-col md:items-center'>
      <p className=' uppercase font-semibold'>
        step 2 of 2
      </p>

      <div className=' w-full bg-slate-200 rounded-2xl h-3 mt-5'>
        <div className=' w-full h-full bg-sky-500 rounded-2xl'>

        </div>
      </div>

      <div className=' mt-10 w-full'>
        <div className='signup-form flex gap-5 flex-col'>
          <input type="text" name="firstname" id="" value={formData.firstname} placeholder='Firstname' onChange={handleChange} />
          <input type="text" name="lastname" id="" value={formData.lastname} placeholder="Lastname" onChange={handleChange} />
        </div>
        <div className=' flex flex-col signup-form gap-5 mt-5'>
          <input type="text" placeholder='Email' value={formData.email} name='email' onChange={handleChange} />
          <input type="tel"  placeholder="Phone" value={formData.phone} name='phone' onChange={handleChange} />
          {/* <label className=' -mb-4 text-neutral-500 text-sm px-3' htmlFor="dob">Select Category</label> */}
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
          <p onClick={handleSubmit} className=' black-btn'>
            Register
          </p>
        </div>
      </div>
    </div>



    <div className=' hidden md:flex'>
      <Image src={'/assets/onboard/domi.png'} alt='' width={500} height={100} className=' h-screen w-full object-cover' />
    </div>

  </div>
  )
}

export default page
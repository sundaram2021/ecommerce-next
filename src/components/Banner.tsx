"use client"
import { useUser } from '@clerk/nextjs';
import React from 'react'

function Banner() {
  const {user} = useUser();
  return (
    <div className='flex justify-center items-center '>
        <div className='sm:hidden pt-10'>
            <img className='object-cover w-[90%] h-[100%] mx-auto' src="banner2.jpg"  alt="" />
        </div>
        <div className='relative hidden  pt-16  sm:flex sm:justify-between sm:items-start w-full ml-16 mr-16 leading-tight'>
            <p className='z-10 absolute sm:w-[40%] md:w-[30%] sm:text-2xl md:text-4xl md:font-semibold '>Let's go shopping,{user?.fullName}</p>
            <img className='ml-auto sm:w-[70%] md:w-[80%] h-[250px] md:h-[320px] object-cover' src="banner2.jpg"  alt="" />
        </div>
    </div>
  )
}

export default Banner
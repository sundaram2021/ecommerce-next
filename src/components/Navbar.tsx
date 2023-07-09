"use client"

import React from 'react'
import {Input} from '../components/ui/Input';
import {SidebarNav}  from './SidebarNav';
import { UserAccountNav } from './UserAccountNav';


function Navbar() {
  return (
    <div className='sticky py-10 px-8 border-b-[1px] border-solid border-b-[#3c4043]  w-[100vw] max-w-10xl flex justify-center items-center '>
        <div className='w-full flex  justify-around items-center sm:gap-2 mx-auto'>
            <SidebarNav />
            <div className=''>
                <p className='font-mono sm:text-3xl  cursor-pointer ml-1 mr-1' onClick={() => window.location.origin}>Shopnow</p>
            </div>
            <div className='mx-auto'>
                <Input className='bg-[#202124] border-[1px] border-solid border-[#3c4043]  focus-within:outline focus-within:outline-[#3c4043] lg:w-[700px] md:w-[500px] sm:w-[400px]  rounded-full' placeholder='search products...' />
            </div>
            <div className='self-end ml-auto '>
               <UserAccountNav />
            </div>
        </div>
    </div>
  )
}

export default Navbar


import React from 'react'

import {SidebarNav}  from './SidebarNav';
import { UserAccountNav } from './UserAccountNav';
import Link  from 'next/link';
import SearchBar from './SearchBar';


function Navbar() {
  return (
    <div className=' max-w-[1500px] sticky py-10 px-8 border-b-[1px] border-solid border-b-[#3c4043]  w-[100vw] max-w-10xl flex justify-center items-center '>
        <div className='relative w-full flex  justify-around items-center sm:gap-2 mx-auto'>
            <SidebarNav />
            <div className=''>
                <Link href="/"><p className='font-mono sm:text-3xl  cursor-pointer ml-1 mr-1'>Shopnow</p></Link>
            </div>
            <SearchBar />
            <div className='self-end ml-auto '>
               <UserAccountNav />
            </div>
        </div>
    </div>
  )
}

export default Navbar
"use client"

import Link from "next/link";
import React, {  useRef, useState } from "react";
import { RiLoginCircleFill } from 'react-icons/ri';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiFillCaretDown } from 'react-icons/ai';
import { AiOutlineSearch } from 'react-icons/ai';
import { RxAvatar } from 'react-icons/rx';
import Image from "next/image";
import { MdSettings } from 'react-icons/md' ;
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/utils/firebase";
import Loader from "./Loader";
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { MdOutlineKeyboardArrowUp } from 'react-icons/md';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"




const Navbar = () => {
    const [user] = useAuthState(auth);
    const [ hamb, setHamb ]=  useState<Boolean>(false);
    const [show, setShow] = useState<Boolean>(false);
    const [loading, setLoading] = useState<Boolean>(false);
    const categoryRef = useRef<HTMLAnchorElement>(null);
    const [category, setCategory] = useState<Boolean>(false);

    categoryRef.current?.addEventListener("hover", () => {
        console.log("hovered");
    })

    console.log("user : ",user);
    

    const handleHamb = () => {
        setHamb(!hamb);
        setCategory(false)
    }

    const handleClick = () => {
       setShow(!show);
    }


    const filterSearch = async() => {
        const res = await fetch("/api/blogs",{
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })

        // const data:Post[] = await res.json();
        // setBlogs(data);
    }
    

    const handleLogout = async() => {
        setLoading(true);
        await auth.signOut();
        setLoading(false);
    }

    const data = [1,2,3,4,5,6]
    

    return <div className="">
        <div className="w-[100vw] text-white bg-blue-600">
            <nav className={`flex justify-between items-center max-w-[100vw] mx-auto p-10 relative ${!hamb ? "" : ""}`}>
                <div className="mr-auto flex justify-around items-center cursor-pointer">
                    <h1 className="text-2xl cursor-pointer"><Link href='/'>Commerce</Link></h1>
                </div>
                <div className="relative w-[100%] z-50">
                    <ul className={` w-[100vw] h-full gap-4  absolute top-[7.9vh] left-[-22.3vh] sm:left-[-22vh] ml-0 mr-auto  ${!hamb ? "mt-[-140vh] duration-500" : ""} transition-all ease-in-out duration-600 md:flex md:relative md:justify-end md:items-center md:w-full md:gap-10 md:ml-auto md:mr-[-6rem] md:mt-0 md:top-0`}>
                        <li><Link href="/" className="h-[50px] md:w-[120px] md:text-center   rounded-sm    bg-blue-600 mx-auto hover:bg-blue-500 w-full block    text-md pl-[6vh] py-4 bottom-[2rem]  md:pl-0 md:bottom-0 hover:ease-in-out md:px-3">Home</Link></li>
                        <li><Link href="/product" className="h-[50px] md:w-[120px] md:text-center rounded-md  bg-blue-600 w-full block text-md pl-[6vh] py-4 bottom-[2rem]  md:pl-0 md:bottom-0  hover:bg-blue-500  ">Products</Link></li>
                        <li><Link href="/category" ref={categoryRef} className="bg-blue-600 md:w-[123px] md:text-center rounded-sm h-[50px] w-full block text-md pl-[6vh] py-4 bottom-[2rem] md-relative md:pl-0 md:bottom-0   hover:bg-blue-500  " onMouseEnter={() => setCategory(true)} onMouseLeave={() => setCategory(false)}>
                            Categories<span onClick={() => setCategory(!category)}  className="absolute md-top-5 pl-2 cursor-pointer">{category ? <MdOutlineKeyboardArrowDown />: <MdOutlineKeyboardArrowUp />}</span>
                            <ul className={` bg-blue-600 w-[100%] md:w-[180px] md:mt-3 flex flex-col items-start  mt-2 rounded-md border border-blue-900 border-solid ${category ? "duration-500" : "hidden"}`}>
                                {
                                    data.map((d, index) => {
                                       return (
                                        <li key={index} className="py-2 md:bg-blue-600 md:text-white hover:text-white bg-blue-600 rounded-md hover:bg-blue-500 md:hover:bg-blue-400 w-[100%] md-w-full">{d}</li>
                                       )
                                    })
                                }
                            </ul>
                        </Link></li>
                        {(!user)  && (<li><Link href="/login" className="h-[50px] md:w-[120px] md:text-center rounded-sm w-full block bg-blue-600 text-md pl-[6vh] py-4 bottom-[2rem] md:pl-0 md:bottom-0  hover:bg-blue-500">Login</Link></li>)}
                    </ul>
                </div>
                <div className="flex justify-around items-center w-40 md:w-24">
                    <DialogDemo />
                    <GiHamburgerMenu className="text-5xl sm:text-3xl mr-[10px] cursor-pointer md:hidden" onClick={handleHamb}/>
                    {user ? <Image src={user?.photoURL as string} alt="avatar" className="text-4xl cursor-pointer rounded-full" onClick={handleClick} width={40} height={40}/> : <RxAvatar className="text-4xl cursor-pointer rounded-full"/>}
                    <AiFillCaretDown className="cursor-pointer text-[18px]" onClick={handleClick} />
                </div>
                { show &&
                    (
                    <section className="  absolute flex flex-col right-10 top-[12vh] px-1 w-[230px] py-5 z-40 rounded-md shadow-2xl text-blue-500 bg-white border-blue-900  border-[.5px]">
                        <Link href="/user" className="mb-2 flex justify-center items-center gap-1 py-2 hover:rounded-md hover:bg-blue-200 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className=" w-8 h-6 border-l-0 border-gray-400 border-solid border-t-0 border-r border-b-0 flex-grow-1">
                                <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" />
                            </svg>
                            <p className="mx-auto flex-grow-3">
                                Profile
                            </p>
                        </Link>
                        
                        <Link href="/settings" className="mb-2 flex justify-center items-center gap-1 py-2 hover:rounded-md hover:bg-blue-200 cursor-pointer">
                            <MdSettings className="w-8 h-6 border-l-0 border-gray-400 border-solid border-t-0 border-r border-b-0 flex-grow-1" />
                            <p className="mx-auto flex-grow-3">
                                Settings
                            </p>
                        </Link>
                        <button className="border border-grey-900 text-slate-900 rounded-md mt-1 mb-none hover:bg-blue-200 hover:border hover:border-solid hover:border-slate-100 hover:text-warm-grey-800 hover:rounded-lg h-8" onClick={handleLogout}>{loading ? <Loader /> : null}Sign Out</button>
                    </section>
                    )
                }
            </nav>
        </div>
    </div>
};

export default Navbar;


 
export function DialogDemo() {
    return (
      <Dialog>
        <DialogTrigger asChild>
            <AiOutlineSearch className="cursor-pointer text-3xl mr-3 md:text-3xl md:w-10" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Search Products and categories</DialogTitle>
            <DialogDescription>
              Search for the products you want to buy that really suits you
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              {/* <Label htmlFor="name" className="text-right">
                Products/Category
              </Label> */}
              <Input id="name" value="" placeholder="search...." className="col-span-4" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Search</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }
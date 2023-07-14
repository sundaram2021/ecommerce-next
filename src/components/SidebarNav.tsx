"use client"

import  {Separator}  from "./ui/separator"
import { AiFillHome } from "react-icons/ai"
import { RxHamburgerMenu } from 'react-icons/rx'
import { ShoppingBag, Loader2, LogIn, LogOut } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/Sheet"
import {Category}  from "./Category"
import Link from "next/link"
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { SignOutButton } from "@clerk/nextjs";


export function SidebarNav() {
  const {user} = useUser();
  const [loading, setLoading] = useState<Boolean>(false);

  return (
    <Sheet>
    <SheetTrigger asChild>
      <div>
      <RxHamburgerMenu className="sm:text-4xl text-lg ml-[-20px] text-gray-400 cursor-pointer hover:bg-gray-800 sm:p-2 rounded-full" />
      </div>
    </SheetTrigger>
    <SheetContent side="left" className="bg-[#202124]">
      <SheetHeader className="mb-6">
        <SheetTitle className="text-white font-mono text-3xl">Shopnow</SheetTitle>
      </SheetHeader>
      <Separator className="bg-[#3c4043]" />
      <div className="flex flex-col gap-4 py-4">
        <Link  href="/" className="flex items-center text-xl gap-6  hover:bg-[#676c76] rounded-full py-3">
          <span className="text-3xl"><AiFillHome /></span>
          Home
        </Link>
        <Link  href='/' className="flex items-center text-xl gap-6  hover:bg-[#676c76] rounded-full py-3">
          <span className="text-3xl"><ShoppingBag /></span>
          Products
        </Link>
        <Category />
        {user ? 
          <Link  href="" className="flex items-center text-xl gap-6  hover:bg-[#676c76] rounded-full py-3">
            <span className="text-3xl">{loading ? <Loader2 /> :<LogOut />}</span>
            <SignOutButton />
          </Link>
          :
          <Link  href="/sign-in" className="flex items-center text-xl gap-6  hover:bg-[#676c76] rounded-full py-3">
            <span className="text-3xl"><LogIn /></span>
            LogIn
          </Link>
        }
      </div>
    </SheetContent>
  </Sheet>
  )
}



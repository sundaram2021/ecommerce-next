'use client'

import Link from 'next/link'
import { useAuth, useUser } from "@clerk/nextjs";
import { SignOutButton } from "@clerk/nextjs";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu'
import Image from 'next/image'
import { RxAvatar } from 'react-icons/rx'
import { LogIn, LogOut } from 'lucide-react';



export function UserAccountNav() {
    const u = useAuth();
    const {user} = useUser();
    console.log("u",user);
    
  return (
    <DropdownMenu >
      <DropdownMenuTrigger className=''>
      {user ? 
        <Image src={user?.profileImageUrl as string} alt="avatar" className="text-4xl cursor-pointer rounded-full" width={30} height={30}></Image>
            :
        <RxAvatar className="text-4xl cursor-pointer rounded-full"/>
      }
      </DropdownMenuTrigger>
      <DropdownMenuContent className='bg-white' align='end'>
        <div className='flex items-center justify-start gap-2 p-2'>
          <div className='flex flex-col space-y-1 leading-none'>
            {user?.fullName && <p className='font-medium'>{user.fullName}</p>}
            {user?.primaryEmailAddress?.emailAddress && (
              <p className='w-[200px] truncate text-sm text-muted-foreground'>
                {user?.primaryEmailAddress?.emailAddress}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuSeparator />
        {user ?
        <DropdownMenuItem
          className='cursor-pointer flex items-center text-xl gap-6 text-gray-500'
          >
          <span className="text-2xl"><LogOut /></span>
            <SignOutButton />
        </DropdownMenuItem>
        :
        <DropdownMenuItem className='cursor-pointer'>
          <Link href="/sign-in" className='flex items-center text-xl gap-6'><span className="text-3xl"><LogIn /></span>
            LogIn</Link>
        </DropdownMenuItem>
        }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
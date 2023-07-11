'use client'

import Link from 'next/link'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu'
import Image from 'next/image'
import { RxAvatar } from 'react-icons/rx'
import { auth } from "@/utils/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';


export function UserAccountNav() {
    const [user] = useAuthState(auth);
  return (
    <DropdownMenu >
      <DropdownMenuTrigger className=''>
      {user ? 
        <Image src={user?.photoURL as string} alt="avatar" className="text-4xl cursor-pointer rounded-full" width={30} height={30}></Image>
            :
        <RxAvatar className="text-4xl cursor-pointer rounded-full"/>
      }
      </DropdownMenuTrigger>
      <DropdownMenuContent className='bg-white' align='end'>
        <div className='flex items-center justify-start gap-2 p-2'>
          <div className='flex flex-col space-y-1 leading-none'>
            {user?.displayName && <p className='font-medium'>{user.displayName}</p>}
            {user?.email && (
              <p className='w-[200px] truncate text-sm text-muted-foreground'>
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuSeparator />
        {user ?
        <DropdownMenuItem
          className='cursor-pointer'
          onSelect={(event) => {
            event.preventDefault()
            auth.signOut();
          }}>
          Sign out
        </DropdownMenuItem>
        :
        <DropdownMenuItem className='cursor-pointer'>
          <Link href="/login">Sign In</Link>
        </DropdownMenuItem>
        }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
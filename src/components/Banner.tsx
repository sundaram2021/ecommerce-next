"use client"
import { auth } from '@/utils/firebase';
import Image from 'next/image'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';

function Banner() {
    const [user] = useAuthState(auth);
  return (
    <div className='flex justify-center items-center'>
        <div className='sm:hidden pt-10'>
            <img className='object-cover' src="https://lh3.googleusercontent.com/spp/AICo9yyxj01znUqZHxpwyaF5sa_4azsU6PIQzzDjRyVUL5QPNU9K5iaggWCdBohCCn7Iog7o8hsXy2n5eZqewXq50Q4B4wrD88NXFsgmLBKvJEIJ_q-t2CTPiWz1j2IFw__ZXILxSZqaoLDbvObzzlge-E5R2lOmFwPs-pFP0eP11A=w512-h306-rw-pc0x00ffffff"  alt="" />
        </div>
        <div className='relative hidden  pt-16  sm:flex sm:justify-between sm:items-start w-full ml-16 mr-16 leading-tight'>
            <p className='z-10 absolute sm:w-[40%] md:w-[30%] sm:text-2xl md:text-4xl md:font-semibold '>Let's go shopping,{user?.displayName}</p>
            <img className='ml-auto sm:w-[70%] md:w-[80%] h-[250px] md:h-[320px] object-cover' src="https://lh3.googleusercontent.com/spp/AICo9yz567yaMbH-H1Yp9ldo9an97XgSoF4FR-E_Jl_tADmoP8FKDws9WlOmDy9bG55iL0NmUZIYTxDJqPEeJ5yQVptDEXZ8_l0p8ku99B908kpPW2x61wZCURiLEjVarMhCjKkejam31zisZ5ArwEGCb7ag6CYv0WYCl81e4sWH=w1024-h337-rw-pc0x00ffffff"  alt="" />
        </div>
    </div>
  )
}

export default Banner
import Loader from '@/components/Loader';
import React from 'react'

function loading() {
  return (
    <div>
        <div className='w-[90%]  mx-auto ml-16 mb-6 mt-10 flex flex-col sm:flex-row  justify-between items-start gap-6'>
            <div className='sm:w-[50%] w-[85%] h-[300px] rounded-lg shadow-sm shadow-white bg-[#3c4043] animate-pulse'>
            </div>
        </div>
        <Loader />
    </div>
  )
}

export default loading
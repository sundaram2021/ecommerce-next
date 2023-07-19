import React from 'react'

function loading() {
  return (
    <div className='flex flex-col gap-2'>
        <div className='mt-4 ml-16 p-4 sm:w-[345px] w-[300px] rounded-lg shadow-sm  bg-[#3a3e45] flex flex-col justify-start items-center gap-3 animate-pulse'>
        <div className='w-[90%]  mx-auto ml-16 mb-6 mt-10 flex flex-col sm:flex-row  justify-between items-start gap-6'>
            <div className='sm:w-[50%] w-[85%] h-[300px] rounded-lg shadow-sm shadow-white bg-[#3c4043] animate-pulse'>
            </div>
        </div>
        <div className='w-[90%]  mx-auto ml-16 mb-6 mt-10 flex flex-col sm:flex-row  justify-between items-start gap-6'>
            <div className='sm:w-[50%] w-[85%] h-[300px] rounded-lg shadow-sm shadow-white bg-[#3c4043] animate-pulse'>
            </div>
        </div>
        <div className='w-[90%]  mx-auto ml-16 mb-6 mt-10 flex flex-col sm:flex-row  justify-between items-start gap-6'>
            <div className='sm:w-[50%] w-[85%] h-[300px] rounded-lg shadow-sm shadow-white bg-[#3c4043] animate-pulse'>
            </div>
        </div>
      </div>
    </div>
  )
}

export default loading
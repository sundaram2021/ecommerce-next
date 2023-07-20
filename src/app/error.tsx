


'use client' // Error components must be Client Components
 
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className='w-[100vw] h-[100vh] flex justify-center items-center'>
      <div className=' flex felx-col justify-center items-center'>
             <h1 className='bold text-red-600 text-2xl'>Error fetching the Products</h1>
             <button
            className='bg-gray-700 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mx-auto'
            onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
            }
        >
            Try again
        </button>
     </div>
    </div>
  )
}
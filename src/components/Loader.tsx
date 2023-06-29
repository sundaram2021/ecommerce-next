import React, { FC } from "react";
import { VscLoading } from 'react-icons/vsc'



const Loader = () => {
    // if(size === null){
    //     {size} = 0
    // }
    return <div className="flex justify-center items-center h-[70vh] w-[100vw] z-50">
        <button disabled className="flex justify-center items-center">
            <VscLoading className={`animate-spin text-full height-[100%] duration-50`} />
        </button>
    </div>
};

export default Loader;
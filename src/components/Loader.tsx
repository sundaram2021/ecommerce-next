"use client"

import React from "react";



const Loader = () => {
    let arr = new Array(12).fill(0);
    return <div className="ml-16">
        <div className="items-center grid grid-rows-1 sm:grid-rows-2 md:grid-rows-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
            {arr.map((item, index) => (
                <div className="w-[250px] h-[250px] bg-[#3c4043] animate-pulse rounded-lg" key={index}></div>
            ))}
        </div>
        
    </div>
};

export default Loader;
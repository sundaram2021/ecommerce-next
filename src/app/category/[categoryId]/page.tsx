

import MainProd from '@/components/MainProd';
import React from 'react'


function page({params}: {params: {categoryId: string}}) {
    const cat = params.categoryId.replace(/[%?\d]/g, ' ');
    console.log(cat);
    
  
  return (
    <div>
        <MainProd cat={cat}  />
    </div>
  )
}

export default page
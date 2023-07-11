"use client"

import MainProd from '@/components/MainProd';
import Prod1 from '@/components/Prod1';
import React from 'react'

interface Product {
    name: string;
    shortDescription: string;
    bestSellingRank: number;
    thumbnailImage: string;
    salePrice: number;
    manufacturer: string;
    url: string;
    type: string;
    image: string;
    customerReviewCount: number;
    shipping: string;
    salePrice_range: string;
    objectID: string;
    categories: string[];
  }

function page({params}: {params: {categoryId: string}}) {
    const cat = params.categoryId.replace(/[%?\d]/g, '').split(' ').join('');

    console.log(cat);
    
  
  return (
    <div>
        {/* <Prod1 pd={cat} /> */}
        <p>ca: {params.categoryId}</p>
        <MainProd cat={cat}  />
    </div>
  )
}

export default page
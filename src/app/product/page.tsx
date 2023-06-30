'use client'

import React from 'react'

function page() {
  const fetchProduct = async() => {
    // const url = 'https://raw.githubusercontent.com/christkv/ecommerce/master/preload_data/products.json';

    // const response = await fetch(url);

    // const text = await response.text();
    // const categoryRegex = /"category"\s*:\s*"([^"]+)"/g;
    // const matches = text.match(categoryRegex);

    // const categories = matches && matches.map((match) => {
    //   const capturedGroup = match.match(/"category"\s*:\s*"([^"]+)"/);
    //   return capturedGroup && capturedGroup[1];
    // });

    // console.log("categories:", categories);

    // console.log(text);

    // fetch('https://fakestoreapi.com/products')
    //         .then(res=>res.json())
    //         .then(json=>console.log(json))

    fetch('https://raw.githubusercontent.com/algolia/datasets/master/ecommerce/bestbuy_seo.json')
            .then(res=>res.json())
            .then(json=>console.log(json))
    console.log("clicked");
    
  }
  return (
    <div onClick={fetchProduct}>Product</div>
  )
}

export default page

// https://raw.githubusercontent.com/christkv/ecommerce/master/preload_data/products.json

// https://dummyjson.com/docs/products
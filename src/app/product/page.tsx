
"use client"

import React from 'react'

function Product() {
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

    fetch('https://github.com/iffi96/Shoe-store-data-json/blob/master/data001.json')
            .then(res=>res.json())
            .then(json=>console.log(json))
  }
  return (
    <div onClick={fetchProduct}>Product</div>
  )
}

export default Product

// https://raw.githubusercontent.com/christkv/ecommerce/master/preload_data/products.json

// https://dummyjson.com/docs/products
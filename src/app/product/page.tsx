'use client'

import React from 'react'

function page() {
  const fetchProduct = async() => {
    

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

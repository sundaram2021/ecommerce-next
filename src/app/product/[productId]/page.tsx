"use client";

import MainProd from '@/components/MainProd';
import { Separator } from '@/components/ui/separator';
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

function page({params}: {params: {productId: string}}) {
  console.log('params', params);
  const [product, setProduct] = React.useState<Product>();
  const [productCategory, setProductCategory] = React.useState<string>();


  const fetchProduct = async() => {
    const res = await fetch("https://raw.githubusercontent.com/algolia/datasets/master/ecommerce/bestbuy_seo.json");
    const data = await res.json();
    const prod = data.find((product: Product) => product.objectID === params.productId);
    setProduct(prod);
    setProductCategory(prod.categories[0]);
  }

  React.useEffect(() => {
    fetchProduct();
  }, []);

  console.log('product', product);
  

  return (
    <div>
        <div className='w-[90%] mx-auto ml-16 mb-6 mt-10 flex flex-col sm:flex-row  justify-between items-start gap-6'>
            <div className='sm:w-[50%] w-[85%] rounded-lg shadow-sm shadow-white bg-white'>
              {product ? <img className='rounded-md  md:h-[300px] sm:h-[300px] h-[200px]' src={product.image} alt="" />: <div className='bg-[#676c76] w-full animate-pulse'></div>}
            </div>
            <div className='sm:w-[50%] w-[85%] flex flex-col gap-4'>
              <h1 className='font-bold'>{product?.name}</h1>
              <p className='font-thin line-clamp-3' title={product?.shortDescription}>{product?.shortDescription}</p>
              <p className='font-semibold'>${product?.salePrice}</p>
              <p className='font-semibold'>Rank: {product?.bestSellingRank}</p>
            </div>
        </div>
        <Separator />
        <MainProd name={productCategory}  />
    </div>
  )
}

export default page
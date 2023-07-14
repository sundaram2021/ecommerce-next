"use client"

import { Separator } from './ui/separator';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react';

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


type ProductProps = {
    pd?: string;
    cate?: string;
}

function Prod1(props: ProductProps) {
  const { pd, cate } = props;
  const [loading, setLoading] = React.useState<boolean>(true);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = React.useState<number>(12);

  function fetchProducts(limit: number) {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}?limit=${limit}`)
      .then(res => res.json())
      .then((json: Product[]) => {
        const headphonesProducts: Product[] = json.filter((item: Product) => {
          return item.categories.some(category => {
            // console.log(" xx",category.toLowerCase().trim() === pd);

            if((cate !== undefined) && (pd === undefined)) return category && category.toLowerCase().split(" ").join("") === cate.split(" ").join("");
            
            if((cate === undefined) && (pd !== undefined)) return category && category.toLowerCase().trim() === pd.toLowerCase().trim();
          });
        });

        console.log(headphonesProducts);
        setProducts(prevProducts => [...prevProducts, ...headphonesProducts]);
        // setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      }).finally(() => {
        setLoading(false);
      });
  }

  function handleSeeMoreClick(e:React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    const newDisplayedProducts = displayedProducts + 12;
    setDisplayedProducts(newDisplayedProducts);
    fetchProducts(newDisplayedProducts);
  }

  React.useEffect(() => {
    fetchProducts(displayedProducts);
  }, [])

  console.log(products);

  return (
    <>
    <div className='mt-20 ml-16  snap-x-none'>
      {(pd !== undefined) ? <h3 className='mb-6 text-xl'>{pd?.toUpperCase()}</h3> : ""}
      {(cate !== undefined) ?  <h3 className='mb-6 text-xl'>{cate.toUpperCase()}</h3>: ""}
      {(loading || !products) ? 
      (new Array(15).fill(null).map((item, idx) => <div className='w-[300px] h-[300px] animate-pulse' key={idx}></div>)) : 
      (<div className='items-center grid grid-rows-1 sm:grid-rows-2 md:grid-rows-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 '>
        {products.slice(0, displayedProducts).map((product: Product) => {
          return (
            <Link href={`/product/${product.objectID}`} className='text-white flex flex-col items-center gap-2 justify-center mb-6 w-[300px] h-[300px] rounded-lg ' key={product.objectID}>
              <div className='bg-white w-full rounded-lg shadow-sm mx-auto shadow-white'>
                <img
                  src={product.image as string}
                  alt={product.name}
                  className='w-48 h-48 object-contain rounded-md'
                />
              </div>
              <p className='text-sm line-clamp-1 font-semibold mr-auto' title={product.name}>{product.name}</p>
              {/* <p className='text-white line-clamp-1 font-extralight' title={product.shortDescription}>{product.shortDescription}</p> */}
              <p className='text-white mr-auto'>${product.salePrice}</p>
            </Link>
          )
        })}
      </div>
      )}
      {displayedProducts < products.length  && (
        <button className='mt-2 mb-2 mx-auto flex text-blue-300' onClick={handleSeeMoreClick}>See More <ChevronDown /></button>
      )}
    </div>
    <Separator />
    </>
  )
}

export default Prod1;

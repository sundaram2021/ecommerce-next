'use client'

import React from 'react';
import Slider from './Slider';
import { Separator } from './ui/separator';
import Link from 'next/link';
import { Product } from '@/types';

function Prod2() {
    let x = 0, y = 0;
  const [loading, setLoading] = React.useState<boolean>(true);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = React.useState<number>(1);
  const [sliderPosition, setSliderPosition] = React.useState<number>(0);

  function fetchProducts(limit: number) {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}?limit=${limit}`)
      .then((res) => res.json())
      .then((json: Product[]) => {
        const headphonesProducts: Product[] = json.filter((item: Product) => {
          return item.categories.some((category) => {
            return category && category.toLowerCase().trim() === 'laptop bags & cases';
          });
        });

        console.log(headphonesProducts);
        setProducts((prevProducts) => [...prevProducts, ...headphonesProducts]);
        // setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleSeeMoreClick() {
    const newDisplayedProducts = displayedProducts + 1;
    setDisplayedProducts(newDisplayedProducts);
    fetchProducts(newDisplayedProducts);
  }

  function handleSliderLeft() {
    y++;
    setSliderPosition((prevPosition) => prevPosition - 300);
    if((y + 1) % 11 == 0){
        handleSeeMoreClick();
    }
  }

  function handleSliderRight() {
    x++
    setSliderPosition((prevPosition) => prevPosition + 300);
    if((x + 1) % 11 == 0){
        handleSeeMoreClick();
    }
  }

  React.useEffect(() => {
    fetchProducts(displayedProducts);
  }, []);

  console.log(products);
  return (
    <>
    <div className="container mx-auto">
      <div className="ml-10 mt-8 mb-6 text-xl">
        <h2 className="">Laptop Bags and Acessories</h2>
      </div>
      <div className="ml-10 slider-container flex items-center">
        <button className="text-2xl border rounded-full w-8 h-8" onClick={handleSliderLeft}>
          &lt;
        </button>
        <div className="slider overflow-hidden">
        <Slider>
          {products.map((product, index) => (
                <Link href={`product/${product.objectID}`} className='text-white border border-white flex flex-col items-center gap-2 justify-center mb-6 w-[300px] h-[300px] rounded-lg ' key={product.objectID}              style={{ transform: `translateX(${sliderPosition}px)` }}>
                    <div className='bg-white w-full rounded-lg flex justify-start items-start mb-12  shadow-sm mx-auto shadow-white'>
                    <img
                        src={product.image as string}
                        alt={product.name}
                        className='w-48 h-48 object-contain rounded-md'
                    />
                    </div>
                    <p className='text-sm line-clamp-1 font-semibold mr-auto' title={product.name}>{product.name}</p>
                    <p className='text-white mr-auto'>${product.salePrice}</p>
                </Link>
          ))}
          </Slider>
        </div>
        <button className="text-2xl border rounded-full w-8 h-8" onClick={handleSliderRight}>
          &gt;
        </button>
      </div>
    </div>
    <Separator />
    </>
  );
}

export default Prod2;

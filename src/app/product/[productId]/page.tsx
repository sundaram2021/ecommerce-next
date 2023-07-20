"use client";

import MainProd from '@/components/MainProd';
import { Separator } from '@/components/ui/separator';
import React from 'react';
import { Loader } from 'lucide-react';
import { Product } from '@/types';
import { useUser } from "@clerk/nextjs";
import FilterComponent from '@/components/Filter';
import { toast } from '@/hooks/use-toast';


function Page({ params }: { params: { productId: string } }) {
  console.log('params', params);
  const { user } = useUser();
  console.log('user', user);
  const userId = user?.id;
  const email  = user?.primaryEmailAddress?.emailAddress;
  const [product, setProduct] = React.useState<Product>();
  const [productCategory, setProductCategory] = React.useState<string>();
  const [loading, setLoading] = React.useState<boolean>(false);

  const fetchProduct = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`);
    const data = await res.json();
    const prod = data.find((product: Product) => product.objectID === params.productId);
    setProduct(prod);
    setProductCategory(prod.categories[0]);
  };

  React.useEffect(() => {
    fetchProduct();
  }, []);

  

  console.log('product', product);

  const handleCart = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if(!user){
      alert('Please sign in to add to cart')
      return;
    }

    setLoading(true);
    const id = product?.objectID;

    if(id === null){
      return toast({
        title: 'Please refresh the page and try again',
        variant: 'default',
      })
    }

    const dd = await fetch(`/api/cart/${id}`, {
      method: "POST",
      body: JSON.stringify({
        productId: id,
      }),
    }).then((res) => res.json()).catch((err) => {
      console.log('err', err);
    });

    console.log('dd', dd);
    
    
    // if the product is already in the then send the message using toast and return
    if(dd){
      console.log('Product already in cart');
      setLoading(false);
      return toast({
        title: 'Already in cart',
        variant: 'default',
      })
    }
  
    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        body: JSON.stringify({
          name: product?.name,
          description: product?.shortDescription,
          productId: product?.objectID,
          price: product?.salePrice,
          user: email,
          userId: userId,
          username: user?.fullName,
          img: product?.image,
          qty: 1,
        }),
      })
      const dr = await res.json();
      
      if(dr === null){
        return toast({
          title: 'Please refresh the page and try again',
          variant: 'default',
        })
      }

      return toast({
        title: product?.name + ' added to cart',
        description: product?.shortDescription,
        variant: 'default',
      })
    } catch (error) {
      console.error('Error creating cart:', error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div>
      <div className='w-[90%] mx-auto ml-16 mb-6 mt-10 flex flex-col sm:flex-row  justify-between items-start gap-6'>
        <div className='sm:w-[50%] w-[85%] rounded-lg shadow-sm shadow-white bg-white flex justify-center items-center'>
          {product ? (
            <img className='rounded-md  md:h-[300px] sm:h-[300px] h-[200px]' src={product.image} alt='' />
          ) : (
            <div className='bg-[#676c76] w-full animate-pulse'></div>
          )}
        </div>
        <div className='sm:w-[50%] w-[85%] flex flex-col gap-4'>
          <h1 className='font-bold'>{product?.name}</h1>
          <p className='font-thin line-clamp-3' title={product?.shortDescription}>
            {product?.shortDescription}
          </p>
          <p className='font-semibold'>${product?.salePrice}</p>
          <p className='font-semibold'>Rank: {product?.bestSellingRank}</p>
          <div className='flex'>
            <button
              className='mr-auto text-black bg-white py-[4px] px-3 rounded-lg border border-black hover:bg-[#424242] duration-300 ease-in-out hover:text-white hover:border-white flex items-center'
              onClick={handleCart}
              disabled={loading}
            >
              {loading && <Loader className='mr-2 animate-spin' size={20} />} Add to cart
            </button>
            <button
              className='mr-auto text-black bg-white py-[4px] px-3 rounded-lg border border-black hover:bg-[#424242] duration-300 ease-in-out hover:text-white hover:border-white flex items-center'
              onClick={handleCart}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <Separator />
      <FilterComponent />
      <Separator />
      <MainProd name={productCategory} pagination={true} />
    </div>
  );
}

export default Page;

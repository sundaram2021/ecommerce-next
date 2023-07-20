"use client"

import React from 'react';
import { Cart } from '@/types';
import { Loader } from 'lucide-react';
import getStripePromise from '@/lib/stripe';
import { toast } from '@/hooks/use-toast';

function Page() {
  const [cart, setCart] = React.useState<Cart[]>([]);
  const [totalPrice, setTotalPrice] = React.useState<number>(0);
  const [totalItems, setTotalItems] = React.useState<number>(0);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [buttonLoading, setButtonLoading] = React.useState<boolean>(false);

  console.log('cart', cart);
  console.log('totalPrice', totalPrice);
  console.log('totalItems', totalItems);

  const fetchCart = async () => {
    const res = await fetch('/api/cart');
    const data = await res.json();

    if(data.error){
      return toast({
        title: 'Something went wrong.',
        description: 'Not able to fetch the cart',
        variant: 'destructive',
      })
    }

    setCart(data);

    // Move the calculations for totalPrice and totalItems inside fetchCart
    const totalPriceSum = data.reduce((acc: number, curr: Cart) => acc + curr.price * curr.qty, 0);
    const totalItemsCount = data.reduce((acc: number, curr: Cart) => acc + curr.qty, 0);
    setTotalPrice(totalPriceSum);
    setTotalItems(totalItemsCount);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchCart();
  }, []);


  React.useEffect(() => {
    fetchCart();
  }, [totalPrice, totalItems]);
  

  // useEffect to update totalPrice and totalItems when cart changes
  React.useEffect(() => {
    if(cart.length > 0){
      const totalPriceSum = cart.reduce((acc: number, curr: Cart) => acc + curr.price * curr.qty, 0);
      const totalItemsCount = cart.reduce((acc: number, curr: Cart) => acc + curr.qty, 0);
      setTotalPrice(totalPriceSum);
      setTotalItems(totalItemsCount);
    }
  }, [cart]);

  const handleCartIncrease = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string, price: number, qty: number) => {
    e.preventDefault();
    console.log('id', id);
    


    // update the state totalPrice and totalItems
    setTotalPrice(totalPrice + price);
    setTotalItems(totalItems + qty);


    const res = await fetch(`/api/cart/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        type: 'increase',
        id: id
      }),
    });
    const data = await res.json();
    setCart(data);
  }

  const handleCartDecrease = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string, price: number, qty: number) => {
    e.preventDefault();


    // update the state totalPrice and totalItems
    if(totalPrice > 0)setTotalPrice(totalPrice - price);
    if(totalItems >= 1)setTotalItems(totalItems - qty);


    const res = await fetch(`/api/cart/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        type: 'decrease',
        id: id
      }),
    });
    const data = await res.json();
    setCart(data);
  }

  const handleCartDelete = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
    e.preventDefault();
  
    try {
      setButtonLoading(true);
  
      const res = await fetch(`/api/cart/${id}`, {
        method: 'DELETE',
      });
  
      if (!res.ok) {
        throw new Error('Failed to delete item from the cart.');
      }
  
      // If the deletion was successful, call fetchCart to update the cart data
      await fetchCart();

      return toast({
        title: 'Cart Item Deleted',
        description: 'Item removed from the cart',
        variant: 'default',
      })
    } catch (error) {
      console.error('Error deleting item from cart:', error);
    } finally {
      setButtonLoading(false);
    }
  };


  const handleCheckoutCart = async () => {
    // e.preventDefault();
    
    try {
      const stripe = await getStripePromise();
      const response = await fetch("/api/stripe-session/", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" ,
          "Accept": "application/json"      },
        cache: "no-cache",
        body: JSON.stringify(cart),
      });

      // console.log('response', response);
      

      const data = await response.json();
      console.log('data', data);

      console.log("stripe", stripe);
      toast({
        title: 'Successfully checked out',
        description: 'Your order is placed. Thank you for shopping with us.',
        variant: 'default',
      });
      // return stripe.redirectToCheckout({ sessionId: data.session.id });
      return stripe?.redirectToCheckout({ sessionId: data.session.id });
    } catch (error) {
      console.log("error", error);
      
    }
   
  };

  return (
    
    <div>
      <div className='mt-4 ml-16 p-4 sm:w-[345px] w-[300px] rounded-lg shadow-sm  bg-[#3a3e45] flex flex-col justify-start items-center gap-3'>
        <p className='mr-auto'>Total price: ${totalPrice}</p>
        <button className='mr-auto text-black bg-white py-[4px] px-3 rounded-lg border border-black hover:bg-[#202124] duration-300 ease-in-out hover:text-white hover:border-white flex items-center font-light text-sm' onClick={handleCheckoutCart}>
          Proceed to checkout ({totalItems} item)
        </button>
      </div>
      { 
      loading ?(
        <div className='w-[90%]  mx-auto ml-16 mb-6 mt-10 flex flex-col sm:flex-row  justify-between items-start gap-6'>
            <div className='sm:w-[50%] w-[85%] h-[300px] rounded-lg shadow-sm shadow-white bg-[#3c4043] animate-pulse'>
            </div>
        </div>
      ) :(
      
      cart.length > 0 && (totalItems > 0) && (Number(totalPrice) > 0)?( 
      cart && cart.map((item) => {
        return (
          <div className='w-[90%] mx-auto ml-16 mb-6 mt-10 flex flex-col sm:flex-row  justify-between items-start gap-6' key={item.id}>
            <div className='sm:w-[50%] w-[85%] rounded-lg shadow-sm shadow-white bg-white flex justify-center items-center'>
              {true ? (
                <img className='rounded-md  md:h-[300px] sm:h-[300px] h-[200px]' src={item.img} alt='' />
              ) : (
                <div className='bg-[#676c76] w-full animate-pulse'></div>
              )}
            </div>
            <div className='sm:w-[50%] w-[85%] flex flex-col gap-4'>
              <h1 className='font-bold'>{item.name}</h1>
              <p className='font-thin line-clamp-3' title={item.description}>
                {item.description}
              </p>
              <p className='font-semibold'>${item.price}</p>
              <div className='flex'>
                <button
                  title='increase quantity'
                  className='mr-auto font-bold text-black bg-white py-[4px] px-3 rounded-lg border border-black hover:bg-[#424242] duration-300 ease-in-out hover:text-white hover:border-white flex items-center'
                  onClick={(e) => handleCartIncrease(e, item?.productId, item?.price, item?.qty)}
                  // disabled={loading}
                >
                  +
                  {/* {loading && <Loader className='mr-2 animate-spin' size={20} />} Add to cart */}
                </button>
                <button
                  title='decrease quantity'
                  className='mr-auto font-bold text-black bg-white py-[4px] px-3 rounded-lg border border-black hover:bg-[#424242] duration-300 ease-in-out hover:text-white hover:border-white flex items-center'
                  onClick={(e) => handleCartDecrease(e, item?.productId, item?.price, item?.qty)}
                  // disabled={loading}
                >
                  -
                  {/* {loading && <Loader className='mr-2 animate-spin' size={20} />} Add to cart */}
                </button>
              </div>
              <button
                  title='delete item'
                  className='mr-auto font-bold text-black bg-white py-[4px] px-3 rounded-lg border border-black hover:bg-[#424242] duration-300 ease-in-out hover:text-white hover:border-white flex items-center'
                  onClick={(e) => handleCartDelete(e, item?.productId)}
                  disabled={buttonLoading}
                >
                  {buttonLoading && <Loader className='mr-2 animate-spin' size={20} />} Remove from Cart
                </button>
            </div>
          </div>
        );
      }))
      :(
        <div className="text-center mt-4">
          <p className='text-lg'>No items in the cart.</p>
        </div>
      )
    )}
    </div>
  );
}

export default Page;

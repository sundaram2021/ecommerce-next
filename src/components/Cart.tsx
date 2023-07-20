'use client'
import { toast } from '@/hooks/use-toast';
import { Cart } from '@/types';
import { Loader } from 'lucide-react';
import React, { useEffect } from 'react'

function Cart() {
    const [cart, setCart] = React.useState<Cart[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [totalCartItems, setTotalCartItems] = React.useState<number>(0);
    const [totalPrice, setTotalPrice] = React.useState<number>(0);

    const fetchCart = async () => {
        const res = await fetch('/api/cart');
        const data = await res.json();
        setCart(data);
        setLoading(false);
    }

    const handleCheckoutCart = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        console.log('checkout cart');
    }

    const updateCartTotals = () => {
        let items = 0;
        let price = 0;
    
        for (const item of cart) {
          items += item.qty;
          price += item.price * item.qty;
        }
    
        setTotalCartItems(items);
        setTotalPrice(price);
    };

    useEffect(() => {
        fetchCart();
    }, [])

    useEffect(() => {
        updateCartTotals();
      }, [cart]);

    console.log('cart', cart);

    console.log('totalCartItems', totalCartItems);
    console.log('totalPrice', totalPrice);
    
    

  return (
    <div>
        <div className='mt-4 ml-16 p-4 sm:w-[345px] w-[300px] rounded-lg shadow-sm  bg-[#3a3e45] flex flex-col justify-start items-center gap-3'>
        <p className='mr-auto'>Total price: ${totalPrice.toFixed(2)}</p>
        <button className='mr-auto text-black bg-white py-[4px] px-3 rounded-lg border border-black hover:bg-[#202124] duration-300 ease-in-out hover:text-white hover:border-white flex items-center font-light text-sm' onClick={handleCheckoutCart}>
          Proceed to checkout ({totalCartItems} item)
        </button>
      </div>
      {(cart.length > 0 && !loading) && (<CartItems cart={cart}  setCart={setCart}  fetchCart={fetchCart} />)};
      {(cart.length === 0 && !loading) && (<CartEmpty />)};
      {loading && (<CartLoader />)}
    </div>
  )
}

export default Cart

function CartLoader() {
   return  (
    <div className='w-[90%]  mx-auto ml-16 mb-6 mt-10 flex flex-col   justify-between items-start gap-6'>
        <div className='sm:w-[50%] w-[85%] h-[300px] rounded-lg shadow-sm shadow-white bg-[#3c4043] animate-pulse'>
        </div>
        <div className='sm:w-[50%] w-[85%] h-[300px] rounded-lg shadow-sm shadow-white bg-[#3c4043] animate-pulse'>
        </div>
        <div className='sm:w-[50%] w-[85%] h-[300px] rounded-lg shadow-sm shadow-white bg-[#3c4043] animate-pulse'>
        </div>
        <div className='sm:w-[50%] w-[85%] h-[300px] rounded-lg shadow-sm shadow-white bg-[#3c4043] animate-pulse'>
        </div>
    </div>
   )
}

type CartItemsProps = {
    cart: Cart[];
    setCart: React.Dispatch<React.SetStateAction<Cart[]>>;
    fetchCart: () => void;
  };

function CartItems (props: CartItemsProps) {
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false);
    const { cart, setCart, fetchCart } = props;
    const handleCartIncrease = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string, price: number, qty: number) => {
        e.preventDefault();
        console.log('id', id);
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
        const res = await fetch(`/api/cart/${id}`, {
          method: 'PATCH',
          body: JSON.stringify({
            type: 'decrease',
            id: id
          }),
        });
        const data = await res.json();
        setCart(data);

        const dt = data.find((item: Cart) => item.productId === id);

        if(dt.qty  = 1) {
           return toast({
             title: "It is last element of its type ,You  can remove it"
            })
        }
    }

    const handleCartDelete = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
        e.preventDefault();
      
        try {
          setButtonLoading(true);
      
          const res = await fetch(`/api/cart?id=${id}`, {
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

    return (
        cart.map((item) => {
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
                    >
                      +
                    </button>
                    <button
                      title='decrease quantity'
                      className='mr-auto font-bold text-black bg-white py-[4px] px-3 rounded-lg border border-black hover:bg-[#424242] duration-300 ease-in-out hover:text-white hover:border-white flex items-center'
                      onClick={(e) => handleCartDecrease(e, item?.productId, item?.price, item?.qty)}
                    >
                      -
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
            })
    )
}

function CartEmpty() {
    return  (
        <div className="text-center mt-4">
          <p className='text-lg'>No items in the cart.</p>
        </div>
    )
}
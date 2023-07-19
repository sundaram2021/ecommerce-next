"use client"

import { Separator } from './ui/separator';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react';
import Pagination from './Pagination';
import { Product } from '@/types';
import { Filter } from '@/redux/FilterSlice';
import { useSelector } from 'react-redux';
import { useAppSelector } from '@/redux/store';



type ProductProps = {
    pd?: string;
    cate?: string;
    pagination?: boolean;
    scrolling?: boolean;
}

function Prod1(props: ProductProps) {
  const { pd, cate, pagination, scrolling } = props;
  const d = useAppSelector((state) => state.filter);
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [filterProducts, setFilterProducts] = React.useState<Product[]>([]); // filterProducts
  const [displayedProducts, setDisplayedProducts] = React.useState<number>(12);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [postsPerPage] = React.useState(12);

  function fetchProducts(limit: number, offset: number = 0) {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}?limit=${limit}&offset=${offset}`)
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
    const newOffset = newDisplayedProducts;
    setDisplayedProducts(newDisplayedProducts);
    fetchProducts(newDisplayedProducts, newOffset);
  }

  React.useEffect(() => {
    fetchProducts(displayedProducts);
  }, [])

  React.useEffect(() => {
    if (scrolling) {
      const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 50) {
          const newDisplayedProducts = displayedProducts + 16;
          const newOffset = displayedProducts;
          setDisplayedProducts(newDisplayedProducts);
          fetchProducts(newDisplayedProducts, newOffset);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [scrolling, displayedProducts]);

  console.log(products);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = products.slice(firstPostIndex, lastPostIndex);

  React.useEffect(() => {
    const setNewDisplayedProducts = () => {
      setDisplayedProducts(currentPage * postsPerPage);
    }
    setNewDisplayedProducts();
  }, [currentPage]);

  console.log("currrrr",currentPosts);

  
  React.useEffect(() => {
    function filterProductsByRange() {
      let filteredProducts:Product[] = products;
  
      for (let i = 0; i < d.filter.length; i++) {
        const filterValue = d.filter[i].value;
  
        if (filterValue.includes('0 to 1,000')) {
          filteredProducts = filteredProducts.filter(
            (product) =>
              product.bestSellingRank === Number(d.filter[i].id) &&
              product.bestSellingRank > 0 &&
              product.bestSellingRank < 1000
          );
        }
  
        if (filterValue.includes('1,000 to 10,000')) {
          filteredProducts = filteredProducts.filter(
            (product) =>
              product.bestSellingRank === Number(d.filter[i].id) &&
              product.bestSellingRank >= 1000 &&
              product.bestSellingRank <= 10000
          );
        }
  
        if (filterValue.includes('10,000 above')) {
          filteredProducts = filteredProducts.filter(
            (product) =>
              product.bestSellingRank === Number(d.filter[i].id) &&
              product.bestSellingRank > 10000
          );
        }
  
        if (filterValue.includes('0 to 1,000')) {
          filteredProducts = filteredProducts.filter(
            (product) =>
              product.customerReviewCount === Number(d.filter[i].id) &&
              product.customerReviewCount > 0 &&
              product.customerReviewCount < 1000
          );
        }
  
        if (filterValue.includes('1,000 to 10,000')) {
          filteredProducts = filteredProducts.filter(
            (product) =>
              product.customerReviewCount === Number(d.filter[i].id) &&
              product.customerReviewCount >= 1000 &&
              product.customerReviewCount <= 10000
          );
        }
  
        if (filterValue.includes('10,000 above')) {
          filteredProducts = filteredProducts.filter(
            (product) =>
              product.customerReviewCount === Number(d.filter[i].id) &&
              product.customerReviewCount > 10000
          );
        }
  
        if (filterValue.includes('0 to $50')) {
          filteredProducts = filteredProducts.filter(
            (product) => product.salePrice === 50
          );
        }
  
        if (filterValue.includes('$50 to $100')) {
          filteredProducts = filteredProducts.filter(
            (product) => product.salePrice > 50 && product.salePrice <= 100
          );
        }
  
        if (filterValue.includes('$100 above')) {
          filteredProducts = filteredProducts.filter(
            (product) => product.salePrice > 100
          );
        }
      }
  
      setFilterProducts(filteredProducts);
    }
  
    filterProductsByRange();
  }, [d]);
  
      


  const postsToDisplay = pagination ? ((filterProducts.length > 0) ? filterProducts : currentPosts) : products;
  
  console.log("filterProducts",filterProducts);
  console.log("true", filterProducts === postsToDisplay);
  

  console.log("d", d);
  
  
  return (
    <>
    <div className={`mt-20 ml-16 snap-x-none ${scrolling ? 'overflow-y-auto' : ''}`} ref={wrapperRef} >
      {(pd !== undefined) ? <h3 className='mb-6 text-xl'>{pd?.toUpperCase()}</h3> : ""}
      {(cate !== undefined) ?  <h3 className='mb-6 text-xl'>{cate.toUpperCase()}</h3>: ""}
      {(loading || !products) ? 
      (new Array(15).fill(null).map((item, idx) => <div className='w-[300px] h-[300px] animate-pulse' key={idx}></div>)) : 
      (<div className='items-center grid grid-rows-1 sm:grid-rows-2 md:grid-rows-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {postsToDisplay.slice(0, displayedProducts).map((product: Product) => {
          return (
            <div className="group" key={product.objectID}>
              <Link
                href={`/product/${product.objectID}`}
                className="text-white bg-[#1a1b1d] flex flex-col items-center justify-between mb-6 w-[270px]  rounded-lg hover:shadow-2xl hover:shadow-[#424242]"
                
              >
                <div className="bg-white w-full rounded-lg shadow-sm mx-auto shadow-white flex justify-center items-center">
                  <img
                    src={product.image as string}
                    alt={product.name}
                    className="w-48 h-48 object-contain rounded-md"
                  />
                </div>
                {/* hidden group-hover:block transition-display */}
                <div className="mr-auto z-40 ml-2 ">
                  <p className="text-sm line-clamp-1 font-semibold mr-auto mb-2" title={product.name}>
                    {product.name}
                  </p>
                  <p className="text-white">${product.salePrice}</p>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
      )}
      {displayedProducts < products.length && !pagination && !scrolling && (
        <button className='mt-2 mb-2 mx-auto flex text-blue-300' onClick={handleSeeMoreClick}>See More <ChevronDown /></button>
      )}
      {
        pagination && !scrolling && <Pagination totalPosts={products.length} postsPerPage={postsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      }
    </div>
    <Separator />
    </>
  )
}

export default Prod1;

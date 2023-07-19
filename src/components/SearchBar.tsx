'use client'

import React from 'react'
import { Input } from '@/components/ui/input'
import { Product } from '@/types'
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command"

  import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import Link from 'next/link'
  

function SearchBar() {
    const [searchData, setSearchData] = React.useState<Product[]>([])
    const [searchValue, setSearchValue] = React.useState<string>("")

    function handleChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchValue(e.target.value)
    }

    const fetchProducts = async (value: string) => {
        try {
          const encodedValue = encodeURIComponent(value);
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}?limit=10&search=${encodedValue}`
          );
          const json = await response.json();
          const products: Product[] = json.filter((item: Product) => {
            return (
              item &&
              item.name &&
              item.name.toLowerCase().includes(value.toLowerCase())
            );
          });
          setSearchData(products);
        } catch (error) {
          console.error('Error fetching products:', error);
          setSearchData([]); // Set empty array in case of error or no results
        }
      }; 

    React.useEffect(() => {
        fetchProducts(searchValue);
    }, [searchValue]);

  return(
    <Dialog>
      <DialogTrigger asChild>
        <div className='mx-auto'>
            <Input className='bg-[#202124] border-[1px] border-solid border-[#3c4043]  focus-within:outline focus-within:outline-[#3c4043] lg:w-[700px] md:w-[500px] sm:w-[400px]  rounded-full' placeholder='search products...' />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-0">
        <Command className="rounded-lg border shadow-md">
            <Input   onChange={e => handleChangeInput(e)} placeholder="Type a command or search..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Products">
                    {
                        searchData.map((product, index) => {
                            return (
                            <CommandItem key={product.objectID}>
                                <Link href={`/product/${product.objectID}`}><span>{product.name}</span></Link>
                            </CommandItem>
                            )
                        })
                    }
                    {/* <CommandItem>
                        <span>Calendar</span>
                    </CommandItem>
                    <CommandItem>
                        <span>Search Emoji</span>
                    </CommandItem>
                    <CommandItem>
                        <span>Calculator</span>
                    </CommandItem> */}
                </CommandGroup>
                <CommandSeparator />
            </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
    )
}

export default SearchBar

{/* <div className='mx-auto'>
            <Input className='bg-[#202124] border-[1px] border-solid border-[#3c4043]  focus-within:outline focus-within:outline-[#3c4043] lg:w-[700px] md:w-[500px] sm:w-[400px]  rounded-full' onChange={e => handleSearch(e)} placeholder='search products...' />
        </div> */}
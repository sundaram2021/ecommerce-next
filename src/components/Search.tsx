"use client"

import React, { useState, useEffect, use } from 'react';
import { useDispatch , useSelector} from 'react-redux';
import { addValue, searchState } from '@/reducers/SearchSlice';
import { IoFilterOutline } from 'react-icons/io5';
import { fetchCategory, setCate } from '@/reducers/CategorySlice';
import { Dispatch } from 'redux';

interface RootState {
    search: {   
        searchState: boolean
    }
}

function Search() {
    const itemState = useSelector((state:RootState) => state.search.searchState);
    const dispatch = useDispatch();
    const [filter, setFilter] = useState(false);
    const [search, setSearch] = useState<string>("");
    const handleOnChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearch(e.target.value);
    }
    const handleOnClick = () => {
        if(search === "") return;
        dispatch(addValue(search));
        dispatch(searchState(true))
    }

    console.log("itemState : ",itemState);
    
  return (
    <div className='flex justify-center items-center mt-8 mx-auto gap-2 relative'>
        <input type="text" className='bg-blue-50 border-hidden outline-none w-[220px] sm:w-[400px] md:w-[500px] h-[30px] p-5 rounded-md text-warm-gray-500' onChange={handleOnChange} placeholder='search...' />
        <button className={`w-[70px]  bg-blue-600 py-2 px-3 rounded-md text-white hover:bg-blue-400 ${itemState ? "text-[11px] py-3 animate-pulse" : ""}`} onClick={handleOnClick}>{itemState ? "Searching..." : "Search"}</button>
        <IoFilterOutline className='text-warn-grey-900 bg-slate-100 h-[35px] w-[24px] text-2xl cursor-pointer rounded-sm hover:bg-slate-300 hover:text-slate-700 md:hidden' title='filter' onClick={() => setFilter(!filter)}/>
        {filter ? <Categories /> : ""}
    </div>
  )
}

export default Search;

interface CategoryRootState {
    category: {
        data: string[]
  
    }
}
interface CategoryRootStatus {
    category: {
        status: string
  
    }
}

interface CheckedMap {
    [category: string]: boolean;
  }

function Categories(){
    const [checkedMap, setCheckedMap] = useState<CheckedMap>({});
    const dispatch:Dispatch<any> = useDispatch();
    const categories = useSelector((state:CategoryRootState) => state.category.data);
    const status = useSelector((state:CategoryRootStatus) => state.category.status);

    useEffect(() => {
        dispatch(fetchCategory());
    }, [])
    console.log("categories : ",categories);

    if(status === "error"){
        return <div>error in fetching categories</div>
    }  

    const handleOnClick = (category:string) => {
        setCheckedMap((prevState) => ({
            ...prevState,
            [category]: !prevState[category],
        }));
        dispatch(setCate(category));
    }
    
    return (
        
        <div className='w-[300px] h-max bg-blue-200 rounded-md  absolute top-12 z-50'>
            {(status === "loading" || categories.length === 0) ? 
                        <ListSkeleton /> 
                        :
            <ul className='flex flex-col gap-2'>
                {categories.map((category) => {
                    return (   
                    <div className={`flex justify-start items-center p-2 cursor-pointer rounded-md ${status === "loading" ? "animation-pulse" : ""} hover:bg-blue-100`} onClick={() => handleOnClick(category)}>
                        <input type="checkbox" checked={checkedMap[category]} className='text-md w-6 ' name="list" id="" />
                        <li className='text-slate-500 text-md'  key={category}>{category}</li>
                    </div>
                    )
                })}
            </ul>}
        </div>
    )
}

//make a function skeleton for the five list

function ListSkeleton(){
    const arr = [1,2,3,4,5];
    return (
        arr.map((item) => (
           <div>
            <p className='bg-blue-300 h-5 w-full mt-2 rounded-md animate-pulse' key={item}></p> 
           </div>
        ))
    )
}
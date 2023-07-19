"use client"

import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { useDispatch, useSelector } from "react-redux";
import { addFilter, removeFilter, Filter } from "@/redux/FilterSlice";
import { useAppSelector } from "@/redux/store";



const FilterComponent = () => {
  const dispatch = useDispatch();
  const d = useAppSelector((state) => state.filter);

  const handleClick = (id: string, value: string, isChecked: boolean) => {
    // find all those items whose checked is true
    const checkedItems = d.filter.filter((item: Filter) => item.checked);

    // if the concerned item in checkedItems then remove it using removeFilter otherwise add it using addFilter
    const isItemPresent = checkedItems.find((item: Filter) => item.id === id && item.value === value);
    if (isItemPresent) {
      dispatch(removeFilter({ id, value, checked: false }));
    } else {
      dispatch(addFilter({ id, value, checked: true }));
    }
  };

  return (
    <div className="w-64 ml-16 mb-4">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="filter">
          <AccordionTrigger>Filter products</AccordionTrigger>
          <AccordionContent>
            {/* Section 1: Best Selling Rank */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="bestSellingRank_1">
                <AccordionTrigger>Best Selling Rank</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <div
                      className="flex items-center justify-between"
                      onClick={() => handleClick("bestSellingRank", "0 to 1,000", true)}
                    >
                      <Checkbox />
                      <p>0 to 1,000</p>
                    </div>
                    <div
                      className="flex items-center justify-between"
                      onClick={() => handleClick("bestSellingRank", "1,000 to 10,000", true)}
                    >
                      <Checkbox />
                      <p>1,000 to 10,000</p>
                    </div>
                    <div
                      className="flex items-center justify-between"
                      onClick={() => handleClick("bestSellingRank", "10,000 above", true)}
                    >
                      <Checkbox />
                      <p>10,000 above</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Section 2: Customer Review Count */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="customerReviewCount_1">
                <AccordionTrigger>Customer Review Count</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <div
                      className="flex items-center justify-between"
                      onClick={() => handleClick("customerReviewCount", "0 to 1,000", true)}
                    >
                      <Checkbox />
                      <p>0 to 1,000</p>
                    </div>
                    <div
                      className="flex items-center justify-between"
                      onClick={() => handleClick("customerReviewCount", "1,000 to 5,000", true)}
                    >
                      <Checkbox />
                      <p>1,000 to 5,000</p>
                    </div>
                    <div
                      className="flex items-center justify-between"
                      onClick={() => handleClick("customerReviewCount", "5,000 above", true)}
                    >
                      <Checkbox />
                      <p>5,000 above</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Section 3: Sale Price */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="salePrice_1">
                <AccordionTrigger>Sale Price</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <div
                      className="flex items-center justify-between"
                      onClick={() => handleClick("salePrice", "0 to $50", true)}
                    >
                      <Checkbox />
                      <p>0 to $50</p>
                    </div>
                    <div
                      className="flex items-center justify-between"
                      onClick={() => handleClick("salePrice", "$50 to $100", true)}
                    >
                      <Checkbox />
                      <p>$50 to $100</p>
                    </div>
                    <div
                      className="flex items-center justify-between"
                      onClick={() => handleClick("salePrice", "$100 above", true)}
                    >
                      <Checkbox />
                      <p>$100 above</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FilterComponent;

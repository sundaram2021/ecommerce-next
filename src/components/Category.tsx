"use client"

import * as React from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { ListOrdered } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover"
import Link from "next/link"

const frameworks = [
  {
    value: "security software",
    label: "computer security software",
  },
  {
    value: "Data Cables",
    label: "data cables",
  },
  {
    value: "Headphones",
    label: "headphones",
  },
  {
    value: "pc laptops",
    label: "pc laptops",
  },
  {
    value: "streaming media players",
    label: "streaming media players",
  },
  {
    value: "Usb Flash Drives",
    label: "usb flash drives",
  },
  {
    value: "Wireless Mice",
    label: "wireless mice",
  },
]

export function Category() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="flex items-center gap-2">
      <ListOrdered className="text-3xl" />
      <PopoverTrigger asChild className="">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between border-none text-lg"
        >
          Categories
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      </div>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandGroup>
            {frameworks.map((framework) => {
              console.log(framework.value)
              const categoryId = framework.label.toLowerCase();
              return (
              <Link key={framework.value} href={`/category/${categoryId}`}>
              <CommandItem
                
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                }}
              >
                {framework.label}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === framework.value ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
              </Link>
            )})}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

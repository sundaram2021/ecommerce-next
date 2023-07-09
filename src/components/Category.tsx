"use client"

import * as React from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { ListOrdered } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button"
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

const frameworks = [
  {
    value: "Phones cases",
    label: "cell phone cases and clips",
  },
  {
    value: "TVs",
    label: "flat-panel TVs",
  },
  {
    value: "Headphones",
    label: "headphones",
  },
  {
    value: "Ipad acessories",
    label: "ipad cases, covers and sleeves",
  },
  {
    value: "Printer ink",
    label: "printer ink",
  },
  {
    value: "laptop accessories",
    label: "laptop bags and cases",
  },
  {
    value: "Gaming consoles",
    label: "x-box 360 games",
  },
]

export function Category() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="flex items-center">
      <ListOrdered className="text-3xl" />
      <PopoverTrigger asChild className="">
        
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between border-none"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Catgories"}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      </div>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandGroup>
            {frameworks.map((framework) => (
              <CommandItem
                key={framework.value}
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
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

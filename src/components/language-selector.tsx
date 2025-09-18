
"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Globe } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { indianLanguages } from "@/lib/languages"

export function LanguageSelector() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("en")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="w-auto justify-between"
        >
          <Globe className="mr-2" />
          {indianLanguages.find((language) => language.code === value)?.name || "Language"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search language..." />
          <CommandEmpty>No language found.</CommandEmpty>
          <CommandGroup className="max-h-60 overflow-y-auto">
            {indianLanguages.map((language) => (
              <CommandItem
                key={language.code}
                value={language.name}
                onSelect={(currentValue) => {
                  setValue(language.code)
                  setOpen(false)
                  // Here you would typically trigger the language change logic
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === language.code ? "opacity-100" : "opacity-0"
                  )}
                />
                {language.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

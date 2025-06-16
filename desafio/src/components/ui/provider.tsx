"use client"

import { ChakraProvider } from "@chakra-ui/react"
import type { ThemeProviderProps } from "next-themes" 
import {
  ColorModeProvider,
} from "./color-mode"

export function Provider(props: ThemeProviderProps) { 
  return (
    <ChakraProvider>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}

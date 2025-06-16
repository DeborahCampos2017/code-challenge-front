"use client";

import { ChakraProvider, theme } from '@chakra-ui/react';
import createCache from '@emotion/cache';
import { CacheProvider } from "@emotion/react";

const emotionCache = createCache({ key: 'css', prepend: true });

export function ChakraProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CacheProvider value={emotionCache}>
      <ChakraProvider theme={theme}>
        {children}
      </ChakraProvider>
    </CacheProvider>
  );
}

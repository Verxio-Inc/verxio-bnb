"use client";
import '@rainbow-me/rainbowkit/styles.css';
import {
  RainbowKitProvider,
  getDefaultConfig, lightTheme,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { ThirdwebProvider } from "@thirdweb-dev/react";

import {
  avalancheFuji
} from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const config = getDefaultConfig({
  appName: 'Verxio | Decentralizing the future of work!',
  projectId: '274de4271228fdd69013c56274f0e688',
  chains: [avalancheFuji],
  ssr: true
});

const queryClient = new QueryClient();

const WagmiProviders = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
         <RainbowKitProvider
          theme={lightTheme({
            accentColor: "#1570ef",
            accentColorForeground: "white",
            borderRadius: "small",
            fontStack: "system",
            overlayBlur: "small",
          })}
        >
          <ThirdwebProvider 
          clientId="f5888353ab056968602a49dda7537ef3" 
          activeChain="avalanche-fuji"
          >
          {children}
          </ThirdwebProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default WagmiProviders;
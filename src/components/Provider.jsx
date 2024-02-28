"use client";
import '@rainbow-me/rainbowkit/styles.css';
import React, { useMemo } from 'react';
import {
  RainbowKitProvider,
  lightTheme,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { avalancheFuji } from 'wagmi/chains';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  rainbowWallet, walletConnectWallet, coinbaseWallet,
  injectedWallet, ledgerWallet, metaMaskWallet, omniWallet, trustWallet, 
} from '@rainbow-me/rainbowkit/wallets';
import { publicProvider } from 'wagmi/providers/public';
import { ParticleNetwork } from '@particle-network/auth';
import { particleWallet } from '@particle-network/rainbowkit-ext';

  const particle = new ParticleNetwork({
    projectId: '1b0f4491-a389-49bf-a531-351b2963a777',
    clientKey: '1b0f4491-a389-49bf-a531-351b2963a777',
    appId: 'f5df37dc-2f44-4be8-943f-9d84b11e2a86',
    chainName: 'avalanche',
    chainId: 43113,
    wallet: { displayWalletEntry: true },
  })

  const { chains, publicClient, webSocketPublicClient } = configureChains(
    [avalancheFuji],
    [publicProvider()]
  );

  const commonOptions = { chains, projectId: '274de4271228fdd69013c56274f0e688'};
  const popularWallets = {
    groupName: 'Recommended',
    wallets: [
      particleWallet({ chains, authType: 'google' }),
      particleWallet({ chains, authType: 'facebook' }),
      particleWallet({ chains, authType: 'apple' }),
      particleWallet({ chains }),
      injectedWallet(commonOptions),
      rainbowWallet(commonOptions),
      coinbaseWallet({ appName: 'Verxio | Decentralizing the future of work!', ...commonOptions }),
      metaMaskWallet(commonOptions),
      walletConnectWallet(commonOptions),
    ],
  };
  
  const connectors = connectorsForWallets(
    [
      popularWallets,
      {
        groupName: 'Others',
        wallets: [
          walletConnectWallet, coinbaseWallet, 
          ledgerWallet, omniWallet, trustWallet
        ],
      },
    ],
  );

  const wagmiClient = createConfig({
    autoConnect: false,
    connectors,
    publicClient,
    webSocketPublicClient,
  });
const WagmiProviders = ({ children }) => {
  return (
    <WagmiConfig config={wagmiClient}>
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
        </WagmiConfig>
  );
};

export default WagmiProviders;

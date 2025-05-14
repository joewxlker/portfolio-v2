"use client";

import { config } from "@/lib/wagmi";
import { FC, ReactNode } from "react";
import { State, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient();

export const Ethereum: FC<{ children: ReactNode, initialState: State | undefined }> = ({ children, initialState }) => (
    <WagmiProvider config={config} initialState={initialState}>
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    </WagmiProvider>
);
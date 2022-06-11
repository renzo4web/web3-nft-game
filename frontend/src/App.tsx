import React, { useState } from "react";
import Home from "./components/Home";
import { publicProvider } from "wagmi/providers/public";
import { InjectedConnector } from "wagmi/connectors/injected";
import {
  configureChains,
  createClient,
  defaultChains,
  WagmiConfig,
} from "wagmi";
import { ChakraProvider } from "@chakra-ui/react";

const { chains, provider } = configureChains(defaultChains, [publicProvider()]);

const client = createClient({
  autoConnect: true,
  connectors: [new InjectedConnector({ chains })],
  provider,
});

function App() {
  return (
    <div>
      <WagmiConfig client={client}>
        <ChakraProvider>
          <Home />
        </ChakraProvider>
      </WagmiConfig>
    </div>
  );
}

export default App;

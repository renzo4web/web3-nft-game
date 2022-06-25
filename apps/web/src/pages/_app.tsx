import "../styles/global.css";
import { WagmiProvider } from "ui";
import { ToastContainer } from "react-toastify";
import type { AppProps } from "next/app";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider>
      <Component {...pageProps} />
      <ToastContainer />
    </WagmiProvider>
  );
}

export default MyApp;

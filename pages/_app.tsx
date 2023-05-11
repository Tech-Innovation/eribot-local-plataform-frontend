import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import { noNavbarPaths } from "@utils/constants";
import Navbar from "@components/Navbar";
import { store } from "../store";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();
  const showHeader = noNavbarPaths.includes(router.pathname) ? false : true;

  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        {showHeader && <Navbar />}
        <Component {...pageProps} />
      </SessionProvider>
    </Provider>
  );
}

export default MyApp;

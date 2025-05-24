import { StateProvider } from "@/context/StateContext";
import "@/styles/globals.css";
import Head from "next/head";
import reducer from "@/context/StateReducers";
import { initialState } from "@/context/StateReducers";

export default function App({ Component, pageProps }) {
  return (
    <StateProvider initialState={initialState} reducer ={reducer}>
      <Head>
        <title>WizzApp</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" />
      </Head>
<Component {...pageProps} />
    </StateProvider>
  )
  
  
}

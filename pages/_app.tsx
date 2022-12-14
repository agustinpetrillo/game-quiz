import Head from "next/head";
import "../styles/globals.css";
import { UtilsProvider } from "../utils/Utils";
import Layout from "../layout/layout";
import { ThemeProvider } from "next-themes";
import { AppProps } from "next/app";
import { StrictMode } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StrictMode>
      <UtilsProvider>
        <ThemeProvider attribute="class">
          <Layout>
            <Head>
              <title>Preguntas y respuestas</title>
              <meta name="description" content="Generated by create next app" />
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </UtilsProvider>
    </StrictMode>
  );
}

export default MyApp;

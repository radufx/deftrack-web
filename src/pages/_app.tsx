import { Raleway } from 'next/font/google';
import type { AppProps } from 'next/app';
import { NextPage } from 'next';

import '@/styles/globals.scss';
import '@fortawesome/fontawesome-svg-core/styles.css';

import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NextNProgress from 'nextjs-progressbar';
import { config } from '@fortawesome/fontawesome-svg-core';
import { Provider } from 'jotai';
import { useState } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SessionProvider } from 'next-auth/react';

config.autoAddCss = false;

const raleway = Raleway({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-raleway',
});

function App({ Component, pageProps }: AppProps) {
  const [client] = useState(() => new QueryClient());
  const getLayout = (Component as NextPage & { getLayout: (page: JSX.Element) => JSX.Element }).getLayout ?? ((page) => page);

  return (
    <SessionProvider session={pageProps.session} refetchInterval={15 * 60}>
      <QueryClientProvider client={client}>
        <Hydrate state={pageProps.dehydratedState}>
          <Provider>
            <style jsx global>{`
              html {
                font-family: ${raleway.style.fontFamily};
              }
            `}</style>
            <NextNProgress options={{ showSpinner: false }} color="#91bcee" startPosition={0.3} stopDelayMs={0} height={3} />
            <ToastContainer closeButton={false} pauseOnFocusLoss={false} />
            <main className={`${raleway.variable} font-sans`}>{getLayout(<Component {...pageProps} />)}</main>
          </Provider>
        </Hydrate>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default App;

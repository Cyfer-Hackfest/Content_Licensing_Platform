import '../styles/globals.css';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import React from 'react';
import { InkConfig } from 'useink';
import {
  Phala,
  PhalaTestnet,
  Aleph,
  AlephTestnet,
  ShibuyaTestnet
} from 'useink/chains';
import { NotificationsProvider } from 'useink/notifications';
import { Header } from '../components/layout';
import { Provider } from 'react-redux';
import store from '../context/store';

const UseInkProvider: React.ComponentType<React.PropsWithChildren<InkConfig>> =
  dynamic(() => import('useink').then(({ UseInkProvider }) => UseInkProvider), {
    ssr: false,
  });

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <UseInkProvider
        config={{
          dappName: 'Usage License',
          chains: [
            ShibuyaTestnet,
            AlephTestnet
          ],
          caller: {
            default: '5H6535FAtkYeBQbTGsxaDU9U8PtjsWGziai2Fx8an1rvTHGT',
          },
        }}
      >
        <NotificationsProvider>
          <Header />
          <Component {...pageProps} />
        </NotificationsProvider>
      </UseInkProvider>    
    </Provider>
  );
}

export default App;

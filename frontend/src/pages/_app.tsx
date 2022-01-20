import type { ReactElement, ReactNode } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'
import './_app.css'

import '../styles/home.scss'
import '../styles/printables.scss'
import './globals.scss'
import '../styles/channel.scss'
import '../styles/awards.scss'
import '../styles/about.scss'
import '../styles/contact.scss'
import '../styles/login.scss'
import '../styles/register.scss'
import '../styles/cart.scss'
import '../styles/product.scss'
import '../styles/checkout.scss'
import '../styles/password.scss'
import '../styles/logout.scss'
import '../styles/admin.scss'
import '../styles/books.scss'
import '../styles/artprints.scss'
import '../styles/application.scss'
import '../styles/checkoutnew.scss'
import '../styles/account.scss'
import { AppProps } from 'next/dist/next-server/lib/router/router'
import { NextPage } from 'next'
import store from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore, } from 'redux-persist'
import { Provider } from 'react-redux'
import Router from 'next/router';

let persistor = persistStore(store);

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}


export default function App({ Component, pageProps }: AppPropsWithLayout) {

  const getLayout = Component.getLayout ?? ((page) => page)
  
  return getLayout(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>   
    )

}


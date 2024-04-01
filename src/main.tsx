import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import store from './services/store.js';
import { Provider } from 'react-redux'
import { ApolloProvider } from '@apollo/client';
import { client } from './services/apollo.ts';
import BuyTicket from './pages/buyTicket.tsx';
import Home from './pages/home.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: '/buyTicket/:movie',
    element: <BuyTicket/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
)

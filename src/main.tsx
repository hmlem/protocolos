import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './pages/Home'

import './index.css';
import { ProtocoloX } from './pages/ProtocoloX';


const router = createBrowserRouter([ 
  {path:'/', element: <Home />},
  {path:'/protocoloX', element: <ProtocoloX />}
]) 

/* Let's KIS */
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />,
)
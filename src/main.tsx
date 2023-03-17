import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './pages/Home'

import './index.css';
import { ProtocoloX } from './pages/ProtocoloX';
import { ExemplosBlocos } from './pages/ExemplosBlocos';
import { ExemploProtocolo } from './pages/ExemploProtocolo';
import { TiposBlocos } from './pages/TiposBlocos';


const router = createBrowserRouter([ 
  {path:'/', element: <Home />},
  {path:'/protocoloX', element: <ProtocoloX />},
  {path:'/ExemplosBlocos', element: <ExemplosBlocos />},
  {path:'/ExemploProtocolo', element: <ExemploProtocolo />},
  {path:'/TiposBlocos', element: <TiposBlocos />}
]) 

/* Let's KIS */
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />,
)
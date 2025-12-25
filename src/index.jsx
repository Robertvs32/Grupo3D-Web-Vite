import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Relatorios from './routes/Relatorios/Relatorios';
import Relatorio from './routes/Relatorio/Relatorio';
import Placas from './routes/Placas/Placas';
import RelatorioContratante from './routes/relatoriospdf/RelatorioContratante/RelatorioContratante';
import Atribuicoes from './routes/Atribuicoes/Atribuicoes';
import Setores from './routes/Setores/Setores';
import Colecoes from './routes/Colecoes/Colecoes';
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Relatorios/>
      },
      {
        path: "relatorio/:id",
        element: <Relatorio/>
      },
      {
        path: "placas",
        element: <Placas/>
      },
      {
        path: "atribuicoes",
        element: <Atribuicoes/>
      },
      {
        path: "setores",
        element: <Setores/>
      },
      {
        path: "colecoes",
        element: <Colecoes/>
      },
      {
        path: "relatoriocontratante",
        element: <RelatorioContratante/>
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

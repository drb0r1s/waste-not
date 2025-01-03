import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import "./style/main.css";
import { routes } from './data/routes';
import { Storage } from './functions/Storage';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createHashRouter(routes);

Storage.initialization();

root.render(<RouterProvider router={router} />);
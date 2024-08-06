import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './App.css';

import App from './App';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import ErrorPage from './pages/errorPage';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/About',
                element: <About />
            },
            {
                path: '/Login',
                element: <Login />
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
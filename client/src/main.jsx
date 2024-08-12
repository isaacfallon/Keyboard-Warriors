import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './App.css';

import App from './App';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/LoginAndSignUp';
import Profile from './pages/Profile'
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
            },
            {
                path: '/me',
                element: <Profile />
            },
            {
                path: '/profile/:username',
                element: <Profile />
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
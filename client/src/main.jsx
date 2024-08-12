import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './App.css';

import App from './App';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Login from './pages/LoginAndSignUp.jsx';
import Profile from './pages/Profile.jsx'
import ErrorPage from './pages/errorPage.jsx';

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
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom/dist'

import './App.css';

import App from './App.jsx'
import Home from './pages/Home';
import Login from './pages/LoginAndSignUp.jsx';
import Profile from './pages/Profile';
import About from './pages/About.jsx'
import Error from './pages/Error';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    error: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/About',
        element: <About />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/me',
        element: <Profile />,
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)

import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom/dist'

import './index.css'

import App from './App.jsx';
import Home from './pages/Home.jsx';
import Error from './pages/Error.jsx';
import About from './pages/About.jsx';
import Login from './pages/LoginAndSignUp.jsx'
import Profile from './pages/Profile.jsx';
import MathsGamePage from './pages/MathsGamePage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    error: <Error />,
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
        path: '/login',
        element: <Login />
      },
    {
        path: '/me',
        element: <Profile />,
      },
      {
        path: '/maths',
        element: <MathsGamePage />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)

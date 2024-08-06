import { Link, useLocation } from 'react-router-dom';

import Auth from '../utils/auth';

export default function Header() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const currentPage = useLocation().pathname;

  return (
    <header>
      <h1><Link to="/" className="homeNavLink">Keyboard Warriors</Link></h1>
        <li><Link to="/About" className="navLink">About</Link></li>
      <div>
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/me">
                {Auth.getProfile().data.username}'s profile
              </Link>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              {/* <Link className="btn btn-lg btn-info m-2" to="/login">
                Login
              </Link> */}
              <li><Link to="/Login" className="navLink">Login</Link></li>
            </>
          )}
        </div>
    </header>
  )
}

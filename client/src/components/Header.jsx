import { Link } from 'react-router-dom';

import Auth from '../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header>
      <h1><Link to="/" className="homeNavLink">Keyboard Warriors</Link></h1>
      <ul>
        <li><Link to="/About" className="navLink">About</Link></li>
        {Auth.loggedIn() ? (
          <>
            <li >
              <Link to="/me" className="navLink">
                {Auth.getProfile().authenticatedPerson.username} profile
              </Link>
            </li>
            <li><p onClick={logout} className="navLink">Logout</p></li>
          </>
        ) : (
          <>
            <li><Link to="/Login" className="navLink">Login/Sign Up</Link></li>
          </>
        )}
      </ul>

    </header>
  );
};

export default Header;

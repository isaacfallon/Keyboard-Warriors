import { Link } from 'react-router-dom';

import Auth from '../utils/auth';

export default function Header() {

    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };

    return (
        <header className="text-center mt-16">
            <h1 className="text-7xl font-bold"><Link to="/" className="hover:text-sky-700 dark:hover:text-sky-600">Keyboard Warriors</Link></h1>

            <ul className="flex justify-center flex-row mt-6 text-lg">
                <li className="px-12"><Link to="/About" className="hover:text-sky-700 dark:hover:text-sky-600">About</Link></li>
                {Auth.loggedIn() ? (
                    <>
                        <li className="px-12">
                            <Link to="/me" className="hover:text-sky-700 dark:hover:text-sky-600">
                                My profile
                            </Link>
                        </li>
                        <li className="px-12"><p onClick={logout} className="hover:text-sky-700 hover:cursor-pointer dark:hover:text-sky-600">Logout</p></li>
                    </>
                ) : (
                    <>
                        <li className="px-12"><Link to="/Login" className="hover:text-sky-700 dark:hover:text-sky-600">Login/Sign Up</Link></li>
                    </>
                )}

            </ul>

        </header>
    )
}
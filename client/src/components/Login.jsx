import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth.js';

export default function Login() {

  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };
    return (
        <div className="mx-8 p-8">
            <h3 className="text-2xl mb-2 text-center">Login</h3>
            <div>
              {data ? (
                <p>
                  Success! {' '}
                  <Link to="/"></Link>
                </p>
              ) : (
                <form onSubmit={handleFormSubmit}>
                  <input
                    className="text-2xl bg-slate-300 dark:bg-gray-900 rounded-lg my-2 px-2"
                    placeholder="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                  />
                  <div></div>
                  <input
                    className="text-2xl bg-slate-300 dark:bg-gray-900 rounded-lg my-2 px-2"
                    placeholder="password"
                    name="password"
                    type="password"
                    value={formState.password}
                    onChange={handleChange}
                  />
                  <div></div>
                  <button
                    className="px-12 py-1 bg-sky-500 hover:bg-sky-700 text-white font-bold px-4 rounded w-full"
                    style={{ cursor: 'pointer' }}
                    type="submit"
                  >
                    Submit
                  </button>
                </form>
              )}
  
              {error && (
                <div className="">
                  {error.message}
                </div>
              )}
            </div>
        </div>
    );
}
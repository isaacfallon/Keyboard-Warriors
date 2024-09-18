import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations.js';

import Auth from '../utils/auth.js';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
      <div className="mx-8 p-8">
          <h3 className="text-2xl mb-2 text-center">Sign Up</h3>
          <div>
            {data ? (
              <p>
                Success!{' '}
                <Link to="/"></Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input
                  className="text-2xl bg-slate-300 dark:bg-gray-900 rounded-lg my-2 px-2"
                  placeholder="username"
                  name="username"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                />
                <div></div>
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
};

export default Signup;

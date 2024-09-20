// Import Apollo Router dependencies
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';

import { useState, useEffect } from 'react';

// Import custom components
import Header from './components/Header';
import Footer from './components/Footer';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {

  const [checked, setChecked] = useState(false);

  const root = window.document.documentElement;
  const lightTheme = "light";
  const darkTheme = "dark";
  let theme;

  if (localStorage) {
    theme = localStorage.getItem("theme")
  }
  if (theme === lightTheme || theme === darkTheme) {
    root.classList.add(theme);
  } else {
    root.classList.add(lightTheme);

  }

  const handleChange = () => {
    if (theme === darkTheme) {
      root.classList.replace(darkTheme, lightTheme);
      localStorage.setItem("theme", "light");
      theme = lightTheme;
      setChecked(false);
    } else {
      root.classList.replace(lightTheme, darkTheme);
      localStorage.setItem("theme", 'dark');
      setChecked(true);
    }
  };

  return (
    <main className="flex flex-col min-h-screen bg-gray-200 dark:bg-zinc-600 text-zinc-600 dark:text-gray-100 bg-transition-all">
      <ApolloProvider client={client}>
      <button onClick={handleChange} className="absolute top-2 right-2 px-12 bg-zinc-600 dark:bg-gray-200 text-gray-100 dark:text-zinc-600 font-bold px-4 rounded"
        //  style={
        //   !checked
        //     ? {backgroundColor: '#52525b', color: '#f3f4f6'}
        //     : {backgroundColor: '#f3f4f6', color: '#52525b'}
        // }
        >Toggle Theme</button>

       

      <Header />
        <Outlet />
        <Footer />

      </ApolloProvider>
    </main>
  );
}

export default App;

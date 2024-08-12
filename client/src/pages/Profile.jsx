import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {useLocation} from 'react-router-dom';

import { useState, useEffect, useRef } from 'react';

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {

  const location = useLocation();

  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  if (
    Auth.loggedIn() && Auth.getProfile().data.username === userParam
  ) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  let scores = [];
  scores.push(location.state)
  // alert(scores)

    return (
      <div>
        <div>
          <h2>
            Viewing {Auth.getProfile().data.username}'s profile.
          </h2>
        </div>
        <div>{scores}</div>
      </div>
    )
};

export default Profile;

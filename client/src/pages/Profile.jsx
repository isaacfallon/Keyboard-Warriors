import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { useState } from 'react';

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {

  const [toggleStats, setToggleStats] = useState(false);

  function showAllStats() {
    setToggleStats((show) => !show);
  }

  let allStatsClass = "mt-8 hidden";

  if (toggleStats) {
    allStatsClass = "mt-8"
  }

  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};


  if (
    Auth.loggedIn() && Auth.getProfile().authenticatedPerson.username === userParam
  ) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4 className="text-2xl text-center mt-8">
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }


  let reversedData = user.scores.slice().reverse();
  let lastFiveData = reversedData.slice(0, 5);

  return (
    <main>
      <div className="mx-auto w-2/4 p-8 text-lg">
        <h2 className="text-center text-3xl font-semibold">
          Profile for: {Auth.getProfile().authenticatedPerson.username}
        </h2>

        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-8">Most recent five game results:</h3>
          <div className="">
            {/* {showTitle && <h3>{title}</h3>} */}
            {lastFiveData &&
              lastFiveData.map((score) => (
                <div key={score._id} className="rounded overflow-hidden shadow-md p-2 m-4">
                  <div className="flex justify-around">
                    <p className="font-bold text-xl mr-2 inline w-2/5">{score.createdAt}</p>
                    <span className="inline-block bg-sky-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Words: {score.wordCount}</span>
                    <span className="inline-block bg-sky-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Letters: {score.letterCount}</span>
                    <span className="inline-block bg-blue-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">WMP: {(score.letterCount / 5) * 2}</span>
                  </div>
                </div>
              ))}
          </div>
        </div >

        <button onClick={showAllStats} className="px-12 bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded">Toggle all previous results</button>

        <div className={allStatsClass}>
          <h3 className="text-2xl font-semibold mb-8">All previous results:</h3>
          <div className="">
            {/* {showTitle && <h3>{title}</h3>} */}
            {reversedData &&
              reversedData.map((score) => (
                <div key={score._id} className="rounded overflow-hidden shadow-md p-2 m-4">
                  <div className="flex justify-around">
                    <p className="font-bold text-xl mr-2 inline w-2/5">{score.createdAt}</p>
                    <span className="inline-block bg-sky-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Words: {score.wordCount}</span>
                    <span className="inline-block bg-sky-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Letters: {score.letterCount}</span>
                    <span className="inline-block bg-blue-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">WMP: {(score.letterCount / 5) * 2}</span>
                  </div>
                </div>
              ))}
          </div>
        </div >

        {!userParam && (
          <div
            className="col-12 col-md-10 mb-3 p-3"
          >
          </div>
        )}
      </div>
    </main>
  );

};

export default Profile;

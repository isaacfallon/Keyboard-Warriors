import { useQuery } from '@apollo/client';

import Game from '../components/Game';

import { QUERY_SCORES } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_SCORES);
  const thoughts = data?.thoughts || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          
        >
          <Game />
        </div>
      </div>
    </main>
  );
};

export default Home;

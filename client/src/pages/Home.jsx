import GameArea from '../components/GameArea';
import { Link } from 'react-router-dom';

const Home = () => {

  return (
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 mb-3 p-3">
        <Link to="/maths"><button className="absolute top-2 right-48 px-12 bg-zinc-600 dark:bg-gray-200 text-gray-100 dark:text-zinc-600 font-bold px-4 rounded">Switch to maths</button></Link>

          <GameArea />
        </div>
      </div>
  );
};

export default Home;

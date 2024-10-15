import { Link } from 'react-router-dom';

import MathsGameArea from '../components/MathsGameArea';

const Home = () => {

  return (
    <>
      <Link to="/"><button className="absolute top-2 right-48 px-12 bg-zinc-600 dark:bg-gray-200 text-gray-100 dark:text-zinc-600 font-bold px-4 rounded">Switch to typing</button></Link>
      <div className="flex-row justify-center">

        <div className="col-12 col-md-10 mb-3 p-3">
          <MathsGameArea />
        </div>
      </div>
    </>
  );
};

export default Home;

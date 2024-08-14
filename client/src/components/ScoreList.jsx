import { Link } from 'react-router-dom';

const ScoreList = ({
  scores,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!scores.length) {
    return <h3>No scores saved yet!</h3>;
  }

  const reversedData = scores.slice().reverse();
  

  return (
    <div>
      {/* <h3>Your high scores:</h3> */}

      <h3>Previous scores:</h3>
      <div className="scoreCardContainer">
        {showTitle && <h3>{title}</h3>}
        {reversedData &&
          reversedData.map((score) => (
            <>
              <div key={score._id} className="scoreCard">
                {/* {score.scoreAuthor} */}
                <p>{score.createdAt}</p>
                <p>Words: {score.wordCount} | Letters: {score.letterCount}</p>
                <p></p>
                <p> WMP: {Math.round((score.letterCount / (score.letterCount / (score.wordCount * 2))) * 100) / 100}</p>
              </div>
              <br />
            </>
          ))}
      </div>
    </div>
  );
};

export default ScoreList;
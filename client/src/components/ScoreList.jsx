import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ScoreList = ({
  scores,
  title,
  showTitle = true,
  showUsername = true,
}) => {

  (() => {
    if (window.localStorage) {
      if (!localStorage.getItem('reload')) {
        localStorage['reload'] = true;
        window.location.reload();
      } else {
        localStorage.removeItem('reload');
      }
    }
  })();

  if (!scores.length) {
    return <h3>No scores saved yet!</h3>;
  }




  const reversedData = scores.slice().reverse();




  return (
    <div>
      <h3>Previous scores:</h3>
      <div className="scoreCardContainer">
        {showTitle && <h3>{title}</h3>}
        {reversedData &&
          reversedData.map((score) => (
            <>
              <div key={score._id} className="scoreCard">
                {/* {score.scoreAuthor} */}
                <p className="underLine">{score.createdAt}</p>
                <p>Words: <span className="boldStat">{score.wordCount}</span> | Letters: <span className="boldStat">{score.letterCount}</span></p>
                <p className="WMP">WMP: <span className="boldStat">{(score.letterCount / 5) * 2}</span></p>
              </div >
              <br />
            </>
          ))}
      </div>
    </div >
  );
};

export default ScoreList;
import { useState, useEffect } from 'react';

import { useMutation } from '@apollo/client';

import { ADD_SCORE } from '../utils/mutations';
import { QUERY_SCORES, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

import { Link, useNavigate } from 'react-router-dom';

import words from 'an-array-of-english-words'

import Modal from 'react-modal';

const Game = () => {
  Modal.setAppElement('#root');
  const [showModal, setShowModal] = useState(false);

  const [addScore, { error }] = useMutation
    (ADD_SCORE, {
      refetchQueries: [
        QUERY_SCORES,
        'getScores',
        QUERY_ME,
        'me'
      ]
    });

  const addScoreToProfile = async () => {
    try {
      const { data } = await addScore({
        variables: {
          wordCount: wordCount,
          letterCount: letterCount,
        },
      });

    } catch (err) {
      console.error(err);
    }
  };

  const [timeLeft, setTimeLeft] = useState(null);

  window.onload = function () {
    var a = [];
    // a.push(JSON.parse(localStorage.getItem('session')));
    localStorage.setItem('session', JSON.stringify(a));
  };


  useEffect(() => {
    if (timeLeft === 0) {
      setShowModal(true);
      // alert(`Words per minute: ${((letterCount / 5) * 2).toFixed(2)}`);
      setTimeLeft(null);
      SaveDataToLocalStorage(wordCount);
      addScoreToProfile();
      // refreshPage();
    }

    if (!timeLeft) return;

    const intervalId = setInterval(() => {

      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);

  }, [timeLeft]);

  function SaveDataToLocalStorage(wordCount) {
    var a = [];
    a = JSON.parse(localStorage.getItem('session')) || [];
    a.push(wordCount);
    localStorage.setItem('session', JSON.stringify(a));
  }

  const [wordText, setWordText] = useState('');

  const [letterCount, setLetterCount] = useState(0);

  const handleChanger = (event) => {
    const { name, value } = event.target;
    const element = document.getElementById('word').innerHTML;

    const inputText = document.getElementById('input');

    if (element.includes(value) && element.charAt(0) === value.charAt(0)) {
      inputText.style.color = "green";
      setLetterCount(letterCount + 1);
    } else {
      inputText.style.color = "red";
    }

    if (name === 'wordText' && value.length <= 280) {

      setWordText(value);

      if (value === element) {
        setWordCount(wordCount + 1);
        setWordText('');
        handleWordChange();
      }
    }
  };

  const [wordCount, setWordCount] = useState(0);

  const handleWordChange = () => {
    document.getElementById('word').innerHTML = words[(Math.floor(Math.random() * words.length))];
  }

  function removeModalAndRefresh() {
    setShowModal(false);
    window.location.reload();
  }



  function initGame() {
    document.getElementById('timer').innerHTML = "";
    handleWordChange();

    setTimeLeft(5);

    setWordCount(0);
    setLetterCount(0);

  }

  return (
    <>
      <div className="smallScreenText">
        <h3>Keyboard Warriors has been designed to be played on bigger screens with a keyboard. Sorry for any issues caused!</h3>
      </div>
      <div className="gameArea">
        <p id="word" className="randomWord">_________________</p>

        <form id="wordForm" onSubmit={e => { e.preventDefault(); }}>
          <input
            type="text"
            id="input"
            className="gameInput"
            placeholder="Click here to start a game"
            value={wordText}
            onChange={handleChanger}
            name="wordText"
            onClick={initGame}
          >
          </input>
        </form>
        <p id="timer" className="gameTimer">30{timeLeft}</p>

        <div className="gameStats">
          <p>Total letters <strong>{letterCount} </strong></p>
          <p>Total words <strong>{wordCount}</strong></p>

          <p>Average word length: <strong>{(letterCount / wordCount).toFixed(2)}</strong></p>
          <p>Words per minute: <strong>{((letterCount / 5) * 2).toFixed(2)}</strong></p>
        </div>

        <div className="gameBottomContainer">
          <div className="loginText">

            {Auth.loggedIn() ? (
              <>
                {/* <form
className="flex-row justify-center justify-space-between-md align-center"
onSubmit={handleFormSubmit}
>
<div className="col-12 col-lg-9" style={{ display: 'none' }}>
<textarea
// name="thoughtText"
// placeholder=""
// value={thoughtText}
className="form-input w-100"
style={{ lineHeight: '1.5', resize: 'vertical' }}
onChange={handleChange}
></textarea>
</div>

<div className="col-12 col-lg-3">
<button className="btn btn-primary btn-block py-3" type="submit">
Add Score to profile
</button>
</div>
{error && (
<div className="col-12 my-3 bg-danger text-white p-3">
{error.message}
</div>
)}
</form> */}
              </>
            ) : (
              <p>
                Want to save your scores and track your progress? {' '}
                <Link to="/login">Login or signup!</Link>
              </p>
            )}
          </div>
          <div className="resetButton">
            <button type="button" onClick={removeModalAndRefresh}> <span>Reset game</span> </button>
          </div>
        </div>
      </div>
      <Modal
        className="Modal"
        overlayClassName="Overlay"
        isOpen={showModal}>
        <button onClick={() => removeModalAndRefresh()}> Close Modal</button>
        <h3>Well done! Here are your results:</h3>

        <p>Total letters <strong>{letterCount} </strong></p>
        <p>Total words <strong>{wordCount}</strong></p>

        <p>Average word length: <strong>{(letterCount / wordCount).toFixed(2)}</strong></p>
        <p>Words per minute: <strong>{((letterCount / 5) * 2).toFixed(2)}</strong></p>

        {Auth.loggedIn() ? (
              <>
              <p>
                {' '}
                <Link to="/me">Visit your profile to see your stats! </Link>
              </p>
              </>
            ) : (
              <p>
                Want to save your scores and track your progress? {' '}
                <Link to="/login">Login or signup!</Link>
              </p>
            )}

      </Modal>
    </>
  );
};

export default Game;

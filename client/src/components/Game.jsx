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

  const [addScore, { error }] = useMutation(
    ADD_SCORE, {
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
          wordCount,
          letterCount,
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
      // alert(`Words per minute: ${((letterCount / 5) * 2).toFixed(2)}`);
      setTimeLeft(null);
      SaveDataToLocalStorage(wordCount);
      addScoreToProfile();
      setShowModal(true);
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

    window.location.reload();
    setShowModal(false);
  }



  function initGame() {
    document.getElementById('timer').innerHTML = "";
    handleWordChange();

    setTimeLeft(30);

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
        <button onClick={() => removeModalAndRefresh()}>Close</button>
        <div className="modalContent">
          <h3>Well done! Here are your results:</h3>

          <p>Total letters: <strong>{letterCount} </strong></p>
          <p>Total words: <strong>{wordCount}</strong></p>

          <p>Average word length: <strong>{(letterCount / wordCount).toFixed(2)}</strong></p>
          <p>Words per minute: <strong>{((letterCount / 5) * 2).toFixed(2)}</strong></p>
          <br />
          {Auth.loggedIn() ? (
            <>
              <p>
                {' '}
                <Link to="/me" className="linkText">Visit your profile to see your stats! </Link>
              </p>
            </>
          ) : (
            <p>
              Want to save your scores and track your progress? {' '}
              <Link to="/login" className="linkText">Login or signup!</Link>
            </p>
          )}
        </div>
      </Modal>
    </>
  );
};

export default Game;

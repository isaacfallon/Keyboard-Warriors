import { useState, useEffect } from 'react';

import { useMutation } from '@apollo/client';

import { ADD_SCORE } from '../utils/mutations';
import { QUERY_SCORES, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

import { Link, useNavigate } from 'react-router-dom';

import words from 'an-array-of-english-words'

const Game = () => {

  const [characterCount, setCharacterCount] = useState(0);

  const [addScore, { error }] = useMutation
    (ADD_SCORE, {
      refetchQueries: [
        QUERY_SCORES,
        'getScores',
        QUERY_ME,
        'me'
      ]
    });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addScore({
        variables: {
          thoughtText: wordCount,
          // thoughtAuthor: Auth.getProfile().getAuthenticatedPerson.username
        },
      });

      // setThoughtText('');
    } catch (err) {
      console.error(err);
    }
  };

  const addScoreToProfile = async () => {
    event.preventDefault();
    try {
      const { data } = await addScore({
        variables: {
          thoughtText: wordCount,
          // thoughtAuthor: Auth.getProfile().getAuthenticatedPerson.username
        },
      });

      // setThoughtText('');
    } catch (err) {
      console.error(err);
    }
  };


  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'thoughtText' && value.length <= 280) {
      // setThoughtText(value);
      setCharacterCount(value.length);
    }
  };

  const [timeLeft, setTimeLeft] = useState(null);


  window.onload = function () {
    var a = [];
    // a.push(JSON.parse(localStorage.getItem('session')));
    localStorage.setItem('session', JSON.stringify(a));
  };


  useEffect(() => {
    // setWordCount(1);
    if (timeLeft === 0) {
      alert("TIME'S UP");
      setTimeLeft(null);
      SaveDataToLocalStorage(wordCount);
      addScoreToProfile();
      // setWordScore(wordScore.push(wordCount));
      // console.log(wordScore)
    }

    // exit early when we reach 0
    if (!timeLeft) return;

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {

      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);

  function SaveDataToLocalStorage(wordCount) {
    var a = [];
    // Parse the serialized data back into an aray of objects
    a = JSON.parse(localStorage.getItem('session')) || [];
    // Push the new data (whether it be an object or anything else) onto the array
    a.push(wordCount);
    // Alert the array value
    alert(a);  // Should be something like [Object array]
    // Re-serialize the array back into a string and store it in localStorage
    localStorage.setItem('session', JSON.stringify(a));
  }

  const [wordText, setWordText] = useState('');

  const [letterCount, setLetterCount] = useState(1);

  const handleChanger = (event) => {
    const { name, value } = event.target;
    const element = document.getElementById('word').innerHTML;

    const inputText = document.getElementById('input');

    if (element.includes(value)) {
      inputText.style.color = "green";
    } else {
      inputText.style.color = "red";
    }
  
    let cutValue0 = value.slice(0, 5);
    let cutElement0 = element.slice(0, 5);

    // if (cutValue0 == cutElement0) {
    //   inputText.style.color = "green";
    // } else {
    //   inputText.style.color = "red";
    // }

    // let cutValue1 = value.slice(1, 2);
    // let cutElement1 = element.slice(1, 2);

    // if (cutValue1 == cutElement1) {
    //   inputText.style.color = "green";
    // } else {
    //   inputText.style.color = "red";
    // }

    if (name === 'wordText' && value.length <= 280) {

      setWordText(value);

      if (value === element) {
        setWordCount(wordCount + 1);

        setLetterCount(letterCount + value.length);
        setWordText('');
        handleWordChange();
      }
      // console.log(wordCount);
      // console.log(value === element)

      //   setCharacterCount(value.length);
    }

  };

  const [wordCount, setWordCount] = useState(0);

  const handleWordChange = () => {
    // setWordCount(wordCount + 1);
    // saveWordCount(wordCount);

    // fetch('https://random-word-api.herokuapp.com/word?length=5')
    //     .then(response => response.json())
    //     .then(data => document.getElementById('word').innerHTML = data)
    // .then(data => setLetterCount(letterCount + data.toString().length));
    // .then(data => console.log(data.toString().length));

    // let words = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
    // var words = require('an-array-of-english-words')
    // document.getElementById('word').innerHTML = data;
    document.getElementById('word').innerHTML = words[(Math.floor(Math.random() * words.length))];
  }


  // let overallWords = [];
  // function saveWordCount(savedWords) {
  //     overallWords.push(savedWords);
  //     localStorage.setItem('myScore', overallWords);
  //     // console.log(overallWords)
  // }

  function refreshPage() {
    window.location.reload();
  }


  function initGame() {
    handleWordChange();
    setTimeLeft(30);
    setWordCount(0);
    setLetterCount(1);
  }

  return (
    <>
      <div className="gameArea">
        {/* <h2>GAME AREA:</h2> */}
        <p id="word" className="randomWord"></p>

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
          // style={{color: "red"}}
          >
          </input>
          {/* <input type="submit" value="Submit"></input> */}
        </form>
        <p>{timeLeft}</p>
        <button type="button" onClick={refreshPage}> <span>Reload game</span> </button>

        <p>You typed <strong>{wordCount} words</strong></p>
        <p>You typed <strong>{letterCount - 1} letters </strong></p>

        <div>

          {Auth.loggedIn() ? (
            <>
              <p
                className={`m-0 ${characterCount === 280 || error ? 'text-danger' : ''
                  }`}
              >
              </p>
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
              Want to save your scores to your profile? Please{' '}
              <Link to="/login">login or signup.</Link>
            </p>
          )}
        </div>

      </div>

    </>
  );
};

export default Game;

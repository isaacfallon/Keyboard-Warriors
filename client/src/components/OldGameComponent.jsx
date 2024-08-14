// NOTE: This was the original game component but is no longer in use. 

import { useState, useEffect, useRef } from 'react';
import {Link, useNavigate} from 'react-router-dom';

import { useMutation } from '@apollo/client';

// import { ADD_SCORE } from '../utils/mutations';
// import { QUERY_ME } from '../utils/queries';

const Game = (props) => {

    const navigate = useNavigate();

    const toComponentB=()=>{
  navigate('/me',{state: wordCount - 1});
    }

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
            console.log(`You typed ${wordCount - 1} words`);
            SaveDataToLocalStorage(wordCount - 1);
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

    const handleChange = (event) => {
        const { name, value } = event.target;

        const element = document.getElementById('word').innerHTML;

        if (name === 'wordText' && value.length <= 280) {

            setWordText(value);
            if (value === element) {
                setWordCount(wordCount + 1);

                setLetterCount(letterCount + value.length);
                setWordText('');
                handleWordChange();
            }
            console.log(wordCount);
            // console.log(value === element)

            //   setCharacterCount(value.length);
        }

    };

    const [wordCount, setWordCount] = useState(1);

    const handleWordChange = () => {
        // setWordCount(wordCount + 1);
        // saveWordCount(wordCount);

        // fetch('https://random-word-api.herokuapp.com/word?length=5')
        //     .then(response => response.json())
        //     .then(data => document.getElementById('word').innerHTML = data)
        // .then(data => setLetterCount(letterCount + data.toString().length));
        // .then(data => console.log(data.toString().length));

        let words = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
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
        setTimeLeft(5);
        setWordCount(1);
        setLetterCount(1);
    }


    return (
        <div className="gameArea">
            <div> <a onClick={()=>{toComponentB()}}>Profile Test</a></div>
            <h2>GAME AREA:</h2>
            <p id="word" className="randomWord"></p>

            <form id="wordForm">
                <input
                    type="text"
                    id="input"
                    className="gameInput"
                    placeholder="Click here to start a game"
                    value={wordText}
                    onChange={handleChange}
                    name="wordText"
                    onClick={initGame}>
                </input>
                {/* <input type="submit" value="Submit"></input> */}
            </form>
            <p>{timeLeft}</p>
            <button type="button" onClick={refreshPage}> <span>Reload game</span> </button>

            <p>You typed <strong>{wordCount - 1} words</strong></p>
            <p>You typed <strong>{letterCount - 1} letters </strong></p>

        </div>
    );
}

export default Game;
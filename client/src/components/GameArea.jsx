import { useState, useEffect } from 'react';

import { useMutation } from '@apollo/client';

import { ADD_SCORE } from '../utils/mutations';
import { QUERY_SCORES, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

import { Link, useNavigate } from 'react-router-dom';

import words from 'an-array-of-english-words'

import Modal from './Modal';
import Profile from '../pages/Profile';

const Game = () => {

    const [seed, setSeed] = useState(1);

    const [open, setOpen] = useState(false);

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
            setSeed(Math.random());
            setTimeLeft(null);
            SaveDataToLocalStorage(wordCount);
            addScoreToProfile();
            setInputField('text-5xl text-center bg-slate-300 dark:bg-gray-800 dark:text-white rounded-xl px-4 gameInput pointer-events-none hidden')
            setOpen(true);
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
        setOpen(false);
    }



    function initGame() {
        document.getElementById('timer').innerHTML = "";
        setGameStatStyles('flex justify-evenly text-2xl');
        handleWordChange();
        setTimeLeft(30);
        setWordCount(0);
        setLetterCount(0);
        setInputField('text-5xl text-center bg-slate-300 dark:bg-gray-800 dark:text-white rounded-xl px-4 gameInput pointer-events-none')
    }

    const [gameStatStyles, setGameStatStyles] = useState('flex justify-evenly text-2xl invisible');

    const [inputField, setInputField] = useState('text-5xl text-center bg-slate-300 dark:bg-gray-800 dark:text-white rounded-xl px-4 gameInput')


    return (
        <>

            <div className="mx-auto p-4 text-center w-3/5 mt-8 rounded-3xl">

                <div className={gameStatStyles}>
                    <p>Total letters: <strong>{letterCount} </strong></p>
                    <p>Total words: <strong>{wordCount}</strong></p>

                    {/* <p>Average word length: <strong>{(letterCount / wordCount).toFixed(2)}</strong></p> */}
                    <p>Words per minute: <strong>{((letterCount / 5) * 2).toFixed(2)}</strong></p>
                </div>

                <p id="word" className="text-6xl p-4">_________________</p>

                <form id="wordForm" onSubmit={e => { e.preventDefault(); }}>
                    <input
                        type="text"
                        id="input"
                        className={inputField}
                        placeholder="Click here to start a game"
                        value={wordText}
                        onChange={handleChanger}
                        name="wordText"
                        onClick={initGame}
                    >
                    </input>
                </form>
               <p id="timer" className="text-4xl p-4">30{timeLeft}</p>

                <div className="gameBottomContainer">

                    <button type="button" onClick={removeModalAndRefresh} className='px-12 py-1 bg-orange-500 hover:bg-orange-700 text-white font-bold px-4 rounded'>Reset game</button>

                    <div className="text-lg pt-4">

                        {Auth.loggedIn() ? (
                            <>
                            </>
                        ) : (
                            <p>
                                Want to save scores and track your progress? {' '}
                                <Link to="/login" className="text-sky-600 hover:text-sky-800">Login or signup!</Link>
                            </p>
                        )}
                    </div>

                </div>
            </div>
            <Modal open={open} onClose={removeModalAndRefresh}>
                <div className="mx-auto text-center my-4 w-[600px]">
                    <h3 className="text-3xl font-black mb-2">Here are your results:</h3>
                    <p>Total letters: <strong>{letterCount} </strong></p>
                    <p>Total words: <strong>{wordCount}</strong></p>

                    <p>Average word length: <strong>{(letterCount / wordCount).toFixed(2)}</strong></p>
                    <p>Words per minute: <strong>{((letterCount / 5) * 2).toFixed(2)}</strong></p>
                    <br />
                    {Auth.loggedIn() ? (
                        <>
                            <p>
                                {' '}
                                <Link to="/me" className="text-sky-600 hover:text-sky-800">Visit your profile to see your stats! </Link>
                            </p>
                        </>
                    ) : (
                        <p>
                            Want to save your scores and track your progress? {' '}
                            <Link to="/login" className="text-sky-600 hover:text-sky-800" >Login or signup!</Link>
                        </p>
                    )}
                </div>
            </Modal>
            <span className="hidden"><Profile key={seed} /></span>
        </>
    );
};

export default Game;

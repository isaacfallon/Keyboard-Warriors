import { useState, useEffect, useRef } from 'react';

// import Countdown from './Countdown';

const Test = () => {


    const [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {
        // setWordCount(1);
        if (timeLeft === 0) {
            console.log("TIME LEFT IS 0");
            setTimeLeft(null);
            console.log(`You typed ${wordCount - 1} words`);
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


    const [wordText, setWordText] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;

        const element = document.getElementById('word').innerHTML;

        if (name === 'wordText' && value.length <= 280) {

            setWordText(value);
            if (value === element) {
                // alert('correct')
                // handleFormSubmit();
                setWordText('');
                handleWordChange();
            }
            // console.log(value === element)

            //   setCharacterCount(value.length);
        }

    };

    const [wordCount, setWordCount] = useState(1);

    const handleWordChange = () => {
        setWordCount(wordCount + 1);
        console.log(wordCount);

        fetch('https://random-word-api.herokuapp.com/word?length=5')
        .then(response => response.json())
        .then(data => document.getElementById('word').innerHTML = data);

        let words = ['one', 'two', 'three'];
        // document.getElementById('word').innerHTML = data;
        // document.getElementById('word').innerHTML = words[(Math.floor(Math.random() * words.length))];
    }


    function startFunctions() {
        handleWordChange();
        setTimeLeft(10);
        setWordCount(1);
    }


    return (
        <div>
            <h2>Typing test area here:</h2>
            <p id="word"></p>

            <form id="wordForm">
                <input type="text" id="input" placeholder="Click here to start the test" value={wordText} onChange={handleChange} name="wordText" onClick={startFunctions}></input>
                {/* <input type="submit" value="Submit"></input> */}
            </form>
            <p>{timeLeft}</p>

            <p>You typed {wordCount - 1} words </p>
            {/* <p>WMP: {(wordCount - 1)} </p> */}

        </div>
    );
}

export default Test;
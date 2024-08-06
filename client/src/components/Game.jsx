import { useState, useEffect, useRef } from 'react';

// import Countdown from './Countdown';

const Test = () => {


    const [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {
        // setWordCount(1);
        if (timeLeft === 0) {
            alert("TIME'S UP");
            setTimeLeft(null);
            // console.log(`You typed ${wordCount - 1} words`);
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

    const [letterCount, setLetterCount] = useState(1);

    const handleChange = (event) => {
        const { name, value } = event.target;

        const element = document.getElementById('word').innerHTML;

        if (name === 'wordText' && value.length <= 280) {

            setWordText(value);
            if (value === element) {
                // alert('correct')
                // handleFormSubmit();
                setLetterCount(letterCount + value.length);
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
        // console.log(wordCount);


        fetch('https://random-word-api.herokuapp.com/word?length=6')
        .then(response => response.json())
        .then(data => document.getElementById('word').innerHTML = data)
        // .then(data => setLetterCount(letterCount + data.toString().length));
        // .then(data => console.log(data.toString().length));

        // let words = ['one', 'two', 'three'];
        // document.getElementById('word').innerHTML = data;
        // document.getElementById('word').innerHTML = words[(Math.floor(Math.random() * words.length))];
    }

    function refreshPage(){ 
        window.location.reload(); 
    }


    function initGame() {
        handleWordChange();
        setTimeLeft(15);
        setWordCount(1);
        setLetterCount(1);
    }


    return (
        <div className="gameArea">
            <h2>GAME AREA:</h2>
            <p id="word"></p>

            <form id="wordForm">
                <input type="text" id="input" placeholder="Click here to start a game" value={wordText} onChange={handleChange} name="wordText" onClick={initGame}></input>
                {/* <input type="submit" value="Submit"></input> */}
            </form>
            <p>{timeLeft}</p>
            <button type="button" onClick={ refreshPage }> <span>Reload game</span> </button> 

            <p>You typed <strong>{wordCount - 1} words</strong></p>
            <p>You typed <strong>{letterCount - 1} letters </strong></p>

        </div>
    );
}

export default Test;
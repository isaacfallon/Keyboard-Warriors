import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Modal from "./Modal";

export default function MathsGameArea() {
  const [open, setOpen] = useState(false);

  const [num1, setNum1] = useState("__");
  const [num2, setNum2] = useState("__");

  const [correctCount, setCorrectCount] = useState(0);

  function handleNumberChange() {
    setNum1(Math.floor(Math.random() * 10));
    setNum2(Math.floor(Math.random() * 10));
  }

  function handleChanger(event) {
    event.preventDefault();

    const inputNumber = document.getElementById("input");

    if (inputNumber.value == num1 + num2) {
      inputNumber.value = "";
      setCorrectCount(correctCount + 1);
      handleNumberChange();
    }
  }

  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (timeLeft === 0) {
      setInputField('text-5xl text-center bg-slate-300 dark:bg-gray-800 dark:text-white rounded-xl px-4 gameInput pointer-events-none hidden')
      //   setSeed(Math.random());
      setTimeLeft(null);
      //   SaveDataToLocalStorage(wordCount);
      //   addScoreToProfile();
      setOpen(true);
    }

    if (!timeLeft) return;

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  function initGame() {
    document.getElementById("timer").innerHTML = "";
    setTimeLeft(30);
    handleNumberChange();
    setGameStatStyles('flex justify-evenly py-4 text-2xl');
    setInputField('text-5xl text-center bg-slate-300 dark:bg-gray-800 dark:text-white rounded-xl px-4 gameInput pointer-events-none w-7/12')
  }

  function removeModalAndRefresh() {
    window.location.reload();
    setOpen(false);
  }

  const [gameStatStyles, setGameStatStyles] = useState('flex justify-evenly text-2xl py-4 invisible');

  const [inputField, setInputField] = useState('text-5xl text-center bg-slate-300 dark:bg-gray-800 dark:text-white rounded-xl px-4 w-7/12')


  return (
    <>
      <div className="mx-auto text-center w-3/5 mt-2 rounded-3xl">
      <h2 className="text-2xl font-bold pb-2"><Link to="/" className="hover:text-sky-700 dark:hover:text-sky-600">Maths mode - enter the correct calculations as quick as you can!</Link></h2>      
        
      <div className={gameStatStyles}>
                    <p>Correct calculations: <strong>{correctCount} </strong></p>

                    {/* <p>Average word length: <strong>{(letterCount / wordCount).toFixed(2)}</strong></p> */}
                    <p>Calculations per minute: <strong>{(correctCount * 2).toFixed(2)}</strong></p>
                </div>

        <p id="numbers" className="text-6xl p-4">
          {num1} + {num2}
        </p>

        <form
          id="numberForm"
          // onSubmit={(e) => {
          //   e.preventDefault();
          //   handleChanger();
          // }}
          onSubmit={handleChanger}
        >
          <input
            type="text"
            id="input"
            className={inputField}
            placeholder="Click to start a maths game"
            //   value={numText}
            // onChange={handleChanger}
            name="wordText"
            onClick={initGame}
          ></input>
        </form>
        <p id="timer" className="text-4xl p-4">
          30
          {timeLeft}
        </p>
        <div className="gameBottomContainer">

<button type="button" onClick={removeModalAndRefresh} className='px-12 py-1 bg-orange-500 hover:bg-orange-700 text-white font-bold px-4 rounded'>Reset game</button>


</div>
      </div>

      <Modal open={open} onClose={removeModalAndRefresh}>
        <div className="mx-auto text-center my-4 w-[600px]">
          <h3 className="text-3xl font-black mb-2">Here are your results:</h3>
          <p>
            Total correct calculations: <strong>{correctCount}</strong>
          </p>
          <p>Calculations per minute: <strong>{(correctCount * 2).toFixed(2)}</strong></p>
        </div>
      </Modal>
    </>
  );
}

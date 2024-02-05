import quemark from "./que-mark.png";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [maxTryReached, setMaxTryReached] = useState(false);
  const [areTwoDigits, setAreTwoDigits] = useState(false);
  const [inputNumber, setInputNumber] = useState(0);
  const [generatedNumber, setGeneratedNumber] = useState(0);
  const [isNumberTrue, setIsNumberTrue] = useState(false);
  const [answerStatus, setAnswerStatus] = useState("...");
  const [score, setScore] = useState(20);
  const [highScore, setHighScore] = useState(0);
  const [scoreData, setScoreData] = useState([]);

  useEffect(() => {
    if (scoreData.length > 0) {
      const max = Math.max(...scoreData);
      setHighScore(max);
    }
  }, [scoreData]);

  const handleStartGame = () => {
    setIsGameStarted(true);
    setGeneratedNumber(Math.floor(Math.random() * 20) + 1);
    setAnswerStatus("...");
    setScore(20);
    setIsNumberTrue(false);
    setInputNumber(0);
    setMaxTryReached(false);
  };

  const handleNumberInput = (e) => {
    console.log("e.target.value", e.target.value);
    setInputNumber(e.target.value === undefined ? 0 : e.target.value * 1);
    setAreTwoDigits(e.target.value.length);
  };

  const handleCheckAnswer = () => {
    setIsNumberTrue(generatedNumber === inputNumber ? true : false);
    if(!isNaN(inputNumber)){
      if (inputNumber < generatedNumber) {
        setAnswerStatus("Too Low!");
      } else if (inputNumber > generatedNumber) {
      setAnswerStatus("Too High!");
    } else {
      setAnswerStatus("Correct Number!");
      setScoreData([...scoreData, score-1]);
    }
    if (score === 1) {
      setMaxTryReached(true);
    }
    setScore(score - 1);
  }else {
    setAnswerStatus("Enter Valid Number!");
    setInputNumber(0);
  }
  };

  // const calcHighestScore = (x) => {
  //   if(x.length === 0) {
  //     setHighScore(0);
  //   }
  //   else if(x.length === 1) {
  //     setHighScore(x[0]);
  //   }
  //   else {
  //     let maxVal = x.sort((a, b) => b - a)[0];
  //     setHighScore(maxVal);
  //   }
  // };

  // console.log(generatedNumber, inputNumber, isNumberTrue);
  console.log("scoreData", scoreData);
  console.log("", generatedNumber);
  console.log("highScore", highScore);

  return (
    <>
      <div
        className={`${
          isGameStarted
            ? `${isNumberTrue ? "bg-[#55aa3e]" : "bg-red-600"}`
            : "bg-slate-400"
        }  h-[100vh] w-[75vw] mx-auto`}
      >
        <div className="p-4 flex justify-between items-center">
          <button
            className=" bg-white text-4xl p-4 font-bold"
            onClick={handleStartGame}
          >
            Again!
          </button>
          <div className="text-white text-2xl">(Between 1 and 20)</div>
        </div>

        <div>
          <h2 className="text-4xl text-white text-center mt-4">
            Guess My Number!!!
          </h2>
        </div>

        <div className="relative mt-24">
          <div className="w-[100%] h-2 bg-white"></div>
          {isNumberTrue ? (
            <div className="w-28 h-28 border-2 border-blue-700 bg-slate-200 rounded-xl flex justify-center items-center absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <h3 className="text-7xl">{generatedNumber}</h3>
            </div>
          ) : (
            <img
              src={quemark}
              className="w-28 absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
          )}
        </div>

        <div className="mt-24 flex justify-evenly items-center mx-auto">
          <div className="left flex flex-col space-y-2">
            <input
              className="outline-1 outline-red-400 h-24 w-36 text-8xl p-0"
              pattern="[0-9]{2}"
              inputMode="numeric"
              onChange={handleNumberInput}
              value={inputNumber}
            />
            <button
              className=" bg-white text-4xl p-4 font-bold"
              onClick={handleCheckAnswer}
              disabled={isNumberTrue === true || maxTryReached === true}
            >
              Check!
            </button>
          </div>
          <div className="right text-white text-2xl">
            <div>{answerStatus}</div>
            <div>Score: {score}</div>
            <div>High Score: {highScore}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

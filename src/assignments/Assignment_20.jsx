import { useState, useEffect } from "react";
import axios from "axios";
import "./Assignment_19.css";
import Icon from "../assets/treasure-svgrepo-com.svg";

function Welcome({ setStart }) {
  return (
    <div className="colorMixer11">
      <h1>Welcome</h1>
      <h3>10 quizes are waiting for you!</h3>
      <img src={Icon} />
      <button
        id="start"
        onClick={() => {
          setStart(true);
        }}
      >
        Start Quiz
      </button>
    </div>
  );
}

function Owl({ hovered }) {
  return (
    <div className="watchOwl">
      <div
        className="bubble1"
        style={{
          animationPlayState: hovered ? "running" : "paused",
        }}
      >
        <div className="eyeball1">
          <div className="pupil1"></div>
        </div>
      </div>
      <div
        className="bubble2"
        style={{
          animationPlayState: hovered ? "running" : "paused",
        }}
      >
        <div className="eyeball2">
          <div className="pupil2"></div>
        </div>
      </div>
    </div>
  );
}

function NextQA({
  data,
  currentQuestion,
  setCurrentQuestion,
  setAnswerAndScore,
}) {
  const [selected, setSelected] = useState(null);
  const correct = data[currentQuestion].correct;
  const [hovered, setHovered] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleSelect = (index) => {
    if (selected !== null) return;
    setSelected(index);
    setAnswerAndScore(index, correct);
    setDisabled(true);

    setTimeout(() => {
      setSelected(null);
      setDisabled(false);
      setCurrentQuestion(currentQuestion + 1);
    }, 800);
  };
  return (
    <div className="colorMixer11">
      <h1>Question {currentQuestion + 1}</h1>
      <h3>{data[currentQuestion].question}</h3>
      <ul>
        {data[currentQuestion].answers.map((option, index) => (
          <li key={index}>
            <label>
              <div className="buttonBox11">
                <button
                  name="option"
                  checked={selected == index}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                  disabled={disabled}
                  onClick={() => {
                    {
                      handleSelect(index);
                    }
                  }}
                >
                  {option}
                </button>
              </div>
            </label>
          </li>
        ))}
      </ul>
      <Owl hovered={hovered} />
    </div>
  );
}

function ReviewQA({ data, givenAnswers }) {
  const [questionNumber, setQuestionNumber] = useState(0);
  const answers = data[questionNumber].correct;
  const userAnswer = givenAnswers[questionNumber];

  return (
    <div className="review">
      <h1>Question {questionNumber + 1}</h1>
      <ol>
        {data[questionNumber].answers.map((option, index) => {
          let color = "black";
          if (index === answers) {
            color = "green";
          } else if (index === userAnswer && userAnswer !== answers) {
            color = "red";
          }
          return (
            <li key={index}>
              <label
                style={{
                  color,
                  textShadow: index === answers ? "0px 0px 10px green" : "none",
                }}
              >
                {option}
              </label>
            </li>
          );
        })}
      </ol>

      <h2>{data[questionNumber].question}</h2>

      <button
        onClick={() => {
          if (questionNumber < data.length - 1) {
            setQuestionNumber(questionNumber + 1);
          }
        }}
      >
        Next
      </button>
      <button
        onClick={() => {
          if (questionNumber > 0) {
            setQuestionNumber(questionNumber - 1);
          }
        }}
      >
        Last
      </button>
    </div>
  );
}

function Assignment_20() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [start, setStart] = useState(false);
  const [savedAnswers, setSavedAnswers] = useState([]);

  useEffect(() => {
    axios
      .get("https://apis.dnjs.lk/objects/quiz.php")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Owl hovered={true} />;
  }

  const setAnswerAndScore = (option, correctAnswer) => {
    option === correctAnswer && setScore((prev) => prev + 1);
    setSavedAnswers((prev) => [...prev, option]);
  };

  return start === false ? (
    <Welcome setStart={setStart} />
  ) : currentQuestion === data.length ? (
    <div className="colorMixer11">
      <h1>Quiz Completed!</h1>
      <h2>
        Your Score: {score} / {data.length}
      </h2>
      <ReviewQA data={data} givenAnswers={savedAnswers} />
    </div>
  ) : (
    <NextQA
      data={data}
      currentQuestion={currentQuestion}
      setCurrentQuestion={setCurrentQuestion}
      setAnswerAndScore={setAnswerAndScore}
    />
  );
}
export default Assignment_20;

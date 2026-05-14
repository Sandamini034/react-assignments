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
      {console.log(data)}
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

function Assignment_19() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [start, setStart] = useState(false);

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
  };

  return start === false ? (
    <Welcome setStart={setStart} />
  ) : currentQuestion === data.length ? (
    <div className="colorMixer11">
      <h1>Quiz Completed!</h1>
      <h2>
        Your Score: {score} / {data.length}
      </h2>
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
export default Assignment_19;

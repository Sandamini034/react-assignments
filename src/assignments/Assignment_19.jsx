import { useState, useEffect } from "react";
import axios from "axios";

function Assignment_19() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

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
    return <div className="colorMixer1">Loading...</div>;
  }

  const setAnswerAndScore = (option, correctAnswer) => {
    option === correctAnswer && setScore((prev) => prev + 1);
  };

  function NextQA() {
    return (
      <div className="colorMixer1">
        <h1>Question {currentQuestion + 1}</h1>
        {console.log(data)}
        <h3>{data[currentQuestion].question}</h3>
        <ol>
          {data[currentQuestion].answers.map((option, index) => (
            <li key={index}>
              <input
                name="option"
                type="radio"
                onClick={() => {
                  {
                    const correct = data[currentQuestion].correct;
                    setAnswerAndScore(index, correct);
                    setCurrentQuestion(currentQuestion + 1);
                  }
                }}
              ></input>
              {option}
            </li>
          ))}
        </ol>
      </div>
    );
  }

  return currentQuestion === data.length ? (
    <div className="colorMixer1">
      <h1>Quiz Completed!</h1>
      <h2>
        Your Score: {score} / {data.length}
      </h2>
    </div>
  ) : (
    <NextQA />
  );
}
export default Assignment_19;

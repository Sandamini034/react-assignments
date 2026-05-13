import { useState, useEffect, useRef } from "react";
import "./Assignment_18.css";

function Assignment_18() {
  const [colors, setColors] = useState(["blue"]);
  const [gameOver, setGameOver] = useState(null);
  const intervalRef = useRef(null);

  function stopGame(message) {
    clearInterval(intervalRef.current);
    setGameOver(message);
  }

  function addColor() {
    const number = Math.random();
    console.log(number);
    const color = number < 0.5 ? "blue" : "red";
    setColors((prev) => {
      const newColors = [...prev];
      newColors.unshift(color);
      return newColors;
    });
  }

  function removeColor(color) {
    const newColors = [...colors];
    if (newColors[newColors.length - 1] === color) {
      newColors.pop();
      setColors(newColors);
    } else if (newColors[newColors.length - 1] !== color) {
      stopGame("You lost the game!");
    }

    if (newColors.length === 0) {
      stopGame("Congratulations! You won the game!");
    }
  }

  useEffect(() => {
    intervalRef.current = setInterval(addColor, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (colors.length > 7) {
      stopGame("You lost the game!");
    }
  }, [colors]);

  return (
    <div className="colorMixer1">
      {gameOver ? (
        <div>
          <h1>{gameOver}</h1>
        </div>
      ) : (
        <>
          <div style={{ display: "flex", flexWrap: `wrap` }}>
            {" "}
            {}
            {colors.map((color, index) => (
              <div
                id="color1"
                key={index}
                style={{
                  backgroundColor: color,
                  width: "50px",
                  height: "50px",
                }}
              ></div>
            ))}
          </div>
          <div className="buttonBox">
            <button
              id="redButton"
              onClick={() => {
                removeColor("red");
              }}
            >
              red
            </button>
            
            <button
              id="blueButton"
              onClick={() => {
                removeColor("blue");
              }}
            >
              blue
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Assignment_18;

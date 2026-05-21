import "./Assignment_25.css";
import characters from "../data/characters.json";
import { useState, useEffect } from "react";

function shuffleArray(array) {
  array = [...array, ...array];
  return array.sort(() => Math.random() - 0.5); 
}

function Card({ item, index, isFlipped, isMatched, onFlip }) {
  return (
    <div
      className={`card ${isFlipped ? "flipped" : ""}`}
      onClick={() => onFlip(index)}
    >
      <div className="card-inner">
        <div
          className="card-side card-front"
          style={{ backgroundColor: isMatched ? "green" : "" }}
        ></div>
        <div
          className="card-side card-back"
          style={{
            fontSize: "50px",
            backgroundColor: isMatched ? "green" : "",
          }}
        >
          {item.emoji}
        </div>
      </div>
    </div>
  );
}

function CardGrid() {
  const [theme, setTheme] = useState("nature");
  const [shuffled, setShuffled] = useState([]);
  const [counter, setCounter] = useState(0);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const getCharacters = (theme) => {
    if (theme === "nature") return characters[2].characters;
    if (theme === "animals") return characters[0].characters;
    if (theme === "dessert") return characters[1].characters;
    if (theme === "foods") return characters[3].characters;
    return [];
  };

  useEffect(() => {
    const chars = getCharacters(theme);
    setShuffled(shuffleArray(chars));
    setFlippedCards([]);
    setMatchedCards([]);
  }, [theme, counter]);

  const handleFlip = (index) => {
    if (disabled) return;
    if (matchedCards.includes(index)) return;
    if (flippedCards.includes(index)) return;

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      setDisabled(true);

      if (shuffled[first].emoji === shuffled[second].emoji) {
        setMatchedCards((prev) => [...prev, first, second]);
        setFlippedCards([]);
        setDisabled(false);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
          setDisabled(false);
        }, 1000);
      }
    }
  };

  const handleTheme = (theme) => {
    setTheme(theme);
    setCounter((prev) => prev + 1);
  };

  return (
    <>
      <div className="btnBox">
        <button onClick={() => handleTheme("nature")}>Nature</button>
        <button onClick={() => handleTheme("foods")}>Food</button>
        <button onClick={() => handleTheme("animals")}>Animals</button>
        <button onClick={() => handleTheme("dessert")}>Dessert</button>
      </div>
      <div className="displayBox">
        {shuffled.map((item, i) => (
          <Card
            key={i}
            index={i}
            item={item}
            isFlipped={flippedCards.includes(i) || matchedCards.includes(i)}
            isMatched={matchedCards.includes(i)}
            onFlip={handleFlip}
          />
        ))}
      </div>
    </>
  );
}

function Assignment_25() {
  return <CardGrid />;
}

export default Assignment_25;

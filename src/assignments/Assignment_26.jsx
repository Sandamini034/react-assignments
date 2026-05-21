import "./Assignment_26.css";
import Butterfly from "./Butterfly";
import { useState, useEffect, useRef } from "react";
import MoonSpirit from "../assets/moon_spirit_yue.jpg";
import Toph from "../assets/katara.jpg";
import Azula from "../assets/Azula.jpg";

function sliderValue(sliderRef) {
  const el = sliderRef.current;
  const val = el.value;
  const max = el.max;
  const percentage = (val / max) * 100;

  el.style.background = `linear-gradient(
        to right,
        #0f0f0f 0%,
        #4caf50 ${percentage}%,
        #ff0000 ${percentage}%,
        #0f0f0f 100%
      )`;
}

function getNumberOfParts(value) {
  if (value >= 0 && value <= 16) {
    return 3;
  } else if (value > 16 && value <= 32) {
    return 4;
  } else if (value > 32 && value <= 48) {
    return 5;
  } else if (value > 48 && value <= 64) {
    return 6;
  } else if (value > 64 && value <= 80) {
    return 7;
  } else if (value > 80 && value <= 100) {
    return 8;
  }
}

function createGrid(numParts) {
  return Array.from({ length: numParts }, (_, i) =>
    Array.from({ length: numParts }, (_, j) => ({
      row: i,
      col: j,
      originalRow: i,
      originalCol: j,
      isEmpty: i === numParts - 1 && j === numParts - 1,
    }))
  );
}

function shuffleGrid(grid) {
  const directions = ["up", "down", "left", "right"];
  let shuffledGrid = grid;

  for (let i = 0; i < 1000; i++) {
    const randomDirection =
      directions[Math.floor(Math.random() * directions.length)];
    shuffledGrid = moveEmptyCell(shuffledGrid, randomDirection);
  }

  return shuffledGrid;
}

function moveEmptyCell(grid, direction) {
  const emptyCell = grid.flat().find((cell) => cell.isEmpty);

  let { row, col } = emptyCell;
  let targetRow = row;
  let targetCol = col;

  switch (direction) {
    case "up":
      targetRow = row + 1;
      break;
    case "down":
      targetRow = row - 1;
      break;
    case "left":
      targetCol = col + 1;
      break;
    case "right":
      targetCol = col - 1;
      break;
    default:
      return grid;
  }

  if (
    targetRow >= 0 &&
    targetRow < grid.length &&
    targetCol >= 0 &&
    targetCol < grid[0].length
  ) {
    const newGrid = grid.map((r) => r.map((c) => ({ ...c })));

    [newGrid[row][col], newGrid[targetRow][targetCol]] = [
      newGrid[targetRow][targetCol],
      newGrid[row][col],
    ];

    // update grid position of both cells
    newGrid[row][col].row = row;
    newGrid[row][col].col = col;
    newGrid[targetRow][targetCol].row = targetRow;
    newGrid[targetRow][targetCol].col = targetCol;

    return newGrid;
  }

  return grid;
}

const uploadImage = (e, setSelectedImage) => {
  const file = e.target.files[0];
  const img = new Image();

  img.onload = function () {
    URL.revokeObjectURL(img.src);
  };

  setSelectedImage(URL.createObjectURL(file));
};

function SideMenu({ setSelectedImage }) {
  return (
    <div className="imgDisplay">
      <img
        src={MoonSpirit}
        onClick={() => {
          setSelectedImage("MoonSpirit");
        }}
      ></img>
      <img
        src={Toph}
        onClick={() => {
          setSelectedImage("Toph");
        }}
      ></img>
      <img src={Azula} onClick={() => setSelectedImage("Azula")}></img>
      <input
        type="file"
        style={{ display: "none" }}
        id="selected"
        accept="image/*"
        onChange={(e) => uploadImage(e, setSelectedImage)}
      ></input>
      <button onClick={() => document.querySelector("#selected").click()}>
        ⬆️
      </button>
    </div>
  );
}

const imageMap = {
  MoonSpirit: MoonSpirit,
  Toph: Toph,
  Azula: Azula,
};

function Assignment_26() {
  const [loading, setLoading] = useState(false);
  const sliderRef = useRef(null);
  const [puzzleParts, setPuzzleParts] = useState(6);
  const [grid, setGrid] = useState(() => createGrid(6));
  const [started, setStarted] = useState(false);
  const inputRef = useRef(null);
  const [selectImage, setSelectedImage] = useState("MoonSpirit");
  const [display, setDisplay] = useState("block");
  const [displayQuit, setDisplayQuit] = useState("none");

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (sliderRef.current) {
      sliderValue(sliderRef);
    }
  }, [loading]);

  useEffect(() => {
    setGrid(createGrid(puzzleParts));
  }, [puzzleParts]);

  useEffect(() => {
    if (!started) return;

    function handleKeyDown(e) {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key) {
        case "ArrowUp":
          setGrid((prevGrid) => moveEmptyCell(prevGrid, "up"));
          break;
        case "ArrowDown":
          setGrid((prevGrid) => moveEmptyCell(prevGrid, "down"));
          break;
        case "ArrowLeft":
          setGrid((prevGrid) => moveEmptyCell(prevGrid, "left"));
          break;
        case "ArrowRight":
          setGrid((prevGrid) => moveEmptyCell(prevGrid, "right"));
          break;
        default:
          break;
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [started]);

  if (loading) {
    return <Butterfly hovered={true} />;
  }

  return (
    <div
      className="optionDisplay"
      style={{ display: "flex", flexDirection: "row" }}
    >
      <SideMenu setSelectedImage={setSelectedImage} />
      <div className="puzzelDisplay">
        <div
          className="puzzelBox"
          ref={inputRef}
          style={{ backgroundColor: "#0f0f0f" }}
        >
          {grid.map((row, i) => (
            <div
              key={i}
              className="puzzleRow"
              style={{
                display: "flex",
                width: "100%",
                height: `${600 / puzzleParts}px`,
              }}
            >
              {row.map((cell) => (
                <div
                  key={`${cell.originalRow}-${cell.originalCol}`}
                  className="puzzlePart"
                  style={{
                    width: `${600 / puzzleParts}px`,
                    height: `${600 / puzzleParts}px`,
                    backgroundImage: cell.isEmpty
                      ? "none"
                      : `url(${imageMap[selectImage] ?? selectImage})`,
                    backgroundSize: `${600}px ${600}px`,
                    backgroundPosition: `${
                      (-cell.originalCol * 600) / puzzleParts
                    }px ${(-cell.originalRow * 600) / puzzleParts}px`,
                    backgroundColor: cell.isEmpty ? "#0f0f0f" : "transparent",
                    borderRadius: "15px",
                    border: "1px solid #0f0f0f",
                  }}
                />
              ))}
            </div>
          ))}
        </div>
        <input
          type="range"
          min="0"
          max="100"
          ref={sliderRef}
          style={{ display: `${display}` }}
          onChange={(e) => {
            setPuzzleParts(getNumberOfParts(Number(e.target.value)));
            sliderValue(sliderRef);
          }}
        />
        <button
          style={{ display: `${display}` }}
          onClick={() => {
            setStarted(true),
              setGrid(shuffleGrid(grid)),
              setDisplay("none"),
              setDisplayQuit("block");
          }}
        >
          Start Puzzel
        </button>
        <button
          id="quit"
          style={{ display: `${displayQuit}` }}
          onClick={() => {
            setDisplay("block"), setDisplayQuit("none"),
            setGrid(createGrid(puzzleParts));
          }}
        >
          Quit Puzzel
        </button>
      </div>
    </div>
  );
}

export default Assignment_26;

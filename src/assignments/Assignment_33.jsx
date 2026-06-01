import { useRef, useEffect, useState } from "react";
import road from "../assets/car_game/highway-rush-road.png";
import car from "../assets/car_game/highway-rush-cars.png";
import position from "../data/position.json";
import Butterfly from "./Butterfly.jsx";

function detectCollision(car1, car2) {
  const buffer = 10;
  const noOverlap =
    car1.x + car1.width - buffer < car2.x ||
    car1.x + buffer > car2.x + car2.width ||
    car1.y + car1.height - buffer < car2.y ||
    car1.y + buffer > car2.y + car2.height;
  return !noOverlap;
}

function Assignment_33() {
  const canvasRef = useRef(null);
  const myCarX = useRef(230);
  const myCarMarginRight = useRef(0);
  const myCarMarginLeft = useRef(0);
  const roadY = useRef(0);
  const roadImageRef = useRef(null);
  const carImageRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const carDirectionRef = useRef(0);
  const deltaRef = useRef(16);
  const [start, setStart] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const loadImage = (url) => {
    return new Promise((resolve) => {
      const image = new Image();
      fetch(url).then(async (resp) => {
        const blobURL = URL.createObjectURL(await resp.blob());
        image.addEventListener("load", () => {
          resolve(image);
        });
        image.src = blobURL;
      });
    });
  };

  useEffect(() => {
    Promise.all([loadImage(road), loadImage(car)]).then(
      ([roadImage, carImage]) => {
        roadImageRef.current = roadImage;
        carImageRef.current = carImage;
        setLoading(false);
      }
    );
  }, []);

  const moveSpeed = 6;

  // Simple handler — no permission logic here
  useEffect(() => {
    const handler = (event) => {
      if (event.alpha === null) return;
      const gamma = event.gamma;
      if (gamma < -5) {
        carDirectionRef.current = -1;
        myCarMarginLeft.current = 2;
        myCarMarginRight.current = 0;
      } else if (gamma > 5) {
        carDirectionRef.current = 1;
        myCarMarginRight.current = 2;
        myCarMarginLeft.current = 0;
      } else {
        carDirectionRef.current = 0;
        myCarMarginLeft.current = 0;
        myCarMarginRight.current = 0;
      }
    };

    window.addEventListener("deviceorientation", handler);
    return () => window.removeEventListener("deviceorientation", handler);
  }, []);

  useEffect(() => {
    if (!start || loading) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const currentFrame = { value: 0 };
    const timer = { value: 0 };
    const previousTime = { value: 0 };
    const frameDuration = 100;
    let animationId;
    let carSpawnTime = 1000;
    const carSpawnGap = 1000;
    const laneX = [50, 100, 200, 300];
    const cars = [];

    Promise.all([loadImage(road), loadImage(car)]).then(
      ([roadImage, carImage]) => {
        const update = (currentTime) => {
          deltaRef.current = currentTime - previousTime.value;
          previousTime.value = currentTime;
          timer.value += deltaRef.current;

          carSpawnTime += deltaRef.current;
          if (carSpawnTime >= carSpawnGap) {
            carSpawnTime = 0;
            const newCar = {
              x: laneX[Math.floor(Math.random() * laneX.length)],
              y: -50 - Math.random() * 300,
              frameIndex: Math.floor(Math.random() * position.length),
            };
            cars.push(newCar);
          }

          roadY.current += moveSpeed;
          if (roadY.current >= canvas.height) {
            roadY.current = 0;
          }

          if (timer.value > frameDuration) {
            timer.value = 0;
            currentFrame.value = (currentFrame.value + 1) % position.length;
          }
        };

        const updateCarPositions = () => {
          for (let i = cars.length - 1; i >= 0; i--) {
            cars[i].y += moveSpeed;
            if (cars[i].y > canvas.height) {
              cars.splice(i, 1);
            }
          }
        };

        const draw = (currentTime) => {
          update(currentTime);
          const myFrame = position[4];

          myCarX.current = Math.max(
            50,
            Math.min(
              300,
              myCarX.current +
                carDirectionRef.current * moveSpeed * (deltaRef.current / 16)
            )
          );

          const myCar = {
            x: myCarX.current,
            y: 400,
            width: position[4].width,
            height: position[4].height,
          };

          const hasCollision = cars.some((carObj) => {
            const frame = position[carObj.frameIndex];
            const carData = {
              x: carObj.x,
              y: carObj.y,
              width: frame.width,
              height: frame.height,
            };
            return detectCollision(myCar, carData);
          });

          if (hasCollision) {
            ctx.fillStyle = "rgba(0,0,0,0.5)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "white";
            ctx.font = "bold 36px Arial";
            ctx.textAlign = "center";
            ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 2);
            cancelAnimationFrame(animationId);
            setGameOver(true);
            return;
          }

          ctx.clearRect(0, 0, canvas.width, canvas.height);

          ctx.drawImage(
            roadImage,
            0,
            roadY.current,
            canvas.width,
            canvas.height
          );
          ctx.drawImage(
            roadImage,
            0,
            roadY.current - canvas.height,
            canvas.width,
            canvas.height
          );

          updateCarPositions();

          cars.forEach((carObj) => {
            const frame = position[carObj.frameIndex];
            ctx.save();
            ctx.drawImage(
              carImage,
              frame.x,
              frame.y,
              frame.width,
              frame.height,
              carObj.x,
              carObj.y,
              frame.width - 10,
              frame.height - 10
            );
            ctx.restore();
          });

          const skew =
            myCarMarginRight.current * 0.05 - myCarMarginLeft.current * 0.05;

          ctx.save();
          ctx.transform(1, skew, 0, 1, myCarX.current, 400);
          ctx.drawImage(
            carImage,
            myFrame.x,
            myFrame.y,
            myFrame.width,
            myFrame.height,
            0,
            0,
            myFrame.width - 10,
            myFrame.height - 10
          );
          ctx.restore();

          animationId = requestAnimationFrame(draw);
        };

        animationId = requestAnimationFrame(draw);
      }
    );

    return () => cancelAnimationFrame(animationId);
  }, [loading, start]);

  const handleStart = () => {
    myCarX.current = 230;
    myCarMarginRight.current = 0;
    myCarMarginLeft.current = 0;
    roadY.current = 0;
    carDirectionRef.current = 0;
    deltaRef.current = 16;
    setGameOver(false);

    const beginGame = () => {
      setStart(false);
      setTimeout(() => setStart(true), 0);
    };

    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      DeviceOrientationEvent.requestPermission()
        .then((status) => {
          if (status === "granted") {
            beginGame();
          } else {
            alert("Please allow device orientation access to play.");
          }
        })
        .catch((err) => {
          console.error("Orientation permission error:", err);
          beginGame();
        });
    } else {
      beginGame();
    }
  };

  if (loading) return <Butterfly />;

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {(!start || gameOver) && (
        <button
          style={{
            position: "absolute",
            backgroundColor: "#005500",
            borderRadius: "10px",
            color: "white",
            top: "38vh",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            zIndex: 1,
            boxShadow: "inset 0 0px 20px rgba(0, 255, 0, 0.9)",
          }}
          onClick={handleStart}
        >
          {gameOver ? "Play Again" : "Start Game"}
        </button>
      )}
      <div
        className="gameDisplay"
        style={{
          backgroundImage: `url(${car})`,
          display: "flex",
          justifyContent: "center",
          width: `${window.innerWidth}px`,
          height: `${window.innerHeight}px`,
        }}
      >
        <canvas
          ref={canvasRef}
          width={400}
          height={710}
          style={{
            backgroundColor: "transparent",
            display: "block",
            marginBottom: "0",
            padding: "0",
            borderRadius: "20px",
          }}
        />
      </div>
    </div>
  );
}

export default Assignment_33;

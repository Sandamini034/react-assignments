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

function Assignment_28() {
  const canvasRef = useRef(null);
  const myCarX = useRef(230);
  const myCarMarginRight = useRef(0);
  const myCarMarginLeft = useRef(0);
  const roadY = useRef(0);
  const roadImageRef = useRef(null);
  const carImageRef = useRef(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const drive = (e) => {
      switch (e.key) {
        case "ArrowLeft":
          myCarX.current = Math.max(100, myCarX.current - 10);
          myCarMarginRight.current = 0;
          myCarMarginLeft.current = 2;
          setTimeout(() => {
            myCarMarginLeft.current = 0;
          }, 150);
          break;
        case "ArrowRight":
          myCarX.current = Math.min(550, myCarX.current + 10);
          myCarMarginRight.current = 2;
          myCarMarginLeft.current = 0;
          setTimeout(() => {
            myCarMarginRight.current = 0;
          }, 150);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", (e) => drive(e, myCarX.current));
    return () =>
      window.removeEventListener("keydown", (e) => drive(e, myCarX.current));
  }, []);

  useEffect(() => {
    if (loading) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const currentFrame = { value: 0 };
    const timer = { value: 0 };
    const previousTime = { value: 0 };
    const frameDuration = 100;
    let animationId;

    const laneX = [100,165, 230,295, 360,425, 490];

    const cars = Array.from({ length: 3 }, () => ({
      x: laneX[Math.floor(Math.random() * laneX.length)],
      y: Math.random() * (canvas.height - 150) + 500,
      frameIndex: Math.floor(Math.random() * position.length),
      width: position[0].width,
      height: position[0].height,
    }));

    Promise.all([loadImage(road), loadImage(car)]).then(
      ([roadImage, carImage]) => {
        const update = (currentTime) => {
          const delta = currentTime - previousTime.value;
          previousTime.value = currentTime;
          timer.value += delta;

          roadY.current += moveSpeed;
          if (roadY.current >= canvas.height) {
            roadY.current = 0;
          }

          if (timer.value > frameDuration) {
            timer.value = 0;
            currentFrame.value = (currentFrame.value + 1) % position.length;
          }
        };

        const MIN_DISTANCE = 150;

        const isSafeLane = (newX, newY) => {
          return cars.every((c) => {
            const sameX = c.x === newX;
            const tooClose = Math.abs(c.y - newY) < MIN_DISTANCE;
            return !(sameX && tooClose);
          });
        };

        const getAvailableLaneAndY = () => {
          const maxAttempts = 20;

          for (let i = 0; i < maxAttempts; i++) {
            const newX = laneX[Math.floor(Math.random() * laneX.length)];
            const newY = -50 - Math.random() * 300;

            if (isSafeLane(newX, newY)) {
              return { x: newX, y: newY };
            }
          }
          const laneCount = laneX.map((lane) => ({
            lane,
            count: cars.filter((c) => c.x === lane).length,
          }));
          const leastUsed = laneCount.sort((a, b) => a.count - b.count)[0].lane;
          return { x: leastUsed, y: -50 - Math.random() * 300 };
        };

        const updateCarPositions = () => {
          cars.forEach((carObj) => {
            carObj.y += moveSpeed;
            if (carObj.y > canvas.height) {
              const { x, y } = getAvailableLaneAndY();
              carObj.x = x;
              carObj.y = y;
              carObj.frameIndex = Math.floor(Math.random() * position.length);
            }
          });
        };

        const draw = (currentTime) => {
          update(currentTime);
          const myFrame = position[4];

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
            ctx.fillStyle = "white";
            ctx.font = "30px Arial";
            ctx.fillText(
              "Game Over!",
              canvas.width / 2 - 80,
              canvas.height / 2
            );
            cancelAnimationFrame(animationId);
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
              frame.width,
              frame.height
            );
            ctx.restore();
          });
          const skew =
            myCarMarginRight.current * 0.05 - myCarMarginLeft.current * 0.05;

          ctx.save();
          ctx.transform(
            1, // scaleX
            skew, // skewY
            0, // skewX
            1, // scaleY
            myCarX.current, // translateX
            400 // translateY
          );

          ctx.drawImage(
            carImage,
            myFrame.x,
            myFrame.y,
            myFrame.width,
            myFrame.height,
            0,
            0,
            myFrame.width,
            myFrame.height
          );
          ctx.restore();

          animationId = requestAnimationFrame(draw);
        };

        animationId = requestAnimationFrame(draw);
      }
    );

    return () => cancelAnimationFrame(animationId);
  }, [loading]);

  if (loading) return <Butterfly />;

  return (
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
        width={700}
        height={710}
        style={{
          backgroundColor: "#333",
          display: "block",
          marginBottom: "0",
          padding: "0",
          borderRadius: "20px",
        }}
      />
    </div>
  );
}

export default Assignment_28;

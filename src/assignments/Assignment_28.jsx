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
  let carDirectionRef = useRef(0);
  const deltaRef = useRef(16);

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
    const onKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        carDirectionRef.current = -1;
        myCarMarginLeft.current = 2;
      }
      if (e.key === "ArrowRight") {
        carDirectionRef.current = 1;
        myCarMarginRight.current = 2;
      }
    };
    const onKeyUp = (e) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        carDirectionRef.current = 0;
        myCarMarginLeft.current = 0;
        myCarMarginRight.current = 0;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
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
    let carSpawnTime = 1000;
    const carSpawnGap = 1000;

    const laneX = [100, 165, 230, 295, 360, 425, 490];

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
              // Remove cars that have moved off the screen
              //ex:const fruits = ["apple","banana", "cherry"];
              //fruits.splice(1, 1) // Removes "banana"
              cars.splice(i, 1);
            }
          }
        };

        const draw = (currentTime) => {
          update(currentTime);
          const myFrame = position[4];

          myCarX.current = Math.max(
            100,
            Math.min(
              550,
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

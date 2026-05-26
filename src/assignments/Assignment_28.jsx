import { useRef, useEffect, useState } from "react";
import road from "../assets/car_game/highway-rush-road.png";
import car from "../assets/car_game/highway-rush-cars.png";
import position from "../data/position.json";
import Butterfly from "./Butterfly.jsx";

function Assignment_28() {
  const canvasRef = useRef(null);
  const myCarX = useRef(230);
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

  useEffect(()=>{
    Promise.all([loadImage(road), loadImage(car)]).then((
      [roadImage, carImage]
    )=>{
      roadImageRef.current = roadImage;
      carImageRef.current = carImage;
      setLoading(false);
    });
  },[]);

  useEffect(() => {
    const drive = (e) => {
      switch (e.key) {
        case "ArrowLeft":
          myCarX.current = Math.max(100, myCarX.current - 10);
          break;
        case "ArrowRight":
          myCarX.current = Math.min(550, myCarX.current + 10);
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
    if(loading) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const currentFrame = { value: 0 };
    const timer = { value: 0 };
    const previousTime = { value: 0 };
    const frameDuration = 100;
    let animationId;

    const laneX = [100, 230, 360, 490];

    const cars = Array.from({ length: 3 }, () => ({
      x: laneX[Math.floor(Math.random() * laneX.length)],
      y: Math.random() * (canvas.height - 150) + 50,
      frameIndex: Math.floor(Math.random() * position.length),
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

        const moveSpeed = 4;

        const MIN_DISTANCE = 150; 

        const isSafeLane = (newX, newY) => {
            return cars.every(c => {
                const sameX = c.x === newX;
                const tooClose = Math.abs(c.y - newY) < MIN_DISTANCE;
                return !(sameX && tooClose);
            });
        };
        
        const getAvailableLaneAndY = () => {
            const maxAttempts = 20;
        
            for (let i = 0; i < maxAttempts; i++) {
                const newX = laneX[Math.floor(Math.random() * laneX.length)];
                const newY = -50 - Math.random() * 200; 
        
                if (isSafeLane(newX, newY)) {
                    return { x: newX, y: newY };
                }
            }
            const laneCount = laneX.map(lane => ({
                lane,
                count: cars.filter(c => c.x === lane).length
            }));
            const leastUsed = laneCount.sort((a, b) => a.count - b.count)[0].lane;
            return { x: leastUsed, y: -50 - Math.random() * 200 };
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
          ctx.save();
          ctx.drawImage(
            carImage,
            myFrame.x,
            myFrame.y,
            myFrame.width,
            myFrame.height,
            myCarX.current,
            400,
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

  if(loading) return <Butterfly />;

  return (
    <canvas
      ref={canvasRef}
      width={700}
      height={710}
      style={{
        backgroundColor: "#333",
        display: "block",
        marginBottom: "0",
        padding: "0",
      }}
    />
  );
}

export default Assignment_28;

import { useRef, useEffect } from "react";

import background from "../assets/Castle-Background.png";
import idleSprite from "../assets/Sprites/with_outline/IDLE.png";
import runSprite from "../assets/Sprites/with_outline/RUN.png";
import attackSprite from "../assets/Sprites/with_outline/ATTACK 3.png";
import walkSprite from "../assets/Sprites/with_outline/WALK.png";
import jumpSprite from "../assets/Sprites/with_outline/JUMP.png";
import hurtSprite from "../assets/Sprites/with_outline/HURT.png";
import deathSprite from "../assets/Sprites/with_outline/DEATH.png";
import defendSprite from "../assets/Sprites/with_outline/DEFEND.png";

function Assignment_27() {
  const canvasRef = useRef(null);
  const currentActionRef = useRef("idle");
  const directionRef = useRef(1);

  const spriteMap = {
    idle: idleSprite,
    run: runSprite,
    attack: attackSprite,
    walk: walkSprite,
    jump: jumpSprite,
    hurt: hurtSprite,
    death: deathSprite,
    defend: defendSprite,
  };

  const frameCounts = {
    idle: 7,
    run: 8,
    attack: 6,
    walk: 8,
    jump: 5,
    hurt: 4,
    death: 12,
    defend: 6,
  };

  const frameDuration = 100;
  const moveSpeed = 3;
  const gravity = 0.5;

  const getAction = (code) => {
    switch (code) {
      case "arrowleft":
      case "arrowright":
        return "run";
      case "arrowup":
        return "jump";
      case "arrowdown":
        return "attack";
      case "keyw":
        return "walk";
      case "keyh":
        return "hurt";
      case "keyd":
        return "death";
      case "keys":
        return "defend";
      default:
        return "idle";
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const imageCache = {};
    let loadedCount = 0;
    const totalSprites = Object.keys(spriteMap).length + 1; // +1 for bg

    let currentFrame = 0;
    let timer = 0;
    let previousTime = 0;
    let animId;

    let posX = 100;
    const groundY = canvas.height / 2 - 80;
    let posY = groundY;
    let velocityY = 0;
    let isJumping = false;

    const bgImage = new Image();
    bgImage.onload = () => {
      loadedCount++;
      if (loadedCount === totalSprites) {
        animId = requestAnimationFrame(update);
      }
    };
    bgImage.src = background;

    const update = (currentTime) => {
      const delta = currentTime - previousTime;
      timer += delta;
      const action = currentActionRef.current;
      const img = imageCache[action];

      if (!img || !img.complete) {
        previousTime = currentTime;
        animId = requestAnimationFrame(update);
        return;
      }

      const frameWidth = img.naturalWidth / frameCounts[action];
      const frameHeight = img.naturalHeight;
      const scaledW = frameWidth * 5;
      const scaledH = frameHeight * 5;

      if (action === "run") posX += moveSpeed * directionRef.current;
      if (action === "walk") posX += (moveSpeed / 2) * directionRef.current;

      if (isJumping) {
        velocityY += gravity * 1;
        posY += velocityY;
        if (posY >= groundY) {
          posY = groundY;
          velocityY = 0;
          isJumping = false;
          currentActionRef.current = "idle";
        }
      }

      posX = Math.max(0, Math.min(canvas.width - scaledW, posX));

      if (timer > frameDuration) {
        timer = timer % frameDuration;
        currentFrame = (currentFrame + 1) % frameCounts[action];
      }

      const frameX = currentFrame * frameWidth;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

      ctx.save();
      if (directionRef.current === -1) {
        ctx.scale(-1, 1);
        ctx.drawImage(
          img,
          frameX,
          0,
          frameWidth,
          frameHeight,
          -(posX + scaledW),
          posY,
          scaledW,
          scaledH
        );
      } else {
        ctx.drawImage(
          img,
          frameX,
          0,
          frameWidth,
          frameHeight,
          posX,
          posY,
          scaledW,
          scaledH
        );
      }
      ctx.restore();

      previousTime = currentTime;
      animId = requestAnimationFrame(update);
    };

    Object.entries(spriteMap).forEach(([action, src]) => {
      const img = new Image();
      img.onload = () => {
        imageCache[action] = img;
        loadedCount++;
        if (loadedCount === totalSprites) {
          animId = requestAnimationFrame(update);
        }
      };
      img.src = src;
    });

    const handleKeyDown = (e) => {
      e.preventDefault();

      if (e.code === "ArrowRight") directionRef.current = 1;
      if (e.code === "ArrowLeft") directionRef.current = -1;

      if (e.code === "ArrowUp" && !isJumping) {
        isJumping = true;
        velocityY = -12;
        currentActionRef.current = "jump";
        return;
      }

      const newAction = getAction(e.code.toLowerCase());
      if (newAction !== currentActionRef.current && !isJumping) {
        currentActionRef.current = newAction;
      }
    };

    const handleKeyUp = (e) => {
      if (e.code === "ArrowUp") return;
      if (!isJumping && currentActionRef.current !== "idle") {
        currentActionRef.current = "idle";
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <canvas
    width={700}
    height={710}
    ref={canvasRef}
    id="canvas"
    style={{ display: "block" ,
      borderRadius:"20px"
    }}
  />
  );
}

export default Assignment_27;

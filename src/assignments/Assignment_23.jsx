import "./Assignment_23.css";
import { useEffect, useRef, useState } from "react";


function updateFill(sliderRef) {
  const el = sliderRef.current;

  const val = el.value;
  const max = el.max;
  const percentage = (val / max) * 100;

  el.style.background = `linear-gradient(
    to right,
    #4caf50 0%,
    #4caf50 ${percentage}%,
    #ffffff ${percentage}%,
    #ffffff 100%
  )`;
}

function Assignment_23() {
  const [msg, setMsg] = useState(null);
  const [mode, setMode] = useState("copy");

  const sliderRef = useRef(null);

  const canvasRef = useRef(null);

  const imageRef = useRef(null);
  const copiedDataRef = useRef(null);

  const cursorSizeRef = useRef(30);
  const mousePosRef = useRef({ x: 0, y: 0 });

  const pastedPartsRef = useRef([]);

  const redraw = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (imageRef.current) {
      ctx.drawImage(imageRef.current, 0, 0, canvas.width, canvas.height);
    }

    pastedPartsRef.current.forEach((item) => {
      ctx.putImageData(item.data, item.x, item.y);
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const handleMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      mousePosRef.current = { x, y };

      redraw();

      const size = cursorSizeRef.current;

      ctx.strokeStyle = "red";
      ctx.lineWidth = 1;
      ctx.strokeRect(
        x - size / 2,
        y - size / 2,
        size,
        size
      );

      if (mode === "paste" && copiedDataRef.current) {
        ctx.globalAlpha = 0.6;
        ctx.putImageData(
          copiedDataRef.current,
          x - size / 2,
          y - size / 2
        );
        ctx.globalAlpha = 1;
      }
    };

    canvas.addEventListener("mousemove", handleMove);
    return () => canvas.removeEventListener("mousemove", handleMove);
  }, [mode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const handleClick = (e) => {
      if (!imageRef.current) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const size = cursorSizeRef.current;

      if (mode === "copy") {
        const data = ctx.getImageData(
          x - size / 2,
          y - size / 2,
          size,
          size
        );

        copiedDataRef.current = data;
        setMode("paste");
        setMsg("Area copied!");
      } else {
        pastedPartsRef.current.push({
          data: copiedDataRef.current,
          x: x - size / 2,
          y: y - size / 2,
        });

        setMsg("Pasted!");
        redraw();
      }
    };

    canvas.addEventListener("click", handleClick);
    return () => canvas.removeEventListener("click", handleClick);
  }, [mode]);

  const uploadImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const img = new Image();

    img.onload = () => {
      imageRef.current = img;
      pastedPartsRef.current = [];
      copiedDataRef.current = null;
      setMode("copy");

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    img.src = URL.createObjectURL(file);
  };

  
  const handleSizeChange = (e) => {
    cursorSizeRef.current = Number(e.target.value);
  };

  const handleReset = () => {
    copiedDataRef.current = null;
    setMode("copy");
    setMsg("Selection cleared");
    redraw();
  };

  return (
    <div className="display">
      <div className="review">
        <h1>Image Creator</h1>

        <div className="rangeBox">
          <input
            type="range"
            min="10"
            max="120"
            defaultValue="0"
            onChange={handleSizeChange}
            ref={sliderRef}
            onChangeCapture={() => updateFill(sliderRef)}
          />
          <button onClick={handleReset}>Reset</button>
        </div>

        <h3>
          {mode === "copy"
            ? "Move mouse to select area → Click to copy"
            : "Move mouse to preview → Click to paste"}
        </h3>

        <canvas
          ref={canvasRef}
          width="400"
          height="400"
          style={{ border: "1px solid black" }}
        />

        <div className="optionBtn">
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={uploadImage}
          />
          <button
            onClick={() =>
              document.getElementById("fileInput").click()
            }
          >
            Upload Image
          </button>

          <h4>{msg}</h4>
        </div>
      </div>
    </div>
  );
}

export default Assignment_23;
import "./Assignment_21.css";
import { useEffect, useState } from "react";

const uploadImage = (e, setMsg) => {
  const file = e.target.files[0];

  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();

  if (file.size > 5 * 1024 * 1024) {
    setMsg("Please select an image smaller than 5MB.");
    setTimeout(() => setMsg(null), 3000);
    return;
  }

  if (!file.type.startsWith("image/")) {
    setMsg("Please select an image!");
    setTimeout(() => setMsg(null), 3000);
    return;
  }
  img.onload = function () {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    URL.revokeObjectURL(img.src);
    setMsg("Image uploaded successfully!");
    setTimeout(() => setMsg(null), 3000);
  };

  img.src = URL.createObjectURL(file);
};

function Assignment_21() {
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    const sideMenu = document.querySelectorAll(".side-menu");
    const hexCodeLabel = document.getElementById("hexCode");
    const rgbaLabel = document.getElementById("rgba");
    const motivation = document.getElementById("motivation");

    const pick = (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const pixelData = ctx.getImageData(x, y, 1, 1).data;
      const rgbaColor = `rgba(${pixelData[0]}, ${pixelData[1]}, ${
        pixelData[2]
      }, ${pixelData[3] / 255})`;
      rgbaLabel.textContent = `RGBA: ${rgbaColor}`;
      hexCodeLabel.textContent = `Hex Code: #${(
        (1 << 24) +
        (pixelData[0] << 16) +
        (pixelData[1] << 8) +
        pixelData[2]
      )
        .toString(16)
        .slice(1)
        .toUpperCase()}`;

      sideMenu.forEach((div) => {
        div.style.backgroundColor = rgbaColor;

        if (
          pixelData[0] * 0.299 + pixelData[1] * 0.587 + pixelData[2] * 0.114 >
          186
        ) {
          rgbaLabel.style.color = "black";
          hexCodeLabel.style.color = "black";
          motivation.style.color = "black";
        }
      });
    };

    canvas.addEventListener("click", pick);

    return () => {
      canvas.removeEventListener("click", pick);
    };
  }, []);

  return (
    <div className="display">
      <div className="side-menu">
        <h1 id="motivation">LIFE IS ABOUT USING THE WHOLE BOX OF CRAYONS</h1>
      </div>
      <div className="review">
        <h1>Color Picker</h1>
        <canvas id="myCanvas" width="400" height="400"></canvas>
        <div className="optionBtn">
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => uploadImage(e, setMsg)}
          ></input>
          <button onClick={() => document.getElementById("fileInput").click()}>
            Use your own image
          </button>
          <h1>{msg}</h1>
        </div>
      </div>
      <div className="side-menu">
        <label id="hexCode">Hex Code: #000000</label>
      </div>
      <div className="side-menu">
        <label id="rgba">RGBA: rgba(0, 0, 0, 0)</label>
      </div>
    </div>
  );
}

export default Assignment_21;

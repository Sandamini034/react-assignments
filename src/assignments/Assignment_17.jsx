import "./Assignment_17.css";
import { useState } from "react";

const hexToRgb = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
};

const mixing = (percentage, color1, color2) => {
  const r = Math.round((1 - percentage) * color1.r + percentage * color2.r)
    .toString(16)
    .padStart(2, "0");
  const g = Math.round((1 - percentage) * color1.g + percentage * color2.g)
    .toString(16)
    .padStart(2, "0");
  const b = Math.round((1 - percentage) * color1.b + percentage * color2.b)
    .toString(16)
    .padStart(2, "0");
  return `#${r}${g}${b}`;
};

const colorMixer = (color1, color2, range) => {
  const { r: r1, g: g1, b: b1 } = hexToRgb(color1);
  const { r: r2, g: g2, b: b2 } = hexToRgb(color2);

  const ratio = range / 100;
  console.log(ratio);
  return mixing(ratio, { r: r1, g: g1, b: b1 }, { r: r2, g: g2, b: b2 });
};

function Assignment_17() {
  const [color1, setColor1] = useState("#ff0000");
  const [color2, setColor2] = useState("#0000ff");
  const [range, setRange] = useState(0);

  return (
    <div
      className="colorBlender"
      style={{ backgroundColor: colorMixer(color1, color2, range) }}
    >
      <h1>Color Blender</h1>
      <div className="colorMixer1">
        <input
          type="color"
          value={color1}
          onChange={(e) => {
            setColor1(e.target.value);
          }}
        ></input>
        <input
          type="color"
          value={color2}
          onChange={(e) => {
            setColor2(e.target.value);
          }}
        ></input>
        <input
          type="range"
          min="0"
          max="100"
          value={range}
          onChange={(e) => {
            setRange(e.target.value);
          }}
        ></input>
      </div>
      <br></br>
      <div
        id="colorDisplay"
        style={{
          background: `linear-gradient(to right, ${color1},${colorMixer(
            color1,
            color2,
            range
          )},${color2})`,
        }}
      ></div>
    </div>
  );
}

export default Assignment_17;

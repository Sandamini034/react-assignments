import { useState } from "react";

const uploadImage = (e, setMsg) => {
  const file = e.target.files[0];
  const img = document.getElementById("image");

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
    URL.revokeObjectURL(img.src);
    setMsg("Image uploaded successfully!");
    setTimeout(() => setMsg(null), 3000);
  };

  img.src = URL.createObjectURL(file);
};

const filterRanges = {
  blur: { min: 0, max: 20, default: 0, unit: "px" },
  brightness: { min: 0, max: 200, default: 100, unit: "%" },
  contrast: { min: 0, max: 200, default: 100, unit: "%" },
  "drop-shadow": { min: 0, max: 20, default: 0, unit: "px" },
  grayscale: { min: 0, max: 100, default: 0, unit: "%" },
  "hue-rotate": { min: 0, max: 360, default: 0, unit: "deg" },
  invert: { min: 0, max: 100, default: 0, unit: "%" },
  opacity: { min: 0, max: 100, default: 100, unit: "%" },
  saturate: { min: 0, max: 200, default: 100, unit: "%" },
  sepia: { min: 0, max: 100, default: 0, unit: "%" },
};

const getFilterWithUnit = (filterType, filterValue) => {
  switch (filterType) {
    case "blur":
      return `blur(${filterValue}px)`;
    case "hue-rotate":
      return `hue-rotate(${filterValue}deg)`;
    case "drop-shadow":
      return `drop-shadow(${filterValue}px ${filterValue}px 5px black)`;
    default:
      return `${filterType}(${filterValue}%)`;
  }
};

function Assignment_22() {
  const [msg, setMsg] = useState(null);
  const [filterType, setFilterType] = useState("blur");
  const [filterValue, setFilterValue] = useState(
    filterRanges[filterType].default
  );

  const configuration = filterRanges[filterType];

  const handleFilterTypeChange = (e) => {
    const newFilterType = e.target.value;
    setFilterType(newFilterType);
    setFilterValue(filterRanges[newFilterType].default);
    document.getElementById(
      "image"
    ).style.filter = `${newFilterType}(${filterRanges[newFilterType].default}${filterRanges[newFilterType].unit})`;
  };

  const handleRangeChange = (e) => {
    const newFilterValue = e.target.value;
    setFilterValue(newFilterValue);
    document.getElementById("image").style.filter = getFilterWithUnit(
      filterType,
      newFilterValue
    );
  };

  const reset = () => {
    document.getElementById("option").value = "blur";
    document.getElementById("filterValue").value = "";
    document.getElementById("image").style.filter = "";
  };

  return (
    <div className="colorMixer11">
      <h1>Image Filter</h1>
      <div className="layout">
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={(e) => uploadImage(e, setMsg)}
        />
        <button onClick={() => document.getElementById("fileInput").click()}>
          Use your own image
        </button>

        <select
          id="option"
          onChange={handleFilterTypeChange}
          value={filterType}
        >
          <option value="blur">Blur</option>
          <option value="brightness">Brightness</option>
          <option value="contrast">Contrast</option>
          <option value="drop-shadow">Drop-shadow</option>
          <option value="grayscale">GrayScale</option>
          <option value="hue-rotate">Hue-rotate</option>
          <option value="invert">Invert</option>
          <option value="opacity">Opacity</option>
          <option value="saturate">Saturate</option>
          <option value="sepia">Sepia</option>
        </select>

        <input
          type="range"
          id="filterValue"
          min={configuration.min}
          max={configuration.max}
          value={filterValue}
          onChange={handleRangeChange}
        />
        <p style={{ color: "white" }}>
          {filterType}:{filterValue}
          {configuration.unit}
        </p>
        {msg && <p style={{ color: "white" }}>{msg}</p>}
        <img id="image" alt="" />
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default Assignment_22;

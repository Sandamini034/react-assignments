import { useEffect, useState } from "react";

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

  const handleFilterChange = () => {
    const filterType = document.getElementById("option").value;
    const filterValue = document.getElementById("filterValue").value;
    const image = document.getElementById("image");

    if (filterType && filterValue) {
      image.style.filter = getFilterWithUnit(filterType, filterValue);
    } else {
      image.style.filter = "";
    }
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

        <select id="option" onChange={handleFilterChange}>
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

        <input type="text" id="filterValue" onChange={handleFilterChange} />

        {msg && <p style={{ color: "white" }}>{msg}</p>}
        <img id="image" alt="" />
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default Assignment_22;

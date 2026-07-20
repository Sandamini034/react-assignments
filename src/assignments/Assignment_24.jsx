import "./Assignment_24.css";
import { useRef, useEffect, useState } from "react";
import Moon from "./moon.jsx";
import ShootingStar from "./shootingStar.jsx";
import Rock from "./rock.jsx";

function CustomMenu({ onSelect }) {
  return (
    <div className="customMenu">
      <button id="katara" onClick={() => onSelect("katara")}>
        Katara
      </button>
      <button id="yue" onClick={() => onSelect("yue")}>
        Yue
      </button>
      <button id="toph" onClick={() => onSelect("toph")}>
        Toph
      </button>
    </div>
  );
}

function CharacterDisplay({ character }) {
  if (character === "katara") return <ShootingStar />;
  if (character === "yue") return <Moon />;
  if (character === "toph") return <Rock />;
  return null;
}

function Assignment_24() {
  const contextMenuRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    const preventDefault = (e) => {
      e.preventDefault();
      setMenuPos({ x: e.clientX, y: e.clientY });
      setShowMenu(true);
    };

    const hideMenu = () => setShowMenu(false);

    document.addEventListener("contextmenu", preventDefault);
    document.addEventListener("click", hideMenu);

    return () => {
      document.removeEventListener("contextmenu", preventDefault);
      document.removeEventListener("click", hideMenu);
    };
  }, []);

  return (
    <div ref={contextMenuRef} className="contextMenu">
      <CharacterDisplay character={character} />

      {showMenu ? (
        <div
          className="customMenu"
          style={{
            position: "fixed",
            top: menuPos.y,
            left: menuPos.x,
          }}
        >
          <CustomMenu
            onSelect={(c) => {
              setCharacter(c);
              setShowMenu(false);
            }}
          />
        </div>
      ) : (
        <>
         <h1>Avatar Characters</h1>
         <h3>(Right click)</h3>
        </>
      )}
    </div>
  );
}

export default Assignment_24;

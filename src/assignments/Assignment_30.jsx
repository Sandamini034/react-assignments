import "./Assignment_30.css";
import { useRef, useEffect, useState } from "react";
import Seoul_city from "../assets/audio/seoul_city.mp3";

function Assignment_30() {
  const audioRef = useRef(null);
  const initializedRef = useRef(false);
  const analyserRef = useRef(null);
  const [bytes, setBytes] = useState([]);
  
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => {
      if (!initializedRef.current) {
        initializedRef.current = true;

        const ctx = new AudioContext();
        const source = ctx.createMediaElementSource(audio);
        const analyser = ctx.createAnalyser();

        //size should be power of two
        analyser.fftSize = 512;
        analyserRef.current = analyser;

        source.connect(analyser);
        analyser.connect(ctx.destination);
      }

      const ctx = analyserRef.current;
      if (ctx && ctx.state === "suspended") {
        ctx.resume();
      }

      const dataArray = new Uint8Array(
        analyserRef.current.frequencyBinCount - 80
      );
      const interval = setInterval(() => {
        analyserRef.current.getByteFrequencyData(dataArray);
        setBytes([...dataArray]);
      }, 100);

      audio.addEventListener("pause", () => clearInterval(interval), {
        once: true,
      });
    };

    audio.addEventListener("play", handlePlay);

    return () => {
      audio.removeEventListener("play", handlePlay);
    };
  }, []);

  return (
    <div className="audioPatternDisplay">
      <audio
        src={Seoul_city}
        ref={audioRef}
        controls
        loop
        style={{ marginTop: "10px", marginBottom: "40px" }}
      ></audio>
      <div className="audioPattern">
        {bytes.map((value, index) => (
          <div
            key={index}
            className="bar"
            style={{
              height: `${value * 1.5}px`,
              backgroundColor: `hsl(${value}, 100%, 50%)`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Assignment_30;

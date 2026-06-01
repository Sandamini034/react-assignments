import "./Assignment_29.css";
import { useRef, useEffect, useState } from "react";
import Seoul_city from "../assets/audio/seoul_city.mp3";
import "./Assignment_31.css";
import playCircle from "../assets/audio_player/play-circle-fill.svg";

function Assignment_31() {
  const audioRef = useRef(null);
  const initializedRef = useRef(false);
  const analyserRef = useRef(null);
  const [bytes, setBytes] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkmode") === "true"
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => {
      setIsPlaying(true);

      if (!initializedRef.current) {
        initializedRef.current = true;

        const ctx = new AudioContext();
        const source = ctx.createMediaElementSource(audio);
        const analyser = ctx.createAnalyser();

        analyser.fftSize = 512;
        analyserRef.current = analyser;

        source.connect(analyser);
        analyser.connect(ctx.destination);
      }

      const dataArray = new Uint8Array(15);
      const interval = setInterval(() => {
        analyserRef.current.getByteFrequencyData(dataArray);
        setBytes([...dataArray]);
      }, 100);

      audio.addEventListener("pause", () => clearInterval(interval), {
        once: true,
      });
    };

    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  };

  const toggleDarkMode = (e) => {
    const next = e.target.checked;
    setDarkMode(next);
    localStorage.setItem("darkmode", next);
  };

  return (
    <div className={`audioPatternsDisplay${darkMode ? " darkmode" : ""}`}>
      <input
        type="checkbox"
        className="toggle-switch"
        checked={darkMode}
        onChange={toggleDarkMode}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          height: "30px",
          width: "50px",
        }}
      />

      <audio src={Seoul_city} ref={audioRef} loop />

      <button id="audioPlayer">
        <img
          src={playCircle}
          alt={isPlaying ? "Pause" : "Play"}
          className="playIcon"
          onClick={togglePlay}
        />

        <div className="audioPatterns">
          {bytes.map((value, index) => (
            <div
              key={index}
              className="bars"
              style={{
                height: `${value * 0.15}px`,
              }}
            />
          ))}
        </div>

        <div className="timeDisplay">{formatTime(currentTime)}</div>

        <img
          alt={isMuted ? "Unmute" : "Mute"}
          className={`volumeIcon${isMuted ? " muted" : ""}`}
          onClick={toggleMute}
        />
      </button>
    </div>
  );
}

export default Assignment_31;

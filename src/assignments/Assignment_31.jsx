import "./Assignment_30.css";
import { useRef, useEffect, useState } from "react";
import Seoul_city from "../assets/audio/seoul_city.mp3";
import "./Assignment_31.css";
import playCircle from "../assets/audio_player/play-circle-fill.svg";
import voulmeUpBlack from "../assets/audio_player/volume-solid-black.svg";
import volumeUpWhite from "../assets/audio_player/volume-solid-white.svg";

function Assignment_31() {
  const audioRef = useRef(null);
  const initializedRef = useRef(false);
  const analyserRef = useRef(null);
  const [bytes, setBytes] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);

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
        15
      );
      const interval = setInterval(() => {
        analyserRef.current.getByteFrequencyData(dataArray);
        setBytes([...dataArray]);
      }, 100);

      audio.addEventListener("pause", () => clearInterval(interval), {
        once: true,
      });
    };

    
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    audio.addEventListener("play", handlePlay);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("play", handlePlay);
    };
  }, []);

  const formatTime =(time) =>{
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  return (
    <div className="audioPatternsDisplay">
      <audio
        src={Seoul_city}
        ref={audioRef}
        loop
       />
       <button id="audioPlayer" onClick={()=>{}}>
        <img src={playCircle} alt="Play" className="playIcon" onClick={()=>{
          const audio = audioRef.current;
          if(audio.paused){
            audio.play();
          }else{
            audio.pause();
          }
        }}/>
       <div className="audioPatterns">
        {bytes.map((value, index) => (
          <div
            key={index}
            className="bars"
            style={{
              height: `${value * 0.15}px`,
              backgroundColor: "#3B3B3B",
            }}
          ></div>
        ))}
      </div>

        <div className="timeDisplay">{formatTime(currentTime)}</div>

        <img src={voulmeUpBlack} alt="Volume Up" className="volumeIcon" 
        onClick={()=>{
          const audio = audioRef.current;
          if(audio.muted){
            audio.muted = false;
          }else{
            audio.muted = true;
          }
        }}/>
       </button>
    </div>
  );
}

export default Assignment_31;

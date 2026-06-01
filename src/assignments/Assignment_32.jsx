import "./Assignment_32.css";
import { useEffect, useRef } from "react";

function Assignment_32() {
  const buttonRef = useRef(null);
  const alphaRef = useRef(null);
  const betaRef = useRef(null);
  const gammaRef = useRef(null);
  const errorRef = useRef(null);

  const requestOrientation = () => {
    return new Promise((resolve, reject) => {
      if (DeviceOrientationEvent.requestPermission) {
        DeviceOrientationEvent.requestPermission()
          .then(status => {
            if (status === "granted") resolve();
            else reject(status);
          })
          .catch(reject);
      } else {
        resolve();
      }
    });
  };

  useEffect(() => {
    const button = buttonRef.current;

    button.addEventListener("click", () => {
      requestOrientation()
        .then(() => {
          button.style.backgroundColor = "blue";
          button.innerHTML = "Listening for device orientation...";

          window.addEventListener("deviceorientation", event => {
            if (event.alpha === null) {
              button.outerHTML = "This device may not support device orientation";
            } else {
              alphaRef.current.innerHTML = event.alpha.toFixed(5);
              betaRef.current.innerHTML = event.beta.toFixed(5);
              gammaRef.current.innerHTML = event.gamma.toFixed(5);
            }
          });
        })
        .catch(error => {
          errorRef.current.innerHTML = "Status: " + error.toString();
          errorRef.current.style.display = "flex";
        });
    });
  }, []);

  return (
    <div className="container">
      <button ref={buttonRef} id="button" style={{ backgroundColor: "white" }}>
        Start Listener
      </button>
      <div className="display-values">
        <div className="value" ref={alphaRef} data-label="Alpha">0.00</div>
        <div className="value" ref={betaRef} data-label="Beta">0.00</div>
        <div className="value" ref={gammaRef} data-label="Gamma">0.00</div>
      </div>
      <div ref={errorRef} id="error"></div>
    </div>
  );
}

export default Assignment_32;
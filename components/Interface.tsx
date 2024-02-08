import useGame from "../hooks/useGame";
import { useRef, useEffect, useState } from "react";
import { addEffect } from "@react-three/fiber";
import { useWindowSize } from "../hooks/useWindowSize";

export default function Interface() {
  const time = useRef<HTMLDivElement>();

  const [showInterface, setShowInterface] = useState(true);

  const { width } = useWindowSize();

  const restart = useGame((state) => state.restart);
  const phase = useGame((state) => state.phase);

  // Timer
  useEffect(() => {
    const unsubscribeEffect = addEffect(() => {
      const state = useGame.getState();

      let elapsedTime = 0;

      if (state.phase === "playing") elapsedTime = Date.now() - state.startTime;
      else if (state.phase === "ended")
        elapsedTime = state.endTime - state.startTime;
      elapsedTime /= 1000;
      elapsedTime = Number(elapsedTime.toFixed(2));
      if (time.current) time.current.textContent = String(elapsedTime);
    });

    return () => {
      unsubscribeEffect();
    };
  }, []);

  // Hide interface after 6 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowInterface(false);
    }, 4000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="interface">
      {/* Time */}
      <div ref={time} className="time">
        0.00
      </div>
      {/* Restart */}
      {phase === "ended" && (
        <div className="restart" onClick={restart}>
          Restart
        </div>
      )}
      {/* Controls */}
      {showInterface && width > 600 && (
        <div className="controls">
          <div className="raw">
            <div className={`key`}></div>
          </div>
          <div className="raw">
            <div className={`key`}></div>
            <div className={`key`}></div>
            <div className={`key`}></div>
          </div>
          <div className="raw">
            <div className={`key large`}></div>
          </div>
        </div>
      )}
    </div>
  );
}

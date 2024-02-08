import useGame from "../hooks/useGame";
import { useRef, useEffect } from "react";
import { addEffect } from "@react-three/fiber";
import { useShortcutsListener } from "../hooks/useShortcutsListener";

export default function Interface() {
  const time = useRef<HTMLDivElement>();

  const restart = useGame((state) => state.restart);
  const phase = useGame((state) => state.phase);

  const forward = useGame((state) => state.forward);
  const setForward = useGame((state) => state.setForward);

  const backward = useGame((state) => state.backward);
  const setBackward = useGame((state) => state.setBackward);

  const leftward = useGame((state) => state.leftward);
  const setLeftward = useGame((state) => state.setLeftward);

  const rightward = useGame((state) => state.rightward);
  const setRightward = useGame((state) => state.setRightward);

  const jump = useGame((state) => state.jump);
  const setJump = useGame((state) => state.setJump);

  useShortcutsListener((event) => {
    if (event.code === "ArrowUp" || event.code === "KeyW") {
      setForward(true);
      setBackward(false);
      setLeftward(false);
      setRightward(false);
      setJump(false);
    } else if (event.code === "ArrowDown" || event.code === "KeyS") {
      setBackward(true);
      setForward(false);
      setLeftward(false);
      setRightward(false);
      setJump(false);
    } else if (event.code === "ArrowLeft" || event.code === "KeyA") {
      setLeftward(true);
      setForward(false);
      setBackward(false);
      setRightward(false);
      setJump(false);
    } else if (event.code === "ArrowRight" || event.code === "KeyD") {
      setRightward(true);
      setForward(false);
      setBackward(false);
      setLeftward(false);
      setJump(false);
    } else if (event.code === "Space") {
      setJump(true);
      setForward(false);
      setBackward(false);
      setLeftward(false);
      setRightward(false);
    } else {
      setForward(false);
      setBackward(false);
      setLeftward(false);
      setRightward(false);
      setJump(false);
    }
  });

  // Time
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
      <div className="controls" style={{ zIndex: 1000 }}>
        <div className="raw">
          <div
            className={`key ${forward ? "active" : ""}`}
            onMouseDown={() => setForward(true)}
            onMouseUp={() => setForward(false)}
            onTouchStart={() => setForward(true)}
            onTouchEnd={() => setForward(false)}
            onTouchCancel={() => setForward(false)}
          ></div>
        </div>
        <div className="raw">
          <div
            className={`key ${leftward ? "active" : ""}`}
            onMouseDown={() => setLeftward(true)}
            onMouseUp={() => setLeftward(false)}
            onTouchStart={() => setLeftward(true)}
            onTouchEnd={() => setLeftward(false)}
            onTouchCancel={() => setLeftward(false)}
          ></div>
          <div
            className={`key ${backward ? "active" : ""}`}
            onMouseDown={() => setBackward(true)}
            onMouseUp={() => setBackward(false)}
            onTouchStart={() => setBackward(true)}
            onTouchEnd={() => setBackward(false)}
            onTouchCancel={() => setBackward(false)}
          ></div>
          <div
            className={`key ${rightward ? "active" : ""}`}
            onMouseDown={() => setRightward(true)}
            onMouseUp={() => setRightward(false)}
            onTouchStart={() => setRightward(true)}
            onTouchEnd={() => setRightward(false)}
            onTouchCancel={() => setRightward(false)}
          ></div>
        </div>
        <div className="raw">
          <div
            className={`key large ${jump ? "active" : ""}`}
            onMouseDown={() => setJump(true)}
            onMouseUp={() => setJump(false)}
            onTouchStart={() => setJump(true)}
            onTouchEnd={() => setJump(false)}
            onTouchCancel={() => setJump(false)}
          ></div>
        </div>
      </div>
    </div>
  );
}

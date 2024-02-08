import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { KeyboardControls, KeyboardControlsEntry } from "@react-three/drei";

import Lights from "../components/Lights";
import Experience from "../components/Experience";
import Interface from "../components/Interface";
import PerformanceMenu from "../components/PerformanceMenu";
import { useMemo } from "react";

export enum KeyboardControlsEnum {
  forward = "forward",
  backward = "backward",
  leftward = "leftward",
  rightward = "rightward",
  jump = "jump",
}

export default function Home() {
  const map = useMemo<KeyboardControlsEntry<KeyboardControlsEnum>[]>(
    () => [
      { name: KeyboardControlsEnum.forward, keys: ["ArrowUp", "KeyW"] },
      { name: KeyboardControlsEnum.backward, keys: ["ArrowDown", "KeyS"] },
      { name: KeyboardControlsEnum.leftward, keys: ["ArrowLeft", "KeyA"] },
      { name: KeyboardControlsEnum.rightward, keys: ["ArrowRight", "KeyD"] },
      { name: KeyboardControlsEnum.jump, keys: ["Space"] },
    ],
    []
  );

  return (
    <KeyboardControls map={map}>
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 2000,
          position: [0, 2, 10],
        }}
      >
        <PerformanceMenu />

        <color args={["#252731"]} attach="background" />

        <Physics>
          <Lights />
          <Experience />
        </Physics>
      </Canvas>

      <Interface />
    </KeyboardControls>
  );
}

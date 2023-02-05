import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { Physics, Debug } from "@react-three/rapier";
import { KeyboardControls } from "@react-three/drei";

import Lights from "../components/Lights";
import Level from "../components/Level";

export default function Home() {
  return (
    <KeyboardControls
      map={[
        { name: "forward", keys: ["ArrowUp", "keyW"] },
        { name: "backward", keys: ["ArrowDown", "keyS"] },
        { name: "leftward", keys: ["ArrowLeft", "keyA"] },
        { name: "rightward", keys: ["ArrowRight", "keyD"] },
        { name: "jump", keys: ["Space"] },
      ]}
    >
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 2000,
          position: [0, 2, 10],
        }}
      >
        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <Physics>
          <Debug />
          <Lights />
          <Level />
        </Physics>
      </Canvas>
    </KeyboardControls>
  );
}

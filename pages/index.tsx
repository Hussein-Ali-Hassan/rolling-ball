import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { Physics } from "@react-three/rapier";

import Lights from "../components/Lights";
import Experience from "../components/Experience";
import Interface from "../components/Interface";

export default function Home() {
  return (
    <>
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 2000,
          position: [0, 2, 10],
        }}
      >
        <Perf position="bottom-left" />

        <color args={["#252731"]} attach="background" />

        <Physics>
          <Lights />
          <Experience />
        </Physics>
      </Canvas>

      <Interface />
    </>
  );
}

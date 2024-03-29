import { useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { RigidBody, RigidBodyApi } from "@react-three/rapier";
import Ground from "./Ground";

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const obstacleMaterial = new THREE.MeshStandardMaterial({
  color: "#ff0000",
  metalness: 0,
  roughness: 1,
});
// @ts-ignore
THREE.ColorManagement.legacyMode = false;

export default function AxeBlock({ position }) {
  const obstacleRef = useRef<RigidBodyApi>(null);

  // speed of spinner - controlling the direction by switching the speed direction
  const [timeOffset] = useState(() => Math.random() * Math.PI * 2);

  // animation for the obstacle [rotate using kinematic rotation]
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    const x = Math.sin(time + timeOffset) * 1.25;
    obstacleRef.current?.setNextKinematicTranslation({
      x: position[0] + x,
      y: position[1] + 0.75,
      z: position[2],
    });
  });

  return (
    <group position={position}>
      <Ground color="#222222" position={[0, -0.1, 0]} />
      <RigidBody
        ref={obstacleRef}
        type="kinematicPosition"
        position={[0, 0.3, 0]}
        // restitution -> so the ball bounces back when hits the obstacle
        restitution={0.3}
        // friction=0 -> so the ball does not kick off the obstacle
        friction={0}
      >
        <mesh
          receiveShadow
          castShadow
          scale={[1.5, 1.5, 0.3]}
          geometry={boxGeometry}
          material={obstacleMaterial}
        />
      </RigidBody>
    </group>
  );
}

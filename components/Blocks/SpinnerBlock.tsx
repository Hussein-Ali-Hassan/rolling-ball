import { useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { RigidBody, RigidBodyApi } from "@react-three/rapier";
import Ground from "./Ground";

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: "orangered" });
// @ts-ignore
THREE.ColorManagement.legacyMode = false;

export default function SpinnerBlock({ position }) {
  const obstacleRef = useRef<RigidBodyApi>(null);

  // speed of spinner - controlling the direction by switching the speed direction
  const [speed] = useState(
    () => (Math.random() + 0.2) * (Math.random() < 0.5 ? -1 : 1)
  );

  // animation for the obstacle [rotate using kinematic rotation]
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    const rotation = new THREE.Quaternion();
    rotation.setFromEuler(new THREE.Euler(0, time * speed, 0));

    obstacleRef.current?.setNextKinematicRotation(rotation);
  });

  return (
    <group position={position}>
      <Ground color="greenyellow" position={[0, -0.1, 0]} />

      <RigidBody
        ref={obstacleRef}
        type="kinematicPosition"
        position={[0, 0.3, 0]}
        restitution={0.3}
        friction={0}
      >
        <mesh
          receiveShadow
          castShadow
          scale={[3, 0.3, 0.3]}
          geometry={boxGeometry}
          material={obstacleMaterial}
        />
      </RigidBody>
    </group>
  );
}

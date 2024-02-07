import * as THREE from "three";
import { RigidBody, CuboidCollider } from "@react-three/rapier";

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const wallMaterial = new THREE.MeshStandardMaterial({ color: "#887777" });
// @ts-ignore
THREE.ColorManagement.legacyMode = false;

export default function Walls({ length }) {
  return (
    <RigidBody type="fixed" restitution={0.2} friction={0}>
      {/* right wall */}
      <mesh
        position={[2.15, 0.75, -(length * 2) + 2]}
        geometry={boxGeometry}
        material={wallMaterial}
        scale={[0.3, 1.5, 4 * length]}
        castShadow
      />

      {/* left wall */}
      <mesh
        position={[-2.15, 0.75, -(length * 2) + 2]}
        geometry={boxGeometry}
        material={wallMaterial}
        scale={[0.3, 1.5, 4 * length]}
        receiveShadow
      />

      {/* behind the end block */}
      <mesh
        position={[0, 0.75, -(length * 4) + 2]}
        geometry={boxGeometry}
        material={wallMaterial}
        scale={[4, 1.5, 0.3]}
        receiveShadow
      />

      <CuboidCollider
        args={[2, 0.1, 2 * length]}
        position={[0, -0.1, -(length * 2) + 2]}
        restitution={0.2}
        // to make the ball roll harder
        friction={1}
      />
    </RigidBody>
  );
}

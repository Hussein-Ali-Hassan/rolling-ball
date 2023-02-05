import * as THREE from "three";
import { RigidBody } from "@react-three/rapier";
import { useGLTF } from "@react-three/drei";

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const floor1Material = new THREE.MeshStandardMaterial({ color: "limegreen" });
THREE.ColorManagement.legacyMode = false;

export default function EndBlock({ position }) {
  const hamburger = useGLTF("./hamburger.glb");

  hamburger.scene.children.forEach((mesh) => (mesh.castShadow = true));

  return (
    <group position={position}>
      <mesh
        receiveShadow
        position={[0, 0, 0]}
        scale={[4, 0.2, 4]}
        geometry={boxGeometry}
        material={floor1Material}
      />
      <RigidBody
        type="fixed"
        colliders="hull"
        position={[0, 0.25, 0.1]}
        restitution={0.2}
        friction={0}
      >
        <primitive object={hamburger.scene} scale={0.2} />
      </RigidBody>
    </group>
  );
}

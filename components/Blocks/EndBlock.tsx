import { RigidBody } from "@react-three/rapier";
import { useGLTF } from "@react-three/drei";
import Ground from "./Ground";

export default function EndBlock({ position }) {
  const hamburger = useGLTF("./hamburger.glb");

  hamburger.scene.children.forEach((mesh) => (mesh.castShadow = true));

  return (
    <group position={position}>
      <Ground color="#111111" position={[0, 0, 0]} />
      <RigidBody
        type="fixed"
        // this collider: "hull" is used to detect the collision with the ball by taking the shape of the mesh instead of the box
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

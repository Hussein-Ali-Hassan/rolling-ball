import * as THREE from "three";

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

export default function Ground({
  color,
  position,
}: {
  color: string;
  position: [number, number, number];
}) {
  const floor1Material = new THREE.MeshStandardMaterial({
    color,
    metalness: 0,
    roughness: 0,
  });

  return (
    <mesh
      receiveShadow
      position={position}
      scale={[4, 0.2, 4]}
      geometry={boxGeometry}
      material={floor1Material}
    />
  );
}

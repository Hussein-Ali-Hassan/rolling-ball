import Ground from "./Ground";

export default function StartBlock({ position }) {
  return (
    <group position={position}>
      <Ground color="#111111" position={[0, -0.1, 0]} />
    </group>
  );
}

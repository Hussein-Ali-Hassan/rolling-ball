import { Float, Text } from "@react-three/drei";
import Ground from "./Ground";

export default function StartBlock({ position }) {
  return (
    <group position={position}>
      <Float floatIntensity={0.25} rotationIntensity={0.25}>
        <Text
          font="./BebasNeue-Regular.ttf"
          scale={0.3}
          maxWidth={0.25}
          lineHeight={0.75}
          textAlign="right"
          position={[0.75, 0.65, 0]}
          rotation-y={-0.25}
        >
          Marble Race
          <meshBasicMaterial toneMapped={false} />
        </Text>
      </Float>
      <Ground color="#111111" position={[0, -0.1, 0]} />
    </group>
  );
}

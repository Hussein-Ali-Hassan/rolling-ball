import { SSR, DepthOfField, EffectComposer } from "@react-three/postprocessing";

export default function Effects() {
  return (
    <EffectComposer>
      <SSR
        intensity={0.45}
        thickness={10}
        ior={0.45}
        maxRoughness={1}
        maxDepthDifference={10}
        blurSharpness={10}
        jitter={0.75}
      />
      <DepthOfField focusDistance={0.01} focalLength={0.2} bokehScale={3} />
    </EffectComposer>
  );
}

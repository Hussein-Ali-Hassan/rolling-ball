import {
  StartBlock,
  EndBlock,
  SpinnerBlock,
  LimoBlock,
  AxeBlock,
} from "./Blocks";
import { useMemo } from "react";
import Walls from "./Walls";
import Player from "./Player";

export default function Level({
  trapsCount = 5,
  trapsType = [SpinnerBlock, LimoBlock, AxeBlock],
}) {
  const blocks = useMemo(() => {
    return Array(trapsCount)
      .fill(1)
      .map(() => trapsType[Math.floor(Math.random() * trapsType.length)]);
  }, [trapsCount, trapsType]);

  return (
    <>
      <Player />
      <StartBlock position={[0, 0, 0]} />
      {blocks.map((Block, index) => (
        <Block key={index} position={[0, 0, -(index + 1) * 4]} />
      ))}
      <EndBlock position={[0, 0, -(trapsCount + 1) * 4]} />
      <Walls length={trapsCount + 2} />
    </>
  );
}

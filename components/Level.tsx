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
import useGame from "../hooks/useGame";

export default function Level({
  trapsType = [SpinnerBlock, LimoBlock, AxeBlock],
}) {
  const trapsCount = useGame((state) => state.blocksCount);
  const blocksSeed = useGame((state) => state.blocksSeed);

  const blocks = useMemo(() => {
    return Array(trapsCount)
      .fill(1)
      .map(() => trapsType[Math.floor(Math.random() * trapsType.length)]);
  }, [trapsCount, trapsType, blocksSeed]);

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

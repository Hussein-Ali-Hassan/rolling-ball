import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface IGame {
  blocksCount: number;
  blocksSeed: number;
  setBlocksCount: (count: number) => void;

  forward: boolean;
  backward: boolean;
  leftward: boolean;
  rightward: boolean;
  jump: boolean;
  setForward: (forward: boolean) => void;
  setBackward: (backward: boolean) => void;
  setLeftward: (leftward: boolean) => void;
  setRightward: (rightward: boolean) => void;
  setJump: (jump: boolean) => void;

  startTime: number;
  endTime: number;

  phase: "ready" | "playing" | "ended";
  start: () => void;
  restart: () => void;
  end: () => void;
}

export default create<IGame>()(
  subscribeWithSelector((set) => ({
    blocksCount: 8,
    blocksSeed: 0,

    forward: false,
    backward: false,
    leftward: false,
    rightward: false,
    jump: false,
    setForward: (forward) => set({ forward }),
    setBackward: (backward) => set({ backward }),
    setLeftward: (leftward) => set({ leftward }),
    setRightward: (rightward) => set({ rightward }),
    setJump: (jump) => set({ jump }),

    setBlocksCount: (count) => set({ blocksCount: count }),

    /**
     * Time
     */
    startTime: 0,
    endTime: 0,

    /**
     * Phases
     */
    phase: "ready",
    start: () => {
      set((state) => {
        if (state.phase === "ready")
          return { phase: "playing", startTime: Date.now() };
        return {};
      });
    },
    restart: () => {
      set((state) => {
        if (state.phase === "playing" || state.phase === "ended")
          return {
            phase: "ready",
            blocksSeed: Math.random(),
            // blocksCount: Math.floor(Math.random() * 10),
          };

        return {};
      });
    },

    end: () => {
      set((state) => {
        if (state.phase === "playing")
          return { phase: "ended", endTime: Date.now() };

        return {};
      });
    },
  }))
);

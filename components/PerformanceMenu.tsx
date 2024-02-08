import { Perf } from "r3f-perf";
import { useWindowSize } from "../hooks/useWindowSize";

export default function PerformanceMenu() {
  const { width } = useWindowSize();

  if (width < 768) return null;

  return <Perf position="bottom-left" />;
}

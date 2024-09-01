import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { range } from "lodash";
import { BsTriangleFill } from "react-icons/bs";

type Props = {
  speed: number;
  direction: number;
};

export default function Wind({ speed, direction }: Props) {
  const ref = useRef<SVGSVGElement>(null);

  const size = 120;
  const margins = 20;

  useEffect(() => {
    if (ref.current) {
      const svg = d3.select(ref.current);

      const arc = d3.arc().cornerRadius(12)({
        innerRadius: size / 2 - size / 20,
        outerRadius: size / 2,
        startAngle: -Math.PI / 8,
        endAngle: Math.PI / 8,
        padAngle: 0.07,
      });

      for (const angle of range(0, 360, 45))
        svg
          .append("path")
          .attr("transform", `translate(${size / 2}, ${size / 2}), rotate(${angle})`)
          .attr("d", arc);
    }
  }, [ref.current]);

  return (
    <div style={{ width: size + 2 * margins, height: size + 2 * margins, padding: margins }} className="relative">
      <svg ref={ref} width={size} height={size} fill="#0ea5e9" className="absolute" />
      <div
        style={{ width: size, height: size, transform: `rotate(${direction}deg)` }}
        className="absolute flex flex-col items-center transition duration-500 ease-in-out"
      >
        <BsTriangleFill style={{ width: size / 10, marginTop: size / 20 }} className="text-cyan-200" />
      </div>
      <div
        style={{ width: size + 2 * margins, height: size + 2 * margins, margin: -margins }}
        className="absolute grid grid-cols-3 grid-rows-3 text-xs"
      >
        <span className="flex items-center justify-center">NO</span>
        <span className="flex items-start justify-center">N</span>
        <span className="flex items-center justify-center">NE</span>
        <span className="flex items-center justify-start">O</span>
        <span />
        <span className="flex items-center justify-end">E</span>
        <span className="flex items-center justify-center">SO</span>
        <span className="flex items-end justify-center">S</span>
        <span className="flex items-center justify-center">SE</span>
      </div>
      <div className="flex h-full w-full flex-col items-center justify-center">
        <span className="text-base font-semibold">{speed} km/h</span>
      </div>
    </div>
  );
}

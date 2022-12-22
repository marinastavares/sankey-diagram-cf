import React, { useState, useRef } from "react";
import { useTooltip, Tooltip } from "@vx/tooltip";
import { localPoint } from "@vx/event";

import useSankeyChart from "./useSankeyChart";
import Link from "./Link";
import Rect from "./Rect";

const INITIAL_SIZE = {
  width: 600,
  height: 600,
};

type SankeyProps = {
  data: [string, string, string | number][];
  size: {
    width: number;
    height: number;
  };
};

const Sankey: React.FC<SankeyProps> = ({ data, size = INITIAL_SIZE }) => {
  const svgRef = useRef(null);
  const [sankey, label] = useSankeyChart({ data, size });
  const [highlightLinks, setLinks] = useState<number[]>([]);
  const [highlightReacts, setRects] = useState<number[]>([]);
  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip,
  } = useTooltip();

  if (!sankey) {
    return <div>Loading</div>;
  }

  const handleMouseOver = (event, datum) => {
    const coords = localPoint(event.target.ownerSVGElement, event);
    showTooltip({
      tooltipLeft: coords?.x,
      tooltipTop: coords?.y,
      tooltipData: datum,
    });
  };

  const { links, nodes } = sankey;
  return (
    <div
      style={{
        position: "absolute",
      }}
    >
      <svg width={size.width} height={size.height} ref={svgRef}>
        <g>
          {links.map((link) => (
            <Link
              key={link.index}
              data={link}
              onMouseOver={handleMouseOver}
              onMouseOut={hideTooltip}
              isHighlighted={highlightLinks?.includes(link?.index)}
              setRects={setRects}
            />
          ))}
        </g>
        <g>
          {nodes.map((node) => (
            <Rect
              {...node}
              key={node.x0 + node.y1}
              size={size}
              setLinks={setLinks}
              setRects={setRects}
              isHighlighted={highlightReacts?.includes(node?.index)}
            />
          ))}
        </g>
      </svg>
      {tooltipOpen && (
        <Tooltip
          // set this to random so it correctly updates with parent bounds
          key={Math.random()}
          top={tooltipTop}
          left={tooltipLeft}
        >
          {label[0]}: <strong>{tooltipData?.[0]}</strong> <br />
          {label[1]}: <strong>{tooltipData?.[1]}</strong> <br />
          {label[2]}: <strong>{tooltipData?.[2]}</strong> <br />
        </Tooltip>
      )}
    </div>
  );
};

export default Sankey;

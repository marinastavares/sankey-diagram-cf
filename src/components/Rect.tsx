import React, { useState } from "react";

type RectProps = {
  index: number;
  x0: number;
  x1: number;
  y0: number;
  y1: number;
  name: string;
  size: {
    height: number;
    width: number;
  };
  setLinks: React.Dispatch<React.SetStateAction<number[]>>;
  setRects: React.Dispatch<React.SetStateAction<number[]>>;
  isHighlighted: boolean;
  sourceLinks: SourceTargetLinksProps[];
  targetLinks: SourceTargetLinksProps[];
};

const Rect = ({
  index,
  x0,
  x1,
  y0,
  y1,
  name,
  size,
  setLinks,
  sourceLinks,
  targetLinks,
  isHighlighted,
  setRects,
}: RectProps) => {
  const [opacity, setOpacity] = useState(false);
  const highlight = isHighlighted || opacity;
  const handleMouseOver = (event) => {
    setOpacity(true);
    setRects([
      ...sourceLinks?.map(({ source }) => source.index),
      ...sourceLinks?.map(({ target }) => target.index),
      ...targetLinks?.map(({ source }) => source.index),
      ...targetLinks?.map(({ target }) => target.index),
    ]);
    setLinks([
      ...sourceLinks?.map(({ index }) => index),
      ...targetLinks?.map(({ index }) => index),
    ]);
  };
  const handleMouseOut = (event) => {
    setOpacity(false);
    setLinks([]);
    setRects([]);
  };

  return (
    <>
      <rect
        x={x0}
        y={y0}
        width={x1 - x0}
        height={y1 - y0}
        fill="#F6821F"
        data-index={index}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      />
      <text
        x={x0 < size.width / 2 ? x1 + 6 : x0 - 6}
        y={(y1 + y0) / 2}
        style={{
          fill: highlight ? "black" : "#404242",
          alignmentBaseline: "middle",
          fontSize: 10,
          fontWeight: highlight ? "bold" : "normal",
          textAnchor: x0 < size.width / 2 ? "start" : "end",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {name}
      </text>
    </>
  );
};

export default Rect;

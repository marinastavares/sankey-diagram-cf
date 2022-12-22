import React, { useState } from "react";
import * as d3 from "d3-sankey";

type LinkProps = {
  data: LinkTargetProps;
  onMouseOver: (event: any, value: [string, string, number]) => void;
  onMouseOut: () => void;
  isHighlighted?: boolean;
  setRects: React.Dispatch<React.SetStateAction<number[]>>;
};

const Link: React.FC<LinkProps> = ({
  data,
  onMouseOver,
  onMouseOut,
  isHighlighted,
  setRects,
}) => {
  const { width, index, source, target, value } = data;
  const [opacity, setOpacity] = useState(false);
  const valueOpacity = opacity || isHighlighted ? 1 : 0.5;
  const link = d3.sankeyLinkHorizontal();

  const handleMouseOver = (event) => {
    onMouseOver(event, [source?.name, target?.name, Number(value)]);
    setRects([source?.index, target?.index]);
    setOpacity(true);
  };
  const handleMouseOut = (event) => {
    onMouseOut();
    setOpacity(false);
    setRects([]);
  };

  return (
    <>
      <defs>
        <linearGradient
          id={`gradient-${index}`}
          gradientUnits="userSpaceOnUse"
          x1={source.x1}
          x2={target.x0}
        >
          <stop offset="0" stopColor="#999999" stopOpacity={valueOpacity} />
          <stop offset="100%" stopColor="#999999" stopOpacity={valueOpacity} />
        </linearGradient>
      </defs>
      <path
        d={link(data)}
        fill={"none"}
        stroke={`url(#gradient-${index})`}
        strokeOpacity={0.5}
        strokeWidth={width}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      />
    </>
  );
};

export default Link;

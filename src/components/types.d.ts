type SourceTargetLinksProps = {
  index: number;
  y0: number;
  y1: number;
  value: number;
  weight: number;
  source: SourceTargetProps;
  target: SourceTargetProps;
};

type SourceTargetProps = {
  index: number;
  x0?: number;
  x1?: number;
  y0?: number;
  y1?: number;
  name: string;
  depth?: number;
  height: number;
  sourceLinks: SourceTargetLinksProps[];
  targetLinks: SourceTargetLinksProps[];
};
type LinkTargetProps = {
  index: number;
  x0?: number;
  x1?: number;
  y0?: number;
  y1?: number;
  name: string;
  depth?: number;
  height: number;
  width: number;
  source: SourceTargetProps;
  target: SourceTargetProps;
  value: number;
};

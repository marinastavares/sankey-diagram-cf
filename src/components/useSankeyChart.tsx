import { useEffect, useState } from "react";
import * as d3 from "d3-sankey";

type Props = {
  data: [string, string, number | string][];
  size: {
    width: number;
    height: number;
  };
};

type PartialSankeyData = {
  nodes: string[] | [];
  links:
    | {
        source: number | string;
        target: number | string;
        value: number | string;
      }[]
    | [];
  label: [string, string, string] | [];
};

type SankeyData = {
  nodes: { name: string }[] | [];
  links:
    | {
        source: number | string;
        target: number | string;
        value: number | string;
      }[]
    | [];
  label: [string, string, string] | [];
};
const INITIAL_STATE: PartialSankeyData = { nodes: [], links: [], label: [] };

const transformIntoSankeyData = (data) => {
  const sankey = { ...INITIAL_STATE };
  data?.map(
    ([source, target, value]: [string, string, string | number], index) => {
      if (index === 0) {
        sankey.label = [
          source,
          target,
          value?.toString(),
        ] as SankeyData["label"];
        return null;
      }
      sankey.nodes = [...sankey?.nodes, source, target];
      const linkItem = {
        source,
        target,
        value: +value,
      };

      sankey.links = [...(sankey?.links || []), linkItem];
    }
  );
  sankey.nodes = [...new Set(sankey.nodes)];

  [...sankey.links].map((item, index) => {
    sankey.links[index].source = sankey.nodes.findIndex(
      (value) => value === sankey.links[index].source
    );
    sankey.links[index].target = sankey.nodes.findIndex(
      (value) => value === sankey.links[index].target
    );
  });

  return {
    ...sankey,
    nodes: sankey.nodes?.map((name) => ({
      name,
    })),
  } as SankeyData;
};

const useSankeyChart = ({ data, size }: Props) => {
  const [sankeyData, setSankeyData] = useState<any>(undefined);
  const [label, setLabel] = useState<[string, string, string] | undefined>(
    undefined
  );

  useEffect(() => {
    if (sankeyData === undefined && !!data?.[1]?.[0]?.length) {
      const {
        nodes,
        links,
        label: sankeyLabel,
      } = transformIntoSankeyData(data);
      const sankey = d3
        .sankey()
        .nodeAlign(d3.sankeyJustify)
        .nodeWidth(10)
        .nodePadding(10)
        .extent([
          [0, 0],
          [size.width, size.height],
        ]);
      setSankeyData(sankey({ nodes, links }));
      setLabel(sankeyLabel as [string, string, string]);
    }
  }, [sankeyData, data, size.width, size.height]);

  return [sankeyData, label];
};

export default useSankeyChart;

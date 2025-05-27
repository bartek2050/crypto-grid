import { treemap, hierarchy } from "d3-hierarchy";
import { useMemo } from "react";
import { useCrypto } from "../context/CryptoDataContext.tsx";

export const Treemap = () => {
  const { topCoinsData, globalData } = useCrypto();


  const width = 1100;
  const height = 700;

  const treeHierarchy = useMemo(() => {
    return hierarchy({ children: topCoinsData }).sum((d) => d.market_cap);
  }, [topCoinsData]);

  const cryptomapLayout = useMemo(() => {
    const treeGenerator = treemap().size([width, height]).padding(0).paddingInner(2);
    return treeGenerator(treeHierarchy);
  }, [treeHierarchy]);


  const allShapes = cryptomapLayout.leaves().map((leaf, i) => {
    return (
      <g key={leaf.id}>
        <title>{leaf.data.name} - {leaf.data.change}%</title>
        <rect
          x={leaf.x0}
          y={leaf.y0}
          width={leaf.x1 - leaf.x0}
          height={leaf.y1 - leaf.y0}
          fill={leaf.data.change >= 0 ? "green" : "red"}
          stroke="transparent"
        />
        <text
          x={leaf.x0 + 3}
          y={leaf.y0 + 3}
          fontSize={12}
          textAnchor="start"
          alignmentBaseline="hanging"
          fill="white"
          className="font-bold"
        >
          {leaf.data.name}
        </text>
        <text
          x={leaf.x0 + 3}
          y={leaf.y0 + 18}
          fontSize={12}
          textAnchor="start"
          alignmentBaseline="hanging"
          fill="white"
          className="font-light"
        >
          {leaf.data.marketCap}
        </text>
      </g>
    );
  });

  return (
    <div>
      <svg width={width} height={height}>
        {allShapes}
      </svg>
    </div>
  );
};
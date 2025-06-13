import { treemap, hierarchy, HierarchyNode } from "d3-hierarchy";
import { useMemo } from "react";
import { useCrypto } from "../context/CryptoDataContext.tsx";
import { TopCoinsDataList, TopCoinsDataType } from "../types/types.ts";

export const Treemap = () => {
  const { globalData, topCoinsData } = useCrypto();

  const priceChangeColor = (priceChange: number) => {
    if (priceChange > 0) {
      return "#31B855";
    } else if (priceChange < 0) {
      return "#F53538";
    } else {
      return "#414554";
    }
  };

  const width = 1100;
  const height = 800;

  const treeHierarchy = useMemo(() => {
    return hierarchy<TopCoinsDataType | { children: TopCoinsDataList }>({ children: topCoinsData })
      .sum((d) => (d as TopCoinsDataType).market_cap || 0);
  }, [topCoinsData]);

  const cryptomapLayout = useMemo(() => {
    const treeGenerator = treemap().size([width, height]).padding(0).paddingInner(2);
    return treeGenerator(treeHierarchy as HierarchyNode<unknown>);
  }, [treeHierarchy]);


  const allShapes = cryptomapLayout.leaves().map((leaf) => {
    const data = leaf.data as TopCoinsDataType;
    return (
      <g key={leaf.id}>
        <title>{data.name}{data.price_change_percentage_24h?.toFixed(2)}%</title>
        <rect
          x={leaf.x0}
          y={leaf.y0}
          width={leaf.x1 - leaf.x0}
          height={leaf.y1 - leaf.y0}
          fill={priceChangeColor(+data.price_change_percentage_24h?.toFixed(2) || 0)}
          stroke="transparent"
        />
        <text
          x={leaf.x0 + 3}
          y={leaf.y0 + 3}
          fontSize={12}
          textAnchor="start"
          alignmentBaseline="hanging"
          fill="white"
        >
          {data.name} {data.price_change_percentage_24h?.toFixed(2)}%
        </text>
        <text
          x={leaf.x0 + 3}
          y={leaf.y0 + 18}
          fontSize={12}
          textAnchor="start"
          alignmentBaseline="hanging"
          fill="white"
        >
          ({globalData?.total_market_cap.usd && ((data.market_cap / Number(globalData.total_market_cap.usd || 1)) * 100).toFixed(2)}%)
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
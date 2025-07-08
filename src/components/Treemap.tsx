import { treemap, hierarchy, HierarchyNode } from "d3-hierarchy";
import { useMemo } from "react";
import { useCrypto } from "../context/CryptoDataContext.tsx";
import { TopCoinsDataList, TopCoinsDataType } from "../types/types.ts";
import { getPriceChangeColor } from "../helper/getPriceChangeColor.ts";

export const Treemap = () => {
  const { globalData, topCoinsData } = useCrypto();

  const width = 1250;
  const height = 900;

  const treeHierarchy = useMemo(() => {
    return hierarchy<TopCoinsDataType | { children: TopCoinsDataList }>({ children: topCoinsData })
      .sum((d) => (d as TopCoinsDataType).market_cap || 0);
  }, [topCoinsData]);

  const cryptomapLayout = useMemo(() => {
    const treeGenerator = treemap().size([width, height]).padding(0).paddingInner(2);
    return treeGenerator(treeHierarchy as HierarchyNode<unknown>);
  }, [treeHierarchy]);


  const allShapes = cryptomapLayout.leaves().map((leaf, index) => {
    const data = leaf.data as TopCoinsDataType;
    const clipPathId = `clip-${data.name}`;
    const leafWidth = leaf.x1 - leaf.x0;
    const marketCap = globalData?.total_market_cap.usd && ((data.market_cap / Number(globalData.total_market_cap.usd || 1)) * 100).toFixed(2);

    let fontSize = 14;

    if (leafWidth < 100) {
      fontSize = 8;
    } else if (leafWidth < 60) {
      fontSize = 6;
    }

    return (
      <g key={`${data.id}-${index}`} className={data.name}>
        <defs>
          <clipPath id={clipPathId}>
            <rect x={leaf.x0} y={leaf.y0} width={leaf.x1 - leaf.x0} height={leaf.y1 - leaf.y0} fill="none" />
          </clipPath>
        </defs>
        <title>{data.name} - {marketCap}%</title>
        <rect
          x={leaf.x0}
          y={leaf.y0}
          width={leaf.x1 - leaf.x0}
          height={leaf.y1 - leaf.y0}
          fill={getPriceChangeColor(+data.price_change_percentage_24h?.toFixed(2) || 0)}
          stroke="transparent"

        />
        <text
          x={leaf.x0 + 3}
          y={leaf.y0 + 3}
          fontSize={fontSize}
          textAnchor="start"
          dominantBaseline="text-before-edge"
          fill="white"
          clipPath={`url(#${clipPathId})`}
          className="coin-name"
        >
          {data.symbol}
        </text>
        <text
          x={leaf.x0 + 3}
          y={leaf.y0 + 16}
          fontSize={fontSize}
          textLength={(leaf.x1 - leaf.x0) < 40 ? 25 : undefined}
          textAnchor="start"
          dominantBaseline="text-before-edge"
          fill="white"
          clipPath={`url(#${clipPathId})`}
          className="coin-capitalization"
        >
          {marketCap}%
        </text>
        <text
          x={(leaf.x1 - leaf.x0) < 40 ? leaf.x0 + 1 : leaf.x0 + 3}
          y={leaf.y0 + 29}
          fontSize={fontSize - 2}
          textLength={(leaf.x1 - leaf.x0) < 40 ? 25 : undefined}
          textAnchor="start"
          dominantBaseline="text-before-edge"
          fill="white"
          clipPath={`url(#${clipPathId})`}
          className="coin-capitalization"
        >
          ({data.price_change_percentage_24h?.toFixed(2)}%)
        </text>
      </g>
    );
  });

  return (
    <div className="treemap-wrapper">
      <svg width={width} height={height}>
        {allShapes}
      </svg>
    </div>
  );
};
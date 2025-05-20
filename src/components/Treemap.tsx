import { treemap, hierarchy } from "d3-hierarchy";
import { useMemo } from "react";

export const Treemap = () => {
  const cryptoData = [
    { name: "BTC", marketCap: 1000, change: 3.37 },
    { name: "ETH", marketCap: 500, change: 2.91 },
    { name: "BNB", marketCap: 200, change: 1.24 },
    { name: "SOL", marketCap: 150, change: 3.78 },
    { name: "ADA", marketCap: 100, change: -0.5 },
    { name: "XRP", marketCap: 120, change: 1.28 },
    { name: "USDT", marketCap: 100, change: 0.02 },
    { name: "DOT", marketCap: 80, change: 0.5 }
  ];

  const width = 700;
  const height = 600;

  const treeHierarchy = useMemo(() => {
    return hierarchy({ children: cryptoData }).sum((d) => d.marketCap);
  }, [cryptoData]);

  const cryptomapLayout = useMemo(() => {
    const treeGenerator = treemap().size([width, height]).padding(4);
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
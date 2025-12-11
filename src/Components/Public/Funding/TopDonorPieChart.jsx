import { PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = ["#DE2A8A", "#06B6D4", "#10B981", "#F59E0B", "#4F46E5"];
const RADIAN = Math.PI / 180;

// Custom label inside Pie slices
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  totalAmount,
}) => {
  if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
    return null;
  }
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const ncx = Number(cx);
  const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const ncy = Number(cy);
  const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > ncx ? "start" : "end"}
      dominantBaseline="central"
    >
      {totalAmount}
    </text>
  );
};
const TopDonorPieChart = ({ topFunder }) => {
  return (
    <div className="max-w-xl mx-auto">
      <PieChart
        style={{
          width: "100%",
          maxWidth: "500px",
          maxHeight: "80vh",
          aspectRatio: 1,
        }}
        responsive
      >
        <Pie
          data={topFunder}
          labelLine={false}
          label={renderCustomizedLabel}
          fill="#8884d8"
          dataKey="totalAmount"
        >
          {topFunder.map((entry, index) => (
            <Cell
              key={`cell-${entry.name}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip
          formatter={(totalAmount, name, props) => [
            `${totalAmount} BDT`,
            props.payload.name,
          ]}
          contentStyle={{
            backgroundColor: "white",
            borderRadius: "8px",
            border: "none",
            padding: "8px 10px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        />
      </PieChart>
    </div>
  );
};

export default TopDonorPieChart;

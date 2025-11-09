interface PieChartProps {
  data: { name: string; value: number; color: string }[];
  className?: string;
}

export const PieChart = ({ data, className }: PieChartProps) => {
  const total = data.reduce((acc, d) => acc + d.value, 0);
  let cumulative = 0;

  return (
    <div className={`w-full h-full flex items-center justify-center ${className}`}>
      <svg width="100%" height="100%" viewBox="0 0 100 100">
        {data.map((d, i) => {
          const percentage = (d.value / total) * 100;
          const startAngle = (cumulative / total) * 360;
          const endAngle = ((cumulative + d.value) / total) * 360;
          cumulative += d.value;

          const startX = 50 + 50 * Math.cos((startAngle - 90) * Math.PI / 180);
          const startY = 50 + 50 * Math.sin((startAngle - 90) * Math.PI / 180);
          const endX = 50 + 50 * Math.cos((endAngle - 90) * Math.PI / 180);
          const endY = 50 + 50 * Math.sin((endAngle - 90) * Math.PI / 180);
          const largeArcFlag = percentage > 50 ? 1 : 0;

          return (
            <path
              key={i}
              d={`M 50 50 L ${startX} ${startY} A 50 50 0 ${largeArcFlag} 1 ${endX} ${endY} Z`}
              fill={d.color}
            />
          );
        })}
      </svg>
    </div>
  );
};

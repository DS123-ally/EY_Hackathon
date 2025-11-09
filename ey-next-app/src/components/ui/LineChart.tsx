interface LineChartProps {
  data: { name: string; value: number }[];
  className?: string;
}

export const LineChart = ({ data, className }: LineChartProps) => {
  const maxValue = Math.max(...data.map(d => d.value));
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - (d.value / maxValue) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className={`w-full h-64 ${className}`}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline
          fill="none"
          stroke="rgba(139, 92, 246, 0.5)"
          strokeWidth="2"
          points={points}
        />
      </svg>
    </div>
  );
};

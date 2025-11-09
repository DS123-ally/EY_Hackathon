interface BarChartProps {
  data: { name: string; value: number }[];
  className?: string;
}

export const BarChart = ({ data, className }: BarChartProps) => {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className={`w-full h-full flex items-end gap-4 ${className}`}>
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-2">
          <div
            className="w-full bg-purple-600/50"
            style={{ height: `${(d.value / maxValue) * 100}%` }}
          ></div>
          <span className="text-xs text-white/70">{d.name}</span>
        </div>
      ))}
    </div>
  );
};

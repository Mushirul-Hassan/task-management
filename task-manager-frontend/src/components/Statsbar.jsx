import { Card, CardContent } from "./ui/card";

const StatsBar = ({ stats }) => {
  const items = [
    { label: "Total", value: stats.total },
    { label: "Pending", value: stats.pending },
    { label: "Completed", value: stats.completed },
  ];
  return (
    <div className="grid grid-cols-3 gap-4">
      {items.map((item) => (
        <Card key={item.label}>
          <CardContent className="pt-4">
            <p className="text-sm text-gray-500">{item.label}</p>
            <p className="text-2xl font-semibold">{item.value ?? 0}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsBar;

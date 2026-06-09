import { Card, CardContent } from "./ui/card";

const StatsBar = ({ stats }) => {
  const items = [
    { label: "Total", value: stats.total },
    { label: "Pending", value: stats.pending },
    { label: "Completed", value: stats.completed },
  ];
}
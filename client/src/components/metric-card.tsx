import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface MetricItem {
  label: string;
  value: string | number;
}

interface MetricCardProps {
  title: string;
  icon: LucideIcon;
  status?: "success" | "warning" | "error";
  statusLabel?: string;
  metrics: MetricItem[];
}

export function MetricCard({ title, icon: Icon, status, statusLabel, metrics }: MetricCardProps) {
  const getStatusClasses = (status?: "success" | "warning" | "error") => {
    switch (status) {
      case "success":
        return "bg-success text-success-foreground";
      case "warning":
        return "bg-warning text-warning-foreground";
      case "error":
        return "bg-destructive text-destructive-foreground";
      default:
        return "";
    }
  };

  return (
    <Card data-testid={`card-metric-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardHeader className="flex flex-row items-center justify-between gap-4 pb-3">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-base font-medium">{title}</CardTitle>
        </div>
        {status && statusLabel && (
          <Badge className={getStatusClasses(status)} variant="secondary">
            {statusLabel}
          </Badge>
        )}
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {metrics.map((metric, index) => (
            <li 
              key={index} 
              className="flex items-center justify-between text-sm"
              data-testid={`metric-item-${metric.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <span className="text-muted-foreground">{metric.label}</span>
              <span className="font-medium font-mono">{metric.value}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

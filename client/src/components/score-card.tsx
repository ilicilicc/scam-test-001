import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";

interface ScoreCardProps {
  score: number;
  title: string;
  subtitle?: string;
}

export function ScoreCard({ score, title, subtitle }: ScoreCardProps) {
  const getScoreLevel = (score: number) => {
    if (score >= 80) return { label: "SOUND", variant: "success" as const, icon: CheckCircle };
    if (score >= 60) return { label: "PROMISING", variant: "warning" as const, icon: AlertTriangle };
    return { label: "NEEDS WORK", variant: "destructive" as const, icon: XCircle };
  };

  const { label, variant, icon: Icon } = getScoreLevel(score);

  const getBadgeClasses = (variant: "success" | "warning" | "destructive") => {
    switch (variant) {
      case "success":
        return "bg-success text-success-foreground";
      case "warning":
        return "bg-warning text-warning-foreground";
      case "destructive":
        return "bg-destructive text-destructive-foreground";
    }
  };

  const getScoreClasses = (variant: "success" | "warning" | "destructive") => {
    switch (variant) {
      case "success":
        return "text-success";
      case "warning":
        return "text-warning";
      case "destructive":
        return "text-destructive";
    }
  };

  const getProgressClasses = (variant: "success" | "warning" | "destructive") => {
    switch (variant) {
      case "success":
        return "[&>div]:bg-success";
      case "warning":
        return "[&>div]:bg-warning";
      case "destructive":
        return "[&>div]:bg-destructive";
    }
  };

  return (
    <Card data-testid="card-score">
      <CardHeader className="flex flex-row items-center justify-between gap-4 pb-2">
        <div className="flex flex-col gap-1">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        <Badge className={getBadgeClasses(variant)}>
          <Icon className="mr-1 h-3 w-3" />
          {label}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2 mb-4">
          <span className={`text-6xl font-bold tracking-tight ${getScoreClasses(variant)}`} data-testid="text-score-value">
            {score}
          </span>
          <span className="text-2xl text-muted-foreground">/100</span>
        </div>
        <Progress 
          value={score} 
          className={`h-2 ${getProgressClasses(variant)}`}
          data-testid="progress-score"
        />
      </CardContent>
    </Card>
  );
}

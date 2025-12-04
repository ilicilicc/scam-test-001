import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Info, AlertTriangle, XCircle, Lightbulb } from "lucide-react";
import type { Recommendation } from "@shared/schema";

interface RecommendationsCardProps {
  recommendations: Recommendation[];
}

export function RecommendationsCard({ recommendations }: RecommendationsCardProps) {
  const getIcon = (type: Recommendation["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-success shrink-0" />;
      case "info":
        return <Info className="h-5 w-5 text-primary shrink-0" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-warning shrink-0" />;
      case "error":
        return <XCircle className="h-5 w-5 text-destructive shrink-0" />;
    }
  };

  const getBgClasses = (type: Recommendation["type"]) => {
    switch (type) {
      case "success":
        return "bg-success/5 border-success/20";
      case "info":
        return "bg-primary/5 border-primary/20";
      case "warning":
        return "bg-warning/5 border-warning/20";
      case "error":
        return "bg-destructive/5 border-destructive/20";
    }
  };

  return (
    <Card data-testid="card-recommendations">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-muted-foreground" />
          Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recommendations.map((rec, index) => (
            <div 
              key={index}
              className={`flex items-start gap-3 p-4 rounded-lg border ${getBgClasses(rec.type)}`}
              data-testid={`recommendation-${index}`}
            >
              {getIcon(rec.type)}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm">{rec.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{rec.message}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

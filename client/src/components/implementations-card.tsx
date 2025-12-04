import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Cpu } from "lucide-react";

interface ImplementationsCardProps {
  implementations: Record<string, boolean>;
}

export function ImplementationsCard({ implementations }: ImplementationsCardProps) {
  const entries = Object.entries(implementations);
  const implementedCount = entries.filter(([, value]) => value).length;

  return (
    <Card data-testid="card-implementations">
      <CardHeader className="flex flex-row items-center justify-between gap-4 pb-3">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Cpu className="h-5 w-5 text-muted-foreground" />
          Feature Implementations
        </CardTitle>
        <Badge variant="outline" className="font-mono text-xs">
          {implementedCount}/{entries.length} Implemented
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2 sm:grid-cols-2">
          {entries.map(([feature, implemented]) => (
            <div 
              key={feature}
              className="flex items-center gap-2 text-sm py-1"
              data-testid={`feature-${feature.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {implemented ? (
                <CheckCircle className="h-4 w-4 text-success shrink-0" />
              ) : (
                <XCircle className="h-4 w-4 text-destructive shrink-0" />
              )}
              <span className={implemented ? "" : "text-muted-foreground"}>
                {feature}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

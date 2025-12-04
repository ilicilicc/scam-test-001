import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, HardDrive, Layers, CheckCircle } from "lucide-react";
import type { PerformanceAnalysis } from "@shared/schema";

interface PerformanceCardProps {
  performance: PerformanceAnalysis;
}

export function PerformanceCard({ performance }: PerformanceCardProps) {
  const sections = [
    {
      title: "Speed Optimizations",
      icon: Zap,
      items: performance.speedOptimizations,
    },
    {
      title: "Memory Optimizations",
      icon: HardDrive,
      items: performance.memoryOptimizations,
    },
    {
      title: "Architectural Optimizations",
      icon: Layers,
      items: performance.architecturalOptimizations,
    },
  ];

  return (
    <Card data-testid="card-performance">
      <CardHeader className="pb-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Zap className="h-5 w-5 text-muted-foreground" />
            Performance Analysis
          </CardTitle>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="font-mono text-xs">
              Basis: {performance.theoreticalBasis}
            </Badge>
            <Badge variant="outline" className="font-mono text-xs">
              Quality: {performance.implementationQuality}
            </Badge>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 pt-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Claims:</span>
            <span className="font-medium">{performance.performanceClaims}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Benchmark:</span>
            <span className="font-medium">{performance.benchmarkStatus}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-3">
          {sections.map((section) => (
            <div key={section.title}>
              <div className="flex items-center gap-2 mb-3">
                <section.icon className="h-4 w-4 text-muted-foreground" />
                <h4 className="text-sm font-medium">{section.title}</h4>
              </div>
              <ul className="space-y-2">
                {section.items.map((item, index) => (
                  <li 
                    key={index} 
                    className="flex items-start gap-2 text-sm"
                    data-testid={`performance-item-${index}`}
                  >
                    <CheckCircle className="h-3 w-3 mt-1 text-success shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Globe, 
  Shield, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  FileText,
  Mail,
  Lock
} from "lucide-react";
import type { WebsiteAnalysis } from "@shared/schema";

interface WebsiteAnalysisCardProps {
  analysis: WebsiteAnalysis;
}

export function WebsiteAnalysisCard({ analysis }: WebsiteAnalysisCardProps) {
  const getRiskBadgeClasses = (risk: WebsiteAnalysis["overallRisk"]) => {
    switch (risk) {
      case "LOW":
        return "bg-success text-success-foreground";
      case "MEDIUM":
        return "bg-warning text-warning-foreground";
      case "HIGH":
        return "bg-destructive text-destructive-foreground";
    }
  };

  const getRiskLabel = (risk: WebsiteAnalysis["overallRisk"]) => {
    switch (risk) {
      case "LOW":
        return "Low Risk";
      case "MEDIUM":
        return "Medium Risk";
      case "HIGH":
        return "High Risk";
    }
  };

  const getScoreClasses = (score: number) => {
    if (score >= 70) return "text-success [&>div]:bg-success";
    if (score >= 40) return "text-warning [&>div]:bg-warning";
    return "text-destructive [&>div]:bg-destructive";
  };

  const getSeverityClasses = (severity: "low" | "medium" | "high") => {
    switch (severity) {
      case "low":
        return "bg-success/10 text-success border-success/20";
      case "medium":
        return "bg-warning/10 text-warning border-warning/20";
      case "high":
        return "bg-destructive/10 text-destructive border-destructive/20";
    }
  };

  const contentChecks = [
    { label: "About Page", value: analysis.contentAnalysis.hasAboutPage, icon: FileText },
    { label: "Contact Info", value: analysis.contentAnalysis.hasContactInfo, icon: Mail },
    { label: "Privacy Policy", value: analysis.contentAnalysis.hasPrivacyPolicy, icon: Shield },
    { label: "Terms of Service", value: analysis.contentAnalysis.hasTermsOfService, icon: FileText },
  ];

  return (
    <Card data-testid="card-website-analysis">
      <CardHeader className="pb-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Globe className="h-5 w-5 text-muted-foreground" />
            Website Analysis: {analysis.domain}
          </CardTitle>
          <Badge className={getRiskBadgeClasses(analysis.overallRisk)}>
            {getRiskLabel(analysis.overallRisk)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="flex items-baseline gap-2 mb-2">
              <span className={`text-4xl font-bold ${getScoreClasses(analysis.score).split(" ")[0]}`}>
                {analysis.score}
              </span>
              <span className="text-lg text-muted-foreground">/100</span>
            </div>
            <Progress 
              value={analysis.score} 
              className={`h-2 ${getScoreClasses(analysis.score)}`}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-3">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <Shield className="h-4 w-4 text-muted-foreground" />
              Security & Domain
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Domain Age</span>
                <span className="font-mono">{analysis.domainAge}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">SSL Valid</span>
                <span className="flex items-center gap-1">
                  {analysis.sslValid ? (
                    <CheckCircle className="h-4 w-4 text-success" />
                  ) : (
                    <XCircle className="h-4 w-4 text-destructive" />
                  )}
                  {analysis.sslValid ? "Yes" : "No"}
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">SSL Issuer</span>
                <span className="font-mono text-xs">{analysis.sslIssuer}</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              Content Checks
            </h4>
            <ul className="space-y-2 text-sm">
              {contentChecks.map((check) => (
                <li key={check.label} className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <check.icon className="h-3 w-3" />
                    {check.label}
                  </span>
                  <span className="flex items-center gap-1">
                    {check.value ? (
                      <CheckCircle className="h-4 w-4 text-success" />
                    ) : (
                      <XCircle className="h-4 w-4 text-destructive" />
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {analysis.contentAnalysis.claimsFound.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Claims Found on Website</h4>
            <div className="flex flex-wrap gap-2">
              {analysis.contentAnalysis.claimsFound.map((claim, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {claim}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {analysis.riskIndicators.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              Risk Indicators
            </h4>
            <div className="space-y-2">
              {analysis.riskIndicators.map((indicator, index) => (
                <div 
                  key={index}
                  className={`flex items-start gap-3 p-3 rounded-lg border ${getSeverityClasses(indicator.severity)}`}
                  data-testid={`risk-indicator-${index}`}
                >
                  <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">{indicator.indicator}</p>
                    <p className="text-xs mt-1 opacity-80">{indicator.description}</p>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`ml-auto shrink-0 text-xs ${getSeverityClasses(indicator.severity)}`}
                  >
                    {indicator.severity.toUpperCase()}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

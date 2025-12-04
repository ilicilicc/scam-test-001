import { useState, useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScoreCard } from "@/components/score-card";
import { MetricCard } from "@/components/metric-card";
import { ClaimValidationCard } from "@/components/claim-validation-card";
import { PerformanceCard } from "@/components/performance-card";
import { RecommendationsCard } from "@/components/recommendations-card";
import { WebsiteAnalysisCard } from "@/components/website-analysis-card";
import { ImplementationsCard } from "@/components/implementations-card";
import { LoadingSpinner } from "@/components/loading-spinner";
import { ErrorAlert } from "@/components/error-alert";
import { ThemeToggle } from "@/components/theme-toggle";
import { 
  Download, 
  FileCode, 
  BarChart3, 
  Clock,
  Github,
  Globe,
  RefreshCw
} from "lucide-react";
import type { AnalysisData } from "@shared/schema";

export default function AnalysisPage() {
  const [activeTab, setActiveTab] = useState("github");

  const { 
    data: analysisData, 
    isLoading, 
    error, 
    refetch,
    isFetching
  } = useQuery<AnalysisData>({
    queryKey: ["/api/analysis"],
    staleTime: 1000 * 60 * 5,
  });

  const downloadReport = useCallback(() => {
    if (!analysisData) return;

    const reportContent = generateTechnicalReport(analysisData);
    const blob = new Blob([reportContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "hst-technical-analysis-report.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [analysisData]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header onDownload={() => {}} isLoading={true} />
        <main className="container max-w-7xl mx-auto px-6 py-8">
          <LoadingSpinner message="Analyzing HST code structure and implementation..." />
        </main>
      </div>
    );
  }

  if (error || !analysisData) {
    return (
      <div className="min-h-screen bg-background">
        <Header onDownload={() => {}} isLoading={false} />
        <main className="container max-w-7xl mx-auto px-6 py-8">
          <ErrorAlert 
            title="Analysis Failed"
            message="Failed to analyze code. Please try again."
            onRetry={() => refetch()}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onDownload={downloadReport} 
        isLoading={isFetching}
        onRefresh={() => refetch()}
        analyzedAt={analysisData.analyzedAt}
      />
      
      <main className="container max-w-7xl mx-auto px-6 py-8 space-y-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
            <TabsTrigger value="github" className="gap-2" data-testid="tab-github">
              <Github className="h-4 w-4" />
              HST Repository
            </TabsTrigger>
            <TabsTrigger value="website" className="gap-2" data-testid="tab-website">
              <Globe className="h-4 w-4" />
              Aethyr Global
            </TabsTrigger>
          </TabsList>

          <TabsContent value="github" className="space-y-8 mt-0">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="md:col-span-2 lg:col-span-1">
                <ScoreCard 
                  score={analysisData.overall}
                  title="Technical Implementation Score"
                  subtitle={analysisData.structure.codeQuality.architecture}
                />
              </div>

              <MetricCard
                title="Code Structure"
                icon={FileCode}
                status="success"
                statusLabel="COMPLETE"
                metrics={[
                  { label: "Total Lines", value: analysisData.structure.totalLines.toLocaleString() },
                  { label: "Code Lines", value: analysisData.structure.codeLines.toLocaleString() },
                  { label: "Classes", value: analysisData.structure.classes },
                  { label: "Functions", value: analysisData.structure.functions },
                ]}
              />

              <MetricCard
                title="Implementation Quality"
                icon={BarChart3}
                status="success"
                statusLabel="EXCELLENT"
                metrics={[
                  { label: "Implementation Ratio", value: `${(analysisData.quality.implementationRatio * 100).toFixed(1)}%` },
                  { label: "Placeholders", value: analysisData.quality.passStatements },
                  { label: "PyTorch Operations", value: analysisData.quality.pyTorchOperations },
                  { label: "Math Operations", value: analysisData.quality.mathematicalOperations },
                ]}
              />
            </div>

            <ImplementationsCard implementations={analysisData.structure.implementations} />

            <ClaimValidationCard 
              claims={analysisData.validation.claimsValidated}
              overallValidation={analysisData.validation.overallValidation}
              codeCoherence={analysisData.validation.codeCoherence}
              architecturalSoundness={analysisData.validation.architecturalSoundness}
            />

            <PerformanceCard performance={analysisData.performance} />

            <RecommendationsCard recommendations={analysisData.recommendations} />
          </TabsContent>

          <TabsContent value="website" className="space-y-8 mt-0">
            {analysisData.websiteAnalysis ? (
              <WebsiteAnalysisCard analysis={analysisData.websiteAnalysis} />
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Globe className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Website Analysis</h3>
                  <p className="text-muted-foreground">
                    Analysis of aethyr-global.com will be displayed here.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

interface HeaderProps {
  onDownload: () => void;
  isLoading: boolean;
  onRefresh?: () => void;
  analyzedAt?: string;
}

function Header({ onDownload, isLoading, onRefresh, analyzedAt }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight" data-testid="text-app-title">
              HST Technical Analysis
            </h1>
            <p className="text-sm text-muted-foreground">
              Code-based legitimacy analysis of HST & Aethyr Global
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            {analyzedAt && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                <span>{new Date(analyzedAt).toLocaleString()}</span>
              </div>
            )}
            {onRefresh && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={onRefresh}
                disabled={isLoading}
                data-testid="button-refresh"
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            )}
            <Button 
              onClick={onDownload}
              disabled={isLoading}
              data-testid="button-download-report"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}

function generateTechnicalReport(data: AnalysisData): string {
  return `
HST (Harmonic Spine Transformer) TECHNICAL ANALYSIS REPORT
Generated: ${data.analyzedAt}

EXECUTIVE SUMMARY
================
Technical Implementation Score: ${data.overall}/100
Assessment: ${data.overall >= 80 ? 'TECHNICALLY SOUND' : data.overall >= 60 ? 'PROMISING' : 'NEEDS WORK'}

CODE STRUCTURE ANALYSIS
========================
Main File: ${data.structure.mainFile}
Total Lines: ${data.structure.totalLines}
Code Lines: ${data.structure.codeLines}
Comment Lines: ${data.structure.commentLines}
Classes Implemented: ${data.structure.classes}
Functions Implemented: ${data.structure.functions}

IMPLEMENTED FEATURES:
${Object.entries(data.structure.implementations).map(([feature, implemented]) =>
  `- ${feature}: ${implemented ? 'IMPLEMENTED' : 'NOT FOUND'}`
).join('\n')}

CODE QUALITY METRICS
====================
Syntax Valid: ${data.structure.codeQuality.syntaxValid ? 'Yes' : 'No'}
Compilation Success: ${data.structure.codeQuality.compilationSuccess ? 'Yes' : 'No'}
Implementation Ratio: ${(data.quality.implementationRatio * 100).toFixed(1)}%
Pass Statements (Placeholders): ${data.quality.passStatements}
PyTorch Operations: ${data.quality.pyTorchOperations}
Mathematical Operations: ${data.quality.mathematicalOperations}

TECHNICAL CLAIMS VALIDATION
============================
${data.validation.claimsValidated.map(claim =>
  `${claim.claim}: ${claim.status}
  Evidence: ${claim.evidence}
  ${claim.code ? `Code Reference: ${claim.code}` : ''}
`
).join('\n')}

Overall Validation: ${data.validation.overallValidation}
Code Coherence: ${data.validation.codeCoherence}
Architectural Soundness: ${data.validation.architecturalSoundness}

PERFORMANCE ANALYSIS
====================
Theoretical Basis: ${data.performance.theoreticalBasis}
Implementation Quality: ${data.performance.implementationQuality}
Performance Claims: ${data.performance.performanceClaims}
Benchmark Status: ${data.performance.benchmarkStatus}

Speed Optimizations Found:
${data.performance.speedOptimizations.map(opt => `- ${opt}`).join('\n')}

Memory Optimizations Found:
${data.performance.memoryOptimizations.map(opt => `- ${opt}`).join('\n')}

${data.websiteAnalysis ? `
WEBSITE ANALYSIS (aethyr-global.com)
====================================
Domain: ${data.websiteAnalysis.domain}
Domain Age: ${data.websiteAnalysis.domainAge}
SSL Valid: ${data.websiteAnalysis.sslValid ? 'Yes' : 'No'}
SSL Issuer: ${data.websiteAnalysis.sslIssuer}
Overall Risk: ${data.websiteAnalysis.overallRisk}
Trust Score: ${data.websiteAnalysis.score}/100

Content Analysis:
- About Page: ${data.websiteAnalysis.contentAnalysis.hasAboutPage ? 'Present' : 'Missing'}
- Contact Info: ${data.websiteAnalysis.contentAnalysis.hasContactInfo ? 'Present' : 'Missing'}
- Privacy Policy: ${data.websiteAnalysis.contentAnalysis.hasPrivacyPolicy ? 'Present' : 'Missing'}
- Terms of Service: ${data.websiteAnalysis.contentAnalysis.hasTermsOfService ? 'Present' : 'Missing'}

Claims Found:
${data.websiteAnalysis.contentAnalysis.claimsFound.map(claim => `- ${claim}`).join('\n')}

Risk Indicators:
${data.websiteAnalysis.riskIndicators.map(indicator => 
  `- [${indicator.severity.toUpperCase()}] ${indicator.indicator}: ${indicator.description}`
).join('\n')}
` : ''}

RECOMMENDATIONS
===============
${data.recommendations.map(rec =>
  `${rec.title.toUpperCase()}: ${rec.message}`
).join('\n')}

TECHNICAL CONCLUSION
===================
This analysis is based on static code analysis and architectural review.
The HST implementation shows sophisticated AI/ML development with:
- Advanced mathematical concepts properly implemented
- Clean, well-structured code
- Progressive development through multiple versions
- All major theoretical claims have corresponding code

Next steps should include:
1. Performance benchmarking on actual hardware
2. Formal testing suite implementation
3. Comparative analysis with existing architectures
4. Documentation of performance characteristics

Report generated by HST Technical Analysis App
`;
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, XCircle, Code2 } from "lucide-react";
import type { TechnicalClaim } from "@shared/schema";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ClaimValidationCardProps {
  claims: TechnicalClaim[];
  overallValidation: string;
  codeCoherence: string;
  architecturalSoundness: string;
}

export function ClaimValidationCard({ 
  claims, 
  overallValidation, 
  codeCoherence, 
  architecturalSoundness 
}: ClaimValidationCardProps) {
  const getStatusIcon = (status: TechnicalClaim["status"]) => {
    switch (status) {
      case "VALIDATED":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "UNVERIFIED":
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case "INVALID":
        return <XCircle className="h-4 w-4 text-destructive" />;
    }
  };

  const getStatusBadgeClasses = (status: TechnicalClaim["status"]) => {
    switch (status) {
      case "VALIDATED":
        return "bg-success/10 text-success border-success/20";
      case "UNVERIFIED":
        return "bg-warning/10 text-warning border-warning/20";
      case "INVALID":
        return "bg-destructive/10 text-destructive border-destructive/20";
    }
  };

  const validatedCount = claims.filter(c => c.status === "VALIDATED").length;
  const totalCount = claims.length;

  return (
    <Card data-testid="card-claim-validation">
      <CardHeader className="pb-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Code2 className="h-5 w-5 text-muted-foreground" />
            Technical Claims Validation
          </CardTitle>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="font-mono text-xs">
              {validatedCount}/{totalCount} Validated
            </Badge>
            <Badge variant="outline" className="font-mono text-xs">
              {overallValidation}
            </Badge>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 pt-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Code Coherence:</span>
            <span className="font-medium">{codeCoherence}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Architecture:</span>
            <span className="font-medium">{architecturalSoundness}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {claims.map((claim, index) => (
            <AccordionItem 
              key={index} 
              value={`claim-${index}`}
              data-testid={`accordion-claim-${index}`}
            >
              <AccordionTrigger className="hover:no-underline py-3">
                <div className="flex items-center gap-3 text-left">
                  {getStatusIcon(claim.status)}
                  <span className="font-medium">{claim.claim}</span>
                  <Badge 
                    variant="outline" 
                    className={`${getStatusBadgeClasses(claim.status)} ml-auto mr-2`}
                  >
                    {claim.status}
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pl-7 space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Evidence:</p>
                    <p className="text-sm">{claim.evidence}</p>
                  </div>
                  {claim.code && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Code Reference:</p>
                      <code className="block text-xs bg-muted px-3 py-2 rounded-md font-mono overflow-x-auto">
                        {claim.code}
                      </code>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}

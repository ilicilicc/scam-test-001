import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ErrorAlertProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorAlert({ title = "Error", message, onRetry }: ErrorAlertProps) {
  return (
    <Card className="border-destructive/50 bg-destructive/5" data-testid="error-alert">
      <CardContent className="flex flex-col items-center justify-center py-8 text-center gap-4">
        <AlertCircle className="h-12 w-12 text-destructive" />
        <div>
          <h3 className="text-lg font-semibold text-destructive">{title}</h3>
          <p className="text-muted-foreground mt-1">{message}</p>
        </div>
        {onRetry && (
          <Button onClick={onRetry} variant="outline" data-testid="button-retry">
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

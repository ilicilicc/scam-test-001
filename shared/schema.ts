import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Code Structure Analysis
export const codeStructureSchema = z.object({
  totalFiles: z.number(),
  mainFile: z.string(),
  totalLines: z.number(),
  codeLines: z.number(),
  commentLines: z.number(),
  classes: z.number(),
  functions: z.number(),
  imports: z.number(),
  implementations: z.record(z.string(), z.boolean()),
  codeQuality: z.object({
    syntaxValid: z.boolean(),
    compilationSuccess: z.boolean(),
    documentation: z.string(),
    architecture: z.string(),
  }),
});

export type CodeStructure = z.infer<typeof codeStructureSchema>;

// Implementation Quality
export const implementationQualitySchema = z.object({
  implementationRatio: z.number(),
  passStatements: z.number(),
  placeholderCode: z.boolean(),
  pyTorchOperations: z.number(),
  mathematicalOperations: z.number(),
  codeComplexity: z.string(),
  architecturalMaturity: z.string(),
  versionProgression: z.record(z.string(), z.string()),
  developmentMetrics: z.object({
    featuresImplemented: z.number(),
    theoreticalClaims: z.number(),
    actualImplementations: z.number(),
    testCoverage: z.string(),
    examples: z.string(),
  }),
});

export type ImplementationQuality = z.infer<typeof implementationQualitySchema>;

// Technical Claim Validation
export const technicalClaimSchema = z.object({
  claim: z.string(),
  status: z.enum(["VALIDATED", "UNVERIFIED", "INVALID"]),
  evidence: z.string(),
  code: z.string().optional(),
});

export type TechnicalClaim = z.infer<typeof technicalClaimSchema>;

export const technicalValidationSchema = z.object({
  claimsValidated: z.array(technicalClaimSchema),
  overallValidation: z.string(),
  codeCoherence: z.string(),
  architecturalSoundness: z.string(),
});

export type TechnicalValidation = z.infer<typeof technicalValidationSchema>;

// Performance Analysis
export const performanceAnalysisSchema = z.object({
  speedOptimizations: z.array(z.string()),
  memoryOptimizations: z.array(z.string()),
  architecturalOptimizations: z.array(z.string()),
  theoreticalBasis: z.string(),
  implementationQuality: z.string(),
  performanceClaims: z.string(),
  benchmarkStatus: z.string(),
});

export type PerformanceAnalysis = z.infer<typeof performanceAnalysisSchema>;

// Recommendation
export const recommendationSchema = z.object({
  type: z.enum(["success", "info", "warning", "error"]),
  title: z.string(),
  message: z.string(),
});

export type Recommendation = z.infer<typeof recommendationSchema>;

// Website Analysis
export const websiteAnalysisSchema = z.object({
  domain: z.string(),
  domainAge: z.string(),
  sslValid: z.boolean(),
  sslIssuer: z.string(),
  contentAnalysis: z.object({
    hasAboutPage: z.boolean(),
    hasContactInfo: z.boolean(),
    hasPrivacyPolicy: z.boolean(),
    hasTermsOfService: z.boolean(),
    claimsFound: z.array(z.string()),
  }),
  riskIndicators: z.array(z.object({
    indicator: z.string(),
    severity: z.enum(["low", "medium", "high"]),
    description: z.string(),
  })),
  overallRisk: z.enum(["LOW", "MEDIUM", "HIGH"]),
  score: z.number(),
});

export type WebsiteAnalysis = z.infer<typeof websiteAnalysisSchema>;

// Full Analysis Data
export const analysisDataSchema = z.object({
  overall: z.number(),
  structure: codeStructureSchema,
  quality: implementationQualitySchema,
  validation: technicalValidationSchema,
  performance: performanceAnalysisSchema,
  recommendations: z.array(recommendationSchema),
  websiteAnalysis: websiteAnalysisSchema.optional(),
  analyzedAt: z.string(),
});

export type AnalysisData = z.infer<typeof analysisDataSchema>;

// Analysis Target
export const analysisTargetSchema = z.object({
  type: z.enum(["github", "website"]),
  url: z.string(),
  name: z.string(),
});

export type AnalysisTarget = z.infer<typeof analysisTargetSchema>;

# HST Technical Analysis App

## Overview
A comprehensive web application designed to analyze the technical implementation and legitimacy of:
1. **HST (Harmonic Spine Transformer)** - GitHub repository at https://github.com/ilicilicc/HST
2. **Aethyr Global** - Website at https://aethyr-global.com

The app provides code-based legitimacy analysis without relying on external APIs.

## Current State
- **Status**: Fully functional MVP
- **Last Updated**: December 2024
- **Deployment**: Ready for Replit deployment

## Features
- Technical Implementation Score (0-100)
- Code structure analysis (files, lines, classes, functions)
- Technical claims validation with evidence
- Performance analysis and optimizations review
- Website risk assessment
- Downloadable technical report
- Dark/Light theme support

## Architecture

### Frontend (React + TypeScript)
- `/client/src/pages/analysis.tsx` - Main analysis dashboard
- `/client/src/components/` - Reusable UI components
  - `score-card.tsx` - Overall score display
  - `metric-card.tsx` - Individual metric display
  - `claim-validation-card.tsx` - Technical claims with accordion
  - `performance-card.tsx` - Performance optimizations
  - `website-analysis-card.tsx` - Website legitimacy analysis
  - `recommendations-card.tsx` - Action items
  - `theme-toggle.tsx` - Dark/light mode switch

### Backend (Express + TypeScript)
- `/server/routes.ts` - API endpoints
  - `GET /api/analysis` - Returns full analysis data

### Shared Types
- `/shared/schema.ts` - Zod schemas and TypeScript types

## Running the App
The app runs automatically with `npm run dev` which starts:
- Express server on port 5000
- Vite dev server for hot reloading

## Key Analysis Results

### GitHub Repository (HST)
- **Score**: 94/100 (Technically Sound)
- **Validated Claims**: 5/6
  - Pell-Lucas Time Spine
  - Hyperbolic Geometry
  - Diamond Mixer
  - Hebbian Learning
  - Lattice Structure
- **Unverified**: 1000+ TPS performance (needs benchmarking)

### Website (aethyr-global.com)
- **Score**: 58/100 (Medium Risk)
- **Risk Indicators**:
  - Young domain (< 1 year)
  - Missing privacy policy
  - Missing terms of service
  - Unverified performance claims

## User Preferences
- Default theme: Dark mode
- Font: Inter for UI, JetBrains Mono for code

## Technical Stack
- React 18 + TypeScript
- Tailwind CSS + Shadcn UI
- Express.js backend
- Tanstack Query for data fetching
- Wouter for routing

# HST Technical Analysis App - Design Guidelines

## Design Approach
**System-Based Approach**: Clean, developer-focused interface inspired by Linear's clarity and GitHub's technical aesthetic. Prioritizing data readability, scanning efficiency, and professional credibility over visual flourish.

**Core Principle**: Information density with breathing room - pack substantial data while maintaining cognitive ease through clear hierarchy and spacing.

---

## Typography System

**Font Stack**:
- Primary: Inter (via Google Fonts CDN)
- Monospace: 'Monaco', 'Courier New', monospace (for code snippets)

**Hierarchy**:
- App Title: text-3xl (30px), font-semibold
- Section Headers: text-xl (20px), font-semibold
- Card Titles: text-lg (18px), font-medium
- Body Text: text-base (16px), font-normal
- Labels/Metadata: text-sm (14px), font-medium
- Code Snippets: text-sm (14px), monospace

---

## Layout System

**Spacing Primitives**: Use Tailwind units of 3, 4, 6, 8, 12, 16
- Component padding: p-6
- Card spacing: gap-6 or gap-8
- Section margins: mb-8 or mb-12
- Tight groupings: gap-3 or gap-4

**Container Structure**:
- Max width: max-w-7xl
- Outer padding: px-6 (mobile), px-8 (desktop)
- Vertical rhythm: py-8 (sections)

**Grid System**:
- Dashboard cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Metrics display: grid-cols-2 (mobile), grid-cols-4 (desktop)
- Analysis results: Single column stack on mobile, 2-column on desktop for comparisons

---

## Component Library

### Core Dashboard Cards
**Score Card** (primary focus):
- Large numerical score display (text-6xl)
- Circular or linear progress indicator
- Status badge (validated/unverified/warning)
- Supporting metric list below score
- Subtle border, rounded corners (rounded-lg)

**Metric Cards** (3-column grid on desktop):
- Header with icon and title
- 2-4 key-value pairs per card
- Clean dividers between metrics
- Compact, scannable layout

**Analysis Result Cards**:
- Expandable sections for detailed findings
- Color-coded status indicators (green check, yellow warning, red flag)
- Code snippet display areas with monospace font
- Evidence sections with proper attribution

### Navigation & Header
**Header** (sticky top):
- App title and tagline
- "Download Report" button (primary action)
- Analysis timestamp
- Simple, unobtrusive top bar

### Data Display
**Progress Bars**:
- Thin (h-2), rounded-full
- Animated fill states
- Color-coded based on score ranges

**Status Badges**:
- Rounded-full pills
- Icon + text combinations
- Color coding: Green (validated), Yellow (needs verification), Red (invalid)

**Code Display Blocks**:
- Background differentiation from main content
- Syntax highlighting via simple formatting
- Copy-to-clipboard functionality
- Fixed-width monospace font

### Interactive Elements
**Buttons**:
- Primary: Solid background, medium weight text
- Secondary: Outline style with border
- Download action: Prominent placement in header
- Padding: px-6 py-3
- Rounded: rounded-lg

**Loading States**:
- Centered spinner with status text
- Skeleton screens for data-heavy sections
- Progress indication for multi-step analysis

### Overlays & Modals
**Error States**:
- Alert box with icon
- Clear error message
- Retry action button
- Red accent for critical errors

**Report Preview** (if needed):
- Modal overlay showing report contents
- Download and close actions
- Scrollable content area

---

## Visual Patterns

**Hierarchy Through Scale**:
- Score cards: Largest visual weight
- Metric cards: Medium prominence
- Detail sections: Tertiary priority

**Information Grouping**:
- Related metrics clustered in cards
- Clear section boundaries via spacing (mb-8)
- Visual separation without heavy borders

**Status Communication**:
- Color-coded indicators for validation status
- Icon system (checkmarks, warnings, X marks)
- Percentage bars for implementation ratios
- Numerical scores with contextual labels

**Scanning Optimization**:
- Left-aligned text for speed
- Consistent label positioning
- Key values emphasized through weight/size
- Code snippets visually distinct

---

## Animations
Use sparingly - only for functional feedback:
- Card entrance: Subtle fade-in (fade-in class)
- Progress bar fills: Smooth transitions
- Loading spinner: Continuous rotation
- No decorative animations

---

## Icons
**Library**: Heroicons (via CDN)
- Status icons: check-circle, exclamation-triangle, x-circle
- Action icons: download, refresh
- Metric icons: code-bracket, chart-bar, document-text
- Size: w-5 h-5 (inline), w-6 h-6 (standalone)

---

## Key Layout Sections

1. **Header Bar**: App title, subtitle, download button (sticky)
2. **Score Summary**: Large score card with overall assessment
3. **Dashboard Grid**: 3-column metric cards (responsive)
4. **Detailed Analysis**: Expandable validation results
5. **Performance Metrics**: List of optimizations found
6. **Recommendations**: Alert-style suggestion cards

**No hero image required** - this is a functional dashboard that loads directly into analysis view.
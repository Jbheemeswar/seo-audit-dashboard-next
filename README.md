# AI SEO Dashboard

An AI-powered SEO audit dashboard built with Next.js, React, Tailwind CSS, and Google Gemini.

The application allows users to analyze a website URL, view SEO audit results, identify SEO issues, and receive AI-powered recommendations based on the actual audit report.

## Live Demo

[Open AI SEO Dashboard](YOUR_VERCEL_URL)

## GitHub Repository

https://github.com/Jbheemeswar/seo-audit-dashboard-next

## Features

- Website URL SEO analysis
- SEO score calculation
- SEO issue detection
- Critical, high, medium, and low issue classification
- SEO details including:
  - Page title
  - Meta description
  - H1 count
  - Image count
  - Images without alt text
  - Viewport
  - Canonical URL
- AI-powered SEO recommendations
- Google Gemini integration
- Responsive dashboard interface
- Accessible React components
- Modal, Tabs, and Disclosure components
- Error handling for AI service failures
- Production deployment with Vercel

## AI SEO Advisor

The AI SEO Advisor uses Google Gemini to analyze the generated SEO report and provide practical recommendations.

The AI prompt is designed to:

- Use only information from the SEO report
- Avoid inventing SEO problems
- Prioritize important improvements
- Explain recommendations clearly
- Provide an overall assessment
- Provide prioritized recommendations
- Provide an action plan
- Suggest next steps

## Technology Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### AI

- Google Gemini
- `@google/genai`

### UI

- shadcn/ui
- Base UI
- Lucide React

### Deployment

- Vercel

### Version Control

- Git
- GitHub

## Application Flow

```text
User enters website URL
        ↓
SEO Analysis API
        ↓
Website SEO audit
        ↓
SEO Report
        ↓
AI SEO Advisor
        ↓
Google Gemini
        ↓
AI-powered recommendations

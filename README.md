# LeadGen Evolution Engine
A comprehensive full-stack platform that automatically identifies local businesses, performs in-depth website analysis, evaluates them against industry best practices, and creates AI-powered redesigns with personalized outreach campaigns for effective lead generation.

# Key Features
Intelligent Business Discovery - Leverages Google Places API to identify 5-10 relevant local businesses

Accepts a location + niche.
Scrapes or simulates 5–10 local businesses.
Scores websites against best practices.
Generates a redesign (HTML template + AI-written copy) if score <70.
Produces CSV with business details, scores, redesign links, and outreach messages (email, WhatsApp, SMS).

Node.js 18+ and npm
Google Places API key
Modern web browser with JavaScript enabled

# Setup Instructions

# Using Git
git clone <your-repository-url>
cd LeadGen Evolution Engine
npm install
Create a .env.local file in the project root directory:
env
GOOGLE_PLACES_API_KEY= google places api key

# Acquire Google Places API Key
Navigate to Google Cloud Console
Create a new project or select an existing one
Enable the Places API (New)
Access Credentials → Create Credentials → API Key
Copy the generated API key to your .env.local file
(Recommended) Implement API key restrictions to Places API for enhanced security

# Launch Development Environment
bash
npm run dev
Access the application at http://localhost:3000.


Application Architecture
text
├── app/
│   ├── api/
│   │   ├── businesses-review/     # Primary business analysis endpoint
│   │   ├── csv-file-export/       # CSV export functionality
│   │   ├── generate-redesign/     # AI-powered redesign generation
│   │   └── outreach/              # Campaign management system
│   ├── redesigns/[filename]/      # Dynamic redesign preview interface
│   └── page.tsx                   # Main application dashboard
├── components/
│   ├── ui/                        # shadcn/ui component library
│   ├── api-setup-guide.tsx        # API configuration instructions
│   └── outreach-dashboard.tsx     # Campaign management interface
├── lib/
│   ├── business-scraper.ts        # Google Places integration & web scraping
│   ├── website-scorer.ts          # Website analysis engine
│   ├── ai-redesign-generator.ts   # Template generation system
│   └── outreach-system.ts         # Message personalization engine
└── public/                        # Static resources and assets


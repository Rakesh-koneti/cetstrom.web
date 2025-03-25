# CETStrom - Online Practice Tests for Engineering & Pharmacy Entrance Exams (EAMCET, JEE, NEET)

A modern, responsive web application for comprehensive practice tests and preparation for engineering and pharmacy entrance exams like AP EAMCET, JEE, and NEET. Built with React, TypeScript, Tailwind CSS, and Supabase.

## Features

- 🎯 Specialized Practice Tests for Engineering and Pharmacy entrance exams
- 📚 Subject-specific tests for Mathematics, Physics, Chemistry, and Biology
- 📝 Previous years' question papers with detailed solutions
- 📱 Responsive design for all devices
- 📊 Detailed performance analytics and personalized recommendations
- 🔄 Excel upload feature for bulk question import
- 🌓 Dark/Light mode support
- 🔒 Secure admin dashboard
- 📊 Detailed performance analytics and personalized recommendations
- 🎨 Modern UI with Tailwind CSS
- 🌐 Multi-language support
- � Offline support with local storage
- 🔄 Synchronization with database when online
- 🔍 SEO optimized for better discoverability

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- React Router DOM
- Lucide React Icons
- Supabase (PostgreSQL Database)
- Radix UI Components

## Prerequisites

- Node.js 16.x or later
- npm 7.x or later

## Installation

1. Clone the repository:
```bash
git clone https://github.com/svsairevanth12/cetstrom.in.git
cd cetstrom.in
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Environment Setup

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── lib/           # Utilities, contexts, and types
│   ├── auth-context.tsx    # Authentication context
│   ├── database.types.ts   # Supabase database types
│   ├── supabase.ts         # Supabase client and utilities
│   └── ...                 # Other utilities
├── pages/         # Page components
│   ├── admin/     # Admin dashboard pages
│   ├── exams/     # Exam-related pages
│   └── ...        # Other pages
├── services/      # Data services
│   ├── exam-service.ts     # Exam data service
│   ├── result-service.ts   # Result data service
│   └── stream-service.ts   # Stream data service
└── main.tsx       # Entry point
```

## Recent Updates

### Database Integration
- Integrated Supabase PostgreSQL database for backend functionality
- Created tables for exams, sections, questions, results, streams, and subjects
- Implemented services for data access and management
- Added offline support with localStorage fallback

### UI Improvements
- Enhanced the home page with SEO-friendly content
- Updated the about page with more detailed information
- Improved the contact page layout and developer information
- Removed "launching soon" content as the platform is now live

### SEO Optimization
- Added comprehensive meta tags for better search engine visibility
- Created sitemap.xml for search engine crawling
- Updated robots.txt to guide search engine crawlers
- Added structured data for rich search results
- Optimized content with relevant keywords for entrance exams

### Vercel Deployment
- Added configuration for Vercel deployment
- Integrated with GitHub for continuous deployment
- Set up environment variables for Supabase connection
- Added Google AdSense integration for monetization

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Developed by:
- Rakesh Koneti
- Venkata Sai Revanth Sannidhi

Project Link: [https://github.com/svsairevanth12/cetstrom.in](https://github.com/svsairevanth12/cetstrom.in)
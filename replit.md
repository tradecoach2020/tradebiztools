# TradeCoach Lite - White-Label Business Tools Platform

## Overview

TradeCoach Lite is a comprehensive white-label business tools platform designed specifically for trade businesses. The application provides free tools and resources for tradespeople, including pricing calculators, business health assessments, video tutorials, and progress tracking. Built with a modern tech stack, the platform is designed to be easily white-labeled for different trade coaching businesses.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React state with localStorage persistence
- **Routing**: Wouter for client-side routing
- **Data Fetching**: TanStack React Query for server state management
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Connection Pool**: Neon serverless PostgreSQL
- **API Design**: RESTful endpoints with Express routes

### Database Schema
The application uses Drizzle ORM with PostgreSQL and includes the following main entities:
- `users` - User authentication and profile data
- `templates` - Business document templates
- `dailyTips` - Daily coaching content
- `userProgress` - User progress tracking and quiz state
- `projects` - Client project management

## Key Components

### Core Business Features
1. **Trade Calculator** - Comprehensive pricing tool with material lists, labor calculations, and quote generation
2. **Business Health Score** - Interactive assessment quiz with scoring algorithm
3. **Daily Fix** - Daily coaching tips with streak tracking
4. **Weekly Action Tracker** - Task management and progress tracking
5. **Templates Vault** - Document templates for business operations
6. **AI Design Tool** - Project visualization and design assistance
7. **Video Tutorials** - Educational content library
8. **Virtual Assistant** - Chat-based business support

### White-Label System
- **Branding Configuration** - Centralized branding system in `client/src/config/branding.ts`
- **Theme Customization** - Dynamic CSS custom properties for colors and styling
- **Feature Toggles** - Configurable feature sets per client
- **Domain Management** - Support for custom domains per client

### External Integrations
- **YouTube API** - Real-time video content from TradeCoach channel
- **Blog Scraping** - Web scraping for external blog content
- **SendGrid** - Email delivery system
- **Stripe** - Payment processing (configured but not fully implemented)

## Data Flow

### User Interaction Flow
1. User accesses the platform through custom domain or main site
2. Branding configuration loads based on domain/client settings
3. User interacts with various tools (calculator, health check, etc.)
4. Progress and data are saved to localStorage for free users
5. Premium features redirect to upgrade flow

### Content Management Flow
1. Static content is managed through TypeScript data files
2. Dynamic content (blog posts, videos) fetched from external APIs
3. User-generated content (progress, calculations) stored locally
4. Database used for user accounts and premium features

### White-Label Deployment Flow
1. New client configuration added to branding system
2. Environment variables configured for client-specific settings
3. Application deployed with client branding
4. Custom domain pointed to deployment

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless** - Serverless PostgreSQL connection
- **drizzle-orm** - Type-safe database ORM
- **@radix-ui/* packages** - Accessible UI components
- **@tanstack/react-query** - Server state management
- **axios** - HTTP client for external APIs
- **cheerio** - HTML parsing for web scraping

### Development Dependencies
- **vite** - Build tool and development server
- **typescript** - Type checking and compilation
- **tailwindcss** - Utility-first CSS framework
- **eslint/prettier** - Code formatting and linting

### External Services
- **YouTube Data API** - For fetching channel videos
- **SendGrid** - Email delivery service
- **Stripe** - Payment processing
- **Neon** - Serverless PostgreSQL hosting

## Deployment Strategy

### Environment Configuration
- **Development**: Local development with hot reload via Vite
- **Production**: Node.js server with static file serving
- **Database**: Neon serverless PostgreSQL with connection pooling

### Build Process
1. `npm run build` - Builds frontend assets and bundles server code
2. Frontend assets compiled to `dist/public`
3. Server code bundled with esbuild to `dist/index.js`
4. Production server serves static files and API endpoints

### Scaling Considerations
- Stateless server design for horizontal scaling
- Database connection pooling for concurrent users
- CDN-ready static asset structure
- Environment-based configuration for multi-tenant deployment

## Changelog

- June 17, 2025. Removed white-label branding system and restored to clean desktop version
- June 14, 2025. Initial setup

## Recent Changes

- Removed complex white-label branding configuration system
- Simplified branding.ts to basic configuration
- Deleted WhiteLabelDemo component
- Restored full desktop version with comprehensive business tools
- Fixed server startup issues and Vite configuration
- Application now running with all TradeCoach features accessible

## User Preferences

Preferred communication style: Simple, everyday language.
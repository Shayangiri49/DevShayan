# PyLearn - Python Learning App

## Overview

PyLearn is a Progressive Web App (PWA) designed to teach Python programming through interactive lessons, code execution, quizzes, and gamification. The application features a mobile-first design with offline capabilities, allowing users to learn Python programming with real-time code execution using Pyodide. The system includes user progress tracking, achievement unlocks, and a comprehensive lesson management system.

## Recent Changes (Migration to Replit - August 14, 2025)

- ✓ Successfully migrated from Replit Agent to standard Replit environment
- ✓ Installed all required Node.js dependencies and packages
- ✓ Fixed TypeScript configuration and Express server setup
- ✓ Verified application runs cleanly on port 5000 with proper Vite integration
- ✓ Confirmed PWA functionality with service worker registration
- ✓ Comprehensive Python curriculum with 12+ lessons covering beginner to advanced topics
- ✓ Multi-level practice problems and interactive coding exercises  
- ✓ Gamification system with XP tracking and achievement unlocks
- ✓ Advanced topics added: Algorithms, Web Scraping, and Data Science modules
- ✓ New epic and legendary achievements for advanced learners
- ✓ Real-world applications and industry-relevant skills covered

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript, built using Vite for fast development and optimized builds
- **UI Library**: Shadcn/UI components built on Radix UI primitives with Tailwind CSS for styling
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state and local storage hooks for persistent user data
- **Mobile-First Design**: Responsive layout optimized for mobile devices with a maximum width container

### PWA Implementation
- **Service Worker**: Custom service worker for caching static assets and enabling offline functionality
- **Manifest**: Web app manifest for installable PWA experience
- **Offline Capabilities**: Cached lesson content and code execution environment for offline learning

### Code Execution Engine
- **Pyodide Integration**: Browser-based Python interpreter for real-time code execution
- **Sandbox Environment**: Isolated Python execution with stdout capture for displaying results
- **Code Editor**: Custom syntax highlighting and interactive coding exercises

### Data Storage Strategy
- **Client-Side Storage**: Local storage for user progress, completed lessons, quiz scores, and achievements
- **No Backend Database**: Fully client-side application with JSON-based lesson and achievement data
- **Data Persistence**: User progress persists across sessions using browser local storage

### Content Management
- **Static Content**: Lessons and achievements stored as JSON files in the client bundle
- **Lesson Structure**: Hierarchical lesson system with steps, prerequisites, and progress tracking
- **Quiz System**: Interactive quizzes with multiple question types and immediate feedback

### Server Architecture
- **Express.js Backend**: Minimal Node.js server primarily for development and serving static assets
- **Memory Storage**: Basic in-memory storage interface for potential future backend integration
- **Development Setup**: Vite development server integration with HMR support

### Gamification System
- **XP and Leveling**: Experience points awarded for lesson completion and quiz performance
- **Streak Tracking**: Daily learning streak counting with fire emoji indicators
- **Achievement System**: Unlockable achievements based on learning milestones and behavior patterns
- **Progress Visualization**: Category-based progress tracking with visual progress bars

### Styling and Design System
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **Design Tokens**: Consistent color scheme with primary (green) and secondary (blue) brand colors
- **Component Library**: Reusable UI components following consistent design patterns
- **Dark Mode Support**: Built-in dark mode compatibility through CSS variables

## External Dependencies

### Core Framework Dependencies
- **React 18**: Modern React with concurrent features
- **Vite**: Fast build tool and development server
- **TypeScript**: Type safety and enhanced developer experience

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Headless UI primitives for accessibility
- **Shadcn/UI**: Pre-built component library
- **Class Variance Authority**: Type-safe component variants
- **Lucide React**: SVG icon library

### Python Execution
- **Pyodide**: Python interpreter running in WebAssembly
- **CDN Integration**: Pyodide loaded from jsdelivr CDN for Python code execution

### Data Management
- **TanStack Query**: Server state management and caching
- **React Hook Form**: Form validation and management
- **Zod**: Schema validation for type safety

### Development Tools
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Autoprefixer
- **Replit Integration**: Development environment optimizations

### PWA Support
- **Service Worker**: Native browser API for offline functionality
- **Web App Manifest**: Standard PWA manifest for installation
- **Font Awesome**: Icon library for UI elements

### Database Schema (Potential)
- **Drizzle ORM**: TypeScript ORM configured for PostgreSQL
- **Neon Database**: Serverless PostgreSQL integration ready for future backend features
- **Schema Definition**: User progress and lesson tracking schemas defined in shared directory
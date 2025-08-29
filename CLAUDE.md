# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + TypeScript + Vite project focused on drag-and-drop functionality and tablet-optimized card interactions. The project uses modern React patterns with gesture handling and styled-components for styling.

## Development Commands

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production (runs TypeScript compilation then Vite build)
- `npm run lint` - Run ESLint for code quality checks
- `npm run preview` - Preview production build locally
- `npm run format` - Format code using Prettier

## Architecture

### Core Technologies
- **React 19** with TypeScript 5.7
- **Vite** for build tooling and development
- **@use-gesture/react** for touch/drag gesture handling
- **styled-components** for CSS-in-JS styling
- **@dnd-kit/core** for drag-and-drop functionality
- **@react-spring/web** for animations

### Project Structure
- `src/main.tsx` - Application entry point, renders TabletBlockV1 component
- `src/components/TabletBlockV1/` - Primary tablet card component with swipe gestures
  - `TabletBlockV1.tsx` - Main component with gesture logic
  - `styles.tsx` - Styled-components definitions
- `src/index.css` - Global styles

### Key Patterns
- Components use styled-components with `$` prefix for transient props (e.g., `$isActive`)
- Gesture handling configured for touch-first interactions with `@use-gesture/react`
- State management uses React hooks (useState)
- TypeScript strict mode enabled

### Current Features
- Tablet-optimized card interface with swipe gestures
- Touch-based interactions using `useDrag` hook
- Card switching between active/inactive states
- Configurable swipe threshold (currently 30px vertical)

### Code Quality
- ESLint configured with TypeScript rules and React hooks plugin
- Prettier for code formatting
- Styled-components resolution locked to v5 for compatibility

## Branch Information
- Current branch: `tablet-swipe-cards`
- Main branch: `main`
- Recent work focuses on tablet card interactions and gesture handling
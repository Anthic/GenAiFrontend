# Generative AI Frontend Application

## Overview
This is the graphical user interface for the Generative AI platform. The frontend is engineered to be highly interactive, fast, and scalable. It is built using the latest modern web development ecosystem, centering around React 19 and Vite, styled dynamically with Tailwind CSS v4, and enriched through sophisticated animation libraries.

## Technologies Used

### Core Framework and Build Tool
* **React 19**: The core architectural library for building the user interfaces. The application uses the latest iteration of React, allowing it to leverage features like concurrent rendering.
* **React DOM 19**: Serves as the entry point to the DOM and server renderers for React.
* **Vite**: A next-generation frontend tool designed to provide a significantly faster and leaner development experience. It handles module bundling and providing a lightning-fast hot module replacement (HMR) development server.
* **TypeScript**: Provides static typing to JavaScript code, establishing safer integration across components, reducing bugs during development, and enhancing developer autonomy.

### Routing and Navigation
* **React Router (v7)**: A standard routing library for React, enabling the navigation among views of various components in a Single Page Application (SPA), keeping the UI in sync with the URL.

### Styling and User Interface
* **Tailwind CSS (v4)**: A utility-first CSS framework for rapidly building custom designs directly within the markup. Version 4 provides optimized performance and an improved build pipeline.
* **Lucide React**: A collection of high-quality, customizable SVG icons, utilized to improve the visual language and user accessibility of the interface.

### Animations and Interactivity
* **GSAP (GreenSock Animation Platform)**: An industry-standard JavaScript animation library used to create high-performance, complex, and customized animations directly on DOM elements.
* **@lottiefiles/dotlottie-react**: A React component utilized for parsing and playing Lottie animations, enabling high-quality, lightweight vector-based animations across the user interface.

### Networking and Utilities
* **Axios**: A promise-based HTTP client for the browser. It handles robust asynchronous requests to the backend server, processes JSON easily, and handles request/response interception.
* **@emailjs/browser**: Allows the application to send emails directly from the client side without needing a dedicated backend server for email transport.

### Code Quality and Development Tools
* **ESLint**: A static code analyzer utilized to enforce style consistency and locate problematic patterns in the frontend codebase.
* **React SWC Plugin for Vite**: Replaces the standard Babel compiler with SWC (Speedy Web Compiler), offering significantly faster compilation times during development and production builds.

## Directory Structure
The application structure is organized by feature and functional domain:
* **src/main.tsx**: The core entry point, rendering the root React component into the DOM.
* **src/App.tsx**: The primary layout component and configuration shell.
* **src/Router/**: Contains the configuration for all user-facing routes, managing pathing and component mapping.
* **src/Features/**: Modular components divided by feature sets or business domains.
* **src/MainLayout/**: Standardized layout components (like headers, sidebars, and footers) that persist across multiple routes.
* **src/hooks/**: Reusable React custom hooks, segregating stateful logic away from component rendering.
* **src/lib/**: Third-party initialization configurations or custom generic utilities.
* **src/assets/**: Static files such as images, base visual styles, or external fonts.
* **src/index.css**: The core global stylesheet, primarily configured for Tailwind CSS imports.

## Getting Started

### Prerequisites
* Ensure you have Node.js installed on your operating system.

### Installation
1. Navigate to the project directory in your terminal.
2. Run the npm package installer:
   npm install

### Local Development
1. Start the Vite development server:
   npm run dev
2. The site will be available locally, usually accessible via `http://localhost:5173/` inside your browser.

### Building for Production
1. To compile the application for deployment, run:
   npm run build
2. The compiled static assets will be outputted to the `dist` directory, fully optimized and ready to be hosted by any static web server.
3. To locally preview the production build, use:
   npm run preview

### Linting
To check for static errors or styling violations, run:
npm run lint

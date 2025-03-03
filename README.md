# Do It!

A minimalist task manager Progressive Web App that helps you focus on one task at a time. Built with Next.js 14.

## Features

- ✅ Simple, dark UI that reduces task overwhelm
- ✅ Presents tasks at random - one task at a time
- ✅ Complete, defer, or delete tasks as needed
- ✅ Defer tasks to tomorrow, next week, or next month
- ✅ Works offline with localStorage persistence
- ✅ Installable on desktop and mobile devices
- ✅ Online/offline status indicator

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

## Building for Production

To build the app for production, run:

```bash
npm run build
npm start
```

## PWA Features

### Offline Support

This app works offline thanks to service workers and local storage data persistence. Try turning off your internet connection after loading the app to see it in action.

### Installation

You can install this app on your device:

- **On Desktop**: Look for the install icon in your browser's address bar or menu
- **On Mobile**: Use the "Add to Home Screen" option in your browser's menu

### Icons

Before building, create icon files in the `public/icons/` directory:
- icon-192x192.png
- icon-384x384.png
- icon-512x512.png
- apple-icon-180.png

## Design Philosophy

"Do It!" is designed to reduce the anxiety of seeing a long list of tasks by showing you just one task at a time. This helps you focus on what's important right now, rather than being overwhelmed by everything you need to do.

You can always view the full list of tasks if needed, but the app encourages a one-task-at-a-time approach.

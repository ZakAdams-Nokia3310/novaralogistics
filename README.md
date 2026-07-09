# MineLink - Mining Equipment Web App

A modern multi-page web application for renting and purchasing cryptocurrency mining equipment.

## Quick Start

```bash
# Install dependencies (none required for basic version)
npm install

# Start the server
npm start
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start the development server |
| `npm run dev` | Alias for start |
| `npm run serve` | Alias for start |

## Project Structure

```
minelinkwebapp/
├── index.html      # Home page
├── rent.html       # Equipment rental
├── shop.html       # Buy equipment
├── about.html      # About us
├── contact.html   # Contact form
├── styles.css     # All styles
├── app.js         # JavaScript
├── server.js      # Node.js server
├── package.json   # NPM config
└── README.md     # This file
```

## Features

- **Rent Equipment** — Flexible rental plans (Starter, Pro, Enterprise)
- **Shop Equipment** — ASIC miners, GPU rigs, accessories
- **Smooth Navigation** — Page transitions between options
- **Responsive Design** — Works on all devices
- **Interactive UI** — Category filters, cart notifications, contact form

## Tech Stack

- Vanilla HTML/CSS/JS
- Node.js static file server
- No build tools required

## License

MIT
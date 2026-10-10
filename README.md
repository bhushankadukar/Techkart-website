# TechKart — React Laptop Store

A responsive demo electronics storefront built with React, Vite, React Router, Context API, `useReducer`, `useEffect`, and browser `localStorage`.

## Requirements
- Node.js (current LTS recommended)
- npm

## Run locally
```bash
npm install
npm run dev
```
Vite prints the local development URL in the terminal.

If starting from a new folder instead of this project:
```bash
npm create vite@latest techkart -- --template react
cd techkart
npm install
npm install react-router-dom
```
Then replace/add the project files with the files in this folder.

## Production build
```bash
npm run build
npm run preview
```

## Features
- Sample laptop catalog with illustrative INR prices
- Search by laptop name, brand, and processor
- Filter by brand and maximum price
- Sort by featured, price, and rating
- Product details and specifications
- Add/remove products and update quantities
- Cart persistence using `useEffect` and `localStorage`
- Demo checkout with client-side form validation
- Responsive layout for desktop, tablet, and mobile
- No API key or real payment gateway

## Notes
- Product information, ratings, availability, and prices are illustrative sample data, not live offers.
- Product images are loaded from Unsplash URLs and require an internet connection.
- Checkout creates only a local demo confirmation. It does not process payments, send orders, or save personal details to a server.
- Cart data is stored in the current browser's localStorage. Clearing browser storage removes it.

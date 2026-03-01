<div align="center">
  <img height="350" alt="banner" src="https://github.com/user-attachments/assets/8f31a8fe-4a6e-4786-9cb5-f9fbfdeb4cc6" />
  <br/>
  <br/>
  <p>
    <a href="#"><img src="https://img.shields.io/badge/version-1.0.0-blue" alt="version" /></a>
    <a href="#"><img src="https://img.shields.io/badge/license-MIT-green" alt="license" /></a>
    <a href="#"><img src="https://img.shields.io/badge/build-passing-brightgreen" alt="build" /></a>
  </p>
  <p><b>VGCimulator</b> is a turn-by-turn VGC analysis tool, designed to easily turn your theoretical teams into practical ones!</p>
</div>

---

### Requirements
- [Node.js](https://nodejs.org/) (v18+ recommended)
- npm

### Installation
1. **Clone the repository:**
   ```sh
   git clone https://github.com/ETB-Jay/PikmiCards.git
   cd pikmicards
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up environment variables:**
   Create a `.env` file in the root directory with the following:
   ```env
   VITE_SHOPIFY_API_KEY=your_key
   VITE_SHOPIFY_API_SECRET=your_secret
   VITE_SHOPIFY_STORE_DOMAIN=your_store.myshopify.com
   VITE_SHOPIFY_ACCESS_TOKEN=your_access_token
   PORT=5173
   ```

### Running the App
- **Start the backend server:**
  ```sh
  npm run server
  ```
- **Start the frontend (Vite dev server):**
  ```sh
  npm run dev
  ```
- Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## Scripts
- `npm run dev` — Start the Vite development server
- `npm run build` — Build the app for production
- `npm run preview` — Preview the production build
- `npm run lint` — Run ESLint on the codebase
- `npm run server` — Start the Express backend server

---

## Core Technologies
- **Frontend:** React, TypeScript, Vite, Tailwind CSS, shadcn
- **Backend:** Node.js, Express, PokeAPI, dotenv, cors
- **State Management:** React Context + Custom Hooks, Zustand
- **Linting/Formatting:** ESLint, Prettier
- **Hosting:** Vercel
- **Containerization:** Docker

---

## License
[MIT](LICENSE) 

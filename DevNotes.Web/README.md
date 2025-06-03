# DevNotes - Web Frontend

**DevNotes** is a modern, fast, and responsive web frontend built with **React**, **Vite**, and **TypeScript**. It serves as the user interface for managing and organizing developer notes efficiently.

---

## 📂 Project Structure (Typical)

```
.
├── public/               # Static assets (images, favicon, etc.)
├── src/                  # Source files (components, pages, styles)
│   ├── components/
│   ├── pages/
│   ├── routes/
│   ├── styles/
│   └── main.tsx          # Application entry point
├── vite.config.ts        # Vite config
├── tsconfig.json         # TypeScript config
├── package.json          # Project metadata and dependencies
└── jest.config.ts        # Jest testing config
```

---

## 🚀 Features & Libraries

- **React 19** — UI library
- **Vite** — Fast build and development tool
- **TypeScript** — Static typing for JS
- **React Router DOM** — Client-side routing
- **Axios** — HTTP client for API calls
- **TailwindCSS** — Utility-first CSS framework (via `@tailwindcss/vite`)
- **React Toastify** — Toast notifications
- **Lottie React** — Animation support
- **Lucide React** — Icon library

---

## ⚙️ Scripts & Commands

| Script            | Description                                      |
| ----------------- | ------------------------------------------------ |
| `npm run dev`     | Start development server (http://localhost:5173) |
| `npm run build`   | Build production-ready files                     |
| `npm run preview` | Preview production build locally                 |
| `npm run lint`    | Run ESLint checks                                |
| `npm run test`    | Run unit tests with Jest                         |

---

## 💻 Local Development Setup

1. **Clone the repo**

   ```bash
   git clone https://github.com/GuiNom16/DevNotes.git
   cd DevNotes.Web
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**

   Go to [http://localhost:5173](http://localhost:5173)

---

## 🧪 Testing

Unit tests are powered by Jest and React Testing Library.

Run tests with:

```bash
npm run test
```

---

## 🎨 Styling

Uses TailwindCSS via the Vite plugin for rapid and responsive UI styling.

Customize Tailwind config in `tailwind.config.js`.

---

## 🔧 Configuration

- TypeScript settings are managed in `tsconfig.json`.
- Vite configuration is in `vite.config.ts`.
- ESLint config and plugins ensure code quality and consistency.

---

## 🤝 Contribution

Feel free to open issues or pull requests. Please follow the existing code style and run tests before submitting.

Happy coding! 🚀

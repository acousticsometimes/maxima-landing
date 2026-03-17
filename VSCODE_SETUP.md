# Visual Studio Code Setup Guide

## Quick Start for VS Code Users

### 1. Open Project in VS Code

Open your terminal in VS Code (`` Ctrl+` `` or View > Terminal) and navigate to your project directory:

```bash
cd path/to/maxima-landing
```

### 2. Install Dependencies

Run this command in the VS Code terminal:

```bash
npm install
```

This will install all required packages including:
- React
- Vite
- Tailwind CSS
- Lucide React icons
- All development dependencies

### 3. Start Development Server

```bash
npm run dev
```

The terminal will show you the local URL (usually `http://localhost:5173`). 
Hold `Ctrl` and click the link to open it in your browser.

### 4. Recommended VS Code Extensions

Install these extensions for the best development experience:

1. **ES7+ React/Redux/React-Native snippets** (dsznajder.es7-react-js-snippets)
2. **Tailwind CSS IntelliSense** (bradlc.vscode-tailwindcss)
3. **ESLint** (dbaeumer.vscode-eslint)
4. **Prettier - Code formatter** (esbenp.prettier-vscode)
5. **Auto Rename Tag** (formulahendry.auto-rename-tag)

### 5. VS Code Settings for This Project

Create a `.vscode` folder in your project root and add a `settings.json` file:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "css.validate": false,
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

## Project Structure Overview

```
maxima-landing/
├── src/
│   ├── App.jsx          ← Main component (edit this for content)
│   ├── App.css          ← Custom styles and animations
│   ├── main.jsx         ← Entry point (usually don't need to edit)
│   └── index.css        ← Tailwind imports (usually don't need to edit)
├── index.html           ← HTML template
├── package.json         ← Dependencies list
└── tailwind.config.js   ← Tailwind configuration
```

## Common VS Code Shortcuts

- `Ctrl + P` - Quick file open
- `Ctrl + Shift + F` - Search across all files
- `Ctrl + /` - Toggle comment
- `Alt + Up/Down` - Move line up/down
- `Ctrl + D` - Select next occurrence
- `F2` - Rename symbol

## Development Workflow

1. **Make Changes**: Edit `App.jsx` or `App.css`
2. **Auto-Refresh**: Vite will automatically reload the browser
3. **Check Console**: Open browser DevTools (F12) for any errors
4. **Format Code**: Right-click > Format Document (or Shift+Alt+F)

## Troubleshooting

### If you see "command not found: npm"
Install Node.js from https://nodejs.org/

### If the browser doesn't open automatically
Look for the URL in the terminal (e.g., `http://localhost:5173`) and open it manually.

### If you see module errors
Delete `node_modules` and `package-lock.json`, then run `npm install` again.

### If Tailwind styles don't work
Make sure `index.css` imports are at the top of `main.jsx`.

## Building for Production

When ready to deploy:

```bash
npm run build
```

This creates a `dist` folder with optimized files ready for hosting.

## Need Help?

- React Docs: https://react.dev/
- Tailwind CSS Docs: https://tailwindcss.com/docs
- Vite Docs: https://vitejs.dev/
- Lucide Icons: https://lucide.dev/icons/

Happy coding! 🚀

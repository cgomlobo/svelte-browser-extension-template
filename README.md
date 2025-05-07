# Svelte Extension Template

A template for creating browser extensions using Svelte, TypeScript, and Vite.

## Features

- 🚀 **Fast Development** - Powered by [Vite](https://vitejs.dev/)
- 🧩 **Svelte Components** - Build your UI with [Svelte](https://svelte.dev/)
- 📝 **TypeScript Support** - Full type safety
- 🔍 **Code Quality** - Linting and formatting with [Biome](https://biomejs.dev/)
- 🔄 **Auto Reload** - Extension rebuilds on file changes
- 🌐 **Cross-Browser** - Works in Chrome and Firefox

## Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/svelte-extension-template.git
cd svelte-extension-template

# Install dependencies
npm install
```

### Development

```bash
# Start development server with auto-reload
npm run dev:ext
```

This will:
1. Build the extension
2. Watch for file changes
3. Provide instructions for loading the extension in Chrome or Firefox

#### Hot Reloading

For a better development experience with automatic extension reloading:

```bash
# For Chromium-based browser (Chrome, Brave, Edge, etc.)
npm run dev:chrome

# For Firefox
npm run dev:firefox
```

These commands will:
1. Build the extension
2. Launch the browser with the extension installed
3. Automatically reload the extension when files change
4. Provide a clean development environment for testing

### Building for Production

```bash
# Build the extension for production
npm run build
```

The built extension will be in the `dist` directory.

## Loading the Extension

### Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in the top right)
3. Click "Load unpacked" and select the `dist` directory

### Firefox

1. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`
2. Click "Load Temporary Add-on..." and select the `manifest.json` file from the `dist` directory

## Customization

### Manifest

Edit `public/manifest.json` to customize your extension's metadata, permissions, and behavior.

### Icons

Replace the placeholder icons in the `public/icons` directory with your own.

### Components

- **Background Script**: `src/pages/background/index.ts`
- **Content Script**: `src/pages/content/index.ts`
- **Popup**:
  - Component: `src/components/Popup.svelte`
  - HTML: `src/pages/popup/index.html`
  - Entry: `src/pages/popup/index.ts`
- **Options Page**: 
  - Component: `src/components/Options.svelte`
  - HTML: `src/pages/options/index.html`
  - Entry: `src/pages/options/index.ts`

### Optional Components

All components in this template are optional. The build system automatically detects which components exist and includes only those in the build. To remove a component:

1. Delete the corresponding folder in `src/pages/`.
1. Remove the respective entry from the `public/manifest.json` file.
1. Delete any related Svelte components from `src/components`.

For example, to remove the options page:
1. Delete the `src/pages/options/` directory.
1. Remove the `options_ui` field from the manifest.
1. Delete `src/components/Options.svelte`.

## License

MIT

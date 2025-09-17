# Serviap Design Test

A production-quality webpage implementation featuring Gallery and Cards components with modern web standards.

## Features

- **Responsive Design**: Works from 320px mobile devices to desktop
- **Accessibility**: WCAG 2.1 AA compliant
- **SEO Optimized**: Proper meta tags and semantic markup
- **Modern CSS**: Custom responsive design without frameworks
- **Gallery Block**: Modal image viewer with keyboard navigation
- **Cards Block**: Interactive cards with link click logging
- **Build System**: PostCSS compilation with autoprefixer and minification

## Installation

```bash
npm install
```

## Development

```bash
npm run watch
```

This will start a development server at `http://localhost:3000` with live reloading.

## Build for Production

```bash
npm run build
```

Built files will be in the `dist/` directory.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Edge (latest)
- Safari (latest)

## Architecture

- **No SPA frameworks**: Vanilla HTML, CSS, and JavaScript
- **Component-based**: Modular CSS and JS for maintainability
- **CMS-ready**: Content structure designed for easy CMS integration
- **Progressive Enhancement**: Works without JavaScript, enhanced with it

## Accessibility Features

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- High contrast support

## Performance

- Optimized images with proper sizing
- Minified CSS and JavaScript
- Lazy loading for images
- Efficient DOM manipulation

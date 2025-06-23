[![Deploy Pipline](https://github.com/wilmarFlorez/hello-actions/actions/workflows/pipline.yml/badge.svg)](https://github.com/wilmarFlorez/hello-actions/actions/workflows/pipline.yml)

# Random Color Cards

A web application that generates random color cards dynamically.

## 📝 Description

This project is a frontend application that allows you to generate cards with random colors. It's perfect for designers, developers, or anyone who needs color inspiration or simply wants to experiment with color palettes.

## 🚀 Features

- Random color generation
- Intuitive and responsive web interface
- Card-based color visualization
- **Color history tracking with persistent storage**
- **Copy color codes to clipboard in multiple formats (HEX, RGB, HSL)**
- **Color search and filter functionality**
- **Color palette export as CSS variables**
- Clean and well-structured code

## 🛠️ Technologies

- HTML5
- CSS3
- JavaScript (ES6+)
- ESLint for code linting

## 📦 Installation

1. Clone this repository:
```bash
git clone <repository-url>
cd hello-actions
```

2. Install dependencies:
```bash
npm install
```

## 🎯 Usage

### Development

To run the project in development mode with live reload:

```bash
npm run dev
```

### Production

To serve the project in production mode:

```bash
npm start
```

### Linting

To check code with ESLint:

```bash
npm run eslint
```

To automatically fix linting errors:

```bash
npm run eslint:fix
```

### New Features

#### Color History & Management
- **Automatic History**: All generated colors are automatically saved to your history
- **Multiple Formats**: View and copy colors in HEX, RGB, or HSL format
- **One-Click Copy**: Click any color code to copy it to your clipboard
- **Search & Filter**: Find specific colors using the search functionality
- **Export Palette**: Export your color history as CSS custom properties

#### Usage Examples
```css
/* Generated CSS variables from your color history */
:root {
  --color-primary: #ff6b6b;
  --color-secondary: #4ecdc4;
  --color-accent: #45b7d1;
}
```

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

## 📞 Contact

Wilmar Florez - [wflorez52@gmail.com]

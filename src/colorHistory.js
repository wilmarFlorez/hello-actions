class ColorHistory {
  constructor() {
    this.storageKey = 'colorCardHistory';
    this.history = this.loadHistory();
    this.currentFormat = 'hsl';
    this.init();
  }

  loadHistory() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading color history:', error);
      return [];
    }
  }

  saveHistory() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.history));
    } catch (error) {
      console.error('Error saving color history:', error);
    }
  }

  addColor(hslColor) {
    const colorData = {
      id: Date.now(),
      hsl: hslColor,
      hex: this.hslToHex(hslColor),
      rgb: this.hslToRgb(hslColor),
      timestamp: new Date().toLocaleString()
    };

    // Avoid duplicates
    if (!this.history.some(c => c.hsl === hslColor)) {
      this.history.unshift(colorData);

      // Limit history to 50 colors
      if (this.history.length > 50) {
        this.history = this.history.slice(0, 50);
      }

      this.saveHistory();
      this.updateHistoryDisplay();
    }
  }

  init() {
    this.createHistoryPanel();
    this.updateHistoryDisplay();
  }

  createHistoryPanel() {
    const historyPanel = document.createElement('div');
    historyPanel.id = 'colorHistory';
    historyPanel.className = 'color-history-panel';
    historyPanel.innerHTML = `
            <div class="history-header">
                <h3>🎨 Color History</h3>
                <div class="history-controls">
                    <select id="colorFormat" class="format-selector">
                        <option value="hsl">HSL</option>
                        <option value="hex">HEX</option>
                        <option value="rgb">RGB</option>
                    </select>
                    <button id="exportColors" class="export-btn">Export CSS</button>
                    <button id="clearHistory" class="clear-btn">Clear</button>
                </div>
            </div>
            <div class="search-container">
                <input type="text" id="colorSearch" placeholder="Search colors..." class="search-input">
            </div>
            <div id="historyList" class="history-list"></div>
        `;

    document.querySelector('.container').appendChild(historyPanel);
    this.bindEvents();
  }

  bindEvents() {
    document.getElementById('colorFormat').addEventListener('change', (e) => {
      this.currentFormat = e.target.value;
      this.updateHistoryDisplay();
    });

    document.getElementById('exportColors').addEventListener('click', () => {
      this.exportAsCSS();
    });

    document.getElementById('clearHistory').addEventListener('click', () => {
      if (confirm('¿Estás seguro de que quieres limpiar todo el historial?')) {
        this.clearHistory();
      }
    });

    document.getElementById('colorSearch').addEventListener('input', (e) => {
      this.filterHistory(e.target.value);
    });
  }

  updateHistoryDisplay(filteredHistory = null) {
    const historyList = document.getElementById('historyList');
    const colorsToShow = filteredHistory || this.history;

    if (colorsToShow.length === 0) {
      historyList.innerHTML = '<div class="no-history">No hay colores en el historial</div>';
      return;
    }

    historyList.innerHTML = colorsToShow.map(color => {
      const colorValue = color[this.currentFormat];
      return `
                <div class="history-item" style="border-left: 4px solid ${color.hsl}">
                    <div class="color-preview" style="background-color: ${color.hsl}"></div>
                    <div class="color-info">
                        <div class="color-code" data-color="${colorValue}" title="Click para copiar">
                            ${colorValue}
                        </div>
                        <div class="color-time">${color.timestamp}</div>
                    </div>
                    <button class="copy-btn" data-color="${colorValue}" title="Copiar al portapapeles">📋</button>
                </div>
            `;
    }).join('');

    // Bind copy events
    historyList.querySelectorAll('.color-code, .copy-btn').forEach(element => {
      element.addEventListener('click', (e) => {
        const colorValue = e.target.dataset.color;
        this.copyToClipboard(colorValue);
      });
    });
  }

  filterHistory(searchTerm) {
    if (!searchTerm.trim()) {
      this.updateHistoryDisplay();
      return;
    }

    const filtered = this.history.filter(color =>
      color.hex.toLowerCase().includes(searchTerm.toLowerCase()) ||
      color.rgb.toLowerCase().includes(searchTerm.toLowerCase()) ||
      color.hsl.toLowerCase().includes(searchTerm.toLowerCase())
    );

    this.updateHistoryDisplay(filtered);
  }

  copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      this.showCopyFeedback();
    }).catch(err => {
      console.error('Error copying to clipboard:', err);
    });
  }

  showCopyFeedback() {
    const feedback = document.createElement('div');
    feedback.className = 'copy-feedback';
    feedback.textContent = '¡Copiado!';
    document.body.appendChild(feedback);

    setTimeout(() => {
      document.body.removeChild(feedback);
    }, 2000);
  }

  exportAsCSS() {
    const cssVars = this.history.slice(0, 10).map((color, index) =>
      `  --color-${index + 1}: ${color.hex};`
    ).join('\n');

    const cssContent = `:root {\n${cssVars}\n}`;

    const blob = new Blob([cssContent], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'color-palette.css';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  clearHistory() {
    this.history = [];
    this.saveHistory();
    this.updateHistoryDisplay();
  }

  // Color conversion utilities
  hslToHex(hsl) {
    const match = hsl.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    if (!match) return hsl;

    const h = parseInt(match[1]) / 360;
    const s = parseInt(match[2]) / 100;
    const l = parseInt(match[3]) / 100;

    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    const toHex = (c) => {
      const hex = Math.round(c * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  hslToRgb(hsl) {
    const hex = this.hslToHex(hsl);
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  }
}

export default ColorHistory;

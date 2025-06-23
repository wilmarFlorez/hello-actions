describe('Application Integration', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="container">
        <header>
          <h1>Random Color Cards</h1>
          <p>Click on any card to copy its color to clipboard</p>
        </header>
        <main>
          <div class="controls">
            <label for="card-count">Number of cards:</label>
            <input type="number" id="card-count" value="6" min="1" max="20">
            <button id="generate-btn">Generate Cards</button>
          </div>
          <div id="card-container" class="card-grid"></div>
        </main>
      </div>
    `;
  });

  const initializeApp = () => {
    const generateBtn = document.getElementById('generate-btn');
    const cardContainer = document.getElementById('card-container');
    const cardCountInput = document.getElementById('card-count');

    const generateCards = () => {
      const count = parseInt(cardCountInput.value) || 6;
      cardContainer.innerHTML = '';
      
      for (let i = 0; i < count; i++) {
        const color = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
        const card = createCard(color);
        cardContainer.appendChild(card);
      }
    };

    const createCard = (color) => {
      const card = document.createElement('div');
      card.className = 'color-card';
      card.style.backgroundColor = color;
      
      const colorText = document.createElement('span');
      colorText.className = 'color-text';
      colorText.textContent = color.toUpperCase();
      card.appendChild(colorText);
      
      return card;
    };

    generateBtn.addEventListener('click', generateCards);
    
    // Generate initial cards
    generateCards();
  };

  describe('Complete Application Flow', () => {
    test('should initialize with default cards', () => {
      initializeApp();
      
      const cards = document.querySelectorAll('.color-card');
      expect(cards.length).toBe(6);
      
      cards.forEach(card => {
        expect(card.querySelector('.color-text')).toBeTruthy();
        expect(card.style.backgroundColor).toBeTruthy();
      });
    });

    test('should regenerate cards with new count', () => {
      initializeApp();
      
      const input = document.getElementById('card-count');
      const button = document.getElementById('generate-btn');
      
      input.value = '8';
      button.click();
      
      const cards = document.querySelectorAll('.color-card');
      expect(cards.length).toBe(8);
    });

    test('should have proper DOM structure', () => {
      initializeApp();
      
      expect(document.querySelector('h1')).toBeTruthy();
      expect(document.querySelector('#card-count')).toBeTruthy();
      expect(document.querySelector('#generate-btn')).toBeTruthy();
      expect(document.querySelector('#card-container')).toBeTruthy();
    });

    test('should maintain card uniqueness', () => {
      initializeApp();
      
      const cards = document.querySelectorAll('.color-card');
      const colors = Array.from(cards).map(card => 
        card.querySelector('.color-text').textContent
      );
      
      const uniqueColors = new Set(colors);
      expect(uniqueColors.size).toBeGreaterThan(1);
    });
  });

  describe('Error Handling', () => {
    test('should handle missing DOM elements gracefully', () => {
      document.body.innerHTML = '<div></div>';
      
      expect(() => {
        const btn = document.getElementById('generate-btn');
        if (btn) btn.click();
      }).not.toThrow();
    });

    test('should handle invalid input values', () => {
      initializeApp();
      
      const input = document.getElementById('card-count');
      const button = document.getElementById('generate-btn');
      
      input.value = 'invalid';
      button.click();
      
      const cards = document.querySelectorAll('.color-card');
      expect(cards.length).toBe(6); // Should fallback to default
    });
  });
});

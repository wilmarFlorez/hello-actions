describe('Card Generation', () => {
  let mockContainer;

  beforeEach(() => {
    document.body.innerHTML = '';
    mockContainer = document.createElement('div');
    mockContainer.id = 'card-container';
    document.body.appendChild(mockContainer);
  });

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

  const generateCards = (count) => {
    const container = document.getElementById('card-container');
    container.innerHTML = '';
    
    for (let i = 0; i < count; i++) {
      const color = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
      const card = createCard(color);
      container.appendChild(card);
    }
  };

  describe('createCard', () => {
    test('should create a card element with correct structure', () => {
      const color = '#ff0000';
      const card = createCard(color);
      
      expect(card.className).toBe('color-card');
      expect(card.style.backgroundColor).toBe('rgb(255, 0, 0)');
      
      const colorText = card.querySelector('.color-text');
      expect(colorText).toBeTruthy();
      expect(colorText.textContent).toBe('#FF0000');
    });

    test('should create cards with different colors', () => {
      const card1 = createCard('#ff0000');
      const card2 = createCard('#00ff00');
      
      expect(card1.style.backgroundColor).not.toBe(card2.style.backgroundColor);
    });
  });

  describe('generateCards', () => {
    test('should generate specified number of cards', () => {
      generateCards(5);
      const cards = document.querySelectorAll('.color-card');
      expect(cards.length).toBe(5);
    });

    test('should clear existing cards before generating new ones', () => {
      generateCards(3);
      expect(document.querySelectorAll('.color-card').length).toBe(3);
      
      generateCards(2);
      expect(document.querySelectorAll('.color-card').length).toBe(2);
    });

    test('should generate cards with valid hex colors', () => {
      generateCards(3);
      const cards = document.querySelectorAll('.color-card .color-text');
      
      cards.forEach(card => {
        expect(card.textContent).toMatch(/^#[0-9A-F]{6}$/);
      });
    });
  });
});

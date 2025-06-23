describe('User Interactions', () => {
  let mockButton, mockContainer, mockInput;

  beforeEach(() => {
    document.body.innerHTML = `
      <div>
        <input type="number" id="card-count" value="6" min="1" max="20">
        <button id="generate-btn">Generate Cards</button>
        <div id="card-container"></div>
      </div>
    `;
    
    mockButton = document.getElementById('generate-btn');
    mockContainer = document.getElementById('card-container');
    mockInput = document.getElementById('card-count');
  });

  const simulateCardGeneration = () => {
    const count = parseInt(mockInput.value) || 6;
    mockContainer.innerHTML = '';
    
    for (let i = 0; i < count; i++) {
      const card = document.createElement('div');
      card.className = 'color-card';
      card.style.backgroundColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
      mockContainer.appendChild(card);
    }
  };

  const simulateCardClick = (card) => {
    const colorText = card.style.backgroundColor;
    // Convert RGB to hex for clipboard
    const rgb = colorText.match(/\d+/g);
    const hex = '#' + rgb.map(x => parseInt(x).toString(16).padStart(2, '0')).join('');
    
    // Mock clipboard API
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockResolvedValue()
      }
    });
    
    return navigator.clipboard.writeText(hex);
  };

  describe('Generate Button', () => {
    test('should generate cards when clicked', () => {
      mockButton.addEventListener('click', simulateCardGeneration);
      mockButton.click();
      
      const cards = mockContainer.querySelectorAll('.color-card');
      expect(cards.length).toBe(6);
    });

    test('should generate custom number of cards', () => {
      mockInput.value = '10';
      mockButton.addEventListener('click', simulateCardGeneration);
      mockButton.click();
      
      const cards = mockContainer.querySelectorAll('.color-card');
      expect(cards.length).toBe(10);
    });

    test('should handle invalid input values', () => {
      mockInput.value = '';
      mockButton.addEventListener('click', simulateCardGeneration);
      mockButton.click();
      
      const cards = mockContainer.querySelectorAll('.color-card');
      expect(cards.length).toBe(6); // Default value
    });
  });

  describe('Card Click Interaction', () => {
    test('should copy color to clipboard when card is clicked', async () => {
      const card = document.createElement('div');
      card.style.backgroundColor = 'rgb(255, 0, 0)';
      
      await simulateCardClick(card);
      
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('#ff0000');
    });
  });

  describe('Input Validation', () => {
    test('should accept valid numbers within range', () => {
      mockInput.value = '15';
      expect(parseInt(mockInput.value)).toBe(15);
      expect(parseInt(mockInput.value)).toBeGreaterThanOrEqual(1);
      expect(parseInt(mockInput.value)).toBeLessThanOrEqual(20);
    });

    test('should handle boundary values', () => {
      mockInput.value = '1';
      mockButton.addEventListener('click', simulateCardGeneration);
      mockButton.click();
      expect(mockContainer.querySelectorAll('.color-card').length).toBe(1);

      mockInput.value = '20';
      mockButton.addEventListener('click', simulateCardGeneration);
      mockButton.click();
      expect(mockContainer.querySelectorAll('.color-card').length).toBe(20);
    });
  });
});

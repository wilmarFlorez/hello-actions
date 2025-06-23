class RandomCardGenerator {
    constructor() {
        this.container = document.getElementById('cardsContainer');
        this.generateBtn = document.getElementById('generateBtn');
        this.colors = [];
        this.quotes = [
            'Sé el cambio que quieres ver',
            'La vida es bella',
            'Nunca es tarde',
            'Sigue tus sueños',
            'Haz que suceda',
            'Vive el momento',
            'Sonríe siempre',
            'Cree en ti'
        ];
        
        this.init();
    }

    init() {
        this.generateBtn.addEventListener('click', () => this.generateCard());
        this.generateCard(); // Generar una tarjeta inicial
    }

    getRandomColor() {
        const hue = Math.floor(Math.random() * 360);
        const saturation = Math.floor(Math.random() * 40) + 60;
        const lightness = Math.floor(Math.random() * 30) + 35;
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }

    getRandomQuote() {
        return this.quotes[Math.floor(Math.random() * this.quotes.length)];
    }

    generateCard() {
        const card = document.createElement('div');
        card.className = 'card';
        
        const backgroundColor = this.getRandomColor();
        card.style.backgroundColor = backgroundColor;
        card.textContent = this.getRandomQuote();
        
        // Añadir al principio del contenedor
        this.container.insertBefore(card, this.container.firstChild);
        
        // Limitar a 12 tarjetas máximo
        if (this.container.children.length > 12) {
            this.container.removeChild(this.container.lastChild);
        }
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new RandomCardGenerator();
});

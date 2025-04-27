import { getCart, saveCart } from '../js/cart-service.js'; // nebo relativní cesta podle tvé struktury

class Cart extends HTMLElement
{
    constructor()
    {
        super();
        this.attachShadow({ mode: 'open' });
        this.items = [];
    }

    connectedCallback()
    {
        // Načteme stav košíku z LocalStorage
         this.items = getCart();

        document.addEventListener('evnt-add-to-cart', (e) => this.addItem(e.detail));
        this.shadowRoot.innerHTML = `
            <h2>Košík</h2>
            <ul id="cartItems"></ul>
        `;
        this.render();
    }

    addItem(detail)
    {
        this.items.push(detail.productId);
        saveCart(this.items); // >>> uložíme aktualizovaný košík        
        this.render();
    }

    render()
    {
        const ul = this.shadowRoot.getElementById('cartItems');
        ul.innerHTML = this.items.map(id => `<li>Produkt ID: ${id}</li>`).join('');
    }
}

customElements.define('es-cart', Cart);

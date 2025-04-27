class EsItem extends HTMLElement
{
    constructor()
    {
      super();  // zavolame constructor z nadrizene tridy => HTMLElement element
      this.attachShadow({ mode: 'open' }); // Použijeme Shadow DOM pro izolaci css stylů
    }
  
    async connectedCallback()
    {
      // --- Načtení CSS ---
      const cssResponse = await fetch('./es-item.css');
      const cssText = await cssResponse.text();
      const style = document.createElement('style');
      style.textContent = cssText;
    
      //  item-id je attribut co vstupuje do componenty 'es-item'
      const itemId = this.getAttribute('item-id');
      this.shadowRoot.innerHTML = itemId;
  
      // Načteme katalog z local products.js JSON file
      const response = await fetch('data/products.js'); // soubor s katalogem
      const catalog = await response.json();

      // filtr podle ID
      const product = catalog.find(p => p.id === parseInt(itemId));

      // --- Připravíme obsah element <div> ---
      const wrapper = document.createElement('div');
  
      // Pokud existuje nacteny product vykreslime ho 
      if (product)
      {
        wrapper.innerHTML = `
          <div class="product">
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <p class="stock">Skladem: ${product.stock} ks</p>
            <button id="btnAddToCart">Přidat do košíku</button> <!-- Přidáme tlačítko -->
          </div>
        `;
      }
      else
      {
        this.shadowRoot.innerHTML = `<p>Produkt s ID ${itemId} nebyl nalezen.</p>`;
      }

      // --- Přidáme css style i obsah do shadowRoot ---
      this.shadowRoot.appendChild(style);
      this.shadowRoot.appendChild(wrapper);

        // Najdeme tlačítko a nasadíme listener
        const button = this.shadowRoot.querySelector('#btnAddToCart');
        if (button)
        {
            button.addEventListener('click', () => this.addToCart());
        }

    }

    // na kliknuti na tlacitko pridat do kosiku, se vysle udalost 'evnt-add-to-cart' kterou chytne kosik 'es-cart' componenta  
    // pozor kosik musi mit zaregistrovanou udalost 'evnt-add-to-cart'!!!
    addToCart()
    {
        const event = new CustomEvent('evnt-add-to-cart', {
            detail: {
                productId: this.getAttribute('item-id')
            },
            bubbles: true, // umožní propagaci nahoru v DOMu
            composed: true // umožní projít přes shadow DOM
        });
        this.dispatchEvent(event);
    }
}
  
// --- Nas novy custom HTML element se jmenuje 'es-item' ---
customElements.define('es-item', EsItem);
  
class EsItem extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' }); // Použijeme Shadow DOM pro izolaci stylů
    }
  
    async connectedCallback() {

      const itemId = this.getAttribute('item-id');
      this.shadowRoot.innerHTML = itemId;

  
      // Načteme katalog (může být i remote URL nebo local JSON)
      const response = await fetch('./data/products.js'); // soubor s katalogem

      const catalog = await response.json();


  
      const product = catalog.find(p => p.id === parseInt(itemId));
  
      if (product) {
        this.shadowRoot.innerHTML = `
          <style>
            .product {
              border: 1px solid #ccc;
              padding: 1rem;
              border-radius: 8px;
              max-width: 300px;
              font-family: Arial, sans-serif;
            }
            img {
              width: 100%;
              height: auto;
              border-radius: 4px;
            }
            h2 {
              margin: 0.5rem 0;
            }
            p {
              margin: 0.5rem 0;
            }
            .stock {
              font-weight: bold;
              color: ${product.stock > 0 ? 'green' : 'red'};
            }
          </style>
          <div class="product">
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <p class="stock">Skladem: ${product.stock} ks</p>
          </div>
        `;
      } else {
        this.shadowRoot.innerHTML = `<p>Produkt s ID ${itemId} nebyl nalezen.</p>`;
      }
    }
  }
  
  customElements.define('es-item', EsItem);
  
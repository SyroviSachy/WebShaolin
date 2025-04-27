class ProductCard extends HTMLElement 
{
    connectedCallback()
     {
      this.innerHTML = `
           <div class="product-card">
                <img src="./assets/images/Fight.png" alt="Souboj s Tigrem">
                <h3>Souboj s Tigrem</h3>
                <p>Cena: 3,500 Kč</p>
                <button>Koupit</button>
            </div>
      `;
    }
  }

  customElements.define('product-card', ProductCard);
class MyHeader extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <header>
          <h1>Můj E-Shop</h1>
          <nav>
            <a href="index.html">Domů</a>
            <a href="produkty.html">Produkty</a>
            <a href="kosik.html">Košík</a>
            <a href="kosik2.html">Košík</a>
          </nav>
        </header>
      `;
    }
  }

  customElements.define('my-header', MyHeader);
// cart-service.js
// Sluzba ktera vystavuje metody pro praci s kosikem. Kosik je ulozen v localStorage

// Vlozi novy product do kosiku
export function addToCart(productId, units = 1)
{
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingItem = cart.find(item => item.product_id === productId);

    if (existingItem)
    {
        existingItem.units += units;
    }
    else
    {
        cart.push({ product_id: productId, units: units });
    }

    saveCart(cart)
}

// Vrati obsah kosiku
export function getCart()
{
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// Vymaze obsah kosiku
export function clearCart()
{
    localStorage.removeItem('cart');
}


// Ulozi obsah kosiku
export function saveCart(cart)
{
    localStorage.setItem('cart', JSON.stringify(cart));
}

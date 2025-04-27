// importuje funkce pre services
import { loadEmailJS, sendOrderEmail } from './js/email-service.js';
import { addToCart, getCart, clearCart } from './js/cart-service.js';


async function init()
{
    // Zaregistruje EmailJS service
    await loadEmailJS('II2hd2XmScvGypddQ');

    // Prida 4x item id=1 do kosiku
    addToCart(1, 4);
    addToCart(2, 1);
    addToCart(3, 2);

    // Tohle je hezke ale jenom pro test, je treba naplanovat refactoring
    // Prohleda cely DOM a najde tlacistko 'sendOrderButton' a zaregistruje Event Listneter na udalost Click
    // Registrace 
    document.getElementById('sendOrderButton').addEventListener('click', async () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const orderData = {
            from_name: 'Filip',
            message: 'Objednávka: ' + cart.join(', '),
            reply_to: 'roman@plansky.cz'
        };
        try
        {
            await sendOrderEmail('service_7mnhzwv', 'template_jl1hams', orderData, 'II2hd2XmScvGypddQ');
            alert('Objednávka úspěšně odeslána!');
            localStorage.removeItem('cart');
        }
        catch (error)
        {
            console.error('Chyba při odesílání objednávky:', error);
            alert('Nepodařilo se odeslat objednávku.');
        }
    });
}

init();

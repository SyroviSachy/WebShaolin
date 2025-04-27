// email-service.js
// Sluzba ktera vystavuje funkce pro praci s Emailem. Pouziva se externi sluzba EmailJS
// Dokumentace https://www.emailjs.com/
// Zaregistrovano na ucet roman@plansky.cz => Filepe muzes si to zaregistrovat na sebe


// Nahraje Script 
export async function loadEmailJS(publicKey)
{
    // Pripravi script object, provede download a init. Zatim neni pripojen do DOM HTML dokumentu
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/emailjs-com@2.6.4/dist/email.min.js';
    script.type = 'text/javascript';

    //CallBack na udalost load
    script.onload = function()
    {
        // Globalni promenna emailjs je vytvorena 
        emailjs.init(publicKey);
        console.log('EmailJS připraveno.');
    };

    // Prida sript do DOM HTML dokumentu, v tomto kroku se zavola onload
    document.head.appendChild(script);
}

// Odesle email s objednavkou 
export function sendOrderEmail(serviceId, templateId, orderData, publicKey)
{
    return emailjs.send(serviceId, templateId, orderData, publicKey);
}

document.addEventListener('DOMContentLoaded', () => {
    // Selektiert alle "In den Warenkorb"-Buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    // Fügt jedem Button einen Klick-Event-Listener hinzu
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    // Funktion zum Hinzufügen eines Produkts zum Warenkorb
    function addToCart(event) {
        const button = event.target;
        const product = button.closest('.product'); // Findet das nächstgelegene Produkt-Element
        const name = product.getAttribute('data-name'); // Holt den Produktnamen aus dem data-Attribut
        const price = product.getAttribute('data-price'); // Holt den Preis aus dem data-Attribut
        const imgSrc = product.querySelector('img').src; // Holt die Bildquelle des Produkts

        // Erzeugt ein Warenkorbelement
        const cartItem = {
            name: name,
            price: parseFloat(price), // Konvertiert den Preis zu einem Float
            imgSrc: imgSrc,
            quantity: 1
        };

        // Lädt den aktuellen Warenkorb aus dem localStorage oder initialisiert einen leeren Warenkorb
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const index = cart.findIndex(item => item.name === cartItem.name);

        // Falls das Produkt bereits im Warenkorb ist, erhöht die Menge
        if (index !== -1) {
            cart[index].quantity += 1;
        } else {
            cart.push(cartItem); // Fügt das neue Produkt dem Warenkorb hinzu
        }

        // Speichert den aktualisierten Warenkorb im localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        showFloatingMessage(`${name} wurde zum Warenkorb hinzugefügt.`); // Zeigt eine Benachrichtigung an
    }

    // Funktion zur Anzeige einer schwebenden Nachricht
    function showFloatingMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('floating-message');
        messageElement.textContent = message;
        document.body.appendChild(messageElement);

        // Zeigt die Nachricht an
        setTimeout(() => {
            messageElement.classList.add('show');
        }, 10);

        // Versteckt die Nachricht nach 3 Sekunden
        setTimeout(() => {
            messageElement.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(messageElement); // Entfernt die Nachricht aus dem DOM
            }, 500);
        }, 3000);
    }
});

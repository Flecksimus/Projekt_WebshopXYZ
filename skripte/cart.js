document.addEventListener('DOMContentLoaded', () => {
    // Initialisiert die Variablen für die wichtigen DOM-Elemente
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalPriceElement = document.getElementById('total-price');

    // Lädt den Warenkorb aus dem localStorage oder initialisiert einen leeren Warenkorb
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Funktion zur Anzeige der Warenkorbelemente
    function displayCartItems() {
        cartItemsContainer.innerHTML = ''; // Leert den Container
        let totalPrice = 0;

        // Überprüft, ob der Warenkorb leer ist
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Ihr Warenkorb ist leer.</p>';
            totalPriceElement.textContent = '0,00 €';
            return;
        }

        // Durchläuft jedes Element im Warenkorb und fügt es zum DOM hinzu
        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <img src="${item.imgSrc}" alt="${item.name}">
                <div>
                    <h3>${item.name}</h3>
                    <p>Preis: ${item.price.toFixed(2)} €</p>
                    <label for="quantity-${index}">Menge: </label>
                    <input type="number" id="quantity-${index}" value="${item.quantity}" min="1" data-index="${index}">
                    <button class="remove-item" data-index="${index}">Entfernen</button>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);
            totalPrice += item.price * item.quantity; // Berechnet den Gesamtpreis
        });

        totalPriceElement.textContent = `${totalPrice.toFixed(2)} €`; // Zeigt den Gesamtpreis an

        // Fügt Event-Listener für das Entfernen von Artikeln hinzu
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', removeItem);
        });

        // Fügt Event-Listener für die Aktualisierung der Menge hinzu
        document.querySelectorAll('input[type="number"]').forEach(input => {
            input.addEventListener('change', updateQuantity);
        });
    }

    // Funktion zum Entfernen eines Artikels aus dem Warenkorb
    function removeItem(event) {
        const index = event.target.dataset.index;
        cart.splice(index, 1); // Entfernt das Element aus dem Warenkorb
        localStorage.setItem('cart', JSON.stringify(cart)); // Aktualisiert den localStorage
        displayCartItems(); // Aktualisiert die Anzeige
    }

    // Funktion zur Aktualisierung der Menge eines Artikels im Warenkorb
    function updateQuantity(event) {
        const index = event.target.dataset.index;
        const newQuantity = parseInt(event.target.value);
        cart[index].quantity = newQuantity; // Aktualisiert die Menge
        localStorage.setItem('cart', JSON.stringify(cart)); // Aktualisiert den localStorage
        displayCartItems(); // Aktualisiert die Anzeige
    }

    // Funktion zur Anzeige einer schwebenden Nachricht
    function showFloatingMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('floating-message');
        messageElement.textContent = message;
        document.body.appendChild(messageElement);

        setTimeout(() => {
            messageElement.classList.add('show');
        }, 10);

        setTimeout(() => {
            messageElement.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(messageElement);
            }, 500);
        }, 3000);
    }

    // Zeigt die Warenkorbelemente beim Laden der Seite an
    displayCartItems();

    // Fügt Event-Listener für die Schaltflächen "Zum Warenkorb hinzufügen" hinzu
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const productElement = event.target.closest('.product');
            const name = productElement.querySelector('h2').textContent;
            const price = parseFloat(productElement.querySelector('p:nth-of-type(2)').textContent.replace('Preis: ', '').replace(' €', ''));
            const imgSrc = productElement.querySelector('img').src;

            const existingProductIndex = cart.findIndex(item => item.name === name);
            if (existingProductIndex !== -1) {
                cart[existingProductIndex].quantity += 1; // Erhöht die Menge, wenn das Produkt bereits im Warenkorb ist
            } else {
                cart.push({ name, price, imgSrc, quantity: 1 }); // Fügt das neue Produkt zum Warenkorb hinzu
            }

            localStorage.setItem('cart', JSON.stringify(cart)); // Aktualisiert den localStorage
            showFloatingMessage('Produkt wurde zum Warenkorb hinzugefügt');
        });
    });
});
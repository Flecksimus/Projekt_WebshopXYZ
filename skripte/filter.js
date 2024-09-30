document.addEventListener('DOMContentLoaded', function() {
    // Selektiert alle Filterbuttons
    const filterButtons = document.querySelectorAll('[data-filter]');
    // Selektiert alle Produkt-Container
    const products = document.querySelectorAll('.product');

    // Iteriert über jeden Filterbutton
    filterButtons.forEach(function(button) {
        // Fügt einen Event Listener für den Klick auf jeden Filterbutton hinzu
        button.addEventListener('click', function(e) {
            e.preventDefault(); // Verhindert das Standardverhalten des Links

            // Holt den Filterwert aus dem data-filter Attribut des Buttons
            const filterValue = button.getAttribute('data-filter');

            // Iteriert über jedes Produkt
            products.forEach(function(product) {
                // Holt den Preis des Produkts und konvertiert ihn in eine Fließkommazahl
                const productPrice = parseFloat(product.getAttribute('data-price'));

                // Vergleicht den Filterwert und zeigt oder versteckt das Produkt entsprechend
                switch (filterValue) {
                    case 'all':
                        product.style.display = 'block';
                        break;
                    case 'under-30':
                        if (productPrice < 30) {
                            product.style.display = 'block';
                        } else {
                            product.style.display = 'none';
                        }
                        break;
                    case '30-50':
                        if (productPrice >= 30 && productPrice <= 50) {
                            product.style.display = 'block';
                        } else {
                            product.style.display = 'none';
                        }
                        break;
                    case 'over-50':
                        if (productPrice > 50) {
                            product.style.display = 'block';
                        } else {
                            product.style.display = 'none';
                        }
                        break;
                    default:
                        break;
                }
            });
        });
    });
});

function getCategoryNavTemplate(catName, catURL) {
    return `
        <a href="#${catURL}" class="category-nav-link">${catName}</a>
    `;
}

function getDishesTemplate(category, catName, catURL) {
    return `
        <section id="${catURL}" class="dishes-category-wrapper seamless-y">
        <div class="i-sec flex-col gap py-20">
            <div class="dishes-category-img bg-img-cover pos-relative overlay-before" style="background-image: url(assets/img/${category}.jpg)">
                <h2>${catName}</h2>
            </div>
            <div id="dishItems_${category}" class="flex-col gap-05"></div>
        </div>
        </section>
    `;    
}

function getDishItemsTemplate() {
    return `
        <div class="dish-item flex-col gap-05 pos-relative">
            <h3 class="dish-title">${dishName}</h3>
            <div class="dish-description">${dishDescription}</div>
            <div class="dish-price">${dishPrice} €</div>
            <button class="btn-add-to-cart" onclick="addToCart(${dishID})">+</button>
        </div>
    `;
}

function getOpenCartBtnTemplate(itemQty) {
    return `
        Warenkorb&emsp;|&emsp;${cartTotalStr} €
    `;
}

function getCartItemsTemplate(cartItemIndex) {
    return `
        <div id="cartItem-${cartItemIndex}" class="cart-item">
            <h4 class="cart-item-name">${cartItemName}</h4>
            <div class="cart-item-metas flex-row gap-15 justify-between">
                <div class="cart-item-qty-wrapper flex-row">
                    <button class="cart-btn-qty" onclick="updateCartItemQty(-1, ${cartItemIndex})"><img src="assets/icons/google-remove.svg" alt="remove-icon"></button>
                    <div id="cartItemQty-${cartItemIndex}" class="cart-item-qty">${cartItemQty}</div>
                    <button class="cart-btn-qty" onclick="updateCartItemQty(1, ${cartItemIndex})"><img src="assets/icons/google-add.svg" alt="add-icon"></button>
                </div>
                <div class="cart-item-price-wrapper flex-row gap-30">
                    <div id="cartItemPriceTotal-${cartItemIndex}" class="cart-item-price-total">${cartItemPriceTotStr} €</div>
                    <button class="cart-btn-remove" onclick="removeFromCart(${cartItemIndex})"><img src="assets/icons/google-delete.svg" alt="trash-icon"></button>
                </div>
            </div>
        </div>
    `;
}

function getCartTotalsTemplate() {
    return `
    <div id="cartSubTotal" class="flex-row justify-between">
        <div>Zwischensumme</div><div>${cartSubtotalStr} €</div>
    </div>
    <div id="cartShipCost" class="flex-row justify-between">
        <div>Lieferkosten</div><div>${cartShipCostStr} €</div>
    </div>
    <div id="cartTotal" class="flex-row justify-between">
        <div>Gesamtkosten</div><div>${cartTotalStr} €</div>
    </div>
    `;
}

function getDishesTemplate() {
    return `
        <div class="dish-item flex-col gap-05 pos-relative">
            <h3 class="dish-title">${dishName}</h3>
            <div class="dish-description">${dishDescription}</div>
            <div class="dish-price">${dishPrice} €</div>
            <button class="btn-add-to-cart" onclick="addToCart(${dishID})">+</button>
        </div>
    `;
}

function getCartItemsTemplate(cartItemIndex) {
    return `
        <div id="cartItem-${cartItemIndex}" class="cart-item mb">
            <h4 class="cart-item-name">${cartItemName}</h4>
            <div class="cart-item-metas flex-row gap-10 justify-between mt-05">
                <div class="cart-items-qty flex-row gap-10">
                    <button class="cart-btn-qty" onclick="updateCartItemQty(-1, ${cartItemIndex})">-</button>
                    <div id="cartItemQty-${cartItemIndex}" class="cart-item-qty">${cartItemQty}</div>
                    <button class="cart-btn-qty" onclick="updateCartItemQty(1, ${cartItemIndex})">+</button>
                </div>
                <div id="cartItemPriceTotal-${cartItemIndex}" class="cart-item-price-total">${cartItemPriceTotStr} €</div>
                <button class="cart-btn-remove" onclick="removeFromCart(${cartItemIndex})"><img src="assets/icons/google-delete.svg" alt="trash-icon"></button>
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

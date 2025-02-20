let dishIndex = 0;
let dishID = '';
let dishName = '';
let dishDescription = '';
let dishPrice = 0;
let cartItems = [];
let cartItemIndex = 0;
let cartItemID = '';
let cartItemName = '';
let cartItemQty = 0;
let cartItemPrice = 0;
let cartItemPriceTot = 0;
let cartItemPriceTotStr = '';
let cartSubtotal = 0;
let cartShipCost = 0;
let cartTotal = 0;
let cartSubtotalStr = '';
let cartShipCostStr = '';
let cartTotalStr = '';

function init() {
    renderDishes();
    renderCart();
}

function renderDishes() {
    let dishItemsRef = document.getElementById('dishItems');
    dishItemsRef.innerHTML = '';
    for (dishIndex = 0; dishIndex < dishes.length; dishIndex++) {
        dishName = dishes[dishIndex].name;
        dishDescription = dishes[dishIndex].description;
        dishPrice = dishes[dishIndex].price.toFixed(2);
        dishItemsRef.innerHTML += getDishesTemplate();       
    }
}

function renderCart() {
    let cartRef = document.getElementById('cart');
    cartRef.dataset.items = cartItems.length;
    renderCartItems();    
    renderCartTotals();    
}

function renderCartItems() {
    let cartItemsRef = document.getElementById('cartItems');
    cartItemsRef.innerHTML = '';
    for (cartItemIndex = 0; cartItemIndex < cartItems.length; cartItemIndex++) {
        dishIndex = getDishIndexFromCartItem(cartItemIndex);
        if(dishIndex >= 0) {
            updateCartItemValues(dishIndex);
            if(cartItemQty > 0) {
                cartItemsRef.innerHTML += getCartItemsTemplate(cartItemIndex);       
            }
        }
    }
}

function renderCartTotals() {
    if(cartItems.length > 0) {
        let cartTotalsRef = document.getElementById('cartTotals');
        updateCartTotals(cartItems);
        cartTotalsRef.innerHTML = getCartTotalsTemplate();
    }
}

function addToCart(dishIndex) {
    dishID = dishes[dishIndex].id;
    cartItemIndex = cartItems.indexOf(dishID);
    if( cartItemIndex < 0 ) {
        cartItems.push(dishID);
    }
    cartItemIndex = cartItems.indexOf(dishID);
    updateCartItemQty(1, cartItemIndex);
}

function removeFromCart(cartItemIndex) {
    dishIndex = getDishIndexFromCartItem(cartItemIndex);
    dishes[dishIndex].cartQty = 0;
    dishes[dishIndex].cartValue = 0;
    cartItemQty = 0
    cartItems.splice(cartItemIndex, 1);
    renderCart();
}

function updateCartItemQty(qty, cartItemIndex) {
    dishIndex = getDishIndexFromCartItem(cartItemIndex);
    dishes[dishIndex].cartQty = dishes[dishIndex].cartQty + qty;
    renderCart();
}

function getDishIndexFromCartItem(cartItemIndex) {
    cartItemID = cartItems[cartItemIndex];
    dishIndex = dishes.findIndex(element => element.id == cartItemID);
    return dishIndex;
}

function updateCartItemValues(dishIndex, remove = false) {
    cartItemName = dishes[dishIndex].name;
    cartItemQty = dishes[dishIndex].cartQty;
    if(! remove) {
        cartItemQty = checkCartItemQtyRange(dishIndex, cartItemQty);
    }
    cartItemPrice = dishes[dishIndex].price;
    cartItemPriceTot = (cartItemQty * cartItemPrice);
    dishes[dishIndex].cartValue = cartItemPriceTot;
    cartItemPriceTotStr = cartItemPriceTot.toFixed(2);
}

function updateCartTotals(cartItems) {
    cartSubtotal = 0;
    cartShipCost = 0;
    for (cartItemIndex = 0; cartItemIndex < cartItems.length; cartItemIndex++) {
        dishIndex = getDishIndexFromCartItem(cartItemIndex);
        cartSubtotal = cartSubtotal + dishes[dishIndex].cartValue;
    }
    cartTotal = cartSubtotal + cartShipCost;
    cartSubtotalStr = cartSubtotal.toFixed(2);
    cartShipCostStr = cartShipCost.toFixed(2);
    cartTotalStr = cartTotal.toFixed(2);
}

function checkCartItemQtyRange(dishIndex, cartItemQty) {
    switch(true) {
        case cartItemQty > 99:
            cartItemQty = 99;
            break;
        case cartItemQty <= 0:
            cartItemQty = 1;
            break;
    }
    return dishes[dishIndex].cartQty = cartItemQty;
}



let dishIndex = 0;
let dishID = '';
let dishName = '';
let dishDescription = '';
let dishPrice = 0;
let dishCartQty = 0;
let dishCartValue = 0;
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
    renderCartItems();    
    renderCartTotals();    
}

function renderCartItems() {
    let cartItemsRef = document.getElementById('cartItems');
    cartItemsRef.innerHTML = '';
    for (cartItemIndex = 0; cartItemIndex < cartItems.length; cartItemIndex++) {
        renderCartItem(cartItemIndex, cartItemsRef);
    }
}

function renderCartItem(cartItemIndex, cartItemsRef) {
    getDishIndexFromCartItem(cartItemIndex);
    if(dishIndex >= 0) {
        getDishMetasFromCartItem(dishIndex);
        if(cartItemQty > 0) {
            cartItemsRef.innerHTML += getCartItemsTemplate(cartItemIndex);       
        }
    }
}

function getDishIndexFromCartItem(cartItemIndex) {
    cartItemID = cartItems[cartItemIndex];
    return dishIndex = dishes.findIndex(element => element.id == cartItemID);
}

function getDishMetasFromCartItem(dishIndex) {
    cartItemName = dishes[dishIndex].name;
    cartItemQty = dishes[dishIndex].cartQty;
    cartItemPrice = dishes[dishIndex].price;
    cartItemPriceTot = (cartItemQty * cartItemPrice)
    cartItemPriceTotStr = (cartItemQty * cartItemPrice).toFixed(2);
    dishes[dishIndex].cartValue = cartItemPriceTot;
    updateCartTotals(cartItemPrice);
}

function updateCartTotals(cartItemPrice) {
    cartSubtotal = cartSubtotal + cartItemPrice;
    cartShipCost = 0
    cartTotal = cartSubtotal + cartShipCost;
    cartSubtotalStr = cartSubtotal.toFixed(2);
    cartShipCostStr = cartShipCost.toFixed(2);
    cartTotalStr = cartTotal.toFixed(2);
}

function renderCartTotals() {
    let cartTotalsRef = document.getElementById('cartTotals');
    cartTotalsRef.innerHTML = getCartTotalsTemplate();
}

function addToCart(dishIndex) {
    dishID = dishes[dishIndex].id;
    dishes[dishIndex].cartQty++;
    if( ! cartItems.includes(dishID) ) {
        cartItems.push(dishID);
    }
    renderCart();
}

function removeFromCart(cartItemIndex) {
    dishIndex = getDishIndexFromCartItem(cartItemIndex);
    dishes[dishIndex].cartQty = 0;
    cartItems.splice(cartItemIndex, 1);
    renderCart();
}


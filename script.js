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
    let cartRef = document.getElementById('cart');
    cartRef.dataset.items = cartItems.length;
    renderCartItems();    
}

function renderCartItems() {
    let cartItemsRef = document.getElementById('cartItems');
    cartItemsRef.innerHTML = '';
    for (cartItemIndex = 0; cartItemIndex < cartItems.length; cartItemIndex++) {
        dishIndex = getDishIndexFromCartItem(cartItemIndex);
        if(dishIndex >= 0) {
            setCartItemValues(dishIndex);
            if(cartItemQty > 0) {
                cartItemsRef.innerHTML += getCartItemsTemplate(cartItemIndex);       
            }
        }
    }
}

function getDishIndexFromCartItem(cartItemIndex) {
    cartItemID = cartItems[cartItemIndex];
    dishIndex = dishes.findIndex(element => element.id == cartItemID);
    return dishIndex;
}

function setCartItemValues(dishIndex, remove = false) {
    cartItemName = dishes[dishIndex].name;
    cartItemQty = dishes[dishIndex].cartQty;
    if(! remove) {
        cartItemQty = checkCartItemQtyRange(dishIndex, cartItemQty);
    }
    cartItemPrice = dishes[dishIndex].price;
    cartItemPriceTot = (cartItemQty * cartItemPrice)
    cartItemPriceTotStr = (cartItemQty * cartItemPrice).toFixed(2);
    console.log(cartItemName + ': ' + cartItemQty + 'x ='+ cartItemPriceTotStr);
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

function addToCart(dishIndex) {
    dishID = dishes[dishIndex].id;
    cartItemIndex = cartItems.indexOf(dishID);
    if( cartItemIndex < 0 ) {
        cartItems.push(dishID);
    }
    cartItemIndex = cartItems.indexOf(dishID);
    addCartItemQty(1, cartItemIndex);
    // renderCart();
}

function removeFromCart(cartItemIndex) {
    dishIndex = getDishIndexFromCartItem(cartItemIndex);
    dishes[dishIndex].cartQty = 0;
    cartItems.splice(cartItemIndex, 1);
    renderCart();
}

function addCartItemQty(qty, cartItemIndex) {
    dishIndex = getDishIndexFromCartItem(cartItemIndex);
    dishes[dishIndex].cartQty = dishes[dishIndex].cartQty + qty;
    renderCart();
}

// function updateCartItem(cartItemIndex) {
//     let cartItemQtyRef = document.getElementById('cartItemQty-' + cartItemIndex);
//     cartItemQtyRef.innerHTML = cartItemQty;
//     let cartItemPriceTotalRef = document.getElementById('cartItemPriceTotal-' + cartItemIndex);
//     cartItemPriceTotalRef.innerHTML = cartItemPriceTotStr;
// }

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




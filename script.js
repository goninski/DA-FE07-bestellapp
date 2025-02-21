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
let cartShipCost = 5;
let cartTotal = 0;
let cartSubtotalStr = '';
let cartShipCostStr = '';
let cartTotalStr = '';

function init() {
    renderDishesPerCategory();
    renderCart();
}

function renderDishesPerCategory() {
    for (let catIndex = 0; catIndex < categories.length; catIndex++) {
        let category = categories[catIndex].anker;
        let filtDishes = dishes.filter((dish) => {
            return dish.category == category;
        });
        renderCategoryMetas(catIndex, category);
        renderDishItems(filtDishes, category);
    }
}

function renderCategoryMetas(catIndex, category) {
    let catTitle = categories[catIndex].name;
    document.getElementById('navItem_' + category).innerHTML = catTitle;
    document.getElementById('navItem_' + category).href = '#' + category;
    document.getElementById('catTitle_' + category).innerHTML = catTitle;
}

function renderDishItems(filtDishes, category) {
    let dishItemsRef = document.getElementById('dishItems_' + category);
    dishItemsRef.innerHTML = '';
    for (dishIndex = 0; dishIndex < filtDishes.length; dishIndex++) {
        dishID = filtDishes[dishIndex].id;
        dishName = filtDishes[dishIndex].name;
        dishDescription = filtDishes[dishIndex].description;
        dishPrice = filtDishes[dishIndex].price.toFixed(2);
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

function addToCart(dishID) {
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

function emptyCart() {
    cartItems = [];
    for (let dishIndex = 0; dishIndex < dishes.length; dishIndex++) {
        dishes[dishIndex].cartQty = 0;
        dishes[dishIndex].cartValue = 0;
        renderCart();
    }
}

function confirmOrder() {
    let orderConfirmationRef = document.getElementById('orderConfirmation');
    let cartEmpty = document.getElementById('cartEmpty');
    orderConfirmationRef.style = '';
    cartEmpty.style = 'display: none';
    emptyCart();
}

function updateCartItemQty(qty, cartItemIndex) {
    dishIndex = getDishIndexFromCartItem(cartItemIndex);
    dishes[dishIndex].cartQty = dishes[dishIndex].cartQty + qty;
    renderCart();
}

function togglePickUp() {
    let inputPickUpRef = document.getElementById('inputPickUp');
    if(inputPickUpRef.checked == true) {
        cartShipCost = 0;
    } else {
        cartShipCost = 5;
    }
    renderCartTotals();
}

function getDishIndexFromID(dishID) {
    dishIndex = dishes.findIndex(dish => dish.id == dishID);
    return dishIndex;
}

function getDishIndexFromCartItem(cartItemIndex) {
    cartItemID = cartItems[cartItemIndex];
    dishIndex = dishes.findIndex(dish => dish.id == cartItemID);
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



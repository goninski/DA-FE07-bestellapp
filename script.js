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
let orderSubmitted = false;

function init() {
    closeCart();
    renderDishesPerCategory();
    renderCart();
    setHomeURL();
}

function renderDishesPerCategory() {
    for (let catIndex = 0; catIndex < categories.length; catIndex++) {
        let category = categories[catIndex].id;
        let catName = categories[catIndex].name;
        let catURL = categories[catIndex].url;
        let filtDishes = dishes.filter((dish) => {return dish.category == category;});
        document.getElementById('categoryNav').innerHTML += getCategoryNavTemplate(catName, catURL);
        document.getElementById('categoryNavFooter').innerHTML += getCategoryNavTemplate(catName, catURL);
        document.getElementById('dishesWrapper').innerHTML += getDishesTemplate(category, catName, catURL);
        renderDishItems(filtDishes, category);
    }
}

function renderDishItems(filtDishes, category) {
    let dishItemsRef = document.getElementById('dishItems_' + category);
    dishItemsRef.innerHTML = '';
    for (dishIndex = 0; dishIndex < filtDishes.length; dishIndex++) {
        dishID = filtDishes[dishIndex].id;
        dishName = filtDishes[dishIndex].name;
        dishDescription = filtDishes[dishIndex].description;
        dishPrice = filtDishes[dishIndex].price.toFixed(2);
        dishItemsRef.innerHTML += getDishItemsTemplate();       
    }
}

function renderCart() {
    if(cartItems.length > 0) {
        document.getElementById('cartEmpty').style = 'display: none;';
        document.getElementById('orderConfirmation').style = 'display: none';
        orderSubmitted = false;
    } else {
        document.getElementById('cartEmpty').style = '';
        closeCart(orderSubmitted);
    }
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
    let bodyRef = document.getElementById('body');
    if(cartItems.length > 0) {
        let cartTotalsRef = document.getElementById('cartTotals');
        updateCartTotals(cartItems);
        cartTotalsRef.innerHTML = getCartTotalsTemplate();
        bodyRef.classList.add('cart-has-items');
        bodyRef.classList.remove('cart-is-empty');
    } else {
        bodyRef.classList.add('cart-is-empty');
        bodyRef.classList.remove('cart-has-items');
    }
    renderOpenCartBtn(cartItems.length);
}

function renderOpenCartBtn(itemQty) {
    let openCartBtnRef = document.getElementById('openCartBtn');
    let content = '';
    if(itemQty > 0) {
        content = getOpenCartBtnTemplate(itemQty);
        openCartBtnRef.disabled = false;
    } else {
        content = 'Warenkorb&emsp;|&emsp;leer';
        openCartBtnRef.disabled = true;
    }
    openCartBtnRef.innerHTML = content;    
}

function openCart() {
    let bodyRef = document.getElementById('body');
    bodyRef.classList.add('mobile-cart-active');
}

function closeCart(orderSubmitted = false) {
    if(! orderSubmitted) {
        let bodyRef = document.getElementById('body');
        bodyRef.classList.remove('mobile-cart-active');
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
    orderSubmitted = true;
    emptyCart();
    document.getElementById('orderConfirmation').style = '';
    document.getElementById('cartEmpty').style = 'display: none';
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
        case cartItemQty > 20:
            cartItemQty = 20;
            break;
        case cartItemQty <= 0:
            cartItemQty = 1;
            break;
    }
    return dishes[dishIndex].cartQty = cartItemQty;
}

function setHomeURL() {
    let url = new URL(window.location.href);
    let homeURL = setCondHomeURL(url);
    let homeLinksRef = document.querySelectorAll('.js-set-home-url');
    for (let i=0; i < homeLinksRef.length; i++) {
        homeLinksRef[i].href = homeURL;
    }
}

function setCondHomeURL(url) {
    switch(url.hostname) {
        case "127.0.0.1":
            return url.origin + '/' + url.pathname.split("/")[1];
        case "francois-gonin.developerakademie.net":
            return url.origin + '/' + url.pathname.split("/")[1] + '/' + url.pathname.split("/")[2];
        default:
            return '/';
    }
}


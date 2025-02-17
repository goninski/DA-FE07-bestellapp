let indexDishes = 0;
let dishName = '';
let dishDescription = '';
let dishPrice = 0;

let cartItems = [
    {
        "id": "",
        "qty": 0
    }
];

function init() {
    renderDishes();    
}

function renderDishes() {
    let dishItemsRef = document.getElementById('dishItems');
    dishItemsRef.innerHTML = '';
    for (indexDishes = 0; indexDishes < dishes.length; indexDishes++) {
        dishName = dishes[indexDishes].name;
        dishDescription = dishes[indexDishes].description;
        dishPrice = dishes[indexDishes].price.toFixed(2);
        // dishPrice = toFixed(dishPrice);
        dishItemsRef.innerHTML += getDishesTemplate();       
    }
}
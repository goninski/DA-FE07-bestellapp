function getDishesTemplate() {
    return `
        <div class="dish-item flex-col gap-05 pos-relative">
            <h3 class="dish-title">${dishName}</h3>
            <div class="dish-description">${dishDescription}</div>
            <div class="dish-price">${dishPrice} €</div>
            <button class="btn-add-to-cart" onclick="addToCart">+</button>
        </div>
    `;
}
document.addEventListener('DOMContentLoaded', () => {
    const restaurant = JSON.parse(localStorage.getItem('selectedRestaurant'));
    const restaurantName = document.getElementById('restaurant-name');
    const menuList = document.getElementById('menu-list');

    restaurantName.textContent = restaurant.name;

    restaurant.menu.forEach(item => {
        const menuItemDiv = document.createElement('div');
        menuItemDiv.classList.add('menu-item');
        menuItemDiv.innerHTML = `
            <h2>${item.name}</h2>
            <p>Price: $${item.price}</p>
            <img src = " ${item.image}" width = "100px" height = "100px">
            <button onclick="addToCart('${item.name}', ${item.price})">Add to Cart</button>
        `;
        menuList.appendChild(menuItemDiv);
    });
});

function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
}

function viewCart() {
    window.location.href = 'cart.html';
}

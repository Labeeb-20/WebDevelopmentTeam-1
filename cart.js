document.addEventListener('DOMContentLoaded', () => {
    const cartList = document.getElementById('cart-list');
    const totalPriceElement = document.getElementById('total-price');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalPrice = 0;

    const itemCounts = cart.reduce((counts, item) => {
        counts[item.name] = (counts[item.name] || 0) + 1;
        return counts;
    }, {});

    Object.keys(itemCounts).forEach(name => {
        const item = cart.find(i => i.name === name);
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');
        cartItemDiv.innerHTML = `
            <h2>${name}</h2>
            <p>Price: Rs.${item.price}</p>
            <p>Count: ${itemCounts[name]}</p>
            <button onclick="removeSingleFromCart('${name}')" style = "background-color: lavender;">Remove One</button>
            <button onclick="removeAllFromCart('${name}')" style = "background-color: lavender;">Remove All</button>
        `;
        cartList.appendChild(cartItemDiv);
        totalPrice += item.price * itemCounts[name];
    });

    totalPriceElement.textContent = totalPrice.toFixed(2);
});

function removeSingleFromCart(name) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const index = cart.findIndex(item => item.name === name);
    if (index !== -1) {
        cart.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Item removed');
    location.reload(); // Reload the page to update the cart display
}

function removeAllFromCart(name) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.name !== name);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Items removed');
    location.reload(); // Reload the page to update the cart display
}

document.addEventListener('DOMContentLoaded', () => {
    const restaurantList = document.getElementById('restaurant-list');
    const searchInput = document.getElementById('search');
    const ratingFilter = document.getElementById('rating-filter');

    fetch('restaurants.json')
        .then(response => response.json())
        .then(data => {
            displayRestaurants(data);

            searchInput.addEventListener('input', () => {
                const filteredData = filterRestaurants(data, searchInput.value, ratingFilter.value);
                displayRestaurants(filteredData);
            });

            ratingFilter.addEventListener('change', () => {
                const filteredData = filterRestaurants(data, searchInput.value, ratingFilter.value);
                displayRestaurants(filteredData);
            });
        });

    function displayRestaurants(restaurants) {
        restaurantList.innerHTML = '';
        restaurants.forEach(restaurant => {
            const restaurantDiv = document.createElement('div');
            restaurantDiv.classList.add('restaurant');
            restaurantDiv.innerHTML = `
                <h2>${restaurant.name}</h2>
                <p>Rating: ${restaurant.rating}</p>
                <img src = "${restaurant.image}" height = "100px" width = "100px">
            `;
            restaurantDiv.addEventListener('click', () => {
                localStorage.setItem('selectedRestaurant', JSON.stringify(restaurant));
                window.location.href = 'menu.html';
            });
            restaurantList.appendChild(restaurantDiv);
        });
    }

    function filterRestaurants(restaurants, search, rating) {
        return restaurants.filter(restaurant => {
            const matchesName = restaurant.name.toLowerCase().includes(search.toLowerCase());
            const matchesRating = rating ? Math.ceil(restaurant.rating) == rating : true;
            return matchesName && matchesRating;
        });
    }
});

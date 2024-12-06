// Handle form submission
document.getElementById('addItemForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        farmer_name: document.getElementById('farmer_name').value,
        item_name: document.getElementById('item_name').value,
        quantity: document.getElementById('quantity').value,
        price: document.getElementById('price').value,
        description: document.getElementById('description').value
    };

    console.log('Submitting form data:', data); // Log form data

    try {
        const response = await fetch('http://localhost:33060/add-item', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('Item added successfully!');
            loadItems(); // Refresh items on the homepage
        } else {
            console.error('Failed to add item:', await response.text());
            alert('Failed to add item. Please try again.');
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('An error occurred. Please check your connection.');
    }
});

// Function to load items and display them
async function loadItems() {
    try {
        const response = await fetch('http://localhost:33060/items');
        const items = await response.json();

        const itemsContainer = document.getElementById('itemsContainer');
        itemsContainer.innerHTML = ''; // Clear previous items

        items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'item';
            itemElement.innerHTML = `
                <h3>${item.item_name}</h3>
                <p>Farmer: ${item.farmer_name}</p>
                <p>Quantity: ${item.quantity}</p>
                <p>Price: ${item.price}</p>
                <p>Description: ${item.description}</p>
            `;
            itemsContainer.appendChild(itemElement);
        });
    } catch (error) {
        console.error('Error loading items:', error);
    }
}

// Load items on page load
document.addEventListener('DOMContentLoaded', loadItems);

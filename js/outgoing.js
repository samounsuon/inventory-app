const getDataFromProduct = localStorage.getItem("products");
let UserData = getDataFromProduct ? JSON.parse(getDataFromProduct) : [];

function outGoingTable(filteredData = UserData) { // Accept filtered data as a parameter
    const table = document.querySelector('table');
    const oldTbody = document.getElementById('product-table');
    
    if (oldTbody) {
        table.removeChild(oldTbody); // Remove old table body
    }

    const tableBody = document.createElement('tbody');
    tableBody.setAttribute('id', 'product-table');
    
    filteredData.forEach((data, index) => {  // Access the index here
        const tr = document.createElement('tr');
        tr.setAttribute('data-id', data.tdId);

        const tdID = document.createElement('td');
        tdID.textContent = index + 1; // Use the index for the ID column

        const tdNameProduct = document.createElement('td');
        tdNameProduct.textContent = data.name;

        const tdDate = document.createElement('td');
        tdDate.textContent = data.date;

        const tdQuantitys = document.createElement('td');
        tdQuantitys.textContent = data.quantity;

        const tdPrices = document.createElement('td');
        tdPrices.textContent = data.price;

        const tdTotal = document.createElement('td');
        tdTotal.textContent = (parseFloat(data.quantity) * parseFloat(data.price)).toFixed(2); // Correct calculation

        tr.appendChild(tdID);
        tr.appendChild(tdNameProduct);
        tr.appendChild(tdDate);
        tr.appendChild(tdQuantitys);
        tr.appendChild(tdPrices);
        tr.appendChild(tdTotal);

        tableBody.appendChild(tr);
    });

    table.appendChild(tableBody);
}

outGoingTable(); // Initial call to populate the table

function navbar() {
    const menuIcon = document.querySelector("#menu");
    const sideBar = document.getElementById("sideBar");
    menuIcon.addEventListener("click", () => {
        sideBar.classList.toggle("hidden");
    });
}
navbar();

// Update product by subtracting quantity
const inputNameProduct = document.querySelector("#name-product");
const inputQuantityProduct = document.querySelector("#quantity-product");
const inputDiscountProduct = document.querySelector("#discount-product");
const inputCustomerName = document.querySelector("#name-customer");
const btnSend = document.querySelector("#btn");

btnSend.addEventListener("click", function () {
    const nameProduct = inputNameProduct.value;
    const quantityProduct = parseFloat(inputQuantityProduct.value);
    const discountProduct = parseFloat(inputDiscountProduct.value) || 0;
    const customerName = inputCustomerName.value;

    if (nameProduct && quantityProduct && customerName) {
        const pricePerUnit = 10; // Example price per unit, replace with actual price logic
        const discount = discountProduct / 100; // Convert discount to percentage
        const totalPrice = (quantityProduct * pricePerUnit) * (1 - discount);

        // Find if the product already exists
        const existingProductIndex = UserData.findIndex(product => product.name === nameProduct);

        if (existingProductIndex !== -1) {
            // If product exists, subtract the quantity entered by the user
            const existingQuantity = UserData[existingProductIndex].quantity;
            if (existingQuantity >= quantityProduct) {
                UserData[existingProductIndex].quantity -= quantityProduct; // Subtract quantity
                // Do not update price, keep the existing price
                UserData[existingProductIndex].total = (UserData[existingProductIndex].quantity * UserData[existingProductIndex].price).toFixed(2); // Recalculate total based on existing price
                UserData[existingProductIndex].date = new Date().toLocaleDateString(); // Update the date
            } else {
                alert("Not enough quantity to subtract!");
                return;
            }
        } else {
            // If product doesn't exist, display an alert
            alert("Product not found!");
            return;
        }

        // Save to local storage
        localStorage.setItem("products", JSON.stringify(UserData)); 

        // Reset form fields
        inputNameProduct.value = "";
        inputQuantityProduct.value = "";
        inputDiscountProduct.value = "";
        inputCustomerName.value = "";

        // Refresh the table
        outGoingTable();
    } else {
        alert("Please fill in all the fields!");
    }
});

// Add an event listener to the product name input field for search functionality
inputNameProduct.addEventListener('input', function () {
    const searchTerm = inputNameProduct.value.toLowerCase();

    // Filter the products based on the search term
    const filteredData = UserData.filter(product =>
        product.name.toLowerCase().includes(searchTerm)
    );

    // Refresh the table with the filtered data
    outGoingTable(filteredData);
});

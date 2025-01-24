// Retrieve products and transactions from localStorage
const getDataFromProduct = localStorage.getItem("products");
const getTransactions = localStorage.getItem("transactions");

let UserData = getDataFromProduct ? JSON.parse(getDataFromProduct) : []; // Product inventory
let Transactions = getTransactions ? JSON.parse(getTransactions) : []; // Transaction records

// Function to populate the product table
function outGoingTable(filteredData = UserData) {
    const table = document.querySelector("table");
    const oldTbody = document.getElementById("product-table");

    if (oldTbody) {
        table.removeChild(oldTbody);
    }

    const tableBody = document.createElement("tbody");
    tableBody.setAttribute("id", "product-table");

    filteredData.forEach((data, index) => {
        const tr = document.createElement("tr");
        tr.setAttribute("data-id", data.tdId);

        const tdID = document.createElement("td");
        tdID.textContent = index + 1;

        const tdNameProduct = document.createElement("td");
        tdNameProduct.textContent = data.name;

        const tdDate = document.createElement("td");
        tdDate.textContent = data.date;

        const tdQuantitys = document.createElement("td");
        tdQuantitys.textContent = data.quantity;

        const tdPrices = document.createElement("td");
        tdPrices.textContent = data.price;

        const tdTotal = document.createElement("td");
        tdTotal.textContent = (parseFloat(data.quantity) * parseFloat(data.price)).toFixed(2);

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

// Populate the table initially
outGoingTable();

// Navbar functionality
function navbar() {
    const menuIcon = document.querySelector("#menu");
    const sideBar = document.getElementById("sideBar");
    menuIcon.addEventListener("click", () => {
        sideBar.classList.toggle("hidden");
    });
}
navbar();

// Form inputs and button
const inputNameProduct = document.querySelector("#name-product");
const inputQuantityProduct = document.querySelector("#quantity-product");
const inputDiscountProduct = document.querySelector("#discount-product");
const inputCustomerName = document.querySelector("#name-customer");
const btnSend = document.querySelector("#btn");
const showResult = document.querySelector("#showTotal");

let selectedProductPrice = 0;

// Update price dynamically when the product name is entered
inputNameProduct.addEventListener("input", function () {
    const productName = inputNameProduct.value.toLowerCase();
    const product = UserData.find(item => item.name.toLowerCase() === productName);

    if (product) {
        selectedProductPrice = parseFloat(product.price);
    } else {
        selectedProductPrice = 0;
    }

    calculateTotal(); // Update total dynamically when the product name changes
});

// Calculate and display total based on quantity, discount, and price
inputQuantityProduct.addEventListener("input", calculateTotal);
inputDiscountProduct.addEventListener("input", calculateTotal);

function calculateTotal() {
    const quantityProduct = parseFloat(inputQuantityProduct.value) || 0;
    const discountProduct = parseFloat(inputDiscountProduct.value) || 0;

    const discount = discountProduct / 100;
    const totalProduct = (quantityProduct * selectedProductPrice) * (1 - discount);

    showResult.textContent = totalProduct.toFixed(2);
}

// Update product, save transaction, and store data in localStorage
btnSend.addEventListener("click", function () {
    const nameProduct = inputNameProduct.value.trim();
    const quantityProduct = parseFloat(inputQuantityProduct.value) || 0;
    const discountProduct = parseFloat(inputDiscountProduct.value) || 0;
    const customerName = inputCustomerName.value.trim();

    if (nameProduct && quantityProduct > 0 && customerName) {
        const existingProductIndex = UserData.findIndex(product => product.name.toLowerCase() === nameProduct.toLowerCase());

        if (existingProductIndex !== -1) {
            const product = UserData[existingProductIndex];
            if (product.quantity >= quantityProduct) {
                // Update product quantity
                product.quantity -= quantityProduct;
                product.date = new Date().toLocaleDateString();

                // Save product updates in localStorage
                localStorage.setItem("products", JSON.stringify(UserData));

                // Save transaction record
                const total = (quantityProduct * selectedProductPrice * (1 - discountProduct / 100)).toFixed(2);
                Transactions.push({
                    name: nameProduct,
                    quantity: quantityProduct,
                    price: selectedProductPrice,
                    discount: discountProduct,
                    customer: customerName,
                    date: new Date().toLocaleDateString(),
                    total: total,
                });

                localStorage.setItem("transactions", JSON.stringify(Transactions));

                // Update the table
                outGoingTable();
                alert("Transaction saved successfully!");
            } else {
                alert("Not enough quantity to subtract!");
            }
        } else {
            alert("Product not found!");
        }
    } else {
        alert("Please fill in all the fields!");
    }

    // Reset form fields
    inputNameProduct.value = "";
    inputQuantityProduct.value = "";
    inputDiscountProduct.value = "";
    inputCustomerName.value = "";
});

// Search functionality for products
inputNameProduct.addEventListener("input", function () {
    const searchTerm = inputNameProduct.value.toLowerCase();
    const filteredData = UserData.filter(product => product.name.toLowerCase().includes(searchTerm));
    outGoingTable(filteredData);
});

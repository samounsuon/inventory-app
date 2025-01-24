function navbar() {
    const menuIcon = document.querySelector("#menu");
    const sideBar = document.getElementById("sideBar");
    menuIcon.addEventListener("click", () => {
        sideBar.classList.toggle("hidden");
    });
}
navbar();

function table() {
    const btnCreate = document.getElementById("btn-create");
    const formModalPoducts = document.getElementById("formModalProduct");
    const formCreateProducts = document.getElementById("formCreateProduct");
    const formGroupProduct = document.getElementById("form-popupForm");
    const submitBtn = document.querySelector("#submit-btn-product");
    const searchInput = document.getElementById("searchInput"); // Search input field

    // Initialize an array to store products in memory
    let products = JSON.parse(localStorage.getItem("products")) || []; // Load products from localStorage if available

    // Display the form when Create button is clicked
    btnCreate.addEventListener("click", () => {
        formModalPoducts.style.display = "block";
        formCreateProducts.style.display = "block";
    });

    // Hide the form when it is submitted
    formGroupProduct.addEventListener("submit", (event) => {
        event.preventDefault();
        formModalPoducts.style.display = "none";
        formCreateProducts.style.display = "none";
    });

    // Handle form submission and save data to memory
    submitBtn.addEventListener("click", () => {
        const uploadField = document.querySelector("#upload-filde");
        const inputNameProduct = document.querySelector("#name");
        const productPrice = document.querySelector("#priceProduct");
        const quantityProduct = document.querySelector("#Quantity");
        const time = new Date();

        // Convert image to base64 if there is a file uploaded
        let imageSrc = "";
        if (uploadField.files.length > 0) {
            const file = uploadField.files[0];
            const reader = new FileReader();
            reader.onloadend = function () {
                imageSrc = reader.result; // Base64 string

                // Save product to memory
                saveProductToMemory({
                    name: inputNameProduct.value,
                    image: imageSrc,
                    date:
                        time.getDate() +
                        "/" +
                        (time.getMonth() + 1) +
                        "/" +
                        time.getFullYear(),
                    quantity: quantityProduct.value,
                    price: productPrice.value + "៛",
                    total: (quantityProduct.value * productPrice.value).toFixed(2) + "៛",
                });
            };
            reader.readAsDataURL(file);
        } else {
            // Save product to memory without an image
            saveProductToMemory({
                name: inputNameProduct.value,
                image: "",
                date:
                    time.getDate() +
                    "/" +
                    (time.getMonth() + 1) +
                    "/" +
                    time.getFullYear(),
                quantity: quantityProduct.value,
                price: productPrice.value + "៛",
                total: (quantityProduct.value * productPrice.value).toFixed(2) + "៛",
            });
        }
    });

    // Save product data to memory and localStorage
    function saveProductToMemory(product) {
        products.push(product);
        localStorage.setItem("products", JSON.stringify(products)); // Store updated products in localStorage
        renderTable();
    }

    // Remove product from memory and localStorage
    function removeProductFromMemory(index) {
        products.splice(index, 1); // Remove the product at the given index
        localStorage.setItem("products", JSON.stringify(products)); // Store updated products in localStorage
        renderTable();
    }

    // Render table with products from memory
    function renderTable() {
        const tbody = document.getElementById("product-table");
        tbody.innerHTML = ""; // Clear the table
        products.forEach((product, index) => {
            const tr = document.createElement("tr");
            const tdId = document.createElement("td");
            const tdNameProductImage = document.createElement("td");
            tdNameProductImage.id = "tdNameProductImage";
            const p = document.createElement("td");
            const date = document.createElement("td");
            const tdQuantity = document.createElement("td");
            const tdPrice = document.createElement("td");
            const tdTotal = document.createElement("td");
            const trushProduct = document.createElement("td");
            const tdI = document.createElement("i");

            tdI.className = "fa-solid fa-trash";
            trushProduct.appendChild(tdI);

            tdId.textContent = index + 1; // Use sequential numbering based on array index
            tdNameProductImage.innerHTML = product.image
                ? `<img src="${product.image}" id="productImage"/>`
                : "No Image";
            p.textContent = product.name;
            date.textContent = product.date;
            tdQuantity.textContent = product.quantity;
            tdPrice.textContent = product.price;
            tdTotal.textContent = product.total;

            tr.appendChild(tdId);
            tr.appendChild(tdNameProductImage);
            tr.appendChild(p);
            tr.appendChild(date);
            tr.appendChild(tdQuantity);
            tr.appendChild(tdPrice);
            tr.appendChild(tdTotal);
            tr.appendChild(trushProduct);
            tbody.appendChild(tr);

            // Delete product when trash icon is clicked
            tdI.addEventListener("click", () => {
                removeProductFromMemory(index);
            });
        });
    }

    // Implement search functionality
    searchInput.addEventListener("input", function () {
        const query = searchInput.value.toLowerCase(); // Get the search query and convert to lowercase
        const filteredProducts = products.filter((product) =>
            product.name.toLowerCase().includes(query) // Check if product name matches the query
        );

        // Re-render the table with filtered products
        const tbody = document.getElementById("product-table");
        tbody.innerHTML = ""; // Clear the table
        filteredProducts.forEach((product, index) => {
            const tr = document.createElement("tr");
            const tdId = document.createElement("td");
            const tdNameProductImage = document.createElement("td");
            tdNameProductImage.id = "tdNameProductImage";
            const p = document.createElement("td");
            const date = document.createElement("td");
            const tdQuantity = document.createElement("td");
            const tdPrice = document.createElement("td");
            const tdTotal = document.createElement("td");
            const trushProduct = document.createElement("td");
            const tdI = document.createElement("i");

            tdI.className = "fa-solid fa-trash";
            trushProduct.appendChild(tdI);

            tdId.textContent = index + 1; // Use sequential numbering based on array index
            tdNameProductImage.innerHTML = product.image
                ? `<img src="${product.image}" id="productImage"/>`
                : "No Image";
            p.textContent = product.name;
            date.textContent = product.date;
            tdQuantity.textContent = product.quantity;
            tdPrice.textContent = product.price;
            tdTotal.textContent = product.total;

            tr.appendChild(tdId);
            tr.appendChild(tdNameProductImage);
            tr.appendChild(p);
            tr.appendChild(date);
            tr.appendChild(tdQuantity);
            tr.appendChild(tdPrice);
            tr.appendChild(tdTotal);
            tr.appendChild(trushProduct);
            tbody.appendChild(tr);

            // Delete product when trash icon is clicked
            tdI.addEventListener("click", () => {
                removeProductFromMemory(index);
            });
        });
    });

    // Load products when the page is loaded
    window.onload = function () {
        renderTable();
    };
}

table();

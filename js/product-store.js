const getIndex = localStorage.getItem("selectedFolderIndex"); // Get the current index

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

    // Retrieve the last productId from localStorage, default to 1 if not found
    let productId = localStorage.getItem("lastProductId") || 1;

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

    // Handle form submission and save data to localStorage
    submitBtn.addEventListener("click", () => {
        const tbody = document.getElementById("product-table");
        const tr = document.createElement("tr");
        const tdId = document.createElement("td");
        const tdNameProductImage = document.createElement("td");
        tdNameProductImage.id = "tdNameProductImage";

        const p = document.createElement("p");

        const date = document.createElement("td");
        const tdQuantity = document.createElement("td");
        const tdPrice = document.createElement("td");
        const tdTotal = document.createElement("td");
        const image = document.createElement("img");
        image.id = "productImage";
        const uploadField = document.querySelector("#upload-filde");

        // Convert image to base64 if there is a file uploaded
        let imageSrc = "";
        if (uploadField.files.length > 0) {
            const file = uploadField.files[0];
            const reader = new FileReader();
            reader.onloadend = function () {
                imageSrc = reader.result; // Base64 string
                image.src = imageSrc;
                saveProductToLocalStorage(getIndex, {
                    tdId: tdId.textContent,
                    tdNameProductImage: `<img src="${imageSrc}" id="productImage"/>`,
                    p: `<p>${inputNameProduct.value}</p>`,
                    date: date.textContent,
                    tdQuantity: tdQuantity.textContent,
                    tdPrice: tdPrice.textContent,
                    tdTotal: tdTotal.textContent,
                    trushProduct: trushProduct.innerHTML,
                });
            };
            reader.readAsDataURL(file);
        }

        tdNameProductImage.appendChild(image);

        const inputNameProduct = document.querySelector("#name");
        const productPrice = document.querySelector("#priceProduct");
        const quantityProduct = document.querySelector("#Quantity");
        const time = new Date();
        const trushProduct = document.createElement("td");
        const tdI = document.createElement("i");
        tdI.className = "fa-solid fa-trash";
        trushProduct.appendChild(tdI);

        tdId.textContent = productId++;
        p.textContent = inputNameProduct.value;
        date.textContent =
            time.getDate() +
            "/" +
            (time.getMonth() + 1) +
            "/" +
            time.getFullYear();
        tdQuantity.textContent = quantityProduct.value;
        tdPrice.textContent = productPrice.value + "៛";
        tdTotal.textContent =
            (quantityProduct.value * productPrice.value).toFixed(2) + "៛";

        tr.appendChild(tdId);
        tr.appendChild(tdNameProductImage);
        tr.appendChild(p); // Correct placement of product name
        tr.appendChild(date);
        tr.appendChild(tdQuantity);
        tr.appendChild(tdPrice);
        tr.appendChild(tdTotal);
        tr.appendChild(trushProduct);
        tbody.appendChild(tr);

        // Delete product when trash icon is clicked
        tdI.addEventListener("click", () => {
            tr.remove();
            removeProductFromLocalStorage(getIndex, tdId.textContent); // Remove from localStorage as well
        });

        // Save the updated productId to localStorage
        localStorage.setItem("lastProductId", productId);
    });

    // Save product data to localStorage
    function saveProductToLocalStorage(index, product) {
        let products = JSON.parse(localStorage.getItem(index)) || [];
        products.push(product);
        localStorage.setItem(index, JSON.stringify(products));
    }

    // Remove product from localStorage
    function removeProductFromLocalStorage(index, productId) {
        let products = JSON.parse(localStorage.getItem(index)) || [];
        products = products.filter((product) => product.tdId !== productId);
        localStorage.setItem(index, JSON.stringify(products));
    }

    // Load data from localStorage and display it in the table
    function loadProductsFromLocalStorage() {
        const products = JSON.parse(localStorage.getItem(getIndex)) || [];
        const tbody = document.getElementById("product-table");
        tbody.innerHTML = ""; // Clear the table
        products.forEach((product) => {
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

            tdId.textContent = product.tdId;
            tdNameProductImage.innerHTML = product.tdNameProductImage;
            p.innerHTML = product.p; // Correctly set the product name as HTML
            date.textContent = product.date;
            tdQuantity.textContent = product.tdQuantity;
            tdPrice.textContent = product.tdPrice;
            tdTotal.textContent = product.tdTotal;

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
                tr.remove();
                removeProductFromLocalStorage(getIndex, product.tdId);
            });
        });
    }

    // Implement search functionality
    searchInput.addEventListener("input", function () {
        const query = searchInput.value.toLowerCase(); // Get the search query and convert to lowercase
        const products = JSON.parse(localStorage.getItem(getIndex)) || [];
        const filteredProducts = products.filter((product) =>
            product.p.toLowerCase().includes(query) // Check if product name matches the query
        );

        // Re-render the table with filtered products
        const tbody = document.getElementById("product-table");
        tbody.innerHTML = ""; // Clear the table
        filteredProducts.forEach((product) => {
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

            tdId.textContent = product.tdId;
            tdNameProductImage.innerHTML = product.tdNameProductImage;
            p.innerHTML = product.p; // Correctly set the product name as HTML
            date.textContent = product.date;
            tdQuantity.textContent = product.tdQuantity;
            tdPrice.textContent = product.tdPrice;
            tdTotal.textContent = product.tdTotal;

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
                tr.remove();
                removeProductFromLocalStorage(getIndex, product.tdId);
            });
        });
    });

    // Load products when the page is loaded
    window.onload = function () {
        loadProductsFromLocalStorage();
    };
}

if (getIndex) {
    table();
}

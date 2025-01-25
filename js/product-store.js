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
    const formModalProducts = document.getElementById("formModalProduct");
    const formCreateProducts = document.getElementById("formCreateProduct");
    const formGroupProduct = document.getElementById("form-popupForm");
    const submitBtn = document.querySelector("#submit-btn-product");
    const searchInput = document.getElementById("searchInput");

    // Load products from localStorage or initialize an empty array
    let products = JSON.parse(localStorage.getItem("products")) || [];

    btnCreate.addEventListener("click", () => {
        formModalProducts.style.display = "block";
        formCreateProducts.style.display = "block";
    });

    formGroupProduct.addEventListener("submit", (event) => {
        event.preventDefault();
        formModalProducts.style.display = "none";
        formCreateProducts.style.display = "none";
    });

    submitBtn.addEventListener("click", () => {
        const uploadField = document.querySelector("#upload-filde");
        const inputNameProduct = document.querySelector("#name");
        const productPrice = document.querySelector("#priceProduct");
        const quantityProduct = document.querySelector("#Quantity");
        const time = new Date();

        let imageSrc = "";
        if (uploadField.files.length > 0) {
            const file = uploadField.files[0];
            const reader = new FileReader();
            reader.onloadend = function () {
                imageSrc = reader.result;

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
                    price: productPrice.value,
                    total: (quantityProduct.value * productPrice.value).toFixed(2) + "៛",
                });
            };
            reader.readAsDataURL(file);
        } else {
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
                price: productPrice.value,
                total: (quantityProduct.value * productPrice.value).toFixed(2) + "៛",
            });
        }
    });

    function saveProductToMemory(product) {
        products.push(product);
        localStorage.setItem("products", JSON.stringify(products)); // Persist products in localStorage
        renderTable();
    }

    function removeProductFromMemory(index) {
        products.splice(index, 1);
        localStorage.setItem("products", JSON.stringify(products)); // Persist products in localStorage
        renderTable();
    }

    function renderTable() {
        const tbody = document.getElementById("product-table");
        tbody.innerHTML = "";
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

            tdId.textContent = index + 1;
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

            const makeEditable = (td, field, type = "text", updateTotal = false) => {
                td.addEventListener("dblclick", () => {
                    const input = document.createElement("input");
                    input.type = type;
                    input.value = product[field];
                    td.textContent = ""; 
                    td.appendChild(input);

                    input.focus();
                    input.addEventListener("blur", () => {
                        product[field] = input.value;

                        if (updateTotal) {
                            product.total = (product.quantity * product.price).toFixed(2) + "៛";
                        }

                        localStorage.setItem("products", JSON.stringify(products)); 
                        renderTable(); 
                    });

                    input.addEventListener("keydown", (e) => {
                        if (e.key === "Enter") input.blur();
                    });
                });
            };

            makeEditable(p, "name");
            makeEditable(tdQuantity, "quantity", "number", true);
            makeEditable(tdPrice, "price", "number", true);

            tdI.addEventListener("click", () => {
                removeProductFromMemory(index);
            });
        });
    }

    searchInput.addEventListener("input", function () {
        const query = searchInput.value.toLowerCase();
        const filteredProducts = products.filter((product) =>
            product.name.toLowerCase().includes(query)
        );

        const tbody = document.getElementById("product-table");
        tbody.innerHTML = "";
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

            tdId.textContent = index + 1;
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

            tdI.addEventListener("click", () => {
                removeProductFromMemory(index);
            });
        });
    });

    window.onload = function () {
        renderTable();
    };
}

table();

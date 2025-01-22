const getDataFromProduct = localStorage.getItem("1");
let UserData = getDataFromProduct ? JSON.parse(getDataFromProduct) : [];

function outGoingTable() {
    if (UserData.length) {
        const table = document.querySelector('table');
        const oldTbody = document.getElementById('product-table');
        if (oldTbody) table.removeChild(oldTbody);

        const tableBody = document.createElement('tbody');
        tableBody.setAttribute('id', 'product-table');

        UserData.forEach(data => {
            const tr = document.createElement('tr');
            tr.setAttribute('data-id', data.tdId); // Set an ID for the row

            // Create and populate cells
            const tdID = document.createElement('td');
            tdID.textContent = data.tdId;

            const tdNameProduct = document.createElement('td');
            tdNameProduct.textContent = data.p;

            const tdDate = document.createElement('td');
            tdDate.textContent = data.date;

            const tdQuantitys = document.createElement('td');
            tdQuantitys.textContent = data.tdQuantity;

            const tdPrices = document.createElement('td');
            tdPrices.textContent = data.tdPrice;

            const tdTotal = document.createElement('td');
            tdTotal.textContent = data.tdTotal;

            // Append cells to the row
            tr.appendChild(tdID);
            tr.appendChild(tdNameProduct);
            tr.appendChild(tdDate);
            tr.appendChild(tdQuantitys);
            tr.appendChild(tdPrices);
            tr.appendChild(tdTotal);

            // Append row to the tbody
            tableBody.appendChild(tr);
        });

        // Append tbody to the table
        table.appendChild(tableBody);
    }
}

function updateTableRow(productId, updatedProduct) {
    const tableRow = document.querySelector(`tr[data-id='${productId}']`);
    if (tableRow) {
        const cells = tableRow.children;

        // Update cells in the row
        cells[3].textContent = updatedProduct.tdQuantity; // Quantity column
        cells[5].textContent = updatedProduct.tdTotal;    // Total column
    }
}

function handleProductOperations() {
    const inputNameProduct = document.querySelector("#name-product");
    const inputQuantityProduct = document.querySelector("#quantity-product");
    const btnSend = document.querySelector("#btn");

    btnSend.addEventListener("click", () => {
        const productName = inputNameProduct.value.trim();
        const quantityToSubtract = parseInt(inputQuantityProduct.value, 10);

        if (!productName || isNaN(quantityToSubtract) || quantityToSubtract <= 0) {
            alert("Please provide a valid product name and quantity.");
            return;
        }

        const product = UserData.find(item => item.p.toLowerCase() === productName.toLowerCase());
        if (product) {
            if (product.tdQuantity >= quantityToSubtract) {
                product.tdQuantity -= quantityToSubtract;
                product.tdTotal = product.tdQuantity * product.tdPrice; // Update total

                // Update the table row directly
                updateTableRow(product.tdId, product);

                // Update local storage
                localStorage.setItem("1", JSON.stringify(UserData));

                alert(`Quantity subtracted successfully. Remaining stock: ${product.tdQuantity}`);
            } else {
                alert("Insufficient stock.");
            }
        } else {
            alert("Product not found.");
        }
    });
}

// Initialize table and operations
outGoingTable();
handleProductOperations();

function navbar() {
    const menuIcon = document.querySelector("#menu");
    const sideBar = document.getElementById("sideBar");
    menuIcon.addEventListener("click", () => {
        sideBar.classList.toggle("hidden");
    });
}
navbar();

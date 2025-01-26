// Retrieve products from localStorage
const getDataFromProduct = localStorage.getItem("products");
let UserData = getDataFromProduct ? JSON.parse(getDataFromProduct) : [];

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
        if (data.quantity<=10&&data.quantity>0) {
            // tr.style.background="#fff5cc"
            tr.id="tr-hover-samll-than-ten"
        }else if (data.quantity==0){
            tr.id="tr-outstock"
            
        }

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

// Navbar functionali   ty
function navbar() {
    const menuIcon = document.querySelector("#menu");
    const sideBar = document.getElementById("sideBar");
    menuIcon.addEventListener("click", () => {
        sideBar.classList.toggle("hidden");
    });
}
navbar();

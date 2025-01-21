
const getDataFromProduct = localStorage.getItem("1");
function outGoingTable(){
    if (getDataFromProduct) {
        const UserData = JSON.parse(getDataFromProduct);
    
        const tableBody = document.createElement('tbody');
        tableBody.setAttribute('id', 'product-table');
    
        UserData.forEach(data => {
            const tr = document.createElement('tr');
    
            // Create and populate cells
            const tdID = document.createElement('td');
            tdID.textContent = data.tdId;
    
            const tdNameProduct = document.createElement('td');
            tdNameProduct.textContent = data.p;
    
            // const productImage=document.createElement("img")
            // productImage.src=data.tdNameProductImage
    
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
            // tr.appendChild(productImage)
            tr.appendChild(tdNameProduct);
            tr.appendChild(tdDate);
            tr.appendChild(tdQuantitys);
            tr.appendChild(tdPrices);
            tr.appendChild(tdTotal);
    
            // Append row to the tbody
            tableBody.appendChild(tr);
        });
    
        // Append tbody to an existing table
        const table = document.querySelector('table'); // Ensure your table element exists in HTML
        table.appendChild(tableBody);
    }
}
outGoingTable()



function navbar() {
    const menuIcon = document.querySelector("#menu");
    const sideBar = document.getElementById("sideBar");
    menuIcon.addEventListener("click", () => {
        sideBar.classList.toggle("hidden");
    });
}
navbar();





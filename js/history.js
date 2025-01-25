function navbar() {
  const menuIcon = document.querySelector("#menu");
  const sideBar = document.getElementById("sideBar");
  menuIcon.addEventListener("click", () => {
    sideBar.classList.toggle("hidden");
  });
}
navbar();

const getDataFromProduct = localStorage.getItem("transactions");
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
    const CustomerName = document.createElement("td");
    CustomerName.textContent = data. customer;

    const tdDate = document.createElement("td");
    tdDate.textContent = data.date;

    const tdQuantitys = document.createElement("td");
    tdQuantitys.textContent = data.quantity;
    if (data.quantity <= 10) {
      tr.id = "tr-hover-samll-than-ten";
    }

    const tdPrices = document.createElement("td");
    tdPrices.textContent = data.price;

    const tdTotal = document.createElement("td");
    tdTotal.textContent = (parseFloat(data.quantity) * parseFloat(data.price)).toFixed(2);

    const tdTrush = document.createElement("td");
    const tdI = document.createElement("i");
    tdI.className = "fa-solid fa-trash";
    tdTrush.appendChild(tdI);

    // Add event listener to delete the row
    tdTrush.addEventListener("click", () => {
      // Remove the item from UserData
      UserData = UserData.filter((item) => item.tdId !== data.tdId);

      // Update localStorage
      localStorage.setItem("transactions", JSON.stringify(UserData));

      // Refresh the table
      outGoingTable();
    });

    tr.appendChild(tdID);
    tr.appendChild(tdNameProduct);
    tr.appendChild(CustomerName)
    tr.appendChild(tdDate);
    tr.appendChild(tdQuantitys);
    tr.appendChild(tdPrices);
    tr.appendChild(tdTotal);
    tr.appendChild(tdTrush);
    tableBody.appendChild(tr);
  });

  table.appendChild(tableBody);
}

// Populate the table initially
outGoingTable();

document.addEventListener("DOMContentLoaded", () => {
    const createButton = document.getElementById("btn");

    createButton.addEventListener("click", () => {
        // Add your functionality here
        alert("Create button clicked!");
        console.log("Create button clicked!");

        // Example: Add a new directory card dynamically
        const cardDirectory = document.querySelector(".card-diragetorys");
        const newDirectory = document.createElement("div");
        newDirectory.classList.add("diragetory");
        newDirectory.innerHTML = `
            <div class="folder-name">
                <i class="fa-solid fa-folder"></i>
                <p>New Folder</p>
            </div>
            <div class="total-product">
                <p>0</p>
            </div>
        `;
        cardDirectory.appendChild(newDirectory);
    });
});

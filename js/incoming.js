document.addEventListener("DOMContentLoaded", () => {
    const createButton = document.getElementById("btn");

    // Load saved data from localStorage
    const loadFolders = () => {
        const savedFolders = JSON.parse(localStorage.getItem("folders")) || [];
        const cardDirectory = document.querySelector(".card-diragetorys");

        cardDirectory.innerHTML = ""; // Clear current folders

        savedFolders.forEach(folder => {
            createFolderElement(folder.name, folder.total);
        });
    };

    // Save data to localStorage
    const saveFolders = () => {
        const folders = [];
        const folderElements = document.querySelectorAll(".diragetory");

        folderElements.forEach(folderElement => {
            const folderName = folderElement.querySelector(".add-name-folder").textContent;
            const totalProduct = folderElement.querySelector(".total-product p").textContent;
            folders.push({ name: folderName, total: totalProduct });
        });

        localStorage.setItem("folders", JSON.stringify(folders));
    };

    // Create a folder element
    const createFolderElement = (name = "New Folder", total = "0") => {
        const cardDirectory = document.querySelector(".card-diragetorys");
        const newDirectory = document.createElement("div");
        newDirectory.classList.add("diragetory");
        newDirectory.innerHTML = `
            <div class="folder-name">
                <i class="fa-solid fa-folder"></i>
                <p class="add-name-folder">${name}</p>
            </div>
            <div class="total-product">
                <p>${total}</p>
            </div>
        `;
        cardDirectory.appendChild(newDirectory);

        const folderNameElement = newDirectory.querySelector(".add-name-folder");
        const totalProductElement = newDirectory.querySelector(".total-product p");

        // Rename folder name on double-click
        folderNameElement.addEventListener("dblclick", () => {
            const currentName = folderNameElement.textContent;
            const inputField = document.createElement("input");
            inputField.type = "text";
            inputField.value = currentName;
            inputField.className = "rename-input";

            folderNameElement.replaceWith(inputField);
            inputField.focus();

            inputField.addEventListener("blur", () => {
                const newName = inputField.value.trim() || "New Folder";
                inputField.replaceWith(folderNameElement);
                folderNameElement.textContent = newName;

                saveFolders(); // Save updated data
            });

            inputField.addEventListener("keydown", (event) => {
                if (event.key === "Enter") {
                    inputField.blur();
                }
            });
        });

        // Edit total-product value on double-click
        totalProductElement.addEventListener("dblclick", () => {
            const currentValue = totalProductElement.textContent;
            const inputField = document.createElement("input");
            inputField.type = "number";
            inputField.value = currentValue;
            inputField.className = "edit-total-input";

            totalProductElement.replaceWith(inputField);
            inputField.focus();

            inputField.addEventListener("blur", () => {
                const newValue = inputField.value.trim() || "0";
                inputField.replaceWith(totalProductElement);
                totalProductElement.textContent = newValue;

                saveFolders(); // Save updated data
            });

            inputField.addEventListener("keydown", (event) => {
                if (event.key === "Enter") {
                    inputField.blur();
                }
            });
        });

        // Right-click to delete
        newDirectory.addEventListener("contextmenu", (event) => {
            event.preventDefault();

            // SweetAlert2 confirmation for deletion
            Swal.fire({
                title: 'Delete Folder?',
                text: "Are you sure you want to delete this folder?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.isConfirmed) {
                    newDirectory.remove();
                    saveFolders(); // Save updated data

                    Swal.fire(
                        'Deleted!',
                        'Your folder has been deleted.',
                        'success'
                    );
                }
            });
        });
    };

    // Create folder on button click
    createButton.addEventListener("click", () => {
        // SweetAlert2 confirmation dialog
        Swal.fire({
            title: 'Create a new folder?',
            text: "Do you want to add a new folder?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, create it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                createFolderElement();
                saveFolders(); // Save new folder to localStorage

                Swal.fire(
                    'Created!',
                    'Your new folder has been created.',
                    'success'
                );
            }
        });
    });

    // Load saved folders when the page loads
    loadFolders();
});

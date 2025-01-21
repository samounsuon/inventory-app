function navbar() {
  const menuIcon = document.querySelector("#menu");
  const sideBar = document.getElementById("sideBar");
  menuIcon.addEventListener("click", () => {
    sideBar.classList.toggle("hidden");
  });
}
navbar(); 

const btnCreate = document.getElementById("btn");
const cardDiragetorys = document.querySelector(".card-diragetorys");
let currentFolder = null; 

function saveToLocalStorage() {
  const folders = [];
  document.querySelectorAll(".diragetory").forEach((dir) => {
      const folderName = dir.querySelector(".add-name-folder").textContent;
      const date = dir.querySelector(".date p").textContent;
      const totalProduct = dir.querySelector(".add-total-product").textContent;

      folders.push({ folderName, date, totalProduct });
  });

  localStorage.setItem("folders", JSON.stringify(folders));
}


function loadFromLocalStorage() {
  const folders = JSON.parse(localStorage.getItem("folders")) || [];
  folders.forEach((folder) => {
      createFolderElement(folder.folderName, folder.date, folder.totalProduct);
  });
}
// console.log(folders)


function createFolderElement(name = "New folder", date = null, totalProduct = 0) {
  const diragetory = document.createElement("div");
  diragetory.className = "diragetory";

  const folderName = document.createElement("div");
  folderName.className = "folder-name";
  const linkIconFolder = document.createElement("a")
  linkIconFolder.href="storproduct.html"

  const iconFolder = document.createElement("i");
  iconFolder.className = "fa-solid fa-folder";
  linkIconFolder.appendChild(iconFolder)
  const pFolder = document.createElement("p");
  pFolder.className = "add-name-folder";
  pFolder.textContent = name;
  folderName.appendChild(linkIconFolder);
  folderName.appendChild(pFolder);

  const dateDiv = document.createElement("div");
  dateDiv.className = "date";
  const pDate = document.createElement("p");
  if (!date) {
      const time = new Date();
      date = time.getFullYear() + "/" + (time.getMonth() + 1) + "/" + time.getDate();
  }
  pDate.textContent = date;
  dateDiv.appendChild(pDate);

  const totalProductDiv = document.createElement("div");
  totalProductDiv.className = "total-product";
  const pTotalProduct = document.createElement("p");
  pTotalProduct.className = "add-total-product";
  pTotalProduct.textContent = totalProduct;
  const iconTotal = document.createElement("i");
  iconTotal.className = "fa-solid fa-square-poll-vertical";

  totalProductDiv.appendChild(pTotalProduct);
  totalProductDiv.appendChild(iconTotal);

  const deleteProduct = document.createElement("div");
  deleteProduct.className = "delete-product";
  const iconTrash = document.createElement("i");
  iconTrash.className = "fa-solid fa-trash";
  deleteProduct.appendChild(iconTrash);

  diragetory.appendChild(folderName);
  diragetory.appendChild(dateDiv);
  diragetory.appendChild(totalProductDiv);
  diragetory.appendChild(deleteProduct);
  cardDiragetorys.appendChild(diragetory);

  // Delete functionality
  iconTrash.addEventListener("click", () => {
      Swal.fire({
          title: "Are you sure?",
          text: "You want to delete this folder!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel!",
      }).then((result) => {
          if (result.isConfirmed) {
              diragetory.remove();
              saveToLocalStorage();
              Swal.fire("Deleted!", "Your folder has been deleted.", "success");
          } else {
              Swal.fire("Cancelled", "Your folder is safe :)", "error");
          }
      });
  });

 
  pFolder.addEventListener("dblclick", () => {
      const inputName = document.querySelector("#name");
      const formModal = document.getElementById("formModal");
      const formOverlay = document.getElementById("formOverlay");

      currentFolder = pFolder;

   
      formModal.style.display = "block";
      formOverlay.style.display = "block";
  });



  function addIndexListeners() {
    const directories = document.querySelectorAll(".diragetory");
    directories.forEach((dir, index) => {
      dir.addEventListener("click", () => {
        localStorage.setItem("selectedFolderIndex", index + 1); 

      });
    });
  }
  addIndexListeners();
}

function createCard() {
  btnCreate.addEventListener("click", () => {
      createFolderElement();
      saveToLocalStorage(); 
  });
}

const popupForm = document.getElementById("popupForm");
popupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputName = document.querySelector("#name");
  const formModal = document.getElementById("formModal");
  const formOverlay = document.getElementById("formOverlay");


  if (currentFolder && inputName.value.trim() !== "") {
      currentFolder.textContent = inputName.value.trim();
      saveToLocalStorage(); 
  }


  formModal.style.display = "none";
  formOverlay.style.display = "none";
  inputName.value = ""; // Clear the input field
});


window.addEventListener("load", loadFromLocalStorage);
createCard();

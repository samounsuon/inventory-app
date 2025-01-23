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
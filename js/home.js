function navbar() {
    const menuIcon = document.querySelector("#menu");
    const sideBar = document.querySelector(".aside-bar");
    menuIcon.addEventListener("click", () => {
      sideBar.classList.toggle("hidden");
    });
  }
  navbar();
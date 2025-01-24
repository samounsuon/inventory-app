
  // Get the menu button and sidebar
const menuButton = document.getElementById("menu-button");
const sidebar = document.getElementById("sidebar");
const mainContent = document.getElementById("main-content");

// Add event listener to the menu button
menuButton.addEventListener("click", () => {
  // Todo:classList.toggle the 'hidden' class for the sidebar
  sidebar.classList.toggle("hidden");
  // Todo:classList.toggle the 'compact' class for the main content
  mainContent.classList.toggle("compact")
});
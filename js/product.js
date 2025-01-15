function navbar(){
    const menuIcon = document.querySelector("#menu");
    const sideBar = document.getElementById("sideBar");
    menuIcon.addEventListener("click", (e) => {
        sideBar.classList.toggle("hidden"); 
    });
}
navbar()
const btnCreate =document.getElementById("btn")
const cardDiragetorys=document.querySelector(".card-diragetorys")

function createCard(){
    btnCreate.addEventListener("click",()=>{
        const diragetory= document.createElement("div");
        diragetory.className="diragetory";
    
        const folderName= document.createElement("div");
        folderName.className="folder-name"
    
        const iconFolder=document.createElement("i");
        iconFolder.className="fa-solid fa-folder";
        const pFolder=document.createElement("p");
        pFolder.className="add-name-folder";
        pFolder.textContent="New folder";
        folderName.appendChild(iconFolder)
        folderName.appendChild(pFolder)
        const date=document.createElement("data")
        date.className="data"
        const pdate =document.createElement('p')
        const time = new Date()   
        pdate.textContent=textContent=time.getFullYear()+"/"+(time.getMonth()+1)+"/"+time.getDate()
        date.appendChild(pdate)
    
        const totalProduct = document.createElement("div")
        totalProduct.className="total-product"
        const pTotalProduct=document.createElement("p")
        pTotalProduct.className="add-total-product"
        pTotalProduct.textContent=0
        const iconTotal =document.createElement("i")
        iconTotal.className="fa-solid fa-square-poll-vertical"
    
        totalProduct.appendChild(pTotalProduct)
        totalProduct.appendChild(iconTotal)
    
        const deleteProduct = document.createElement("div")
        deleteProduct.className="delet-prodcut"
        const iconTrush =document.createElement('i')
        iconTrush.className="fa-solid fa-trash"
        deleteProduct.appendChild(iconTrush)
    
        diragetory.appendChild(folderName)
        diragetory.appendChild(date)
        diragetory.appendChild(totalProduct)
        diragetory.appendChild(deleteProduct)
        cardDiragetorys.appendChild(diragetory)
        iconTrush.addEventListener("click",()=>{
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: "btn btn-success",
                  cancelButton: "btn btn-danger"
                },
                buttonsStyling: false
              });
              swalWithBootstrapButtons.fire({
                title: "Are you sure?",
                text: "You want delet this filde !",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel!",
                reverseButtons: true
              }).then((result) => {
                if (result.isConfirmed) {
                    diragetory.remove()
                  swalWithBootstrapButtons.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            } else if (
               
                result.dismiss === Swal.DismissReason.cancel
                ) {
                  swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Your imaginary file is safe :)",
                    icon: "error"
                  });
                }
              });              
        })
        pFolder.addEventListener("dblclick",()=>{
            const formModal = document.getElementById("formModal");
            const formOverlay = document.getElementById("formOverlay");
            const closeFormButton = document.getElementById("closeFormButton");
            const popupForm = document.getElementById("popupForm");
            const inputName=document.querySelector("#name")
            

            pFolder.addEventListener("click", () => {
                formModal.style.display = "block";
                formOverlay.style.display = "block";
            });
            popupForm.addEventListener("submit", (event) => {
                event.preventDefault(); // Prevent page reload
                formModal.style.display = "none"; // Close the modal
                formOverlay.style.display = "none";
            });
            inputName.addEventListener("change",()=>{
                pFolder.textContent=inputName.value  
            })
        })
    })
}
createCard()






const getDataFromProduct=localStorage.getItem("1")
if(getDataFromProduct){
    const dataFromProduct=JSON.parse(getDataFromProduct)
    dataFromProduct.forEach(product => {
        console.log(product)
    });
}


document.addEventListener('DOMContentLoaded', () => {
    const container = document.createElement('div');
    container.className = 'container';

    // Outgoing form section
    const outgoing = document.createElement('div');
    outgoing.className = 'outgoing';
    const fields = ['Document\' s date', 'Document No', 'Customer', 'Discount(%)', 'Product', 'Comment'];
    const fieldInputs = {};

    fields.forEach(field => {
        const fieldId = field.toLowerCase().replace(/[^a-z0-9]/g, '-');
        const orderDiv = document.createElement('div');
        orderDiv.className = 'order';
        orderDiv.innerHTML = `<p>${field}</p><input id="${fieldId}" type="text" value="">`;
        outgoing.appendChild(orderDiv);

        fieldInputs[fieldId] = '';
    });

    container.appendChild(outgoing);

    // Add product section
    const addProduct = document.createElement('div');
    addProduct.className = 'add-product';

    const products = [
        { img: '/image/top.jpg', name: 'Accessories', stock: 947, price: '$2,367.5' },
        { img: '/image/coca-cola.main-image.290-417.png', name: 'Coca-Cola', stock: 532, price: '$1,862' },
        { img: '/image/10718830EA-checkers515Wx515H.png', name: 'Lays Sour Cream', stock: 7532, price: '$18,076.8' },
        { img: '/image/O_SW_LF_bdb991019d.png', name: 'Oreo', stock: 1035, price: '$1,656' },
        { img: '/image/images.jpg', name: 'Tonic', stock: 2412, price: '$4,824' },
        { img: '/image/6949.jpg', name: 'Lays Barbecue', stock:329, price: '$592.2' },
        { img: '/image/1789484621_0340_0340.jpg', name: 'Cowboy Pants', stock: 743, price: '$11,145' },
        { img: '/image/e701b6d6-b5fd-415c-8138-f733f087628c.png', name: 'Shirt', stock: 324, price: '$3,402' },
    ];

    const productElements = [];

    products.forEach(product => {
        const productStock = document.createElement('div');
        productStock.className = 'product-stock';

        const productName = document.createElement('div');
        productName.className = 'product-name';
        productName.innerHTML = `<img src="${product.img}" alt=""><span>${product.name}</span>`;
        productStock.appendChild(productName);

        const totalStock = document.createElement('div');
        totalStock.className = 'total-product-stock';
        totalStock.innerHTML = `<p>${product.stock}</p><p class="number">${product.price}</p>`;
        productStock.appendChild(totalStock);

        addProduct.appendChild(productStock);
        productElements.push({ product, stockElement: totalStock.children[0], priceElement: totalStock.children[1] });
    });

    container.appendChild(addProduct);

    // Create button section
    const createBtnDiv = document.createElement('div');
    createBtnDiv.className = 'create-btn';
    createBtnDiv.innerHTML = `
        <button id="btn">
            <i class="fa-regular fa-paper-plane"></i>
        </button>
    `;
    container.appendChild(createBtnDiv);

    // Append container to the body
    document.body.appendChild(container);

    // Include the script dynamically
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11.0.18/dist/sweetalert2.all.min.js";
    document.body.appendChild(script);

    // Add event listener for the create button
    document.getElementById('btn').addEventListener('click', () => {
        // Collect data from input fields
        Object.keys(fieldInputs).forEach(id => {
            fieldInputs[id] = document.getElementById(id).value.trim();
        });

        console.log('Form Data:', fieldInputs);

        // Update product price based on the discount
        const productName = fieldInputs['product'];
        const discount = parseFloat(fieldInputs['discount']) || 0;
        const documentNo = parseInt(fieldInputs['document-no'], 10); // Convert to integer

        if (isNaN(documentNo) || documentNo <= 0) {
            Swal.fire({
                title: 'Error!',
                text: 'Please enter a valid number in "Document No".',
                icon: 'error',
            });
            return;
        }

        const productToUpdate = productElements.find(el => el.product.name.toLowerCase() === productName.toLowerCase());
        if (productToUpdate) {
            const currentPrice = parseFloat(productToUpdate.product.price.replace('$', ''));
            const discountedPrice = (currentPrice * (1 - discount / 100)).toFixed(2);

            if (productToUpdate.product.stock < documentNo) {
                Swal.fire({
                    title: 'Error!',
                    text: `Not enough stock for ${productName}. Available: ${productToUpdate.product.stock}`,
                    icon: 'error',
                });
                return;
            }

            // Update the stock and price
            productToUpdate.product.stock -= documentNo;
            productToUpdate.product.price = `$${discountedPrice}`;
            productToUpdate.stockElement.textContent = productToUpdate.product.stock;
            productToUpdate.priceElement.textContent = productToUpdate.product.price;

            Swal.fire({
                title: 'Success!',
                text: `Updated ${productName}. Stock: ${productToUpdate.product.stock}, Price: ${productToUpdate.product.price}`,
                icon: 'success',
            });
        } else {
            Swal.fire({
                title: 'Error!',
                text: `Product "${productName}" not found.`,
                icon: 'error',
            });
        }
    });
});


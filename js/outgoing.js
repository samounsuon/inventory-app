document.addEventListener('DOMContentLoaded', () => {
    const container = document.createElement('div');
    container.className = 'container';

    // Outgoing form section
    const outgoing = document.createElement('div');
    outgoing.className = 'outgoing';
    const fields = ['Document\'s date', 'Document No', 'Customer', 'Discount(%)', 'Product', 'Comment'];
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
        { img: '/image/top.jpg', name: 'Accessories', stock: 17, price: '$23.99/$102.45' },
        { img: '/image/coca-cola.main-image.290-417.png', name: 'Coca-Cola', stock: 120, price: '$23.99/$102.45' },
        { img: '/image/10718830EA-checkers515Wx515H.png', name: 'Lays Sour Cream', stock: 60, price: '$23.99/$102.45' },
        { img: '/image/O_SW_LF_bdb991019d.png', name: 'Oreo', stock: 18, price: '$23.99/$102.45' },
        { img: '/image/images.jpg', name: 'Tonic', stock: 54, price: '$23.99/$102.45' },
        { img: '/image/6949.jpg', name: 'Lays Barbecue', stock: 87, price: '$23.99/$102.45' },
        { img: '/image/1789484621_0340_0340.jpg', name: 'Cowboy Pants', stock: 94, price: '$23.99/$102.45' },
        { img: '/image/e701b6d6-b5fd-415c-8138-f733f087628c.png', name: 'Shirt', stock: 76, price: '$23.99/$102.45' },
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
            fieldInputs[id] = document.getElementById(id).value;
        });

        // Display the data (simulating sending it somewhere)
        console.log('Form Data:', fieldInputs);

        // Example: Update products dynamically based on the "Product" field
        const productName = fieldInputs['product'];
        const discount = parseFloat(fieldInputs['discount']) || 0;

        const productToUpdate = productElements.find(el => el.product.name.toLowerCase() === productName.toLowerCase());
        if (productToUpdate) {
            // Apply discount to the price
            const [currentPrice] = productToUpdate.product.price.split('/');
            const discountedPrice = (parseFloat(currentPrice.replace('$', '')) * (1 - discount / 100)).toFixed(2);

            // Update the stock and price
            productToUpdate.product.stock -= 1; // Assuming 1 product sold
            productToUpdate.product.price = `$${discountedPrice}/${currentPrice}`;
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

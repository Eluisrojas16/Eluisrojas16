document.addEventListener('DOMContentLoaded', () => {
    let products = [];
    let currentPage = 1;
    const itemsPerPage = 10;

    const productForm = document.getElementById('product-form');
    const productList = document.getElementById('product-list');
    const searchForm = document.getElementById('search-form');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');

    let isEditing = false;
    let currentIndex = -1;

    // Agregar/Actualizar producto
    productForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const partNumber = document.getElementById('part-number').value;
        const description = document.getElementById('description').value;
        const quantity = document.getElementById('quantity').value;
        const category = document.getElementById('category').value;
        const cost = document.getElementById('cost').value;

        if (!isEditing) {
            const existingProduct = products.find(p => p.partNumber === partNumber);
            if (existingProduct) {
                alert('Este No. Parte ya existe.');
                return;
            }
            products.push({ partNumber, description, quantity, category, cost });
        } else {
            products[currentIndex] = { partNumber, description, quantity, category, cost };
            isEditing = false;
            currentIndex = -1;
        }

        productForm.reset();
        renderProducts();
    });

    // Funcionalidad de búsqueda
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const searchPart = document.getElementById('search-part').value.trim().toLowerCase();
        const searchDesc = document.getElementById('search-desc').value.trim().toLowerCase();

        const filteredProducts = products.filter(product => {
            const partMatch = product.partNumber.toLowerCase().includes(searchPart);
            const descMatch = product.description.toLowerCase().includes(searchDesc);
            return partMatch || descMatch;
        });

        renderFilteredProducts(filteredProducts);
    });

    function renderFilteredProducts(filteredProducts) {
        productList.innerHTML = '';
        filteredProducts.forEach((product, i) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.partNumber}</td>
                <td>${product.description}</td>
                <td>${product.quantity}</td>
                <td>${product.category}</td>
                <td>${product.cost}</td>
                <td>
                    <button class="edit" data-index="${i}">Editar</button>
                    <button class="delete" data-index="${i}">Eliminar</button>
                </td>
            `;
            productList.appendChild(row);
        });
    }

    function renderProducts() {
        productList.innerHTML = '';

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, products.length);

        for (let i = startIndex; i < endIndex; i++) {
            const product = products[i];
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.partNumber}</td>
                <td>${product.description}</td>
                <td>${product.quantity}</td>
                <td>${product.category}</td>
                <td>${product.cost}</td>
                <td>
                    <button class="edit" data-index="${i}">Editar</button>
                    <button class="delete" data-index="${i}">Eliminar</button>
                </td>
            `;
            productList.appendChild(row);
        }

        pageInfo.textContent = `Página ${currentPage} de ${Math.ceil(products.length / itemsPerPage)}`;

        document.querySelectorAll('.edit').forEach(button => {
            button.addEventListener('click', (e) => {
                currentIndex = e.target.dataset.index;
                const product = products[currentIndex];

                document.getElementById('part-number').value = product.partNumber;
                document.getElementById('description').value = product.description;
                document.getElementById('quantity').value = product.quantity;
                document.getElementById('category').value = product.category;
                document.getElementById('cost').value = product.cost;

                isEditing = true;
            });
        });

        document.querySelectorAll('.delete').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                products.splice(index, 1);
                renderProducts();
            });
        });
    }

    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderProducts();
        }
    });

    nextPageBtn.addEventListener('click', () => {
        if (currentPage < Math.ceil(products.length / itemsPerPage)) {
            currentPage++;
            renderProducts();
        }
    });

    renderProducts();
});

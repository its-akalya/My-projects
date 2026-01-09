const API_URL = "https://fakestoreapi.com/products";

const productsDiv = document.getElementById("products");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const form = document.getElementById("productForm");
const searchInput = document.getElementById("searchInput");

let productsData = [];

/* ---------------- FETCH PRODUCTS ---------------- */
async function fetchProducts() {
    try {
        loading.style.display = "block";
        const res = await fetch(API_URL);
        productsData = await res.json();
        displayProducts(productsData);
        loading.style.display = "none";
    } catch (err) {
        error.textContent = "Failed to load products!";
        loading.style.display = "none";
    }
}

fetchProducts();

/* ---------------- DISPLAY PRODUCTS ---------------- */
function displayProducts(products) {
    productsDiv.innerHTML = "";

    products.forEach(product => {
        const div = document.createElement("div");
        div.className = "product";

        div.innerHTML = `
            <img src="${product.image}">
            <h3>${product.title}</h3>
            <p><b>₹${product.price}</b></p>
            <p>${product.category}</p>
            <button onclick="editProduct(${product.id})">Edit</button>
            <button onclick="deleteProduct(${product.id})">Delete</button>
        `;

        productsDiv.appendChild(div);
    });
}

/* ---------------- ADD / UPDATE PRODUCT ---------------- */
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.getElementById("productId").value;

    const product = {
        title: title.value,
        price: price.value,
        category: category.value,
        description: description.value,
        image: image.value
    };

    try {
        if (id) {
            await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                body: JSON.stringify(product),
                headers: { "Content-Type": "application/json" }
            });
        } else {
            await fetch(API_URL, {
                method: "POST",
                body: JSON.stringify(product),
                headers: { "Content-Type": "application/json" }
            });
        }

        form.reset();
        fetchProducts();
    } catch {
        error.textContent = "Operation failed!";
    }
});

/* ---------------- EDIT PRODUCT ---------------- */
function editProduct(id) {
    const product = productsData.find(p => p.id === id);

    productId.value = product.id;
    title.value = product.title;
    price.value = product.price;
    category.value = product.category;
    image.value = product.image;
    description.value = product.description;
}

/* ---------------- DELETE PRODUCT ---------------- */
async function deleteProduct(id) {
    try {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        fetchProducts();
    } catch {
        error.textContent = "Delete failed!";
    }
}

/* ---------------- SEARCH ---------------- */
searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();
    const filtered = productsData.filter(p =>
        p.title.toLowerCase().includes(value)
    );
    displayProducts(filtered);
});


// ========================================
// PRODUTOS
// ========================================

const products = [
  {
    id: 1,
    name: "Nike Air Max",
    category: "Running",
    price: 599.90,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
  },
  {
    id: 2,
    name: "Adidas Sport",
    category: "Sport",
    price: 399.90,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500"
  },
  {
    id: 3,
    name: "Puma Casual",
    category: "Casual",
    price: 299.90,
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500"
  }
];

// ========================================
// ELEMENTOS
// ========================================

const productsGrid = document.getElementById("productsGrid");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

// ========================================
// CARRINHO
// ========================================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(id) {
  const product = products.find(p => p.id === id);

  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }

  saveCart();
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);

  saveCart();
  renderCart();
}

// ========================================
// RENDER PRODUTOS
// ========================================

function renderProducts(list) {
  productsGrid.innerHTML = "";

  list.forEach(product => {
    productsGrid.innerHTML += `
      <div class="product-card">
        <img src="${product.image}">

        <h3>${product.name}</h3>

        <p>${product.category}</p>

        <strong>
          ${product.price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          })}
        </strong>

        <button onclick="addToCart(${product.id})">
          Adicionar
        </button>
      </div>
    `;
  });
}

// ========================================
// RENDER CARRINHO
// ========================================

function renderCart() {
  cartItems.innerHTML = "";

  let total = 0;
  let quantity = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
    quantity += item.quantity;

    cartItems.innerHTML += `
      <div class="cart-item">
        <div>
          <h4>${item.name}</h4>
          <p>Qtd: ${item.quantity}</p>
        </div>

        <div>
          <strong>
            ${(item.price * item.quantity).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            })}
          </strong>

          <button onclick="removeFromCart(${item.id})">
            ❌
          </button>
        </div>
      </div>
    `;
  });

  cartTotal.textContent = total.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

  cartCount.textContent = quantity;
}

// ========================================
// FILTROS
// ========================================

function applyFilters() {
  const search = searchInput.value.toLowerCase();
  const category = categoryFilter.value;

  let filtered = [...products];

  if (search) {
    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(search)
    );
  }

  if (category !== "all") {
    filtered = filtered.filter(product =>
      product.category === category
    );
  }

  renderProducts(filtered);
}

// ========================================
// CHECKOUT
// ========================================

const checkoutBtn = document.getElementById("checkoutBtn");

checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Seu carrinho está vazio.");
    return;
  }

  alert("Compra realizada com sucesso 🎉");

  cart = [];

  saveCart();
  renderCart();
});

// ========================================
// EVENTOS
// ========================================

searchInput.addEventListener("input", applyFilters);
categoryFilter.addEventListener("change", applyFilters);

// ========================================
// INIT
// ========================================

renderProducts(products);
renderCart();


// ======================================
// CONFIG
// ======================================
const CART_KEY = "veltrix_cart";

// ======================================
// ELEMENTOS
// ======================================
const cartItemsEl = document.getElementById("cartItems");
const cartSubtotalEl = document.getElementById("cartSubtotal");
const cartShippingEl = document.getElementById("cartShipping");
const cartTotalEl = document.getElementById("cartTotal");
const cartCountEl = document.getElementById("cartCount");

let discount = 0;

// ======================================
// LOAD CART
// ======================================
function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

let cart = getCart();

// ======================================
// FORMATAR MOEDA
// ======================================
function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(value);
}

// ======================================
// SALVAR
// ======================================
function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));

  updateCartBadge();
}

// ======================================
// BADGE
// ======================================
function updateCartBadge() {

  if (!cartCountEl) return;

  const total = cart.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  cartCountEl.textContent = total;
}

// ======================================
// ADICIONAR PRODUTO
// ======================================
function addToCart(product) {

  const existing = cart.find(item => item.id === product.id);

  if (existing) {

    existing.quantity++;

  } else {

    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });

  }

  saveCart();

  showToast(`${product.name} adicionado ao carrinho 🛒`);
}

// ======================================
// REMOVER
// ======================================
function removeFromCart(id) {

  cart = cart.filter(item => item.id !== id);

  saveCart();

  renderCart();
}

// ======================================
// ALTERAR QUANTIDADE
// ======================================
function updateQuantity(id, quantity) {

  const item = cart.find(item => item.id === id);

  if (!item) return;

  item.quantity = parseInt(quantity);

  if (item.quantity <= 0) {
    removeFromCart(id);
    return;
  }

  saveCart();

  renderCart();
}

// ======================================
// SUBTOTAL
// ======================================
function getSubtotal() {

  return cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

}

// ======================================
// FRETE
// ======================================
function calculateShipping(subtotal) {

  if (subtotal >= 15000) {
    return 0;
  }

  return 250;

}

// ======================================
// TOTAL
// ======================================
function getTotal() {

  let total = getSubtotal();

  total += calculateShipping(total);

  // desconto PIX
  const payment = document.getElementById("paymentMethod");

  if (payment && payment.value === "pix") {
    total *= 0.90;
  }

  // cupom
  total -= discount;

  return total;

}

// ======================================
// CUPOM
// ======================================
function applyCoupon() {

  const couponInput = document.getElementById("coupon");

  if (!couponInput) return;

  const code = couponInput.value.trim();

  if (code === "WORLD10") {

    discount = 10;

    const discountEl = document.getElementById("discountValue");

    if (discountEl) {
      discountEl.textContent = "Cupom aplicado: -R$10";
    }

    showToast("Cupom aplicado com sucesso 🎉");

  } else {

    alert("Cupom inválido");

  }

  renderCart();
}

// ======================================
// RENDER CARRINHO
// ======================================
function renderCart() {

  if (!cartItemsEl) return;

  // carrinho vazio
  if (cart.length === 0) {

    cartItemsEl.innerHTML = `
      <div class="empty-cart">
        <h2>🛒 Carrinho vazio</h2>
        <p>Adicione pacotes incríveis da World Travel.</p>
      </div>
    `;

    if (cartSubtotalEl) {
      cartSubtotalEl.textContent = "R$ 0,00";
    }

    if (cartShippingEl) {
      cartShippingEl.textContent = "R$ 0,00";
    }

    if (cartTotalEl) {
      cartTotalEl.textContent = "R$ 0,00";
    }

    return;
  }

  // render produtos
  cartItemsEl.innerHTML = cart.map(item => `

   <div class="cart-item">
      
     <div class="cart-item__info">

      <h3>${item.name}</h3>

        <p>${formatCurrency(item.price)}</p>
     
      <img 
        src="${item.image}"  width="80" 
        class="cart-item__image"
        alt="${item.name}"
      >

    </div>

        <div class="cart-item__content">

           <span>${item.quantity}</span> 


          <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">
            -
          </button>
           
        

          <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">
            +
          </button>


        <strong>
          ${formatCurrency(item.price * item.quantity)}
        </strong>

        <button 
          class="quantity-btn-remove-btn"
          onclick="removeFromCart(${item.id})"
        >
          Remover
        </button>

      </div>

    </div>

  `).join("");

  // totais
  const subtotal = getSubtotal();
  const shipping = calculateShipping(subtotal);
  const total = getTotal();

  if (cartSubtotalEl) {
    cartSubtotalEl.textContent = formatCurrency(subtotal);
  }

  if (cartShippingEl) {
    cartShippingEl.textContent =
      shipping === 0
        ? "Grátis"
        : formatCurrency(shipping);
  }

  if (cartTotalEl) {
    cartTotalEl.textContent = formatCurrency(total);
  }

}

// ======================================
// FINALIZAR COMPRA
// ======================================
function checkout() {

  if (cart.length === 0) {

    alert("Seu carrinho está vazio!");

    return;
  }

  alert("Compra realizada com sucesso ✈");

  cart = [];

  discount = 0;

  saveCart();

  renderCart();
}

// ======================================
// TOAST
// ======================================
function showToast(message) {

  const toast = document.createElement("div");

  toast.className = "toast";

  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 100);

  setTimeout(() => {

    toast.classList.remove("show");

    setTimeout(() => {
      toast.remove();
    }, 300);

  }, 2500);
}

// ======================================
// PEGAR PRODUTOS DOS CARDS HTML
// ======================================
function setupProducts() {

  const cards = document.querySelectorAll(".card");

  cards.forEach((card, index) => {

    const button = card.querySelector("button");

    if (!button) return;

    button.addEventListener("click", () => {

      const product = {

        id: index + 1,

        name: card.querySelector("h3").textContent,

        price: Number(card.dataset.price),

        image: card.querySelector("img").src

      };

      addToCart(product);

    });

  });

}

// ======================================
// INIT
// ======================================
document.addEventListener("DOMContentLoaded", () => {

  updateCartBadge();

  renderCart();

  setupProducts();

  const payment = document.getElementById("paymentMethod");

  if (payment) {
    payment.addEventListener("change", renderCart);
  }

});
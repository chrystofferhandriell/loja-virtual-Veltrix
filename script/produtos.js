// ===============================
// CONFIG
// ===============================

const CART_KEY = "veltrix_cart";

// ===============================
// CARRINHO
// ===============================

let cart = JSON.parse(
    localStorage.getItem(CART_KEY)
) || [];

// ===============================
// SALVAR
// ===============================

function saveCart() {

    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );

    updateCartCount();
}

// ===============================
// CONTADOR
// ===============================

function updateCartCount() {

    const badge =
    document.getElementById("cart-count");

    if(!badge) return;

    const total = cart.reduce(
        (sum,item) =>
        sum + item.quantity,
        0
    );

    badge.textContent = total;
}

// ===============================
// TOAST
// ===============================

function showToast(message){

    const toast =
    document.createElement("div");

    toast.className = "toast";

    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.classList.add("show");

    },100);

    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => {

            toast.remove();

        },300);

    },2500);

}

// ===============================
// ADICIONAR PRODUTO
// ===============================

function addToCart(product){

    const existing =
    cart.find(
        item => item.id === product.id
    );

    if(existing){

        existing.quantity++;

    }else{

        cart.push({

            ...product,

            quantity:1

        });

    }

    saveCart();

    showToast(
        `${product.name} adicionado ao carrinho`
    );
}

// ===============================
// PEGAR PRODUTOS DOS CARDS
// ===============================

function setupProducts(){

    const cards =
    document.querySelectorAll(".card");

    cards.forEach((card,index)=>{

        const button =
        card.querySelector("button");

        if(!button) return;

        button.addEventListener("click",()=>{

            const name =
            card.querySelector("h3").textContent;

            const image =
            card.querySelector("img").src;

            const price =
            Number(card.dataset.price);

            const product = {

                id:index + 1,

                name:name,

                price:price,

                image:image

            };

            addToCart(product);

        });

    });

}

// ===============================
// INIT
// ===============================

document.addEventListener(
"DOMContentLoaded",
()=>{

    updateCartCount();

    setupProducts();

});
// ======================
// ABRIR BUSCA
// ======================

const searchBtn =
document.getElementById("searchBtn");

const searchBox =
document.getElementById("searchBox");

searchBtn.addEventListener("click", () => {

    searchBox.classList.toggle("active");

});

// Fecha ao clicar fora

document.addEventListener("click", (e) => {

    if(
        !searchBtn.contains(e.target) &&
        !searchBox.contains(e.target)
    ){

        searchBox.classList.remove("active");

    }

});

// ============================
// PESQUISA DE PRODUTOS
// ============================

const searchInput =
document.getElementById("searchProduct");

if(searchInput){

    searchInput.addEventListener("input", () => {

        const searchText =
        searchInput.value
        .toLowerCase()
        .trim();

        const products =
        document.querySelectorAll(".product-card");

        products.forEach(product => {

            const title =
            product.querySelector("h3")
            .textContent
            .toLowerCase();

            const description =
            product.querySelector("p")
            .textContent
            .toLowerCase();

            const category =
            (product.dataset.category || "")
            .toLowerCase();

            const match =
                title.includes(searchText) ||
                description.includes(searchText) ||
                category.includes(searchText);

            if(match){

                product.style.display = "block";

                product.style.opacity = "0";

                setTimeout(() => {

                    product.style.opacity = "1";

                },100);

            }else{

                product.style.display = "none";

            }

        });

    });

}
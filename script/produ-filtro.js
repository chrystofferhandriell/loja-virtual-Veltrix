// ============================
// FILTRO DE PRODUTOS VELTRIX
// ============================

document.addEventListener("DOMContentLoaded", () => {

    const buttons =
    document.querySelectorAll(".filters button");

    const cards =
    document.querySelectorAll(".product-card");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            buttons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            const filter =
            button.dataset.filter;

            cards.forEach(card => {

                const category =
                card.dataset.category || "";

                if (
                    filter === "all" ||
                    category.includes(filter)
                ) {

                    card.style.display = "block";

                    card.style.opacity = "0";

                    setTimeout(() => {

                        card.style.opacity = "1";

                    }, 100);

                }

                else {

                    card.style.display = "none";

                }

            });

        });

    });

});
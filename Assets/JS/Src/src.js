// Não alterar o código sem autorização do Desenvolvedor Chefe!

// Eventos de DOMContentLoaded.
document.addEventListener('DOMContentLoaded', function () {
    toggleNavBtn = document.getElementById("toggleNavBtn");
    toggleNavBtn.addEventListener("click", toggleNavigation);
    navLinks = document.querySelector(".nav-links");
    navBar = document.querySelector(".nav-bar");

    toggleNavBtn.addEventListener("click", toggleNavigation);
});

// Função para alternar a visibilidade da navegação ao clicar no botão de menu.
function toggleNavigation() {
    navLinks.classList.toggle("active");
    navBar.classList.toggle("active");
    toggleNavBtn.classList.toggle("change");
}

// Não alterar o código sem autorização do Desenvolvedor Chefe!

// Eventos de DOMContentLoaded.
document.addEventListener("DOMContentLoaded", function () {
    const loadingModal = document.getElementById("newLoadingModal");
    const body = document.body;

    body.classList.add("no-scroll");
    document.getElementById("main").style.display = 'none';
    document.getElementById("about").style.display = 'none';
    document.getElementById("products").style.display = 'none';
    document.getElementById("contact").style.display = 'none';
    document.querySelector("footer").style.display = 'none';
    loadingModal.style.display = 'flex';

    setTimeout(() => {
        loadingModal.style.display = 'none';
        body.classList.remove("no-scroll");
        document.getElementById("main").style.display = '';
        document.getElementById("about").style.display = '';
        document.getElementById("products").style.display = '';
        document.getElementById("contact").style.display = '';
        document.querySelector("footer").style.display = '';
    }, 1000);
});

document.addEventListener('DOMContentLoaded', function () {
    contactForm = document.getElementById('contactForm');
    loadingModal = document.getElementById('loadingModal');
    loadingMessage = document.getElementById('loadingMessage');
    statusIcon = document.getElementById('statusIcon');
    spinner = document.getElementById('spinner');
    toggleNavBtn = document.getElementById("toggleNavBtn");
    navLinks = document.querySelector(".nav-links");
    navBar = document.querySelector(".nav-bar");
    aboutSection = document.getElementById('about');
    cards = document.querySelectorAll('.card');

    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    toggleNavBtn.addEventListener("click", toggleNavigation);

    document.getElementById('nameInput').addEventListener('input', handleInput);
    document.getElementById('messageInput').addEventListener('input', handleInput);

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    initializeDisplay();

    window.addEventListener('resize', () => {
        stopDisplay();
        initializeDisplay();
    });
});

// Funções da página inicial:
// Declaração de variáveis para armazenar os elementos do DOM e controlar o estado da página.
let contactForm, loadingModal, loadingMessage, statusIcon, spinner;
let toggleNavBtn, navLinks, navBar, aboutSection;
let cards, currentIndex = 0, displayTimeout;

// Funções de envio do formulário:
// Função responsável por lidar com a submissão do formulário de contato.
function handleFormSubmit(event) {
    event.preventDefault();

    const body = document.body;
    const name = document.getElementById('nameInput').value;
    const email = document.getElementById('emailInput').value;
    const message = document.getElementById('messageInput').value;

    if (!name || !email || !message) {
        alert('Por favor, preencha todos os campos antes de enviar.');
        return;
    }

    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };

    body.classList.add("no-scroll");
    loadingModal.style.display = 'flex';

    fetch('https://servercachacacapitao.vercel.app/sendContact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Erro ao enviar a mensagem.');
            }
        })
        .then(data => {
            console.log('Mensagem enviada com sucesso:', data);
            loadingMessage.textContent = 'Mensagem enviada com sucesso! Verifique seu e-mail.';
            statusIcon.classList.add('success');
            statusIcon.innerHTML = '✔';
            spinner.style.display = 'none';
            document.getElementById('nameInput').value = '';
            document.getElementById('emailInput').value = '';
            document.getElementById('messageInput').value = '';
        })
        .catch(error => {
            console.error('Erro ao enviar a mensagem:', error);
            loadingMessage.textContent = 'Erro de conexão com o servidor, Tente novamente mais tarde.';
            statusIcon.classList.add('error');
            statusIcon.innerHTML = '✖';
            spinner.style.display = 'none';
        })
        .finally(() => {
            setTimeout(() => {
                body.classList.remove("no-scroll");
                loadingModal.style.display = 'none';
                loadingMessage.textContent = 'Enviando mensagem...';
                statusIcon.classList.remove('success', 'error');
                statusIcon.innerHTML = '';
                spinner.style.display = 'block';
            }, 10000);
        });
}

// Funções de navegação:
// Função para alternar a visibilidade da navegação ao clicar no botão de menu.
function toggleNavigation() {
    navLinks.classList.toggle("active");
    navBar.classList.toggle("active");
    toggleNavBtn.classList.toggle("change");
}

// Funções da seção "about":
// Função para manipular a visibilidade da seção "about" com base na posição de rolagem.
function handleScroll() {
    const rect = aboutSection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom >= 0) {
        aboutSection.classList.add('show');
        aboutSection.classList.remove('hide');
    } else {
        aboutSection.classList.add('hide');
        aboutSection.classList.remove('show');
    }
}

// Função para exibir um cartão específico, com base no índice passado.
function showCard(cards, index) {
    cards.forEach(card => card.classList.remove('hover'));
    if (cards.length > 0) {
        cards[index].classList.add('hover');
    }
}

// Inicia a exibição rotativa dos cartões, mostrando um cartão por vez.
function startDisplay(cards, currentIndex, displayDuration) {
    return setInterval(() => {
        currentIndex = (currentIndex + 1) % cards.length;
        showCard(cards, currentIndex);
    }, displayDuration);
}

// Para a exibição rotativa dos cartões.
function stopDisplay(interval) {
    clearInterval(interval);
}

// Inicializa o comportamento de exibição dos cartões e adiciona eventos de mouse para cada cartão.
function initializeDisplay(containerSelector, displayDuration) {
    if (window.innerWidth < 1024) {
        return;
    }

    const cards = document.querySelectorAll(`${containerSelector} .card`);
    let currentIndex = 0;
    let displayInterval;

    // Inicia a exibição apenas se houver cartões
    if (cards.length > 0) {
        displayInterval = startDisplay(cards, currentIndex, displayDuration);
        showCard(cards, currentIndex); // Mostra o cartão inicial

        cards.forEach((card, index) => {
            // Evento de hover
            card.addEventListener('mouseenter', () => {
                stopDisplay(displayInterval);
                showCard(cards, index);
            });

            // Quando o hover termina, continua a exibição rotativa
            card.addEventListener('mouseleave', () => {
                currentIndex = index;
                displayInterval = startDisplay(cards, currentIndex, displayDuration);
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initializeDisplay('#productsContainer', 3000);
});


// Funções auxiliares:
// Função para capitalizar a primeira letra de cada palavra em uma string.
function capitalizeFirstLetter(string) {
    return string.toLowerCase().replace(/^\w|\s\w/g, function (letter) {
        return letter.toUpperCase();
    });
}

// Capitaliza o valor do campo de entrada passado como parâmetro.
function capitalizeInput(element) {
    element.value = capitalizeFirstLetter(element.value);
}

// Função chamada sempre que o usuário digita algo nos campos de entrada.
function handleInput() {
    capitalizeInput(this);
}
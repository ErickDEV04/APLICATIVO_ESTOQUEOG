// Alternador de Tema
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Carregar tema salvo
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
    if (savedTheme === 'dark-theme') {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Ícone de sol para tema escuro
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Ícone de lua para tema claro
    }
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    const currentTheme = body.classList.contains('dark-theme') ? 'dark-theme' : 'light-theme';
    localStorage.setItem('theme', currentTheme);

    // Alternar ícone
    if (currentTheme === 'dark-theme') {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
});

// Notificações
const notificationBell = document.getElementById('notification-bell');
const notificationBadge = document.querySelector('.notification-badge');

const notifications = [
    "Produto X está com estoque baixo.",
    "Novo produto cadastrado: Produto Y.",
    "Movimentação realizada: Saída de 10 unidades do Produto Z."
];

notificationBell.addEventListener('click', () => {
    alert(`Você tem ${notifications.length} notificações:\n\n${notifications.join('\n')}`);
    notificationBadge.textContent = '0'; // Limpa notificações após visualizar
});

// Barra de Pesquisa - Filtro em tempo real
const searchInput = document.querySelector('.form-control');
const tableRows = document.querySelectorAll('.table tbody tr');

searchInput.addEventListener('input', function () {
    const searchQuery = this.value.toLowerCase();
    tableRows.forEach(row => {
        const cells = row.getElementsByTagName('td');
        const found = Array.from(cells).some(cell => cell.textContent.toLowerCase().includes(searchQuery));
        row.style.display = found ? '' : 'none';
    });
});

// Sugestões de Busca
const suggestions = ['Produto 1', 'Produto 2', 'Produto 3']; // Exemplo estático de sugestões
const suggestionsDropdown = document.createElement('div');
suggestionsDropdown.className = 'search-suggestions';
document.querySelector('.d-flex').appendChild(suggestionsDropdown);

searchInput.addEventListener('input', function () {
    const searchQuery = this.value.toLowerCase();
    const filteredSuggestions = suggestions.filter(suggestion => suggestion.toLowerCase().includes(searchQuery));

    if (filteredSuggestions.length > 0 && searchQuery !== '') {
        suggestionsDropdown.innerHTML = filteredSuggestions.map(suggestion => `<div class="suggestion-item">${suggestion}</div>`).join('');
        suggestionsDropdown.style.display = 'block';
    } else {
        suggestionsDropdown.style.display = 'none';
    }
});

// Fechar sugestões ao clicar fora
document.addEventListener('click', (event) => {
    if (!event.target.closest('.form-control') && !event.target.closest('.search-suggestions')) {
        suggestionsDropdown.style.display = 'none';
    }
});

// Avatar Menu
const avatar = document.getElementById('avatar');
const profileMenu = document.createElement('div');
profileMenu.className = 'profile-menu';
profileMenu.innerHTML = `
    <div class="profile-menu-item">Perfil</div>
    <div class="profile-menu-item">Configurações</div>
    <div class="profile-menu-item">Logout</div>
`;
document.body.appendChild(profileMenu);

avatar.addEventListener('click', (event) => {
    event.stopPropagation(); // Evita que o evento de clique no documento feche o menu imediatamente
    profileMenu.style.display = profileMenu.style.display === 'block' ? 'none' : 'block';
});

// Fechar menu de perfil ao clicar fora
document.addEventListener('click', () => {
    profileMenu.style.display = 'none';
});

// Simulação do nome do usuário (substitua por um valor dinâmico se necessário)
const username = "Erick"; // Exemplo: nome do usuário
const usernameElement = document.getElementById('username');

if (username) {
  usernameElement.textContent = `Olá, ${username}`; // Exibe "Olá, Erick"
} else {
  usernameElement.textContent = "Olá, Usuário"; // Mensagem padrão se não houver nome
}

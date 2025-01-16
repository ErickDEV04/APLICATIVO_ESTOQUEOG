// Alternador de Tema
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Carregar tema salvo
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    const currentTheme = body.classList.contains('dark-theme') ? 'dark-theme' : 'light-theme';
    localStorage.setItem('theme', currentTheme);
});

// Notificações
const notificationBell = document.getElementById('notification-bell');
notificationBell.addEventListener('click', () => {
    alert('Você tem notificações pendentes sobre o estoque!');
});

// Barra de Pesquisa - Filtro em tempo real
const searchInput = document.querySelector('.form-control');
const tableRows = document.querySelectorAll('.table tbody tr');

searchInput.addEventListener('input', function() {
    const searchQuery = this.value.toLowerCase();
    tableRows.forEach(row => {
        const cells = row.getElementsByTagName('td');
        const found = Array.from(cells).some(cell => cell.textContent.toLowerCase().includes(searchQuery));
        row.style.display = found ? '' : 'none';
    });
});

// Sugestões de Busca
const suggestions = ['Produto 1', 'Produto 2', 'Produto 3']; // Exemplo estático de sugestões
searchInput.addEventListener('input', function() {
    const searchQuery = this.value.toLowerCase();
    const filteredSuggestions = suggestions.filter(suggestion => suggestion.toLowerCase().includes(searchQuery));
    console.log('Sugestões:', filteredSuggestions); // Substitua por uma exibição real de sugestões
});

// Dropdown Menu
const dropdownToggle = document.getElementById('dropdownMenuButton');
dropdownToggle.addEventListener('click', () => {
    const dropdownMenu = document.querySelector('.dropdown-menu');
    dropdownMenu.classList.toggle('show');
});

// Avatar Menu
const avatar = document.getElementById('avatar');
avatar.addEventListener('click', () => {
    alert('Opções de perfil: Configurações, Perfil, Logout');
});

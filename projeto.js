// Exemplo simples para mostrar alertas com JavaScript
document.querySelector('.navbar-nav').addEventListener('click', function(e) {
    if (e.target.classList.contains('nav-link')) {
        alert('Você clicou em: ' + e.target.innerText);
    }
});

// Barra de Pesquisa - Filtro em tempo real
document.querySelector('.form-control').addEventListener('input', function() {
    let searchQuery = this.value.toLowerCase();
    let rows = document.querySelectorAll('.table tbody tr');
    rows.forEach(function(row) {
        let cells = row.getElementsByTagName('td');
        let found = false;
        Array.from(cells).forEach(function(cell) {
            if (cell.textContent.toLowerCase().includes(searchQuery)) {
                found = true;
            }
        });
        row.style.display = found ? '' : 'none'; // Exibe ou oculta a linha
    });
});

// Script para funcionalidades da página Histórico de Movimentação

// Busca dinâmica no histórico de movimentações
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.createElement('input');
    const table = document.querySelector('.table tbody');
  
    // Configurando o campo de busca
    searchInput.type = 'text';
    searchInput.placeholder = 'Buscar movimentações...';
    searchInput.className = 'form-control mb-3';
    
    // Inserindo o campo de busca na página
    const container = document.querySelector('.container');
    container.insertBefore(searchInput, table.parentElement);
  
    // Evento de digitação no campo de busca
    searchInput.addEventListener('input', () => {
      const filter = searchInput.value.toLowerCase();
      const rows = table.querySelectorAll('tr');
  
      rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const matches = Array.from(cells).some(cell => cell.textContent.toLowerCase().includes(filter));
        row.style.display = matches ? '' : 'none';
      });
    });
  
    // Exemplo de alerta ao clicar em uma linha
    table.addEventListener('click', (e) => {
      const row = e.target.closest('tr');
      if (row) {
        const cells = row.querySelectorAll('td');
        const product = cells[1]?.textContent;
        alert(`Você clicou no produto: ${product}`);
      }
    });
  });
  

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.createElement('input');
    const table = document.querySelector('.table tbody');
  
    searchInput.type = 'text';
    searchInput.placeholder = 'Buscar movimentações...';
    searchInput.className = 'form-control mb-3';
    
    const container = document.querySelector('.container');
    container.insertBefore(searchInput, table.parentElement);
  
    searchInput.addEventListener('input', () => {
      const filter = searchInput.value.toLowerCase();
      const rows = table.querySelectorAll('tr');
  
      rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const matches = Array.from(cells).some(cell => cell.textContent.toLowerCase().includes(filter));
        row.style.display = matches ? '' : 'none';
      });
    });
  
    table.addEventListener('click', (e) => {
      const row = e.target.closest('tr');
      if (row) {
        const cells = row.querySelectorAll('td');
        const product = cells[1]?.textContent;
        alert(`Você clicou no produto: ${product}`);
      }
    });
  });
  
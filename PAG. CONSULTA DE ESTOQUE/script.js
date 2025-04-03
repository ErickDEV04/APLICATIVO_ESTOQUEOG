// Exportar para Excel
function exportToExcel(products) {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(products.map(p => ({
      Produto: p.nome,
      Categoria: p.categoria,
      Quantidade: p.quantidade,
      Preço: p.preco
    })));
    
    XLSX.utils.book_append_sheet(wb, ws, "Estoque");
    XLSX.writeFile(wb, "estoque.xlsx");
  }
  
  // Exportar para PDF
  function exportToPDF(products) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.text("Relatório de Estoque", 14, 15);
    doc.autoTable({
      head: [['Produto', 'Categoria', 'Quantidade', 'Preço']],
      body: products.map(p => [p.nome, p.categoria, p.quantidade, p.preco]),
      startY: 25,
      styles: {
        halign: 'center',
        cellPadding: 3
      },
      headStyles: {
        fillColor: [70, 130, 180]
      }
    });
    
    doc.save('estoque.pdf');
  }
  
  // Event Listeners para exportação
  $(document).ready(function() {
    $('#exportExcel').click(function() {
      const filteredProducts = filterProducts();
      exportToExcel(filteredProducts);
    });
  
    $('#exportPDF').click(function() {
      const filteredProducts = filterProducts();
      exportToPDF(filteredProducts);
    });
  });

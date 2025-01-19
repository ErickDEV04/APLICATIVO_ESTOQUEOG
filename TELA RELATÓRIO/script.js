function filtrarRelatorio() {
    var filtros = {
      produto: $('#produto').val(),
      quantidade: $('#quantidade').val(),
      acao: $('#acao').val(),
      usuario: $('#usuario').val()
    };
  
    $.ajax({
      url: 'http://localhost:5000/fetch_movements',
      method: 'GET',
      data: filtros,
      dataType: 'json',
      success: function(data) {
        var tableBody = $('#relatorio-table-body');
        tableBody.empty();
        data.forEach(function(row) {
          var tr = $('<tr></tr>');
          tr.append('<td>' + row.data + '</td>');
          tr.append('<td>' + row.produto + '</td>');
          tr.append('<td>' + row.quantidade + '</td>');
          tr.append('<td>' + row.acao + '</td>');
          tr.append('<td>' + row.usuario + '</td>');
          tableBody.append(tr);
        });
      },
      error: function(error) {
        console.error('Erro ao buscar movimentações:', error);
      }
    });
  }
  
  function exportarPDF() {
    var filtros = {
      produto: $('#produto').val(),
      quantidade: $('#quantidade').val(),
      acao: $('#acao').val(),
      usuario: $('#usuario').val()
    };
  
    $.ajax({
      url: 'http://localhost:5000/export_pdf',
      method: 'POST',
      data: JSON.stringify(filtros),
      contentType: 'application/json',
      success: function(response) {
        window.open(response.pdf_url, '_blank');
      },
      error: function(error) {
        console.error('Erro ao exportar PDF:', error);
      }
    });
  }
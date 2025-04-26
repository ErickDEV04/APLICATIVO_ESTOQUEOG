// Variáveis globais
let movimentacoes = [];
let currentPage = 1;
const itemsPerPage = 10;
let dadosCarregados = false;

// Objeto de fallback
const dadosFallback = [
  {
    "id": "fallback-1",
    "produto": "Notebook Dell Inspiron",
    "quantidade": 2,
    "tipo": "entrada",
    "data": "2023-01-01T00:00:00",
    "usuario": "admin",
    "observacao": "Dados de exemplo - arquivo não carregado"
  },
  {
    "id": "fallback-2",
    "produto": "Mouse Logitech MX",
    "quantidade": 5,
    "tipo": "saida",
    "data": "2023-01-02T00:00:00",
    "usuario": "funcionario1"
  }
];

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  carregarDados()
    .then(() => {
      inicializarEventos();
      atualizarTabela();
    })
    .catch(error => {
      console.error('Falha na inicialização:', error);
      mostrarNotificacao('Erro ao carregar dados. Usando dados de exemplo.', 'erro');
      movimentacoes = dadosFallback;
      atualizarTabela();
    });
});

// Função melhorada para carregar dados
async function carregarDados() {
  showLoading();
  
  try {
    // 1. Tentar carregar o JSON externo
    const response = await fetch('./movimentacoes.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    // Verificar se a requisição foi bem-sucedida
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status} ${response.statusText}`);
    }

    // 2. Tentar fazer parse do JSON
    const dados = await response.json();
    
    // 3. Validar estrutura dos dados
    if (!Array.isArray(dados)) {
      throw new Error('O arquivo JSON não contém um array válido');
    }

    // 4. Validar campos obrigatórios
    const movimentacoesValidas = dados.filter(item => {
      return item.id && item.produto && item.quantidade && item.tipo && item.data;
    });

    if (movimentacoesValidas.length === 0) {
      throw new Error('Nenhum dado válido encontrado no arquivo');
    }

    // 5. Atribuir somente dados válidos
    movimentacoes = movimentacoesValidas.map(item => ({
      id: String(item.id),
      produto: String(item.produto),
      quantidade: Number(item.quantidade) || 0,
      tipo: ['entrada', 'saida'].includes(item.tipo) ? item.tipo : 'entrada',
      data: validarData(item.data),
      usuario: String(item.usuario || 'Sistema'),
      observacao: item.observacao ? String(item.observacao) : ''
    }));

    dadosCarregados = true;
    document.getElementById('resultCount').textContent = `${movimentacoes.length} itens`;
    
    return movimentacoes;

  } catch (error) {
    console.error('Erro ao carregar dados:', error);
    
    // Tentar fallback local se houver erro de rede
    try {
      if (typeof dadosLocais !== 'undefined') {
        movimentacoes = dadosLocais;
      } else {
        throw new Error('Nenhum fallback disponível');
      }
    } catch (e) {
      throw error; // Rejeita com o erro original
    }
    
  } finally {
    hideLoading();
  }
}

// Função auxiliar para validar datas
function validarData(dataString) {
  try {
    const date = new Date(dataString);
    return isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
  } catch {
    return new Date().toISOString();
  }
}

// Restante do código permanece igual com pequenos ajustes:
function inicializarEventos() {
  // Filtros
  document.getElementById('filtro-tipo').addEventListener('change', () => {
    currentPage = 1;
    filtrarMovimentacoes();
  });
  
  document.getElementById('filtro-periodo').addEventListener('change', () => {
    currentPage = 1;
    filtrarMovimentacoes();
  });
  
  document.getElementById('filtro-produto').addEventListener('input', () => {
    currentPage = 1;
    filtrarMovimentacoes();
  });
  
  // Paginação
  document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      atualizarTabela();
    }
  });
  
  document.getElementById('nextPage').addEventListener('click', () => {
    const totalPages = Math.ceil(movimentacoes.length / itemsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      atualizarTabela();
    }
  });
}

function filtrarMovimentacoes() {
  const tipo = document.getElementById('filtro-tipo').value;
  const periodo = document.getElementById('filtro-periodo').value;
  const produto = document.getElementById('filtro-produto').value.toLowerCase();
  
  let filtrados = movimentacoes;
  
  // Aplicar filtros
  if (tipo !== 'todos') {
    filtrados = filtrados.filter(m => m.tipo === tipo);
  }
  
  if (periodo !== 'todos') {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    
    filtrados = filtrados.filter(m => {
      const dataMov = new Date(m.data);
      
      switch (periodo) {
        case 'hoje':
          return dataMov.toDateString() === hoje.toDateString();
        case 'semana':
          const semanaPassada = new Date(hoje);
          semanaPassada.setDate(hoje.getDate() - 7);
          return dataMov >= semanaPassada;
        case 'mes':
          return dataMov.getMonth() === hoje.getMonth() && 
                 dataMov.getFullYear() === hoje.getFullYear();
        default:
          return true;
      }
    });
  }
  
  if (produto) {
    filtrados = filtrados.filter(m => 
      m.produto.toLowerCase().includes(produto)
    );
  }
  
  document.getElementById('resultCount').textContent = `${filtrados.length} itens`;
  atualizarTabela(filtrados);
}

function atualizarTabela(dados = movimentacoes) {
  const tbody = document.getElementById('movements-table-body');
  tbody.innerHTML = '';
  
  // Paginação
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = dados.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(dados.length / itemsPerPage) || 1;
  
  // Atualizar controles de paginação
  document.getElementById('prevPage').disabled = currentPage <= 1;
  document.getElementById('nextPage').disabled = currentPage >= totalPages;
  document.getElementById('pageInfo').textContent = `Página ${currentPage} de ${totalPages}`;
  
  // Preencher tabela
  if (paginatedData.length === 0) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td colspan="6" class="text-center py-4">
        <i class="bi bi-exclamation-circle"></i> Nenhum resultado encontrado
      </td>
    `;
    tbody.appendChild(tr);
  } else {
    paginatedData.forEach(mov => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${formatarData(mov.data)}</td>
        <td>${mov.produto}</td>
        <td>${mov.quantidade}</td>
        <td><span class="badge badge-${mov.tipo}">${mov.tipo === 'entrada' ? 'Entrada' : 'Saída'}</span></td>
        <td>${mov.usuario}</td>
        <td>
          <button class="btn-action" onclick="mostrarDetalhes('${mov.id}')">
            <i class="bi bi-eye"></i> Detalhes
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }
}

function mostrarDetalhes(id) {
  const mov = movimentacoes.find(m => m.id === id);
  if (!mov) {
    mostrarNotificacao('Movimentação não encontrada', 'erro');
    return;
  }
  
  const modalBody = document.getElementById('modalBody');
  modalBody.innerHTML = `
    <div class="detail-row">
      <span class="detail-label">Produto:</span>
      <span class="detail-value">${mov.produto}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Quantidade:</span>
      <span class="detail-value">${mov.quantidade}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Tipo:</span>
      <span class="detail-value badge-${mov.tipo}">${mov.tipo === 'entrada' ? 'Entrada' : 'Saída'}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Data:</span>
      <span class="detail-value">${formatarData(mov.data)}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Usuário:</span>
      <span class="detail-value">${mov.usuario}</span>
    </div>
    ${mov.observacao ? `
    <div class="detail-row">
      <span class="detail-label">Observação:</span>
      <span class="detail-value">${mov.observacao}</span>
    </div>` : ''}
  `;
  
  document.getElementById('detailModal').style.display = 'flex';
}

function limparFiltros() {
  document.getElementById('filtro-tipo').value = 'todos';
  document.getElementById('filtro-periodo').value = 'todos';
  document.getElementById('filtro-produto').value = '';
  currentPage = 1;
  filtrarMovimentacoes();
}

function exportarPDF() {
  showLoading();
  
  setTimeout(() => {
    const element = document.getElementById('movementsTable');
    html2canvas(element).then(canvas => {
      const pdf = new window.jspdf.jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`historico_${new Date().toISOString().slice(0,10)}.pdf`);
      hideLoading();
      mostrarNotificacao('PDF gerado com sucesso', 'sucesso');
    }).catch(error => {
      console.error('Erro ao gerar PDF:', error);
      hideLoading();
      mostrarNotificacao('Erro ao gerar PDF', 'erro');
    });
  }, 500);
}

// Utilitários
function formatarData(dataString) {
  try {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dataString).toLocaleDateString('pt-BR', options);
  } catch {
    return 'Data inválida';
  }
}

function fecharModal() {
  document.getElementById('detailModal').style.display = 'none';
}

function showLoading() {
  document.getElementById('loadingSpinner').style.display = 'flex';
}

function hideLoading() {
  document.getElementById('loadingSpinner').style.display = 'none';
}

function mostrarNotificacao(mensagem, tipo = 'info') {
  const notificacao = document.createElement('div');
  notificacao.className = `notificacao-${tipo}`;
  notificacao.innerHTML = `
    <i class="bi ${tipo === 'erro' ? 'bi-exclamation-triangle' : tipo === 'sucesso' ? 'bi-check-circle' : 'bi-info-circle'}"></i>
    ${mensagem}
  `;
  
  document.body.appendChild(notificacao);
  
  setTimeout(() => {
    notificacao.classList.add('fade-out');
    setTimeout(() => notificacao.remove(), 500);
  }, 3000);
}

// Fallback explícito (opcional)
const dadosLocais = dadosFallback;

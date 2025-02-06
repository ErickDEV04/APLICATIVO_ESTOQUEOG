// Alternador de Tema
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Carregar tema salvo
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  body.classList.add(savedTheme);
  if (savedTheme === "dark-theme") {
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Ícone de sol para tema escuro
  } else {
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Ícone de lua para tema claro
  }
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-theme");
  const currentTheme = body.classList.contains("dark-theme")
    ? "dark-theme"
    : "light-theme";
  localStorage.setItem("theme", currentTheme);

  // Alternar ícone
  if (currentTheme === "dark-theme") {
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
});

// Menu Lateral
const settingsButton = document.getElementById("settings-button");
const settingsPanel = document.getElementById("settings-panel");
const overlay = document.getElementById("overlay");

settingsButton.addEventListener("click", (event) => {
  event.preventDefault();
  settingsPanel.classList.toggle("open");
  overlay.classList.toggle("open");
});

overlay.addEventListener("click", () => {
  settingsPanel.classList.remove("open");
  overlay.classList.remove("open");
});

document.querySelectorAll(".settings-button").forEach((button) => {
  button.addEventListener("click", () => {
    alert(`Você clicou em: ${button.textContent}`);
  });
});

// Notificações
const notificationBell = document.getElementById("notification-bell");
const notificationBadge = document.querySelector(".notification-badge");

const notifications = [
  "Produto X está com estoque baixo.",
  "Novo produto cadastrado: Produto Y.",
  "Movimentação realizada: Saída de 10 unidades do Produto Z.",
];

notificationBell.addEventListener("click", () => {
  alert(
    `Você tem ${notifications.length} notificações:\n\n${notifications.join(
      "\n"
    )}`
  );
  notificationBadge.textContent = "0"; // Limpa notificações após visualizar
});

// Barra de Pesquisa - Filtro em tempo real
const searchInput = document.getElementById("searchInput");
const tableRows = document.querySelectorAll("#stockTable tbody tr");

searchInput.addEventListener("input", function () {
  const searchQuery = this.value.toLowerCase();
  let found = false;
  tableRows.forEach((row) => {
    const cells = row.getElementsByTagName("td");
    const match = Array.from(cells).some((cell) =>
      cell.textContent.toLowerCase().includes(searchQuery)
    );
    row.style.display = match ? "" : "none";
    if (match) found = true;
  });

  // Exibir mensagem se nenhum resultado for encontrado
  if (!found && searchQuery !== "") {
    alert("Nenhum resultado encontrado.");
  }
});

// Sugestões de Busca
const suggestions = ["Produto 1", "Produto 2", "Produto 3"]; // Exemplo estático de sugestões
const suggestionsDropdown = document.createElement("div");
suggestionsDropdown.className = "search-suggestions";
document.querySelector(".d-flex").appendChild(suggestionsDropdown);

searchInput.addEventListener("input", function () {
  const searchQuery = this.value.toLowerCase();
  const filteredSuggestions = suggestions.filter((suggestion) =>
    suggestion.toLowerCase().includes(searchQuery)
  );

  if (filteredSuggestions.length > 0 && searchQuery !== "") {
    suggestionsDropdown.innerHTML = filteredSuggestions
      .map((suggestion) => `<div class="suggestion-item">${suggestion}</div>`)
      .join("");
    suggestionsDropdown.style.display = "block";
  } else {
    suggestionsDropdown.style.display = "none";
  }
});

// Fechar sugestões ao clicar fora
document.addEventListener("click", (event) => {
  if (
    !event.target.closest(".form-control") &&
    !event.target.closest(".search-suggestions")
  ) {
    suggestionsDropdown.style.display = "none";
  }
});

// Avatar Menu
const avatar = document.getElementById("avatar");
const profileMenu = document.createElement("div");
profileMenu.className = "profile-menu";
profileMenu.style.backgroundColor = "#4b545c";
profileMenu.style.border = "#4b545c";
profileMenu.style.color = "white"; // Define a cor do texto como branca
profileMenu.innerHTML = `
    <div class="profile-menu-item">Perfil</div>
    <div class="profile-menu-item">Configurações</div>
    <div class="profile-menu-item">Logout</div>
`;

document.body.appendChild(profileMenu);

avatar.addEventListener("click", (event) => {
  event.stopPropagation(); // Evita que o evento de clique no documento feche o menu imediatamente
  profileMenu.style.display =
    profileMenu.style.display === "block" ? "none" : "block";
});

// Fechar menu de perfil ao clicar fora
document.addEventListener("click", () => {
  profileMenu.style.display = "none";
});

// Simulação do nome do usuário (substitua por um valor dinâmico se necessário)
const username = "LUIZINHO"; // Exemplo: nome do usuário
const usernameElement = document.getElementById("username");

if (username) {
  usernameElement.textContent = `Olá, ${username}`; // Exibe "Olá, Erick"
} else {
  usernameElement.textContent = "Olá, Usuário"; // Mensagem padrão se não houver nome
}

// Gráfico de Estoque
const ctx = document.getElementById("stockChart").getContext("2d");
const stockChart = new Chart(ctx, {
  type: "bar", // Tipo de gráfico (barras)
  data: {
    labels: ["Produto 1", "Produto 2", "Produto 3"], // Nomes dos produtos
    datasets: [
      {
        label: "Quantidade em Estoque",
        data: [50, 10, 30], // Quantidades dos produtos
        backgroundColor: ["#FF3630", "#6FFFC1", "#36A2EB"], // Cores das barras
        borderColor: ["#FF3630", "#6FFFC1", "#36A2EB"],
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

// Gráfico de Pizza (Distribuição por Categoria)
const categoryCtx = document.getElementById("categoryChart").getContext("2d");
const categoryChart = new Chart(categoryCtx, {
  type: "pie", // Tipo de gráfico (pizza)
  data: {
    labels: ["Eletrônicos", "Móveis", "Vestuário"], // Categorias
    datasets: [
      {
        label: "Distribuição por Categoria",
        data: [30, 50, 20], // Quantidades por categoria
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"], // Cores das fatias
      },
    ],
  },
  options: {
    responsive: true,
  },
});

// Gráfico de Linha (Tendência de Movimentação)
const movementCtx = document.getElementById("movementChart").getContext("2d");
const movementChart = new Chart(movementCtx, {
  type: "line", // Tipo de gráfico (linha)
  data: {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai"], // Meses
    datasets: [
      {
        label: "Entrada de Produtos",
        data: [10, 20, 15, 25, 30], // Dados de entrada
        borderColor: "#4BC0C0", // Cor da linha
        fill: false,
      },
      {
        label: "Saída de Produtos",
        data: [5, 15, 10, 20, 25], // Dados de saída
        borderColor: "#FF6384", // Cor da linha
        fill: false,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

// Exportar para PDF
document.getElementById("exportPDF").addEventListener("click", () => {
  const { jsPDF } = window.jspdf; // Importa jsPDF
  const doc = new jsPDF();

  // Título do PDF
  doc.setFontSize(18);
  doc.text("Relatório de Estoque", 10, 10);
  doc.text(`Exportado por: ${username}`, 10, 15);
  doc.text(`Data: ${new Date().toLocaleString()}`, 10, 20);

  // Converte a tabela em um array de dados
  const table = document.getElementById("stockTable");
  const data = [];
  table.querySelectorAll("tr").forEach((row) => {
    const rowData = [];
    row.querySelectorAll("th, td").forEach((cell) => {
      rowData.push(cell.textContent);
    });
    data.push(rowData);
  });

  // Adiciona a tabela ao PDF
  doc.autoTable({
    head: [data[0]], // Cabeçalho da tabela
    body: data.slice(1), // Dados da tabela
    startY: 30, // Posição inicial da tabela
    theme: "grid", // Estilo da tabela
    headStyles: { fillColor: [255, 54, 48] }, // Cor do cabeçalho
    bodyStyles: { fillColor: [255, 255, 255] }, // Cor do corpo
    alternateRowStyles: { fillColor: [245, 245, 245] }, // Cor das linhas alternadas
  });

  // Salva o PDF
  doc.save("relatorio_estoque.pdf");
});

// Exportar para Excel
document.getElementById("exportExcel").addEventListener("click", () => {
  const table = document.getElementById("stockTable");
  const workbook = XLSX.utils.table_to_book(table, { sheet: "Estoque" }); // Converte a tabela em um livro do Excel
  XLSX.writeFile(workbook, "relatorio_estoque.xlsx"); // Salva o arquivo Excel
});

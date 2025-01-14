// Preenchendo dados dinâmicos (Visão Geral do Estoque)
document.addEventListener('DOMContentLoaded', function() {
    const totalProdutos = 150;
    const alertasEstoqueBaixo = 5;

    // Preenchendo os dados na página
    document.querySelector('.total-produtos').textContent = totalProdutos;
    document.querySelector('.alertas-estoque-baixo').textContent = alertasEstoqueBaixo;
});

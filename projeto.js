// Exemplo simples para mostrar alertas com JavaScript
document.querySelector('.navbar-nav').addEventListener('click', function(e) {
    if (e.target.classList.contains('nav-link')) {
      alert('Você clicou em: ' + e.target.innerText);
    }
  });
  

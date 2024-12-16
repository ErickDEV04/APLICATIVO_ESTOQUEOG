// script.js

// Função para mostrar a mensagem na tela
function showMessage(message) {
  const messageBox = document.getElementById("message-box");
  messageBox.style.display = "block";
  messageBox.innerHTML = message;
}

// Função para esconder a mensagem ao clicar nela
function hideMessage() {
  const messageBox = document.getElementById("message-box");
  messageBox.style.display = "none";
}

// Adicionando interatividade aos botões
const buttons = document.querySelectorAll(".btn");
buttons.forEach(button => {
  button.addEventListener("click", function() {
    showMessage(`Você clicou no ${this.innerText}!`);
  });
});

// Adicionando evento de esconder a mensagem quando clicada
const messageBox = document.getElementById("message-box");
messageBox.addEventListener("click", hideMessage);


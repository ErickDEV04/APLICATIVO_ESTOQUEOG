document.addEventListener("DOMContentLoaded", () => {
    const formProduto = document.getElementById("formProduto");
    const mensagem = document.getElementById("mensagem");
  
    // Auto-focus no primeiro campo
    document.getElementById("nomeProduto").focus();
  
    // Validação em tempo real
    const inputs = document.querySelectorAll(".form-control");
    inputs.forEach(input => {
      input.addEventListener("input", () => {
        if (input.checkValidity()) {
          input.style.borderColor = "var(--ios-border)";
        }
      });
  
      input.addEventListener("invalid", (e) => {
        e.preventDefault();
        input.style.borderColor = "var(--ios-red)";
      });
    });
  
    // Submit do formulário
    formProduto.addEventListener("submit", (e) => {
      e.preventDefault();
      limparMensagens();
  
      const nome = document.getElementById("nomeProduto").value.trim();
      const categoria = document.getElementById("categoriaProduto").value.trim();
      const quantidade = parseInt(document.getElementById("quantidadeProduto").value);
      const preco = parseFloat(document.getElementById("precoProduto").value);
      const dataValidade = document.getElementById("dataValidade").value;
  
      // Validações
      if (!nome || !categoria || !quantidade || !preco || !dataValidade) {
        mostrarMensagem("Preencha todos os campos.", "danger");
        return;
      }
  
      if (quantidade <= 0) {
        mostrarMensagem("Quantidade deve ser maior que zero.", "danger");
        return;
      }
  
      if (preco <= 0) {
        mostrarMensagem("Preço deve ser maior que zero.", "danger");
        return;
      }
  
      const hoje = new Date().toISOString().split("T")[0];
      if (dataValidade < hoje) {
        mostrarMensagem("Data de validade inválida.", "danger");
        return;
      }
  
      // Simular cadastro
      const produto = {
        id: Date.now(),
        nome,
        categoria,
        quantidade,
        preco,
        dataValidade,
        dataCadastro: new Date().toISOString()
      };
  
      salvarProduto(produto);
  
      // Feedback visual
      mostrarMensagem("✅ Produto cadastrado com sucesso!", "success");
      formProduto.reset();
      inputs.forEach(input => input.style.borderColor = "var(--ios-border)");
    });
  
    // Funções auxiliares
    function mostrarMensagem(texto, tipo) {
      mensagem.classList.remove("d-none", "alert-danger", "alert-success");
      mensagem.classList.add(`alert-${tipo}`, "fade-in");
      mensagem.innerHTML = `<span>•</span> ${texto}`;
    }
  
    function limparMensagens() {
      mensagem.classList.add("d-none");
      mensagem.classList.remove("alert-danger", "alert-success", "fade-in");
      mensagem.innerHTML = "";
    }
  
    function salvarProduto(produto) {
      let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
      produtos.push(produto);
      localStorage.setItem("produtos", JSON.stringify(produtos));
    }
  });

CREATE TABLE movimentacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    data DATETIME NOT NULL,
    produto_id INT NOT NULL,
    quantidade INT NOT NULL,
    acao ENUM('entrada', 'saida') NOT NULL,
    usuario VARCHAR(255) NOT NULL,
    FOREIGN KEY (produto_id) REFERENCES produtos(id)
);
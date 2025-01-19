import sqlite3

# Conectar ao banco de dados (ou criar se não existir)
conn = sqlite3.connect('estoque.db')

# Criar um cursor
cursor = conn.cursor()

# Criar a tabela de produtos
cursor.execute('''
CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    categoria TEXT NOT NULL,
    quantidade INTEGER NOT NULL,
    preco REAL NOT NULL
)
''')

# Inserir dados na tabela de produtos
produtos = [
    ('Produto 1', 'Categoria 1', 20, 50.00),
    ('Produto 2', 'Categoria 2', 10, 35.00),
    ('Produto 3', 'Categoria 3', 15, 40.00)
]

cursor.executemany('''
INSERT INTO produtos (nome, categoria, quantidade, preco)
VALUES (?, ?, ?, ?)
''', produtos)

# Salvar as alterações e fechar a conexão
conn.commit()
conn.close()
import sqlite3
import json

# Conectar ao banco de dados
conn = sqlite3.connect('estoque.db')

# Criar um cursor
cursor = conn.cursor()

# Buscar dados da tabela de produtos
cursor.execute('SELECT nome, categoria, quantidade, preco FROM produtos')
produtos = cursor.fetchall()

# Fechar a conexão
conn.close()

# Converter os dados para JSON
produtos_json = json.dumps([{
    'nome': produto[0],
    'categoria': produto[1],
    'quantidade': produto[2],
    'preco': produto[3]
} for produto in produtos])

# Salvar o JSON em um arquivo
with open('produtos.json', 'w') as f:
    f.write(produtos_json)
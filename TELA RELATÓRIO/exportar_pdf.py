import sqlite3
import json
from fpdf import FPDF
from flask import Flask, request, send_file

app = Flask(__name__)

@app.route('/export_pdf.py', methods=['POST'])
def export_pdf():
    data = request.get_json()
    produto = data.get('produto', '')
    quantidade = data.get('quantidade', '')
    acao = data.get('acao', '')
    usuario = data.get('usuario', '')

    conn = sqlite3.connect('estoque.db')
    cursor = conn.cursor()

    query = "SELECT data, produto, quantidade, acao, usuario FROM movimentacoes WHERE 1=1"
    params = []

    if produto:
        query += " AND produto LIKE ?"
        params.append(f"%{produto}%")
    if quantidade:
        query += " AND quantidade >= ?"
        params.append(quantidade)
    if acao:
        query += " AND acao LIKE ?"
        params.append(f"%{acao}%")
    if usuario:
        query += " AND usuario LIKE ?"
        params.append(f"%{usuario}%")

    cursor.execute(query, params)
    rows = cursor.fetchall()
    conn.close()

    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)

    pdf.cell(200, 10, txt="Relatório de Movimentações", ln=True, align='C')

    pdf.cell(40, 10, txt="Data", border=1)
    pdf.cell(40, 10, txt="Produto", border=1)
    pdf.cell(40, 10, txt="Quantidade", border=1)
    pdf.cell(40, 10, txt="Ação", border=1)
    pdf.cell(40, 10, txt="Usuário", border=1)
    pdf.ln()

    for row in rows:
        pdf.cell(40, 10, txt=row[0], border=1)
        pdf.cell(40, 10, txt=row[1], border=1)
        pdf.cell(40, 10, txt=str(row[2]), border=1)
        pdf.cell(40, 10, txt=row[3], border=1)
        pdf.cell(40, 10, txt=row[4], border=1)
        pdf.ln()

    pdf_output = "relatorio.pdf"
    pdf.output(pdf_output)

    return send_file(pdf_output, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
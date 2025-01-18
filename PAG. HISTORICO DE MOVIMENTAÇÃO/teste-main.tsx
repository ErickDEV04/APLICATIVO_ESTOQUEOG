import React, { useEffect, useState } from 'react';

const MovementsTable: React.FC = () => {
  const [filter, setFilter] = useState('');
  const [data, setData] = useState<string[][]>([
    // Exemplo de dados. Substitua pelos dados reais.
    ['1', 'Produto A', 'Descrição A'],
    ['2', 'Produto B', 'Descrição B'],
    ['3', 'Produto C', 'Descrição C'],
  ]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value.toLowerCase());
  };

  const handleRowClick = (productName: string) => {
    alert(`Você clicou no produto: ${productName}`);
  };

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Buscar movimentações..."
        className="form-control mb-3"
        onChange={handleSearch}
      />
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Produto</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter((row) =>
              row.some((cell) => cell.toLowerCase().includes(filter))
            )
            .map((row, index) => (
              <tr key={index} onClick={() => handleRowClick(row[1])}>
                {row.map((cell, i) => (
                  <td key={i}>{cell}</td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default MovementsTable;

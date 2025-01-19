<?php
// Conexão com o banco de dados
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "estoque";

// Criar conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Consulta SQL
$sql = "SELECT data, produto, quantidade, acao, usuario FROM movimentacoes";
$result = $conn->query($sql);

$movements = array();
if ($result->num_rows > 0) {
    // Saída de dados de cada linha
    while($row = $result->fetch_assoc()) {
        $movements[] = $row;
    }
} 

$conn->close();

header('Content-Type: application/json');
echo json_encode($movements);
?>
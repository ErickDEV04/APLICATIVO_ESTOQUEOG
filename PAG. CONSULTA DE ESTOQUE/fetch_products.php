<?php
include 'TESTE_DB.php';

$sql = "SELECT nome, categoria, quantidade, preco FROM produtos";
$result = $conn->query($sql);

$produtos = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $produtos[] = $row;
    }
}

$conn->close();

header('Content-Type: application/json');
echo json_encode($produtos);
?>
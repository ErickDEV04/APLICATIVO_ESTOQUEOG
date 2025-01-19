<?php
$servername = "localhost";
$username = "root";
$password = "1234";
$dbname = "gestao_estoque";

// Criar conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}
?>
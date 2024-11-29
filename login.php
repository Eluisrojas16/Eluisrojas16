<?php
session_start();

// Configuración de la conexión a la base de datos
$servername = "localhost";
$username = "root"; // Ajusta según sea necesario
$password = ""; // Ajusta según sea necesario
$dbname = "systenmbc"; // Base de datos

// Crear la conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener los datos enviados desde el formulario
$user = $_POST['username'];
$pass = $_POST['password'];

// Consultar en la base de datos si existe el usuario
$sql = "SELECT * FROM usuarios WHERE username = '$user'";
$result = $conn->query($sql);

// Verificar si el usuario existe
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    
    // Verificar la contraseña usando password_verify()
    if (password_verify($pass, $row['password'])) {
        // Iniciar sesión correctamente
        $_SESSION['username'] = $user; // Guardar el nombre de usuario en la sesión
        
        // Redirigir al dashboard
        header("Location: container/dashboard.php");
        exit();
    } else {
        echo "Contraseña incorrecta.";
    }
} else {
    echo "Usuario no encontrado.";
}

// Comparar contraseñas sin cifrar (NO RECOMENDADO)
if ($pass == $row['password']) {
    // Iniciar sesión correctamente
    $_SESSION['username'] = $user;
    header("Location: Conteiner/dashboard.html");
    exit();
} else {
    echo "Contraseña incorrecta.";
}


$conn->close();
?>

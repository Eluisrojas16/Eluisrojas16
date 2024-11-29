<?php
session_start();
session_destroy(); // Destruir la sesión actual
header("Location: index.html"); // Redirigir al login
exit();
?>

<?php
session_start();

// Verificar si el usuario está autenticado
if (!isset($_SESSION['username'])) {
    header("Location: ../index.html"); // Redirigir al login si no está autenticado
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>System - MBC</title>
    <link rel="stylesheet" href="dashboard.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body>
    <!-- Header section remains unchanged -->
    <header>
        <div class="user-info">
            <p>Usuario: <span id="username">Name</span></p>
            <p>Rol: <span id="role">RolAsignado</span></p>
        </div>
    </header>
    <nav>
        <ul class="menu">
            <li><a href="/SystemMBC/Conteiner/inventory/storege.html"><i class="fas fa-box"></i> Inventarios</a></li>
            <li><a href="/SystemMBC/Conteiner/dashboard.html"><i class="fas fa-file-arrow-up"></i>Cotización</a></li>
            <li><a href="/SystemMBC/Conteiner/dashboard.html"><i class="fas fa-file-invoice"></i> Facturación</a></li>
            <li><a href="/SystemMBC/Conteiner/dashboard.html"><i class="fas fa-calculator"></i> Contabilidad</a></li>
            <li><a href="/SystemMBC/Conteiner/dashboard.html"><i class="fas fa-cash-register"></i> Caja</a></li>
            <li><a href="/SystemMBC/Conteiner/dashboard.html"><i class="fas fa-chart-line"></i> Reportes</a></li>
            <li><a href="/SystemMBC/Conteiner/dashboard.html"><i class="fas fa-cogs"></i> Gestión</a></li>
        </ul>
    </nav>


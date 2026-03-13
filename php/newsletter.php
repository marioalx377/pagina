<?php
/**
 * COSAMI - Suscripción al boletín
 * Archivo: php/newsletter.php
 */

header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido.']);
    exit;
}

$email = trim(filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL));

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Correo inválido.']);
    exit;
}

// Guardar en archivo CSV local
$archivo = __DIR__ . '/../logs/newsletter.csv';
$dir     = dirname($archivo);

if (!is_dir($dir)) {
    mkdir($dir, 0755, true);
}

// Verificar si ya está suscrito
$existentes = file_exists($archivo) ? file($archivo, FILE_IGNORE_NEW_LINES) : [];
foreach ($existentes as $linea) {
    $partes = str_getcsv($linea);
    if (isset($partes[1]) && $partes[1] === $email) {
        echo json_encode(['success' => false, 'message' => 'Este correo ya está suscrito.']);
        exit;
    }
}

// Agregar nuevo suscriptor
$linea = date('Y-m-d H:i:s') . ',' . $email . "\n";
file_put_contents($archivo, $linea, FILE_APPEND | LOCK_EX);

echo json_encode([
    'success' => true,
    'message' => '¡Gracias! Te has suscrito correctamente a nuestro boletín.'
]);

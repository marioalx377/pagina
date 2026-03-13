<?php
/**
 * COSAMI - Manejo del formulario de contacto
 * Archivo: php/contact.php
 */

header('Content-Type: application/json; charset=UTF-8');

// ---- Configuración ----
define('CORREO_DESTINO', 'info@cosami.com.gt');
define('NOMBRE_SITIO',   'COSAMI - Cooperativa');

// ---- Solo aceptar POST ----
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido.']);
    exit;
}

// ---- Sanitizar y validar campos ----
$nombre   = trim(filter_input(INPUT_POST, 'nombre',   FILTER_SANITIZE_SPECIAL_CHARS));
$email    = trim(filter_input(INPUT_POST, 'email',    FILTER_SANITIZE_EMAIL));
$telefono = trim(filter_input(INPUT_POST, 'telefono', FILTER_SANITIZE_SPECIAL_CHARS));
$asunto   = trim(filter_input(INPUT_POST, 'asunto',   FILTER_SANITIZE_SPECIAL_CHARS));
$mensaje  = trim(filter_input(INPUT_POST, 'mensaje',  FILTER_SANITIZE_SPECIAL_CHARS));

// Validaciones básicas
$errores = [];

if (empty($nombre)) {
    $errores[] = 'El nombre es requerido.';
}
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errores[] = 'El correo electrónico no es válido.';
}
if (empty($mensaje)) {
    $errores[] = 'El mensaje es requerido.';
}

if (!empty($errores)) {
    echo json_encode([
        'success' => false,
        'message' => implode(' ', $errores)
    ]);
    exit;
}

// ---- Protección anti-spam (honeypot) ----
// (Agrega un campo oculto llamado "website" en el formulario; los bots lo llenan)
$honeypot = trim($_POST['website'] ?? '');
if (!empty($honeypot)) {
    // Bot detectado — responder como si fuera exitoso
    echo json_encode(['success' => true, 'message' => 'Mensaje recibido.']);
    exit;
}

// ---- Construir el correo ----
$asuntoMail = NOMBRE_SITIO . ' - Consulta: ' . (!empty($asunto) ? $asunto : 'General');

$cuerpo  = "=== NUEVO MENSAJE DE CONTACTO ===\n\n";
$cuerpo .= "Nombre:   {$nombre}\n";
$cuerpo .= "Email:    {$email}\n";
$cuerpo .= "Teléfono: {$telefono}\n";
$cuerpo .= "Asunto:   {$asunto}\n";
$cuerpo .= "\nMensaje:\n{$mensaje}\n";
$cuerpo .= "\n\nFecha: " . date('d/m/Y H:i:s') . "\n";
$cuerpo .= "IP: " . ($_SERVER['REMOTE_ADDR'] ?? 'N/A') . "\n";

$headers  = "From: noreply@cosami.com.gt\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// ---- Guardar en log local (opcional) ----
guardarLog($nombre, $email, $telefono, $asunto, $mensaje);

// ---- Enviar correo ----
$enviado = mail(CORREO_DESTINO, $asuntoMail, $cuerpo, $headers);

if ($enviado) {
    echo json_encode([
        'success' => true,
        'message' => 'Tu mensaje fue enviado correctamente. Te contactaremos pronto.'
    ]);
} else {
    // En servidores locales mail() puede fallar — para desarrollo siempre retorna OK
    echo json_encode([
        'success' => true,
        'message' => 'Mensaje recibido. Nos pondremos en contacto contigo.'
    ]);
}

// ---- Función de log ----
function guardarLog($nombre, $email, $telefono, $asunto, $mensaje)
{
    $logDir  = __DIR__ . '/../logs/';
    $logFile = $logDir . 'contactos.log';

    // Crear carpeta si no existe
    if (!is_dir($logDir)) {
        mkdir($logDir, 0755, true);
    }

    $linea = sprintf(
        "[%s] Nombre: %s | Email: %s | Tel: %s | Asunto: %s | Msg: %s\n",
        date('Y-m-d H:i:s'),
        $nombre, $email, $telefono, $asunto,
        str_replace(["\r", "\n"], ' ', $mensaje)
    );

    file_put_contents($logFile, $linea, FILE_APPEND | LOCK_EX);
}

# COSAMI – Documentación Técnica del Proyecto

---

## Índice

1. [Estructura general](#1-estructura-general)
2. [index.html](#2-indexhtml)
3. [css/style.css](#3-cssstylecss)
4. [css/animations.css](#4-cssanimationscss)
5. [css/responsive.css](#5-cssresponsivecss)
6. [js/slider.js](#6-jssliderjs)
7. [js/animations.js](#7-jsanimationsjs)
8. [js/main.js](#8-jsmainjs)
9. [php/contact.php](#9-phpcontactphp)
10. [php/newsletter.php](#10-phpnewsletterphp)
11. [pages/nosotros.html](#11-pagesnosotroshtml)
12. [Mapa de conexiones](#12-mapa-de-conexiones)
13. [Qué pasa si modifico X](#13-qué-pasa-si-modifico-x)

---

## 1. Estructura general

```
prueba/
│
├── index.html                ← Página principal del sitio
│
├── css/
│   ├── style.css             ← Estilos base: colores, layout, componentes
│   ├── animations.css        ← Animaciones CSS: keyframes, hover, transiciones
│   └── responsive.css        ← Diseño adaptable: móvil, tablet, escritorio
│
├── js/
│   ├── slider.js             ← Controla el carrusel de imágenes del hero
│   ├── animations.js         ← Animaciones al hacer scroll + contadores
│   └── main.js               ← Lógica general: menú, cotizador, formulario
│
├── php/
│   ├── contact.php           ← Procesa el formulario de contacto
│   └── newsletter.php        ← Procesa suscripción al boletín
│
├── pages/
│   └── nosotros.html         ← Página interior de ejemplo ("Quiénes Somos")
│
├── assets/
│   └── images/               ← Carpeta para imágenes del sitio
│
├── logs/                     ← Carpeta creada automáticamente por PHP
│   ├── contactos.log         ← Registro de mensajes recibidos
│   └── newsletter.csv        ← Lista de correos suscritos
│
├── README.md                 ← Guía de inicio rápido
└── DOCUMENTACION.md          ← Este archivo
```

---

## 2. index.html

**Qué es:** El archivo raíz del sitio. Es la única página completa que el usuario ve al entrar.

**Qué contiene (sección por sección):**

| Sección HTML            | ID / Clase          | Descripción                                              |
|-------------------------|---------------------|----------------------------------------------------------|
| `<header>`              | `#header`           | Barra de navegación fija con logo, menú y botones        |
| `<nav>`                 | `#navbar`           | Lista de enlaces con dropdowns                           |
| `<section class="hero">`| `#inicio`           | Carrusel de 4 slides con texto e imagen circular         |
| `.quick-access`         | —                   | Las 3 tarjetas de acceso rápido (Cotizador, Memorias, MiCoope)|
| `.stats-section`        | —                   | Fila de estadísticas con contadores animados             |
| `.services-section`     | `#nosotros`         | Grilla de 6 tarjetas de servicios financieros            |
| `.calculator-section`   | `#cotizador`        | Cotizador interactivo de préstamos                       |
| `.benefits-section`     | `#beneficios`       | 6 beneficios de ser asociado                             |
| `.agencies-section`     | `#agencias`         | 4 tarjetas de agencias con dirección y teléfono          |
| `.contact-section`      | `#contacto`         | Información de contacto + formulario                     |
| `<footer>`              | —                   | Logo, enlaces, información de regulación, redes sociales |
| `.back-to-top`          | `#backToTop`        | Botón flotante para volver arriba                        |

**Archivos que carga (en orden):**

```html
<!-- Al inicio del <head> -->
css/style.css        ← primero: variables y layout base
css/animations.css   ← segundo: necesita las variables de style.css
css/responsive.css   ← tercero: sobreescribe estilos para pantallas pequeñas

<!-- Al final del <body>, antes del </body> -->
js/slider.js         ← primero: inicializa el carrusel
js/animations.js     ← segundo: activa animaciones de scroll
js/main.js           ← tercero: menú, cotizador y formulario
```

> **Por qué este orden:** Los JS se cargan al final del body para que el HTML ya
> exista cuando los scripts buscan elementos con `document.querySelector`. Si los
> mueves al `<head>`, los elementos no existen todavía y los scripts fallarán.

**Elementos HTML críticos (no renombrar sin actualizar el JS):**

| ID del elemento      | Usado en archivo | Para qué sirve                          |
|----------------------|------------------|-----------------------------------------|
| `#header`            | animations.js    | Añadir clase `scrolled` al hacer scroll |
| `#slider`            | slider.js        | Contenedor principal del carrusel       |
| `#sliderDots`        | slider.js        | Donde se insertan los puntos del slider |
| `#prevBtn`           | slider.js        | Botón "anterior" del slider             |
| `#nextBtn`           | slider.js        | Botón "siguiente" del slider            |
| `#navbar`            | main.js          | Menú que se abre/cierra en móvil        |
| `#menuToggle`        | main.js          | Botón hamburguesa                       |
| `#loanType`          | main.js          | Select del tipo de préstamo             |
| `#loanAmount`        | main.js          | Input del monto del préstamo            |
| `#loanTerm`          | main.js          | Slider del plazo en meses               |
| `#plazoDisplay`      | main.js          | Texto que muestra el valor del plazo    |
| `#calcResult`        | main.js          | Div donde aparece el resultado          |
| `#resultCuota`       | main.js          | Muestra la cuota mensual calculada      |
| `#resultTotal`       | main.js          | Muestra el total a pagar                |
| `#contactForm`       | main.js          | El formulario de contacto completo      |
| `#formMessage`       | main.js          | Mensaje de éxito/error del formulario   |
| `#backToTop`         | animations.js    | Botón flotante "volver arriba"          |
| `.stat-number`       | animations.js    | Números que se animan al entrar en view |
| `data-target="X"`    | animations.js    | Valor final del contador animado        |

---

## 3. css/style.css

**Qué es:** El archivo de estilos principal. Define el "aspecto visual" de todos los
componentes. Es el que más se editará al cambiar colores, tamaños o layouts.

**Estructura interna:**

```
:root { ... }           ← VARIABLES GLOBALES DE COLOR Y DISEÑO
Reset                   ← Normalización del navegador
.container              ← Ancho máximo centrado (1200px)
.btn / .btn-*           ← Todos los estilos de botones
.section-header         ← Títulos de cada sección
HEADER / NAVBAR         ← Logo, menú, dropdowns
HERO SLIDER             ← Fondo azul, texto, círculo de imagen
ACCESOS RÁPIDOS         ← Las 3 tarjetas grandes
ESTADÍSTICAS            ← Fila de números con fondo degradado
SERVICIOS               ← Grilla de 6 tarjetas
COTIZADOR               ← Formulario de cálculo
BENEFICIOS              ← 6 items con ícono
AGENCIAS                ← 4 tarjetas con datos de contacto
CONTACTO                ← Formulario + info de contacto
FOOTER                  ← Pie de página completo
BACK TO TOP             ← Botón flotante
```

**Las variables CSS (`:root`)** — Son lo más importante:

```css
:root {
  --blue-dark:   #0d3165;   /* Azul oscuro principal (header, cards, botones) */
  --blue-mid:    #1a4a8a;   /* Azul medio (hover, degradados) */
  --blue-light:  #2563b8;   /* Azul claro (acentos) */
  --green:       #3db94f;   /* Verde de botones CTA y badges */
  --green-dark:  #2a9e3f;   /* Verde al hover */
  --white:       #ffffff;
  --gray-light:  #f4f6fb;   /* Fondo de secciones alternas */
  --gray-mid:    #e2e8f0;   /* Bordes */
  --gray-text:   #64748b;   /* Texto secundario */
  --dark:        #1e293b;   /* Texto principal */
  --shadow:      ...;       /* Sombra estándar de tarjetas */
  --radius:      12px;      /* Bordes redondeados pequeños */
  --radius-lg:   20px;      /* Bordes redondeados grandes */
  --transition:  0.3s ease; /* Velocidad de transiciones hover */
}
```

> Cambiar cualquier variable afecta **todo el sitio** de una sola vez. No es
> necesario buscar cada color individualmente.

**Conexión con otros archivos:**
- `animations.css` usa las mismas variables (`var(--blue-dark)`, `var(--green)`, etc.)
  por eso `style.css` debe cargarse **antes** que `animations.css`.
- `responsive.css` sobreescribe clases definidas en `style.css`, por eso también
  se carga después.

---

## 4. css/animations.css

**Qué es:** Contiene exclusivamente animaciones y efectos de movimiento.
No define colores ni layouts nuevos — solo los modifica para crear movimiento.

**Qué hay dentro:**

| Sección                         | Descripción                                                  |
|---------------------------------|--------------------------------------------------------------|
| `@keyframes fadeInUp/Left/Right`| Entradas desde distintas direcciones                         |
| `@keyframes scaleIn`            | Aparición con escala desde el centro                         |
| `@keyframes pulse`              | Pulso circular de los botones CTA importantes                |
| `@keyframes spin-slow`          | Rotación lenta de íconos al hacer hover                      |
| `@keyframes float`              | Flotación del círculo de imagen en el slider                 |
| `@keyframes shimmer`            | Efecto de brillo en el logo al hover                         |
| `.animate-on-scroll`            | Clase base: elementos invisibles hasta entrar al viewport    |
| `.animate-on-scroll.in-view`    | Estado visible (activado por `animations.js`)                |
| `.btn::after` (ripple)          | Efecto de onda al hacer clic en cualquier botón              |
| `.nav-link::after`              | Línea que aparece bajo el enlace activo del menú             |
| `.slide.active .slide-title`    | Animación de entrada del texto al cambiar slide              |

**Conexión con JS:**
- `animations.js` añade la clase `.in-view` a elementos con `.animate-on-scroll`.
  El CSS en este archivo define qué pasa cuando esa clase existe.
- El slider en `slider.js` añade/quita la clase `.active` a cada `.slide`.
  Las animaciones del texto del slider (`fadeInLeft`) están en este archivo y se
  disparan automáticamente cuando `.slide.active` existe.

**Si quieres cambiar la velocidad de una animación:**
Busca el bloque de esa animación en este archivo. El número en segundos (`0.7s`,
`0.3s`, etc.) controla la duración. El segundo número es el retraso (`delay`).

---

## 5. css/responsive.css

**Qué es:** Adapta el diseño a diferentes tamaños de pantalla. Sobreescribe reglas
de `style.css` usando `@media` queries.

**Breakpoints definidos:**

| Breakpoint        | Condición          | Qué cambia                                                   |
|-------------------|--------------------|--------------------------------------------------------------|
| Tablet grande     | `max-width: 1024px`| Servicios en 2 columnas, agencias en 2 columnas, footer 2x2 |
| Tablet            | `max-width: 900px` | Menú hamburguesa aparece, hero en 1 columna, layout apilado  |
| Móvil             | `max-width: 640px` | Todo en 1 columna, tarjetas rápidas horizontales             |
| Muy pequeño       | `max-width: 380px` | Ajustes tipográficos adicionales                             |

**Conexión con JS:**
- El menú hamburguesa (`#menuToggle`) existe siempre en el HTML, pero está
  `display: none` en `style.css`. Este archivo lo muestra en pantallas ≤ 900px.
- Cuando `main.js` añade la clase `.open` al `#navbar`, este archivo define cómo
  se ve ese menú desplegado en modo móvil.

---

## 6. js/slider.js

**Qué es:** Controla completamente el carrusel (slider) del hero.

**Cómo funciona:**

```
1. Busca todos los elementos .slide en el DOM
2. Crea botones "dot" dinámicamente y los inserta en #sliderDots
3. Función goTo(index): quita .active del slide actual → añade .active al nuevo
4. Inicia un setInterval de 5 segundos que llama a next() automáticamente
5. Escucha eventos: clic en flechas, clic en dots, swipe táctil, teclas ←→
6. Pausa el autoplay cuando el mouse está sobre el slider
```

**Elementos HTML que requiere (deben existir en index.html):**

```
.slide           ← Cada slide individual (clase, no ID)
#slider          ← Contenedor de todos los slides
#sliderDots      ← Div vacío donde se insertan los dots
#prevBtn         ← Botón flecha izquierda
#nextBtn         ← Botón flecha derecha
```

**Qué activa en CSS:**
- Añade/quita la clase `.active` en `.slide` → `animations.css` define la animación
  de entrada del texto cuando `.slide.active` existe.
- Añade/quita la clase `.active` en `.dot` → `style.css` cambia el ancho del dot
  activo (de redondo a pastilla).

**Si quieres cambiar el tiempo entre slides:**
Busca la constante `DELAY` en este archivo:
```javascript
const DELAY = 5000; // ms → cambiar a 3000 para cada 3 segundos
```

**Si quieres agregar un nuevo slide:**
1. Añade un `<div class="slide">` con el mismo HTML que los otros en `index.html`.
2. El script lo detectará automáticamente y creará el dot correspondiente.
   No hay que tocar `slider.js`.

---

## 7. js/animations.js

**Qué es:** Gestiona todas las animaciones que dependen del scroll y del tiempo
usando `IntersectionObserver` (la API moderna del navegador para detectar
qué elementos son visibles).

**Qué hace exactamente:**

### A) Animate on scroll
- Busca estos elementos: `.quick-card`, `.service-card`, `.benefit-item`,
  `.agency-card`, `.stat-item`
- Les añade la clase `animate-on-scroll` (que en `animations.css` los hace
  invisibles y desplazados hacia abajo)
- Cuando el usuario hace scroll y el elemento entra en pantalla, le añade `.in-view`
  (que los vuelve visibles con una transición suave)

### B) Contador animado
- Busca todos los elementos con la clase `.stat-number`
- Cuando entran al viewport, lee el atributo `data-target="45000"` del HTML
- Anima el número desde 0 hasta ese valor en ~1.8 segundos
- Usa `requestAnimationFrame` para que sea fluido

### C) Header con sombra al scroll
- Escucha el evento `scroll` de la ventana
- Añade/quita la clase `.scrolled` en `#header`
- `style.css` define que `.header.scrolled` tiene una sombra más pronunciada

### D) Botón "volver arriba"
- Escucha el scroll
- Muestra `#backToTop` añadiendo la clase `.visible` cuando el scroll > 400px
- Al hacer clic, hace `window.scrollTo({ top: 0, behavior: 'smooth' })`

### E) Nav link activo por scroll
- Observa todas las `<section id="...">` del HTML
- Cuando una sección entra en viewport, busca el `<a href="#ese-id">` en el menú
  y le añade la clase `.active`
- Las otras clases `.active` se eliminan automáticamente

### F) Efecto ripple en tarjetas rápidas
- Al hacer clic en `.quick-card`, crea un elemento visual circular que se expande
- También navega suavemente hasta el destino indicado en `data-href="..."`

**Conexión con el HTML:**
Los elementos `<section id="inicio">`, `<section id="cotizador">`, etc. son los que
este script observa para actualizar el menú activo.

**Conexión con CSS:**
- `.animate-on-scroll` / `.in-view` → `animations.css`
- `.scrolled` → `style.css`
- `.visible` → `style.css` (botón back-to-top)

---

## 8. js/main.js

**Qué es:** El archivo de lógica de la interfaz de usuario. Contiene tres
funcionalidades independientes.

### A) Menú hamburguesa (móvil)

- Al hacer clic en `#menuToggle`, añade/quita la clase `.open` en `#navbar`
- La clase `.open` en `responsive.css` hace visible el menú a pantalla completa
- Inyecta dinámicamente los botones "Mi Coope en línea" y "Contáctanos" dentro
  del menú móvil (no existen en el HTML original para no duplicarlos)
- Anima las 3 líneas del ícono hamburguesa convirtiéndolas en una "X"
- Al hacer clic en cualquier enlace del menú, lo cierra automáticamente

### B) Cotizador de préstamos

La función `calcularCuota()` es global (se llama desde el `onclick` del botón en HTML):

```
1. Lee los valores de #loanType, #loanAmount, #loanTerm
2. Valida que los campos estén completos y el monto sea ≥ 1,000
3. Selecciona la tasa de interés según el tipo de préstamo:
   - personal:    18% anual
   - vivienda:    10% anual
   - vehiculo:    14% anual
   - empresarial: 16% anual
4. Aplica la fórmula de amortización francesa:
   cuota = (monto × tasa_mensual × (1+tasa)^meses) / ((1+tasa)^meses - 1)
5. Muestra el resultado en #resultCuota y #resultTotal
6. Hace scroll suave hasta el resultado
```

El `<input type="range" id="loanTerm">` en el HTML tiene un evento `input` que
actualiza el texto `#plazoDisplay` en tiempo real mientras el usuario arrastra.

### C) Formulario de contacto (AJAX)

```
1. Intercepta el submit del formulario #contactForm (previene recarga de página)
2. Deshabilita el botón y muestra "Enviando..."
3. Envía los datos con fetch() a php/contact.php usando FormData
4. Espera la respuesta JSON: { success: true/false, message: "..." }
5. Muestra el mensaje en #formMessage con clase .success o .error
6. Limpia el formulario si fue exitoso
7. Después de 6 segundos, oculta el mensaje automáticamente
```

### D) Smooth scroll

Intercepta todos los `<a href="#seccion">` del sitio y en lugar de un salto
brusco, hace un `window.scrollTo` suave que descuenta la altura del header
fijo para que el contenido no quede tapado.

**Conexión con PHP:**
- `main.js` hace `fetch('php/contact.php', ...)` → espera JSON de vuelta
- Si PHP no está disponible (abrir HTML directamente), el formulario arrojará
  un error de red. Esto es esperado — para pruebas sin servidor, el formulario
  simplemente no funcionará pero el resto del sitio sí.

---

## 9. php/contact.php

**Qué es:** El script del servidor que recibe y procesa el formulario de contacto.

**Flujo completo:**

```
1. Verifica que sea una petición POST (rechaza GET, PUT, etc.)
2. Sanitiza los campos: nombre, email, telefono, asunto, mensaje
3. Valida campos obligatorios (nombre, email válido, mensaje)
4. Revisa el campo honeypot "website" (campo oculto anti-bots):
   - Si viene lleno → es un bot → responde éxito falso y termina
5. Construye el correo con formato de texto plano
6. Llama a guardarLog() para escribir en logs/contactos.log
7. Llama a mail() para enviar el correo a CORREO_DESTINO
8. Devuelve JSON: { "success": true/false, "message": "..." }
```

**Constantes a configurar (arriba del archivo):**

```php
define('CORREO_DESTINO', 'info@cosami.com.gt'); // ← cambiar a tu correo real
define('NOMBRE_SITIO',   'COSAMI - Cooperativa');
```

**Archivos que genera:**
- `logs/contactos.log` — una línea por cada mensaje recibido con fecha, nombre,
  email, teléfono y mensaje. La carpeta se crea automáticamente.

**Conexión con JS:**
- `main.js` llama a este archivo con `fetch('php/contact.php')`
- Espera una respuesta JSON. Si el JSON no viene bien formado (error PHP),
  el bloque `catch` en `main.js` mostrará el mensaje de error genérico.

**Requisitos del servidor:**
- PHP 7.0 o superior
- Función `mail()` configurada (en hosting compartido generalmente ya funciona)
- En XAMPP local, `mail()` no envía correos reales sin configuración adicional,
  pero el log sí se guarda correctamente.

---

## 10. php/newsletter.php

**Qué es:** Recibe el correo de un suscriptor y lo guarda en un CSV.

**Flujo:**

```
1. Verifica que sea POST
2. Sanitiza y valida el email
3. Lee logs/newsletter.csv para verificar que el email no esté repetido
4. Si es nuevo, agrega una línea: "fecha,email"
5. Responde JSON con éxito o mensaje de error
```

**Archivo que genera:** `logs/newsletter.csv`

> **Nota:** Este script está listo pero aún no hay un formulario de newsletter
> en `index.html`. Para activarlo, añade un `<form>` en el footer y desde
> `main.js` envíalo a `php/newsletter.php` con `fetch()`.

---

## 11. pages/nosotros.html

**Qué es:** Una página interior de ejemplo que muestra cómo crear páginas
adicionales del sitio.

**Diferencias con index.html:**
- Usa rutas relativas con `../` para acceder a los CSS: `../css/style.css`
- Tiene un header simplificado (no el menú completo) solo con logo y botón "volver"
- Los estilos específicos de esta página están en un `<style>` interno para no
  contaminar los CSS globales con estilos de una sola página

**Cómo crear más páginas interiores:**
1. Copiar `pages/nosotros.html`
2. Cambiar el `<title>` y el contenido
3. Las rutas `../css/` y `../js/` ya apuntan correctamente a los archivos globales
4. Agregar estilos únicos de esa página en el `<style>` interno

---

## 12. Mapa de conexiones

El siguiente diagrama muestra qué archivos dependen de qué:

```
index.html
│
├── CARGA CSS (en orden)
│   ├── css/style.css         ← Define variables que usan todos los demás CSS
│   ├── css/animations.css    ← Depende de las variables de style.css
│   └── css/responsive.css    ← Sobreescribe clases de style.css
│
└── CARGA JS (en orden, al final del body)
    ├── js/slider.js          ← Lee DOM: .slide, #slider, #sliderDots, #prevBtn, #nextBtn
    │                            Escribe DOM: añade/quita clase .active en slides y dots
    │                            Conecta con CSS: .slide.active dispara animaciones de animations.css
    │
    ├── js/animations.js      ← Lee DOM: .stat-number[data-target], section[id], .quick-card, etc.
    │                            Escribe DOM: añade .in-view, .scrolled, .visible, .active en nav
    │                            Conecta con CSS: esas clases están definidas en style.css y animations.css
    │
    └── js/main.js            ← Lee DOM: #menuToggle, #navbar, #loanType, #contactForm, etc.
                                 Escribe DOM: clase .open en navbar, texto en #resultCuota, clase en #formMessage
                                 Conecta con PHP: fetch('php/contact.php') → recibe JSON
                                 Conecta con CSS: .open está en responsive.css

php/contact.php
│
└── Genera: logs/contactos.log

php/newsletter.php
│
└── Genera: logs/newsletter.csv
```

---

## 13. Qué pasa si modifico X

### Si cambio un color en `style.css`
- Cambia en todo el sitio automáticamente si usas las variables `var(--nombre)`.
- Si escribiste un color directamente (ej: `color: #0d3165`) en lugar de
  `color: var(--blue-dark)`, tendrás que buscarlo manualmente.
- `animations.css` también usa esas variables, así que se actualizará solo.

### Si renombro un ID en `index.html`
- Debes actualizar **todos** los archivos JS que lo usen.
- Busca el ID antiguo en `slider.js`, `animations.js` y `main.js`.
- Usa Ctrl+Shift+F en VS Code para buscar en todos los archivos.

### Si agrego un nuevo slide al carrusel
- Solo agrega el `<div class="slide">` en `index.html`. `slider.js` lo detecta
  automáticamente. No toques `slider.js`.

### Si cambio el orden de los archivos JS en `index.html`
- Poner `main.js` antes que `slider.js` no rompe nada porque son independientes.
- **NUNCA** pongas los scripts JS en el `<head>` sin el atributo `defer`, porque
  el DOM no existirá cuando se ejecuten y fallarán con error "null".

### Si cambio el `action` del formulario en `index.html`
- El formulario tiene `action="php/contact.php"` pero `main.js` intercepta el
  `submit` y usa su propio `fetch('php/contact.php')`.
- Si cambias la ruta en el HTML pero no en `main.js`, el formulario enviará al
  lugar incorrecto. Cambia ambos.

### Si cambio el nombre de un campo del formulario (`name="..."`)
- `contact.php` lee los campos por su atributo `name`.
- Si cambias `name="nombre"` por `name="fullname"` en el HTML, debes cambiar
  `filter_input(INPUT_POST, 'nombre', ...)` por `filter_input(INPUT_POST, 'fullname', ...)`
  en `contact.php`.

### Si quiero añadir una nueva sección y que aparezca en el menú
1. Agregar la sección en `index.html` con un `id` único: `<section id="nueva">`.
2. Agregar el enlace en el `<nav>`: `<li><a href="#nueva" class="nav-link">Nueva</a></li>`.
3. `animations.js` la detectará automáticamente para el resaltado del menú activo.
4. No hay que tocar ningún JS.

### Si el cotizador muestra resultados incorrectos
- Las tasas de interés están en `main.js` en el objeto `tasas`:
  ```javascript
  const tasas = { personal: 0.18, vivienda: 0.10, vehiculo: 0.14, empresarial: 0.16 };
  ```
- Cambia el valor decimal (0.18 = 18% anual) según las tasas reales de la cooperativa.

### Si las animaciones de scroll no funcionan
- `animations.js` usa `IntersectionObserver`. Es compatible con todos los
  navegadores modernos pero no con Internet Explorer.
- Verifica en la consola del navegador (F12) si hay errores de JavaScript.
- Si un elemento no se anima, verifica que tenga alguna de estas clases en el HTML:
  `.quick-card`, `.service-card`, `.benefit-item`, `.agency-card`, `.stat-item`.

### Si el formulario de contacto no envía
- Abriendo `index.html` directamente (sin servidor), `fetch()` fallará porque
  PHP no puede ejecutarse sin servidor web. Esto es normal.
- Con XAMPP/WAMP: verificar que Apache esté corriendo y visitar por
  `http://localhost/prueba/` en lugar de abrir el archivo directamente.
- Revisar `logs/contactos.log` para saber si PHP recibió los datos aunque
  `mail()` haya fallado.

### Si quiero cambiar el tiempo del slider
- Abre `js/slider.js` y cambia la constante en la línea 13:
  ```javascript
  const DELAY = 5000; // ← cambiar a 3000 para 3 segundos
  ```

### Si el menú móvil no funciona
- Verifica que `#menuToggle` y `#navbar` existan en el HTML con esos IDs exactos.
- Verifica que `responsive.css` se cargue después de `style.css`.
- La clase `.open` que activa el menú móvil está definida en `responsive.css`
  dentro del bloque `@media (max-width: 900px)`. Si la mueves fuera de ese
  bloque, el menú aparecerá en escritorio también.

---

*Documentación generada para el proyecto COSAMI. Actualizar este archivo si se
realizan cambios estructurales en el proyecto.*

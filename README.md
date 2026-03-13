# MARIO - Sitio Web Cooperativa

## Estructura del proyecto

```
prueba/
├── index.html              ← Página principal
│
├── css/
│   ├── style.css           ← Estilos principales (variables, layout, componentes)
│   ├── animations.css      ← Todas las animaciones y transiciones
│   └── responsive.css      ← Media queries para móvil y tablet
│
├── js/
│   ├── slider.js           ← Lógica del carrusel/slider del hero
│   ├── animations.js       ← IntersectionObserver, contadores, scroll
│   └── main.js             ← Menú hamburguesa, cotizador, formulario
│
├── php/
│   ├── contact.php         ← Procesamiento del formulario de contacto
│   └── newsletter.php      ← Suscripción al boletín
│
├── pages/
│   └── nosotros.html       ← Página de "Quiénes Somos"
│
├── assets/
│   └── images/             ← Imágenes del sitio (agregar aquí)
│
└── logs/                   ← Logs generados por PHP (auto-creado)
```

## Cómo usar

1. **Sin servidor**: Abrir `index.html` directamente en el navegador.
   - El slider, animaciones y cotizador funcionan completamente.
   - El formulario de contacto requiere servidor PHP.

2. **Con servidor PHP** (XAMPP, WAMP, Laragon):
   - Colocar la carpeta en `htdocs/` o `www/`
   - Acceder por `http://localhost/prueba/`
   - El formulario enviará correos y guardará logs.

## Agregar imágenes al slider

Coloca las imágenes en `assets/images/` con estos nombres:
- `hero1.jpg` → Slide 1 (personas trabajando)
- `hero2.jpg` → Slide 2 (ahorro)
- `hero3.jpg` → Slide 3 (préstamos)
- `hero4.jpg` → Slide 4 (app móvil)

## Personalización rápida

En `css/style.css`, editar las variables CSS al inicio:
```css
:root {
  --blue-dark:  #0d3165;   /* Color principal azul */
  --green:      #3db94f;   /* Color verde de acento */
}
```

# Sitio web de PROSEC Ingeniería Estructural S.A.S.

Página web corporativa de PROSEC Ingeniería Estructural S.A.S. (Barranquilla, Colombia): fabricación y montaje de estructuras metálicas, soldadura estructural, mezzanines, cubiertas, mantenimiento industrial y locativo, pintura industrial, obras civiles y asesoría técnica.

Es un sitio estático, sin dependencias ni proceso de compilación: HTML, CSS y JavaScript sin frameworks.

## Estructura

```
prosec-web/
├── index.html          Página principal (una sola página con secciones)
├── 404.html            Página de "no encontrada"
├── css/
│   └── estilos.css     Estilos (colores de marca en variables :root)
├── js/
│   └── main.js         Menú móvil, filtros y visor de la galería, formulario de cotización
├── fonts/
│   └── archivo-latin.woff2   Tipografía Archivo (variable, licencia SIL OFL 1.1)
├── img/
│   ├── marca/          Logotipo, isotipo e imagen para compartir en redes
│   ├── portada/        Imagen principal
│   ├── servicios/      Una imagen por servicio
│   ├── proyectos/      Una carpeta por proyecto
│   ├── galeria/        Galería general
│   ├── empresa/        Equipo
│   └── contacto/       Fondo de la sección de contacto
├── favicon.ico
├── robots.txt
├── sitemap.xml
└── _headers            Encabezados HTTP para Netlify (otros servicios lo ignoran)
```

## Ver el sitio en el computador

- **Rápido:** doble clic en `index.html`. Todo funciona menos el envío del formulario a Netlify.
- **Con servidor local** (recomendado), desde esta carpeta:
  - Python: `python -m http.server 8000` y abrir http://localhost:8000
  - o en Visual Studio Code, la extensión *Live Server*.

## Secciones (anclas de `index.html`)

`#inicio` · `#servicios` · `#proyectos` · `#galeria` · `#empresa` · `#proceso` · `#preguntas` · `#contacto` (formulario `#form-cotizacion`)

## Formulario de cotización

- **Enviar solicitud:** registra la solicitud en **Netlify Forms** (`name="cotizacion"`, `data-netlify="true"`, campo trampa antispam `sitio-web`). Solo funciona con el sitio publicado en Netlify y la detección de formularios activada; las notificaciones se configuran en Netlify > Forms para `gerencia@prosecie.com`.
- **Enviar por WhatsApp:** abre WhatsApp (+57 313 593 1258) con la solicitud redactada.
- Si el registro falla, la página lo avisa y ofrece WhatsApp o copiar el texto.
- **Estado:** aún no se ha comprobado con un envío real en Netlify.

## Publicación

- Hosting previsto: Netlify (plan Free). Publicar el contenido de esta carpeta (raíz del repositorio) sin comando de compilación.
- `_headers` incluye `X-Robots-Tag: noindex` para la etapa de prueba. **Quitar esa línea al conectar `prosecie.com`.**
- Dominio previsto: `prosecie.com` (Squarespace Domains). El correo usa Google Workspace: al conectar el dominio **no tocar** los registros MX, SPF ni DKIM; solo cambian el registro A de `@` y el CNAME de `www`.

## Contenido e imágenes

- Las fotografías de obras son propiedad de PROSEC.
- Los archivos que empiezan por `ref-` son imágenes de referencia de Unsplash (licencia Unsplash), rotuladas en el sitio como "Imagen de referencia" y no representan obras de PROSEC:
  - `img/portada/ref-porticos-acero-en-montaje*.webp`: david Griffiths, https://unsplash.com/photos/UtgKZUlRV78
  - `img/contacto/ref-estructura-industrial-azul.webp`: Ronald Crow, https://unsplash.com/photos/LaUgeB_dQ54
  - `img/servicios/ref-obras-civiles.webp`: Ray Donnelly, https://unsplash.com/photos/YybYC5zC1Mk

## Contacto

PROSEC Ingeniería Estructural S.A.S. · NIT 901.498.882 · 313 593 1258 · gerencia@prosecie.com

© PROSEC Ingeniería Estructural S.A.S. Todos los derechos reservados.

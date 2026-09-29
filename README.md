# 🏉 Club Natación y Gimnasia - Frontend App

Bienvenido al repositorio del **Frontend** del Club Natación y Gimnasia. Esta es una aplicación web moderna, rápida y dinámica construida con **React, Vite y Tailwind CSS**. Cuenta con dos grandes secciones: la interfaz pública para los socios y fans, y un Panel de Administración privado para gestionar todo el contenido del club.

---

## 🚀 Tecnologías Principales

- **Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Estilos y UI:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animaciones:** [Framer Motion](https://www.framer.com/motion/) y GSAP (Transiciones fluidas y modernas)
- **Enrutamiento:** [React Router v7](https://reactrouter.com/)
- **Estado Global:** [Zustand](https://zustand-demo.pmnd.rs/) (Ligero y potente)
- **Peticiones HTTP:** [Axios](https://axios-http.com/)
- **Formularios y Validación:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Iconos:** [Lucide React](https://lucide.dev/)
- **Alertas y Notificaciones:** React Hot Toast

---

## 📁 Estructura del Proyecto

El proyecto está organizado de manera modular y escalable dentro de la carpeta `src/`.

```text
Frontend/
├── .env                  # Variables de entorno (URL del backend)
├── package.json          # Dependencias y scripts
├── tailwind.config.js    # (Opcional, config de Tailwind si aplica)
├── vite.config.js        # Configuración del bundler
└── src/
    ├── api/              # Instancia configurada de Axios con interceptores de Auth
    ├── assets/           # Recursos estáticos (Sponsors, íconos, imágenes locales)
    ├── components/       # Componentes UI reutilizables (Headers, Modales, Tarjetas)
    │   ├── layout/       # Componentes estructurales (AdminLayout, MainLayout)
    │   └── home/         # Secciones específicas de la portada (SponsorsBar, StandingsPreview)
    ├── hooks/            # Custom Hooks de React (Lógica reutilizable)
    ├── pages/            # Vistas principales de la aplicación
    │   ├── admin/        # Panel de Administración (Torneos, Equipos, Noticias, Auth)
    │   ├── club/         # Páginas institucionales (Historia, Sumate)
    │   ├── noticias/     # Feed de noticias y vista de Artículo Detallado
    │   └── rugby/        # Subsecciones de Rugby (Fixture, Posiciones)
    ├── routes/           # Definición de rutas y Protecciones (Private/Admin Routes)
    ├── store/            # Lógica de estado global (Zustand)
    ├── utils/            # Funciones auxiliares (Ej. shieldDictionary.js)
    ├── App.jsx           # Componente Raíz de React
    └── main.jsx          # Punto de anclaje de React al DOM
```

### Características Destacadas de la UI:

- **Diseño Responsivo (Mobile-First):** Toda la plataforma está pensada para verse excelente tanto en pantallas enormes como en teléfonos celulares.
- **Experiencia Nativa:** Implementación de la Web Share API en dispositivos móviles para compartir noticias, y botones flotantes (FAB) adaptados a interfaces touch.
- **Componentes Inteligentes:** La portada (`StandingsPreview`) incorpora lógica avanzada para asegurar que el club siempre tenga visibilidad, sin importar su posición matemática.
- **Formularios con Zod:** Las validaciones en el panel de administrador son estrictas, mostrando errores amigables antes de enviar peticiones al servidor.

---

## ⚙️ Configuración e Instalación

### 1. Clonar e Instalar

Ubicado en la carpeta `Frontend`, instala las dependencias usando NPM:

```bash
npm install
```

### 2. Variables de Entorno

Vite requiere que las variables públicas empiecen con `VITE_`. Crea un archivo `.env` en la raíz de `Frontend`:

```env
# URL del Backend
VITE_BACKEND_URL=http://localhost:5000
```

_(En producción, como en Vercel, debes colocar la URL real del backend de Render: `https://tu-backend.onrender.com`)_.

---

## 🏃‍♂️ Ejecución del Entorno

### Modo Desarrollo

Inicia el servidor ultrarrápido de Vite (generalmente en `http://localhost:5173`):

```bash
npm run dev
```

### Construcción para Producción

Para compilar la aplicación, optimizar assets y prepararla para el despliegue:

```bash
npm run build
```

Generará una carpeta `dist/` con el código minificado listo para servir en **Vercel** o cualquier hosting de estáticos.

---

## 🔐 Conexión Segura con el Backend

El frontend utiliza `axiosConfig.js` dentro de la carpeta `api/` para configurar la opción `withCredentials: true`. Esto es indispensable ya que el sistema de autenticación de este proyecto funciona con **Cookies httpOnly**.
De esta manera, el navegador enviará automáticamente el token de acceso en las rutas protegidas (`/api/admin/...`), manteniendo el local storage limpio y la aplicación segura contra robo de tokens (XSS).

---

_Desarrollado para el Club Natación y Gimnasia. Diseñado para ofrecer la mejor experiencia deportiva en la web._ 🔴⚪🔵

GAMEZONE STORE

Descripcion

GameZone Store es un simulador de e-commerce desarrollado en JavaScript.
Permite visualizar productos, agregarlos a un carrito, calcular totales y finalizar una compra de forma interactiva.

El proyecto simula el flujo completo de compra de una tienda online utilizando herramientas vistas durante el curso.

---

FUNCIONALIDADES

* Visualización de productos desde archivo JSON
* Filtrado por categoría
* Agregar productos al carrito
* Eliminación de productos individuales
* Vaciado completo del carrito
* Cálculo automático de total y descuento
* Persistencia de datos con LocalStorage
* Finalización de compra con generación de ticket

---

QUE UTILIZE

* JavaScript
* HTML5
* Bootstrap (para estilos)
* LocalStorage
* Fetch API (para cargar datos externos)
* SweetAlert2 (para notificaciones)

---

CARACTERISTICAS DE LA APP

1. Se cargan los productos desde un archivo `productos.json` mediante fetch.
2. Se renderizan dinámicamente en el DOM.
3. El usuario puede:

   * Filtrar productos
   * Agregar al carrito
4. El carrito:

   * Calcula subtotal, descuento y total
   * Se guarda en LocalStorage
5. El usuario completa un formulario y finaliza la compra.
6. Se genera un ticket con los datos de la operación.

---

ESTRUCTURA

```
/proyecto
│
├── index.html
├── javascript/
│   └── main.js
    └──productos.json
```

---

LOCALSTORAGE

Se utiliza LocalStorage para almacenar:

* Carrito de compras
* Historial de ventas
* Inventario cargado

Esto permite mantener los datos incluso al recargar la página.

---

LIBRERIAS

Se utiliza SweetAlert2 para mejorar la experiencia de usuario en las notificaciones.

Documentación:
https://sweetalert2.github.io/

---

COMO EJECUTARLO

1. Clonar o descargar el repositorio
2. Abrir el proyecto en Visual Studio Code
3. Ejecutar con Live Server
4. Interactuar con la aplicación desde el navegador

---

CONCEPTOS

* Manipulación del DOM
* Eventos
* Arrays y métodos (map, filter, reduce, find)
* Objetos y clases
* Asincronismo (async/await)
* Fetch API
* Almacenamiento local

---

AUTOR

Proyecto desarrollado como entrega final del curso de JavaScript por Francisco Martin Barrios Haurigot

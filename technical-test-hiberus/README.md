# TechnicalTestHiberus

## Framework utilizado

Para llevar a cabo el desarrollo de la prueba decidí utilizar Angular.

## Arrancar la aplicación

`npm install` para instalar paquetes necesarios.

`ng serve` para arrancar la aplicación. Navegar a `http://localhost:4200/`.

## Estilos

---

Para los estilos de la aplicación he usado Scss y Bootstrap ya que me permitían maquetar de forma rápida.

## Decisiones tomadas en el desarrollo

---

El flujo de trabajo que he tenido en cuenta para realizar la prueba ha sido:
<br>

- Identificar los principales componentes que necesitaba.
- Plantear la arquitectura de carpetas del proyecto dividiendo en módulos para aislar la lógica y realizar lazy loading.
- Realizar el routing para navegar entre ellos.
- Crear las interfaces y servicios que iba a necesitar para el flujo correcto de la aplicación.
- Crear el interceptor para enviar las cabeceras y el guard para proteger las rutas.
- Crear los distintos componentes con su estructura, funciones y elementos necesarios.
- Revisión del flujo de la aplicación y el código.

## Tiempo dedicado

---

Alrededor de unos 3 días.

## Arquitectura de carpetas

---

- app
  - auth
    - componentes
    - interfaces
    - services
  - core
    - guards
    - interceptors
  - shared
    - componentes
  - styles
    - base
  - users
    - componentes
    - interfaces
    - pipes
    - services

## Dificultades encontradas y soluciones implementadas

---

- Necesidad de mandar el token requerido en la cabecera de todas las peticiones:

  - Decidí utilizar un interceptor para interceptar cada petición, extraer el token del localStorage e introducirlo en las cabeceras de las peticiones.

- Necesidad de saber cuando el usuario estaba logueado y cuando no, para mostrar el botón de logout en el header:

  - Decidí usar un observable de tipo BehaviourSubject que comprobase si existía el token y el usuario había hecho login. Hice uso de esa varible en el componente header a través del pipe async.

- Capturar los posibles errores del servidor en las peticiones:

  - Mi primera solución fue capturar los errores en el interceptor para no repetir código, pero ante la imposibilidad de hacer llegar los errores a los componentes para dar feedback al usuario decidí optar por capturarlos en cada petición.

- Filtrar el array de usuarios para que apareciesen todos menos el propio usuario y paginarlos para no tener un scroll infinito si los usuarios seguían aumentando:
  - Hice uso de un pipe personalizado que me permitía devolver el array filtrado y paginado.

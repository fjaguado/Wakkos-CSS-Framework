#Wakkos CSS Framework - Grunt Edition

Añadido [Grunt](http://gruntjs.com/) al [FrameWork de Wakkos](https://github.com/Wakkos/Wakkos-CSS-Framework) para el pre-procesado automático mientras se trabaja.

Añadida sección JavaScript basada en el artículo [JavaScript orientado a eventos/](http://blog.ckgrafico.com/javascript-orientado-eventos/) de Enrique Fdez. Guerra.

##¿Qué necesita?

Grunt requiere [Node.js](http://nodejs.org/) >= 0.8.0 y su gestor de paquetes [npm](https://npmjs.org/).

Una vez clonado el repositorio, y habiendo instalado las dependencias, ejecutamos en el directorio raíz:

```bash
npm install
```
Esto instalará todas las dependencias del fichero `package.json`.

##¿Qué puede realizar Grunt por nosotros?

Dentro de Gruntfile.js tenemos las diferentes tareas configuradas. Dichas tareas las podemos ejecutar por separado o invocar a otra tarea configurada con `registerTask` que no es más que una lista de tareas a realizar. 

###less

Esta tarea se encarga de compilar nuestros ficheros `less` a un fichero `css`. Está separada en dos entornos:

1. dev: el entorno de desarrollo. En este entorno no comprimirá el `css`, teniendo como resultado un `css` legible para depuración.
2. prod: el entorno de producción. Aquí se comprimirá y minimizará el `css` teniendo un fichero mínimo listo para producción.

En ambos casos el fichero creado será `css/app.css`, según configuración.

###concat

Se encarga de concatenar todos los ficheros `JavaScript` que hemos añadido. En este caso solo se ha configurado el entorno de producción dado que en ambos casos nos interesa tener solo un fichero por comodidad de inclusión en el proyecto. Se generará el fichero `js/scripts.js` que luego será utilizado por `uglify` para minimizar y ofuscar el código. 

###uglify

El encargado de minimizar y ofuscar el `JavaScript` del proyecto. El fichero fuente será el generado por `concat` y lo guardarà como `js/scripts.min.js`.

###favicons

Utiliza el fichero fuente `src/images/logo.jpg` para generar todos los favicons necesarios para el proyecto. En caso de querer utilizar un logo `.png` u otro formato, se debería modificar en el fichero `Gruntfile.js`.

###web_server

Lanza un servidor web en el mismo directorio donde se ejecuta. Nos sirve para no depender de servidores web externos para nuestras pruebas. 

Para arrancar el servidor solo hemos de ejecutar `grunt web_server` y seguidamente tendremos un servidor en `http://localhost:8000`.

###watch

Esta tarea es por lo que es tan útil Grunt. Según la configuración que hay acutalmente, está a la espera de cambios en los ficheros `less`, `javascript` y `html` para realizar ciertas acciones. Para el total funcionamiento de `watch` en este proyecto, será indispensable instalar la extensión [LiveReload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) en Google Chrome.

1. `css`: está pendiente de cambios en los ficheros `less`. En caso de detectar algún cambio, ejecuta automáticamente la compilación y recarga el navegador ( Chrome ) automáticamente; si la extensión está activa. 
2. `js`: concatena, minimiza y ofusca los ficheros `JavaScript` del proyecto. También recarga el navegador. 
3. `webpages`: recarga el navegador cuando se guardan cambios en cualquier fichero `html` del proyecto.

###default

Por último tenemos la acción por defecto. Dicha acción se ejecutará si lanzamos `grunt` sin argumentos y ejecutará las siguientes tareas: 

1.`less:prod`
2.`concat:prod`
3.`uglify:prod`
4.`favicons`

Que ya han sido explicadas anteriormente. 

Todas las tareas mencionadas pueden ejecutarse de forma individual: `grunt tarea`.

##Entorno de desarrollo

Una vez clonado el repositorio e instaladas las dependencias. Deberemos tener dos consolas activas: 

1. `grunt web_server`: nos arrancará el servidor web.
2. `grunt watch`: inspeccionará los cambios en los ficheros y actuará en consecuencia.
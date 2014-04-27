#Wakkos CSS Framework - Grunt Edition

Añadido [Grunt](http://gruntjs.com/) al [FrameWork de Wakkos](https://github.com/Wakkos/Wakkos-CSS-Framework) para el pre-procesado automático mientras se trabaja.

Añadida sección JavaScript basada en el artículo [JavaScript orientado a eventos/](http://blog.ckgrafico.com/javascript-orientado-eventos/) de Enrique Fdez. Guerra.

##¿Qué necesitas?

Grunt requiere [Node.js](http://nodejs.org/) >= 0.8.0 y su gestor de paquetes [npm](https://npmjs.org/).

Una vez clonado el repositorio, y habiendo instalado las dependencias, ejecutamos en el directorio raíz:

```bash
npm install
```
Esto instalará todas las dependencias descritas en el fichero `package.json`.

##¿Qué puede realizar Grunt por nosotros?

Dentro de Gruntfile.js tenemos las diferentes tareas configuradas. Dichas tareas las podemos ejecutar por separado o invocar a otra tarea configurada con `registerTask` que no es más que una lista de tareas a realizar.

###compass

Esta tarea se encarga de compilar nuestros ficheros `scss` a `css`. Está separada en dos entornos:

1. dev: el entorno de desarrollo. En este entorno se añade información adicional para debug.
2. prod: el entorno de producción.

###cssmin

Minimiza nuestro código CSS resultante para que ocupe menos y así ser más liviano.

###concat

Se encarga de concatenar todos los ficheros que hemos añadido; en este caso, JavaScript. En este caso solo se ha configurado el entorno de producción dado que en ambos casos nos interesa tener solo un fichero por comodidad de inclusión en el proyecto. Se generará el fichero `js/scripts.js` que luego será utilizado por `uglify` para minimizar y ofuscar el código.

###uglify

El encargado de minimizar y ofuscar el `JavaScript` del proyecto. El fichero fuente será el generado por `concat` y lo guardarà como `js/scripts.min.js`.

###favicons

Utiliza el fichero fuente `src/images/logo.jpg` para generar todos los favicons necesarios para el proyecto. En caso de querer utilizar un logo `.png` u otro formato, se debería modificar en el fichero `Gruntfile.js`.

###imagemin

Optimiza las imágenes de nuestro directorio `img` para que así ocupen lo mínimo necesario y nuestro proyecto sea más ligero.

###watch

Esta tarea es por lo que es tan útil Grunt. Según la configuración que hay acutalmente, está a la espera de cambios en los ficheros `sass` y `javascript` para realizar ciertas acciones.

1. `css`: está pendiente de cambios en los ficheros `scss`. En caso de detectar algún cambio, ejecuta la compilación y recarga el navegador ( Chrome ) automáticamente; si la extensión está activa.
2. `js`: concatena, minimiza y ofusca los ficheros `JavaScript` del proyecto. También recarga el navegador.

###concurrent

Nos permite ejecutar varias tareas en paralelo para aprovechar las posibilidades multihilo y así acelerar el proceso. El único requisito a tener en cuenta es que no podemos ejecutar tareas dependientes entre ellas en la misma concurrencia. Por ejemplo, no podemos ejecutar la compilación de SASS y el minimizado de CSS dado que este último debe esperar a que el código SASS esté compilado.

1.`dev`. Ejecutamos la compilación de CSS y la concatenación de JavaScript.
2.`prepare`. Prepara los ficheros para la posterior minimización y optimización.
3.`optimize`. Optimiza y minimiza CSS, JavaScript e imágenes.

###default

Se trata de la acción por defecto. Dicha acción se ejecutará si lanzamos `grunt` sin argumentos y ejecutará las siguientes tareas:

1.`compass:dev`
2.`concat:prod`

###build

Se trata de la acción previa a lanzar a producción. Para ello hemos de ejecutar `grunt build` y ejecutará las siguientes tareas:

1.`concurrent:prepare`
2.`concurrent:optimize`

Que ya han sido explicadas anteriormente.

Todas las tareas mencionadas pueden ejecutarse de forma individual: `grunt tarea`.

##Entorno de desarrollo

Una vez clonado el repositorio e instaladas las dependencias, arrancamos en una consola:

`grunt watch`: inspeccionará los cambios en los ficheros y actuará en consecuencia. La consola nos mostrará los errores en tiempo de compilación.


# Wakkos SASS framework
## Documentación original del framework.

### Configuración:

#### style.scss
Configura primeramente el archivo `scss/style.scss` con los archivos que quieres incluir.
Si no quieres incluir el archivo _fuentes.scss porque no los vas a usar o cualquiero otro
archivo por cualqueir otra razón, comenta esa línea para que no compile CSS de más y
optimizar en peso.

#### variables.scss
Pasa a configurar las variables y diferentes opciones de la atmósfera de diseño,
nos vamos a `variables.scss` donde podremos configurar colores, fuentes, tamaños,
etc...

### Breakpoints
Los breakpoints los he colocado en EM en vez de pixels para que el diseño no se
vea afectado por acciones como el ZOOM. Para más info leer a
[Chris Coyer](http://css-tricks.com/why-ems/) y a [Lyza Gardner](http://blog.cloudfour.com/the-ems-have-it-proportional-media-queries-ftw/) con argumentos al respecto.

```scss
$bp1 : 30em;      // 480px
$bp2 : 37.5em;    // 600px
$bp3 : 48em;      // 768px
$bp4 : 56.25em;   // 900px
$bp5 : 68.75em;   // 1100px
```

### Nomenclatura
La convención de nombre sigue este patrón:
```css
    .bloque{}
    .bloque__elemento{}
    .bloque--modificador{}
```

* '.bloque' representa el primer nivel de una abstracción o componente.
* '.bloque__element' representa un descendente de '.bloque' que se ayuda de
'.bloque' como un conjunto.
* '.bloque--modificador' representa un estado diferente de '.bloque'.

Una **analogía** del funcionamiento de las clases BEM sería:
```css
    .persona{}
    .persona--mujer{}
        .persona__mano{}
        .persona__mano--izquierda{}
        .persona__mano--derecha{}
```

Para más info podéis leer mi traducción de la [guía de CSS](https://github.com/Wakkos/CSS-Guidelines) de [Harry Roberts](https://twitter.com/csswizardry)
a la cual me he ajustado en su mayoría para crear este framework.

También tenemos espacio entre secciones para que sea fácil de ubicar al ver el
archivo compilado `style.css`.

### Organización
Los archivos de **SCSS** están todos dentro de la carpeta `scss` y distribuidos
de la siguiente manera:

```
--scss
		_contenido.scss
		debug.scss
		lt-ie9.scss
		style.scss
		--componentes
                     _botones.scss
                     _elementos.scss
                     _formularios.scss
                     _fuentes.scss
                     _links.scss
                     _navegacion.scss
                     _normalize
                     _paginacion.scss
                     _reset.scss
                     _tablas.scss
                     _texturas.scss
                     _tipografia.scss

        --layout
        			_2x.scss
        			_breakpoints.scss
        			_sitio.scss

        --lib
        			_mixins.scss
        			_placeholders.scss
        			_variables.scss
```

El archivo `contenido.scss` se compila al principio del `style.css` para dar una
guía de donde tenemos nuestros elementos y su nombre, gracias a los comentarios
BEM na búsqueda `cmd/ctrl + f`en SublimeText que empiece por $NOMBREDESECCION
nos ayudará mucho a encontrar el contenido.

A su vez están todas las secciones separadas unas de las otras para ubicar rápidamente
 cuando echamos un vistazo.

El archivo `_debug.scss` viene comentado, pero lo puedes incluir para tener una
pequeña guía de la semántica de tu documento html.

El archivo `lt-ie9.scss` incluye un fallback para todo lo que incluimos en los
 mediaqueries con la clase `.ie8-sucks`. Si os da corte con vuestro cliente,
 podéis cambiar la clase en el archivo `_variables.scss`.

### Codekit
Iré adaptándolo a Codekit pero sin que afecte a los que no lo usan. De momento si
usas Codekit, incluyo el archivo `config.codekit`y todos los `.scss`son compilados
en la carpeta `css`.

## Patrones
Siempre necesito una guía de estilos o de patrones para hacerme una idea de la
atmósfera de diseño de la web. Para esto tengo la carpeta `patrones`donde tengo
el `index.html` que me da un pequeño resumen de los elementos de la web y se ajusta
a la configuración de nuestro CSS.

Me gustaría poner código en cada elemento para así hacer que sea funcional no solo
al diseñador sino al frontend, pero ese trabajo va a tener que esperar.


## Tip
_Modulariza_ **todo** lo que puedas, el archivo `style.scss`
es para meter archivos. Crea módulos, divide tu CSS en tantos archivos como puedas;
el CSS del header en `header.scss`, `content-home.scss`, `footer.scss`, etc...
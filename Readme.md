** Wakkos-CSS-Framework

Añadido Grunt al FrameWork para el preprocesado automático de LessCSS mientras se trabaja.

Añadida sección JavaScript basada en el artículo [JavaScript orientado a eventos/](http://blog.ckgrafico.com/javascript-orientado-eventos/) de Enrique Fdez. Guerra.

Acciones que realiza Grunt:
```bash
$grunt watch

Si se produce algún cambio en algún fichero less, compila los ficheros sin minificar. El fichero resultante se hayará en css/app.css de la raíz.

Si se produce algún cambio en algún fichero JavaScript, concatena todos los ficheros y genera dos ficheros en el directorio js de la raíz:

1. scripts.js es el fichero solo concatenado. Ideal para debugación.
2. scripts.min.js es el fichero concatenado, minificado y ofuscado. Es el fichero de producción para la versión final.

```
$grunt

1. Compila todos los ficheros less y minifica el resultado. El fichero generado es app.css en el directorio css de la raíz.
2. Concatena todos los ficheros JavaScript, los minifica y los ofusca. El fichero generado es scripts.min.js en el directorio js de la raíz.
3. Utilizando la imagen en src/images/logo.jpg, genera todos los favicons necesarios. Si se añade algún otro formato, hay que modificar Gruntfile.js. Los favicons generados estarán en img/favicons de la raíz.

** Instrucciones

Una vez clonado el repositorio:

1. Instalar Grunt
2. Ejecutar en el directorio:

```bash
$npm update

Para que nodeJS instale todos los paquetes de Grunt necesarios.
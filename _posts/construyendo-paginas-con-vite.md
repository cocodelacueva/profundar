---
id: 6
title: "Construyendo páginas con Vite"
date: "2022-03-25"
shortDescription: 'Vite es una herramienta que mejora la experiencia de desarrollo front-end. Se puede utilizar para inicializar un proyecto de html, css y vanilla-js, o un proyecto de Vue,Svelte,React y/o Preact.'
docs: "https://vitejs.dev/guide/"
author: "German Saracca"
authorurl: "https://github.com/germansaracca"
related: 'Armando un acordeon sin JS|armando-un-acordeon-sin-js'
---

# Construyendo páginas con Vite

Vite es una herramienta que mejora la experiencia de desarrollo front-end.
Se puede utilizar para inicializar un proyecto de html, css y vanilla-js, o un proyecto de Vue,Svelte,React y/o Preact.
Automaticamente viene con un servidor de desarrollo y luego podemos construir el build de nuestro proyecto optimizado para producción.

Vite mejora el entorno de desarrollo dividiendo los modulos de nuestra aplicacion en dos categorias: dependencias y codigo fuente.

-   Para las dependencias que no van a cambiar genera un pre-bundle usando Esbuild, que esta escrito en Go y trabaja desde 10 hasta 100 veces mas rapido que empaquetadores javascript. Esto acelera el proceso de desarrollo.
-   El codigo fuente es cargado segun lo necesita la ruta del html en el que se esta ( route-base code-splitting) y ademas se sirve el codigo tal cual como es modules nativo, ya que la mayoria de navegadores hoy en dia lo soportan y esto podemos cambiarlo luego en el bundle para produccion si queremos apuntar a versiones de navegadores mas viejos que no lo soportan.

Tambien al realizar cambios trabaja con el HMR (Hot Module Replacement) lo que va a ser que solo actualice el modulo modificado y no realice el bundle de toda la aplicacion completa.

## Creando nuestro entorno de desarrollo

A continuacion creamos un template para desarrollar una pagina con html, css y vanilla/js y luego iremos agregandole distintos extras a traves de la configuracion de vite y distintos plugins de postcss.

### 1. Creacion de proyecto.

Para comenzar abriremos una terminal en la carpeta donde guardamos nuestros proyectos y correremos el siguiente comando `npm create vite@latest`.
Luego nos pedira nombre de proyecto, damos enter y a continuacion elegiremos vanilla y vanilla(tenemos la opcion de typescript).

### 2. Analisis de estructura base creada.

Ahora podemos abrir la carpeta con el proyecto generado por Vite en nuestro editor de codigo y ver que nos genero. Deberiamos tener los siguientes ficheros:

- `.gitignore`
- `favicon.svg`
- `index.html`
- `main.js`
- `package.json`
- `style.css`

Vite ya nos creo un template listo para comenzar a desarrollar. Tenemos nuestro `index.html` linkeado a nuestro `main.js` donde importaremos nuestro `style.css` y todos los demas ficheros Javascript. Esto ayuda mucho al modo desarrollo, luego en el bundle de producción el css sera importado en el head del `index.html` con una etiqueta link de estilos tradicional.
Pero nos falta realizar un paso más y es a traves del comando `npm install` para instalar las dependencias que utiliza vite. Una vez realizado esto veremos que se agrega nuestra carpeta `node_modules`.

### 3. Levantar nuestro servidor de desarrollo.

Si miramos el `package.json` veremos que dentro de `scripts` tenemos 3 comandos existentes: `dev`, `build` y `preview`.

- `dev` es para levantar nuestra aplicación en un servidor local en el puerto 3000 por defecto.
- `build` construye nuestra aplicación para producción en la carpeta `dist`. Por default nuestro css, js e imagenes seran concatenados con un hash ej: `index.070a6bf2.css` para evitar el cacheo del navegador e iran dentro de una carpeta assets. Tanto css como js seran minificados.
- `preview` nos levanta el build de nuestra aplicacíon en el puerto en el que nos indica al levantarlo ( 5000, 4173, varia segun version).

Hasta estos 3 puntos tenemos un entorno de desarrollo y configuracion de build de producción sin ninguna configuracion por nuestra parte. Podriamos dejarlo hasta este punto y maquetar asi y ser felices pero vamos a complicarla :D .

### 4. Estructurado de carpetas

En este paso agregaremos una carpeta `src` a nuestro root y dentro de esta una carpeta assets para colocar la carpeta css, fonts, images y js ademas del archivo index.html y una carpeta about con un index.html. Nos quedaria una estructura asi:

node_modules  
src  
    about/  
        - index.html
    assets/  
        css/  
            - style.css  
        fonts/  
        images/  
            - favicon.svg  
        js  
            - main.js  
    - index.html  
.gitignore  
package.json  
package-lock.json  

Al cambiar la estructura por default que trae Vite, tendremos un problema al crear el build. La primera vez que lo creemos no habra problema pero cuando tengamos un build existente y realizamos otro, este no se reemplazara automaticamente por el nuevo, para que esto funcione debemos cambiar el script del build en el package.json.
`"build": "vite build --emptyOutDir"`, de esta manera al realizar un nuevo build, el script primero se encarga de vaciar el directorio donde se guarda el mismo primero.

### 5. Configuracion vite.config.js

Al realizar esto debemos crear un archivo de configuracion en la raiz del proyecto llamado `vite.config.js` para que todo vuelva a funcionar. Nuestro archivo de configuracion de vite deberia quedar asi:

```
const { resolve } = require('path')

module.exports = {
    root: resolve(__dirname, './src'),
    build: {
        rollupOptions: {
            /*
                Opciones de configuración de Rollup externas, serán mergeadas con la configuracion
                interna de Rollup de Vite.
            */
            input: {
                main: resolve(__dirname, 'src/index.html'),
                about: resolve(__dirname, 'src/about/index.html'),
            },
            output: {
                dir: resolve(__dirname, 'build'), //Donde se va a crear el build de nuestra aplicacion
                format: 'es', //Formato de ES modules
            },
        },
        outDir: resolve(__dirname, 'build'),
        //minify: false, //( Si no se quiere minificar el build) https://vitejs.dev/config/#build-minify (aplica solo a los JS no CSS)
    },
}
```

Tambien debemos cambiar la ruta del link al JS de nuestro `index.html` y cambiar el archivo de css que importamos en `main.js`.

### 6. Instalacion de plugins POSTCSS que seran utiles.

Instalaremos los siguientes plugins:

-   autoprefixer: `npm i autoprefixer -D` Para parsear nuestro CSS y agregar prefixes basado en [Can I Use](https://caniuse.com/) y basado en nuestro archivo de configuracion `.browserslistrc`. [Browserlist options](https://github.com/browserslist/browserslist#queries) Este estara en la raiz del proyecto y podemos configurarlo como queramos. A continuación un ejemplo:

```
# - Minimo 0.2% de uso global.
# - Que no esten sin mantener por 2 años.
# - NO Internet explorer 11 para abajo.

>0.2%
not dead
not ie <= 11
```

-   cssnano: `npm i cssnano -D` Para reducir el tamaño de nuestro css.
-   postcss-advanced-variables: `npm i postcss-advanced-variables -D` Este es un plugin que nos va a permitir escribir variables, condicionales, iteradores y mixins al estilo Sass en nuestro CSS.[Documentacion Advanced variables](https://github.com/csstools/postcss-advanced-variables)
-   Ejemplo Mixins:
```
@mixin font-size($size, $height, $letter) {
    font-size: $size;
    line-height: $height;
    letter-spacing: $letter;
}
p {
    @include font-size(16px, 22px, normal);
}
```
-   postcss-color-function: `npm i postcss-color-function -D` Si bien en css podemos usar las custom properties que son muy buenas y pueden ser cambiadas desde JS y muchas cosas más, para los colores las funciones de sass son de mucha utilidad. Esta libreria va de la mano de las variables del plugin de advanced-varibales para poder crear algo asi:

```
color: color($color-primario a(50%));
```

-   postcss-preset-env: `npm i postcss-preset-env -D` permite convertir CSS moderno en algo que la mayoría de los navegadores puedan entender, determinando los polyfills que necesita en función de sus navegadores específicos o entornos de tiempo de ejecución, utilizando [cssdb](https://cssdb.org/).  
En este proyecto configuramos el feature de nesting-rules para anidar propiedades css (proximo a salir en CSS4) y la image-set()function (proximo a salir en CSS4) que permite manejar background images segun la resolucion de pantalla del usuario.

-   Ejemplo nesting-rules:

```
.box {
    width: 80%;
    border-radius: 5px;
    padding: 0.5rem;
    font-weight: 700;
    border-radius: 15px;

    & ul {
        list-style: none;

        & li {
            color: $color-primario;

            color: color($color-primario a(50%));
            @include font-size(16px, 22px, normal);
        }
    }
}
```

Nota\*: Al usar este plugin de nesting para css el editor nos marcara muchos errores de sintaxis. Para evitar eso podemos instalar una extension llamada PostCSS Language Support.

-   Ejemplo image-set()

```

background-image: image-set(
    url('../images/DC-section-1.png') 1x,
    url('../images/DC-section-1@2x.png') 2x,
    url('../images/DC-section-1@3x.png') 3x
);

```

-   container queries: `npm i cq-prolyfill` + archivo `container-queries-js` que se encuentra en la carpeta js. Este plugin nos permite estilar elementos con respecto al width de su parent. [Documentacion de uso](https://github.com/ausi/cq-prolyfill/blob/master/docs/usage.md)

```
.box:container(width < 500px) {
    border: solid 4px green;
}
.box:container(width > 500px) {
    border: solid 4px red;
}
.box:container(300px < width < 500px) {
    color: green;
}
.box:container(width > 700px) {
    border: solid 4px violet;
}
```

### 7. Configuracion postcss para que todos los plugins anteriores funcionen.

Crearemos en la raiz del proyecto un archivo postcss.config.js con la siguiente informacion

```
module.exports = {
    plugins: {
        autoprefixer: true,
        'postcss-advanced-variables': true,
        'postcss-color-function': true,
        'postcss-preset-env': {
            stage: false,
            features: {
                'nesting-rules': true,
                'image-set-function': true,
            },
        },
        cssnano: {
            preset: [
                'default',
                {
                    discardComments: {
                        removeAll: true,
                    },
                },
            ],
        },
        'cq-prolyfill/postcss-plugin': true,
    },
}
```

Esto es todo, hay muchas cosas más para agregarle y/o mejorarle. Asi como tambien existen muchos mas plugins para utilizar, podemos buscar lo que precisamos en el buscador de [PostCSS](https://www.postcss.parts/).

Acá se encuentra el [repositorio](https://github.com/GermanSaracca/base_project_vite) con el codigo final.
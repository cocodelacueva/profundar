---
id: 0
title: "Blog con NextJS y Markdown"
date: "2022-02-10"
shortDescription: 'Aprendiendo a armar un blog con Next JS. Utilizando la modalidad server render o generando archivo estáticos con MD.'
docs: "https://nextjs.org/docs/getting-started"
related: 'CMS con Contentful|cms-con-contentful, CMS con Strapi|cms-con-strapi,Vercel|vercel'
---

# Blog con NextJS

Mi intención es armar un blog con archivos [Markdown](https://markdown.es/) y [nextJS](https://nextjs.org/). La tecnología de nextJS, se popularizo por permitir crear sitios en react pero que renderizen en el servidor en vez de ReactJS que todo se renderiza en el cliente. Esto permite un mejor posicionamiento en Google, cosa que con React se había perdido un poco. Pero hoy en día, NextJS ha evolucionado y no solo permite el renderizado en el servidor, sino también crear sitios estáticos.

La moda de los sitios estáticos ha venido popularizando ya que el sitio estático tiene una mejor performance, y necesita un servidor más ligero. Además, nextJs te permite conectarte a una api, buscar todos los posts necesarios y luego crear todos los archivos estáticos que hagan falta. Esto antes era muy difícil porque era un trabajo manual y terminabas utilizando otros lenguajes o CMS como WordPress.

Pero al poder crear un sitio estático se puede subir a un servidor como aws S3 e incluso utilizar CDNs para cargar muy rápida. Por lo tanto, esto es lo que queremos probar. 

### El plan sería:

* Armar un blog muy sencillo con NextJS en localHost y subirlo a Github.
* Armar los distintos posts con archivos MarkDown
* Subir el sitio estático al s3 para probarlo
* ¡Documentar los pasos!

## Armando la aplicación

Lo primero que hay que hacer es crear la aplicación. Entonces desde la terminal se tipea:

```bash
npx create-next-app@latest
# or
yarn create next-app
```

Estos comandos realiza un script de bash en la cual es posible luego ponerle un nombre para que arme un directorio con ese nombre y con todos los archivos necesarios adentro.

#### La estructura de archivos es muy sencilla:

* **Package.json** tiene los scripts y dependencias necesarios
* **next.config.js** te permite modificar las configuraciones de Next por defecto
* El directorio **public** tiene los archivos estáticos, por ejemplo: imágenes
* El directorio **styles** contiene los estilos css.
* El directorio **pages** contiene la aplicación.
    * Cada archivo es una página a renderizar, por ejemplo *index.js*, es la página home por defecto.
    * Para crear una nueva página, simplemente hay que agregar otro archivo, por ejemplo: *contacto.js* y copiar la estructura de *index.js*
    * finalmente el arhivo **_app.js** es el archivo que engloba todos los demás. Ahí es donde se va a encontrar el clásico <div id="root"></div> que tienen todas las apps de ReactJS.
    * Además, por defecto, trae otro directorio api, con una api para probar que se puede acceder desde la url localhost:3000/api/etc
* Luego es posible crear otras carpetas con componentes y otros archivos.

#### Scripts

Por defecto vienen 4:

* "dev": "next dev", para desarrollo.
* "build": "next build", para construir el sitio de producción.
* "start": "next start", para inicializar el servidor de producción.
* "lint": "next lint", para hacer los test correpondientes de lint.

*NextJS va armando un cache en la carpeta .next*

Nosotros vamos a agregar un script más para que construya el sitio estático con todos los htmls que necesitamos.

* "static": "next build && next export", que consture el sitio y luego lo copia a la carpeta out.

El contenido de esta carpeta out se puede subir directamente al S3 sin problemas. Con otro servidor, se podria modificar el archivo next.config.js y agregar:

```js
module.exports = {
  //...
  trailingSlash: true,
  //...
```

Con esta propiedad las páginas se pueden ver sin el .html. Es decir, directamente *miblog.com/p/slug-de-mi-post/* en vez de *miblog.com/p/slug-de-mi-post.html*. Este mode de url bonitas es muy apreciado para el posicionamiento SEO. Pero en el s3 no funcionaría del todo bien ya que es necesario el .html para que se renderice de primera intención copiando la url y compartiéndola.
---
id: 1
title: "Blog con NextJS y Markdown"
date: "2022-02-17"
shortDescription: 'Aprendiendo a armar un blog con Next JS. Utilizando la modalidad server render o generando archivo estáticos con MD.'
docs: "https://nextjs.org/docs/getting-started"
author: "coco"
authorurl: "https://www.linkedin.com/in/cocodelacueva/"
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

## Creando la aplicación

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

Para empezar a desarrollar, simplemente escribimos:
```bash
yarn run dev
```
*Perdón, me gusta utilizar Yarn* pero con npm es similar.

Y desde el localhost:3000 podemos navegar el sitio. Al finalizar el desarrollo, podemos escribir:

```bash
yarn run build
```

Y Finalmente, en un servidor de producción, utilizariamos:

```bash
yarn run start
```

*El script para armar un sitio estático lo dejamos para más adelante.*

## Armando el blog

Este blog tiene una página a modo de carátula, una página de listado de posts y luego una página individual donde se cargan los posts de manera dinámicos.
Como hemos visto antes, la página home, por defecto es el archivo index.js que está dentro del directorio *pages*. Creamos una nueva llamada posts.js para armar la página de posts. Y además agregamos otra cuyo nombre sería *[slug].js*. De esta manera, tendremos 3 rutas:

1. localhost:3000
2. localhost:3000/posts
3. localhost:3000/slug-del-post

Siendo este última dinámico.

Si nosotros queremos incluir a los post individuales en una subruta, es decir, *localhost:3000/post/slug-del-post*, tenemos que poner otro directorio de nombre *post* dentro de *pages* y luego el archivo *[slug].js* dentro del mismo.
Esto a veces es util para no confundir el slug del post con el nombre de una página.

### Armando los posts con Markdown

Como la idea del blog era armar los posts utilizando Markdown, lo que necesitamos son algunas dependencias y otra carpeta donde vamos a guardar estos mismos. Por lo tanto:

1. Armamos una carpeta en la raiz del proyecto de nombre *_posts* (el nombre es irrelevante).
2. Dentro de los posts escribimos el primer markdown con el título Hola mundo y lo guardamos
3. Instalamos las dependencias

### Dependencias

Necesitamos sólo 2 dependencias para trabajar con este tipo de archivos: *gray-matter* y *next-mdx-remote*

```bash
yarn add gray-matter next-mdx-remote
```

* **[next-mdx-remote](https://github.com/hashicorp/next-mdx-remote)** es una dependencia que nos brinda varias utilidades para trabajar con archivos markdown y cargarlos con los scripts de next.
* **[gray-mater](https://www.npmjs.com/package/gray-matter)** sirve para parsear los archivos markdown y utilizarlos luego.

### Funciones

Necesitamos un archivo con las funciones para recibir, parsear y listar los archivos. Por lo tanto armamos una nueva carpeta *lib* y allí adentro creamos un nuevo archivo que llamaremos *mdx.js*.
Dentro del mismo vamos a armar tres funciones:

1. **getFiles** que va a traer los archivos markdown que estén en determinado directorio
2. **getFilesBySlug** que trae solo el arhivo con el mismo slug (es decir, el nombre del archivo sin la extensión)
3. getAllFilesMetaData, trae información Meta del archivo Markdown.
4. **orderByDataDesc** es opcional, pero sirve para ordenar los posts por fecha.

Primero, la función que obtiene todos los archivos.

```js
export const getFiles = async () => fs.readdirSync( path.join(root, '_posts') );
```

El markdown permite agregar meta data, que es información que se escribe al inicio del archivo separada por 3 guiones arriba
Ejemplo:
```
---
titulo: "hola mundo"
slug: "hola-mundo"
resumen: "resumen del posts en algunos renglones"
fecha: "15/02/2022"
---

# resto del archivo
```
Por lo tanto podemos armar una función para extraer esta data que nos sirve, por ejemplo, para el listado de posts en la página de lista, ya que con esta data tenemos el link (con el slug), el título, la fecha para ordenarlo y un resumen.


```js
export const getAllFilesMetaData = async () => {
    const files = fs.readdirSync( path.join(root, '_posts') );

    return files.reduce( (allPosts, postSlug) => {
        const mdSource = fs.readFileSync(
            path.join(root, '_posts', postSlug) );
            const { data } = matter(mdSource);
        return [
            {...data, slug: postSlug.replace('.md', ''), },
            ...allPosts, 
        ]
    }, []);

}
```

Luego, una de las más importantes, la función que trae el archivo de acuerdo al slug. Obviamente ese slug debe ser el mismo que el nombre del archivo.

```js
export const getFilesBySlug = async ( slug ) => {
    const mdSource = fs.readFileSync(
        path.join(root, '_posts', `${slug}.md`), 
        'utf-8'
    );
        
    const { data, content } = await matter(mdSource);
    const source = await serialize(content, {scope:data});
    
    return {
        source,
        frontmatter: {
            slug, 
            ...data,

        }
    }
}
```
Nótese que esta función utiliza la dependencia gray-mater y extrae, por un lado la meta data y por otro lado el contenido del post, que es lo que nos interesa.

Finalmente, tenemos esta función opcional que ordena los posts por fecha

```js
export const orderByDataDesc = (prev, current) =>
    new Date(current.date) - new Date(prev.date);
```

Para ver el archivo final hacer click [aquí](https://github.com/cocodelacueva/profundar/blob/master/lib/mdx.js).

### Volviendo a NextJS

Ahora que tenemos las dependencias y nuestras funciones listas, necesitamos armar las páginas que van a mostrar, por un lado la lista de posts, y por otro el post individual. Empecemos con el listado.

El esquema básico de cualquier archivo de páginas sería:

```js
export default function Posts({posts}) {
  return(
    <h1>hola mundo</h1>
  )
}
```

Esta función por defecto va a recibir como parámetro las props, que es un objeto y del cual nosotros deconstruimos la propiedad posts. Si lo armamos bien, la variable sería un array de post, por lo tanto en return podriamos hacer un map de los distintos artículos. Pero para lograr esto tenemos varias opciones. Una es conectarnos a una api que nos brinde los posts y otro es buscar los archivos markdown con las funciones que definimos antes. Para armar esto, nextjs, tiene 3 funciones:

1. getInitialProps()
2. getServerSideProps()
3. getStaticProps()

Las dos primeras son utilizadas en un servidor dinámico para que la página renderise del lado del servidor. Nosotros vamos a utilizar la tercer funcion *getStaticProps*.

```js
export async function getStaticProps() {
    const posts = await getAllFilesMetaData();
    posts.sort(orderByDataDesc).slice(0, 5);
    return {
        props: {
            posts 
        } 
    }
}
```

Esta función retorna los posts que nosotros necesitamos para pasarlos a la función default de la página. Para buscar esta colección utilizamos la función previamente definida en *mdx.js*: *getAllFilesMetaData()* y además ordenamos el resultado antes de devolverlo.

Por lo tanto ahora se puede hacer un map a elección y listar nuestros posts:

```js
export default function Posts({posts}) {
  return(
    {posts.map((post, index) => {
      
        <article key={index}>
          <h1>{post.titulo}</h1>
          <a href={`/post/${post.slug}`}>Ver Post</a>
        </article>
      
    }
    )}
  )
}

```

#### Página Post individual

La otra página que necesitamos editar es *[slug].js*. En este caso vamos a utilizar -otra vez- la función *getStaticProps()* pero además necesitamos *getStaticPaths()*. Esta útlima función es pedida por Next cuando un sitio tiene rutas dinámicas y utiliza *getStaticProps()*. Además, vamos a importar la función *getFilesBySlug* y *getFiles* creadas en *mdx.js*.

```js
export async function getStaticProps( {params} ) {
    const {source, frontmatter} = await getFilesBySlug(params.slug);
    return { props: { source, frontmatter } }
}

export async function getStaticPaths() {
    const posts = await getFiles();
    const paths = posts.map((post) => ({
            params: {
                slug: post.replace(/\.md/, ''),
            }
        })
    )
    
    return {
        paths,
        fallback: false
    }
}
```

Por un lado tenemos todos los path posibles, es decir, todas las rutas dinámicas posibles y además las props para está pagina. En este caso dividido en el contenido del post y su metadata. Ahora podemos terminar la página:

```js
export default function Post( { source, frontmatter } ) {
  return(
    <article>
      <MDXRemote {...source} />
    </article>
  )
}
```

En este caso, vamos a utilizar la otra dependencia que instalamos previamente: *next-mdx-remote*. Y con esto ya tenemos todo el contenido a la vista.

## Armando el sitio estático

Ya tenemos todo listo, ahora necesitamos exportar html, porque necesitamos un sitio estático para subir a un servidor, abrirlo en el navegador o subirlo a un s3 o cdn. Para esto, tenemos un script armado:

* "static": "next build && next export", que consture el sitio y luego lo copia a la carpeta out.

Por lo tanto ejecutamos:

```bash
yarn run static
```

Pero va a dar un error, porque nos falta modificar el archivo *next.config.js*. Lo que nos pide next cuando exportamos un sitio estático es un método llamada exportPathMap que se ubica en ese archivo. Su funcion es indicar las páginas y las rutas posibles de nuestro sitio. En el caso del blog, no hace falta armarlas todas, pero por lo menos, la primera.

```js
module.exports = {
  //basePath: '/test/next-estatico',
  reactStrictMode: true,
  trailingSlash: true,
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      '/posts': { page: '/posts' },
      '/post/hola-mundo': { page: '/post/[slug]', query: { slug: 'hola-mundo' } },
    }
  }
}
```

Además, en el archivo, podemos agregar otras propiedades, por ejemplo:
* **trailingSlash**: si es true, se puede acceder a las rutas de una manera más bonita, por ejemplo *localhost:3000/post/hola-mundo/* en vez de *localhost:3000/post/hola-mundo.html* (la exportación es distinta, por lo tanto es importante definirlo. Esto no funciona en el s3, a no ser que se le arme una configuración especial)
* **basePath**: Sirve cuando el sitio no está en la raíz del dominio sino que se encuentra en una subcarpeta.

Por lo tanto una vez que modificamos *next.config.js* con el método exportPathMap ya podemos construir el sitio. Next va a crear una carpeta llamada *out* y esta misma se puede subir directo al servidor.

**Nota**: Cuando se arma un sitio estático hay muchas funciones del framework que no están soportadas. Por ejemplo: Image. En este caso hay que utilizar la etiqueta html "<img />" y linkearla directamente.

Espero que haya servido el ejemplo, para ver el código completo, los invito a visitar el [repositorio](https://github.com/cocodelacueva/profundar).

*Gracias, ¡vuelva prontos!*

#### Proximos pasos:

* Hacer un deploy para mostrar el [sitio](https://profundar.vercel.app/p/vercel/).
* Crear una api o un CMS para crear los posts de otra manera


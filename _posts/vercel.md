---
id: 5
title: "VERCEL"
date: "2022-02-16"
shortDescription: "Plataforma para frontend frameworks y sitios estáticos. Igual que Heroku, github pages y muchas otras, está pensada para hacer el deploy algo muy fácil"
docs: "https://vercel.com/docs"
author: "coco"
authorurl: "https://www.linkedin.com/in/cocodelacueva/"
related: 'Blog con NextJS y Markdown|blog-next-js-y-markdown, CMS con Contentful|cms-con-contentful, CMS con Strapi|cms-con-strapi'
---

# VERCEL

Vercel es una plataforma para frontend frameworks y sitios estáticos. Igual que Heroku, github pages y muchas otras, está pensada para hacer el deploy algo muy fácil pudiendo utilizar los push a nuestros repositorios de Github como un hook para el deploy de una nueva versión del sitio.

La diferencia es que Vercel es la compañía que está detrás de NextJS, por lo tanto su modo de relacionarse con este framework es especial. Mi intención era probar este blog y aprender a usar esta aplicación. Por lo tanto, manos a la obra.

### Un poco de contexto

* Este [blog](https://profundar.vercel.app/p/blog-next-js-y-markdown/) está hecho en NextJs y utiliza Markdown para guardar los posts.
* La idea era crear un sitio estático, por lo tanto, estoy usando el comando *next build && next export*.
* El repositorio está guardado en *github.com*

## Deploy

Primero hay que hacerse una cuenta en [Vercel.com](https://vercel.com/signup).
Se puede utilizar Github, gitlab y bitbucket. O el clásico email, contraseña.
Hay una versión gratuita, ellos le llaman hobby y es personal que incluye bastantes cosas, se le puede agregar un dominio, autodeploy, ssl, etc.

Una vez registrado, con hacer click en *nuevo proyecto* se puede clonar un template o buscar en github (si nos hemos logueado con github) e importar algunos de nuestros repositorios. Por ejemplo, el de este blog.

Las opciones a completar:
* Nombre del proyecto
* build command
* output directorio
* install command
* development command
* Version de nodeJS

En uin proyecto típico de NextJs, no hace falta modificar nada, porque los valores por defecto son los mismos que usa Nextjs. En nuestro caso, vamos a tener que cambiar el valor de *build command* y agregar el de static que podemos tomar del package.json. Escribimos: *next build && next export*
Y hacemos click en Deploy. Luego de unos minutos ya tenemos el sitio andando. Si algo falla podemos leer los blogs y arreglarlo.

A partir de ahora, cualquier push que hagamos a la rama principal, se genera un nuevo deploy con los cambios. Si en el futuro, algún cambio, rompe el build, el sistema deja corriendo el anterior, para evitar que el sitio esté caido.

### Otras configuraciones

Vercel tiene otras configuraciones disponible que no hemos usado para este blog. Por ejemplo, variables de entorno, funciones serverless, etc.

### Agregando un dominio

Necesitamos entrar en domains y escribir nuestro dominio y luego presionar el boton agregar. Nos va a decir el nameserver o registro A.

Luego necesitamos ir a donde tenemos el dominio y delegarlo a las direcciones que nos pasa Vercel. Vercel nos deja agregarlo utilizando el nameserver o registro A. Depende nuestro administrador de dominio cual podemos elegir.

Y con esto ya tenemos el blog corriendo online como ven.

Gracias, ¡vuelva prontos!

* variables de entorno


---
id: 3
title: "VERCEL"
date: "2022-02-16"
shortDescription: "Plataforma para frontend frameworks y sitios estáticos. Igual que Heroku, github pages y muchas otras, está pensada para hacer el deploy algo muy fácil"
docs: "https://vercel.com/docs"
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
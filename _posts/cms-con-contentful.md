---
id: 3
title: "CMS con contentful"
date: "2022-03-31"
shortDescription: 'Armar un CMS con contentful, para enriquecer este repositorio con un CMS online y poderoso.'
docs: "https://www.contentful.com/developers/docs/"
author: "coco"
authorurl: "https://www.linkedin.com/in/cocodelacueva/"
related: 'Blog con NextJS y Markdown|blog-next-js-y-markdown, CMS con Strapi|cms-con-strapi, Vercel|vercel'
---

# CMS con contentful

Este blog, fue armado, en primera intención, con archivos MarkDown y con NextJS. Luego, me vino la necesidad de armar un CMS para que sea más sencillo editar y crear nuevos posts. Venía escuchando de sobre Headless CMS y Contentful se presentó cuando estaba buscando algo. Así que decidí probarlo.

Para empezar me hice una cuenta, se puede hacer con email y password, pero también con google o github, por lo tanto es bastante sencillo. La opción free te permite armar un blog sencillo sin problemas. Por lo tanto me mantengo en esa opción.

## Trabajar con contentful

Trabajar con contentful te permite crear distintos tipos de contenidos de manera automática. Ya tiene predefinido, texto, texto enriquecido, imágenes, fechas, etc.

Para empezar se crea el **content model**. Esto define el contenido que nosotros queremos crear, por ejemplo, definimos que vamos a crear posts individuales o entradas (en español). Entonces le ponemos un nombre: *post* y luego nos pregunta que es lo que va a tener dentro este post. Yo lo definí de esta manera:
1. Un título, que sería un texto simple.
2. Slug, que va a representar la url de este post y que le indiqué mediante una expresión regular como yo permitía que sea este slug.
3. La fecha del post.
4. Una descripción corta
5. Y finalmente, el contenido de la entrada como texto enriquecido.

Para continuar con el content model, aproveché a crear otro tipo de contenido que serían los autores. Ya que un autor puede tener muchos posts, desde el post puedo relacionar estos dos tipos de contenidos entre sí. Para los autores lo arme de esta manera:

1. Slug
2. Full Name
3. Link para poner Linkedin o github.

Si yo quisiera agregar más tipos de contenido, por ejemplo portfolio, paginas u otros; debería volver a la sección content model y modificarlo. Pero a mi me alcanza con esos dos tipos para este blog: 1. post, 2. Author

## Creando contenido

El contenido se crea en la sección content. Como ya hemos definido que vamos a cargar, ahora es tiempo de cargarlo. Cuando vamos a content, tenemos un menú a la izquierda que nos permite seleccionar los tipos de contenido creado. En nuestro caso, Posts y authors.
Hago click en post y empiezo a crear esta primera entrada. Título, slug, fecha y luego el contenido de este texto. Finalmente hago click en publish en el botón verde de la derecha y tengo mi primer contenido.

## Fetch de mi contenido

El contenido ya está creado. Pero ahora necesito llamarlo desde mi frontend, para utilizarlo y que no quede solo en contentful.

Haciendo click en settins y luego api keys, vamos a poder ver varios valores importantes.

1. Space ID
2. access token
3. Content Preview API - access token

Para llamar al contenido público, vamos a necesitar los primeros dos parámetros.

URL: https://cdn.contentful.com/spaces/<Space ID>/environments/master/entries?access_token=<access token>

Para llamar una entrada específica, necesito el id de la entrada, pero el url es el mismo:
URL: https://cdn.contentful.com/spaces/<Space ID>/environments/master/entries/<id de la entrada>/?access_token=<access token>

De acuerdo el tipo de contenido es como va a venir armado el json. Como el contenido es público, podemos tomarlo desde el frontend de nuestro proyecto y armar lo que necesitamos.

## Usuarios

Se puede elegir múltiples usuarios. Más alla del usuario administrador con el que hicimos todo el contenido, podemos generar distintos tipos:

* Usuarios desarrolladores, para crear nuevos tipos de contenidos.
* Usuarios Member, que son asignados a un espacio predefinido y que pueden ser editores o administradores del espacio.*

En contentfull se puede tener varios espacios en la misma cuenta, es decir, muchos CMSs de distintos proyectos quizas, o del mismo, pero se puede dividir para asignárselo a distintos usuarios.

¿Cómo generar o invitar usuarios?

1. Vamos a Organizations settings
2. Tab de usuarios
3. Invitar usuario
4. Se los invita por email
5. Luego se selecciona el rol: Member, Developer, Admin y Owner y se le asigna un espacio (salvo el usuario admin u owner.)
6. Finalmente dentro del espacio, está la opción de definirlo como editor o admin.

Al usuario invitado le va a llegar un email para sumarse y de acuerdo a los permisos recibidos va a poder ver lo que le asignaron.

**Esto es muy util para crear un CMSs facilmente y luego crear un usuario para que otra persona pueda manejar el contenido.**

## Conclusiones

Lo bueno de Contentful es que nos permite rápidamente crear un CMS clásico. Tiene fechas, imágenes, texto y texto enriquecido. Si lo que buscamos es crear algo simple, por ejemplo un blog, es muy útil y rápidamente tenemos el administrador. Esto nos da tiempo de enfocarnos en el diseño del sitio sin perder tiempo en el backend.
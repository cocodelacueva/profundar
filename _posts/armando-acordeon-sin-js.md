---
id: 2
title: "Armando un acordeon sin JS"
date: "2022-02-16"
shortDescription: "¿Es posible armar un acordeon sin utilizar Javascript? Ahora sí."
docs: "https://developer.mozilla.org/es/docs/Web/HTML/Element/details"
related: ''
---

# Armando un acordeon sin JS

Los acordeones se utilizan mucho para mostrar contenido y ocultar contenido. Sobre todo cuando se tiene una lista muy grande, por ejemplo, de preguntas frecuentes, y no se quiere que estén todas a la vista porque es un scroll muy largo. Especialmente en mobile. Quedan bonitos, son útiles y no son muy difíciles de armar. Un poco de CSS, algo de JS y ya tenemos todo listo, ¿no?

## Acordeones con HTML

Esta nueva etiqueta nos va a simplificar aun más el asunto, porque con las nueva etiquetas *details* y *summary*, el acordeon está armado por defecto.

```html
<details open>
  <summary>Pregunta 1</summary>
  <p>Respuesta pregunta número 1</p>
</details>
<details>
  <summary>Pregunta 2</summary>
  <p>Respuesta pregunta número 1</p>
</details>
<details>
  <summary>Pregunta 3</summary>
  <p>Respuesta pregunta número 1</p>
</details>
```

Y sí, eso es todo. Luego con css se le puede dar estilos mediente clases o Ids.
Según el sitio [caniuse](https://caniuse.com/?search=details), tiene muchísimo soporte, salvo Internet Explorer y Opera.

Gracias, ¡vuelva prontos!
import Link from 'next/link'
import styles from './styles/PostShort.module.css'

export default function TemaCorto(articulo) {
    //textos
    const documentacionOficial = "Documentación oficial";
    return (
        <article key={articulo.id} className={styles.article_wrapper}>
            <h1 className={styles.title}>
                {articulo.name}
            </h1>
            <div className={styles.short_description}>
                {articulo.shortDescription}
            </div>

            <Link href={`/post/${articulo.slug}`}>
                <a className={styles.cta}>Profundar</a>
            </Link>

            {articulo.documentation != '' ? <a className={styles.docs} href={articulo.documentation} target="_blank">{documentacionOficial}</a> : null }

        </article>
    )
}
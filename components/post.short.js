import Link from 'next/link'
import styles from './styles/PostShort.module.css'

export default function PostShort(post) {
    //textos
    
    return (
        <article key={post.id} className={styles.article_wrapper}>
            <h1 className={styles.title}>
                {post.title}
            </h1>
            <p className={styles.date_text}>
                {post.date}
            </p>
            <div className={styles.short_description}>
                {post.shortDescription}
            </div>

            <Link href={`/p/${post.slug}`}>
                <a className={styles.cta}>Profundar</a>
            </Link>

        </article>
    )
}
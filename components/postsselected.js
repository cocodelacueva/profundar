import Link from 'next/link'

export default function postsSelected({posts, styles}) {
    return (
        <ul className={styles}>
            {posts ? posts.map((post,index)=>{
                return (
                    <li key={post.id}>
                        <Link href={`/post/${post.slug}`}>
                        {post.title}
                        </Link>
                    </li>
                )
            }) : null}
        </ul>
    )
}
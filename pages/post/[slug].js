import Head from 'next/head';
import styles from '../../styles/Post.module.css';

//componentes
import Header from '../../components/header';
import Footer from '../../components/footer';
import Link from 'next/link';


export default function Post( { data } ) {
    const
        postFooterTitle = "¿Te empapaste lo suficiente?",
        postFooterText = "Podés seguir aprendiendo",
        postFooterLink = "Volver a empezar...",
        tituloFooter = "Profundar a futuro...",
        shortDescriptionFooter = "¿Qué deberiamos aprender?",
        noDataTitle = "Hubo un error en el contenido",
        noDataButtonText = "Volver al inicio";


    return (
        <>
        <Head>
            <title>PROFUND.AR - {data.error ? noDataTitle : data.body.name}</title>
            <meta name="description" content="Colección de tecnologías para profundar en..." />
        </Head>

        <Header />
            <div className={styles.grid}>

                <main role="main" className={styles.main_container}>
                    {
                    data && !data.error ? 
                    <div className={styles.post_container}>
                        <header >
                            <h1>
                                {data.body.name}
                            </h1>
                            <p>
                                {data.body.date}
                            </p>
                        </header>
                        <section>
                                {data.body.shortDescription}
                        </section>
                        <footer>
                            <h4>
                                {postFooterTitle}
                            </h4>
                            <p>
                                {postFooterText}
                            </p>
                            <Link href="/posts"><a>{postFooterLink}</a></Link>
                        </footer>
                    </div>
                    :
                    
                    <div className={styles.no_data_container}>
                        <h1>
                            {noDataTitle}
                        </h1>
                        <p>
                            {data.message}
                        </p>
                        <Link href="/"><a> {noDataButtonText}</a></Link>
                    </div> 
                }
            </main>

            <footer className={styles.page_footer}>
                <h2>{tituloFooter}</h2>
                <p>{shortDescriptionFooter}</p>
            </footer>
        </div>
        
        <Footer />
        </>
    )
}


//get data from fake db
Post.getInitialProps = async (ctx) => {
    const res = await fetch(`http://localhost:3000/api/post/${ctx.query.slug}`)
    const json = await res.json()
    return { data: json }
}
import Head from 'next/head';
import styles from '../styles/Temas.module.css';

//componentes
import Header from '../components/header';
import Footer from '../components/footer';
import TemaCorto from '../components/tema.corto';

export default function Temas() {
    //textos
    const tituloPagina = 'Tecnologías:';
    const short_description = 'Profundate en cualquier tema y aprendelo a fondo.';
    const tituloFooter = "Profundar a futuro..."
    const shortDescriptionFooter = "¿Qué deberiamos aprender?"

    const tecnologias = [
        {
            id: 1,
            slug: "next-js",
            name: "Blog con NextJS",
            shortDescription: "Aprendiendo a armar un blog con Next JS. Utilizando la modalidad server render o generando archivo estáticos",
            documentation: "https://nextjs.org/docs/getting-started"
        },
        {
            id: 2,
            slug: "django-docker",
            name: "Desarrollar Django con Docker",
            shortDescription: "",
            documentation: "https://docs.djangoproject.com/en/4.0/"
        },
        {
            id: 3,
            slug: "Grow",
            name: "Grow",
            shortDescription: "",
            documentation: "https://grow.io/"
        },
        {
            id: 4,
            slug: "amp",
            name: "AMP Acelerate Mobile Pages",
            shortDescription: "",
            documentation: "https://amp.dev/es/"
        },
        {
            id: 5,
            slug: "cms-con-strapi",
            name: "CMS con strapi",
            shortDescription: "",
            documentation: "https://strapi.io/resource-center"
        },
        {
            id: 6,
            slug: "cms-con-contentful",
            name: "CMS con contentful",
            shortDescription: "",
            documentation: "https://strapi.io/resource-center"
        },
        {
            id: 7,
            slug: "swc",
            name: "SWC como alternativa a Babel",
            shortDescription: "",
            documentation: "https://swc.rs/docs/getting-started"
        },
        {
            id: 8,
            slug: "rust",
            name: "RUST",
            shortDescription: "",
            documentation: "https://www.rust-lang.org/"
        },
        {
            id: 9,
            slug: "vercel",
            name: "VERCEL",
            shortDescription: "",
            documentation: "https://vercel.com/docs"
        },
        {
            id: 10,
            slug: "divi",
            name: "DIVI",
            shortDescription: "",
            documentation: "https://www.elegantthemes.com/gallery/divi/"
        },
        {
            id: 11,
            slug: "ia",
            name: "IA",
            shortDescription: "",
            documentation: ""
        },        
    ]

    return (
        <>
        <Head>
            <title>PROFUND.AR - ¿Qué te gustaría aprender?</title>
            <meta name="description" content="Colección de tecnologías para profundar en..." />
        </Head>

        <Header />

        <main role="main" className={styles.main_contenedor}>
            <header className={styles.page_header}>
                <h1 className='title-font'>{tituloPagina}</h1>
                <p>{short_description}</p>
            </header>

            <div className={styles.grid}>
                <section className={styles.temas_container}>
                    {
                        //recorro tecnologias
                        tecnologias.map(articulo => TemaCorto(articulo))
                    }
                    

                </section>

                <footer className={styles.page_footer}>
                    <h2>{tituloFooter}</h2>
                    <p>{shortDescriptionFooter}</p>
                </footer>
            </div>
        </main>
        
        <Footer />
        </>
)}
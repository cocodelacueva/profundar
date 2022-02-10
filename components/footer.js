import Link from 'next/link';
import styles from './styles/Footer.module.css'

export default function Footer() {
    return (
        <footer className={styles.main_footer}>
            <nav className={styles.nav_footer}>
                <Link href="/">
                    <a>Presentación</a>
                </Link>
                <Link href="/posts">
                    <a>Profund<span className="dot_decoration"></span>ar</a>
                </Link>
                
                <a href='https://github.com/cocodelacueva/profundar' target="_blank" rel="noreferrer">Sobre esto</a>
                <a href='https://www.linkedin.com/in/cocodelacueva/' target="_blank" rel="noreferrer">Contacto</a>
                
            </nav>

            <p className={styles.copy_footer}>© 2022 - De uso público... </p>

        </footer>
    )
}
import Link from 'next/link'
import styles from './styles/Header.module.css'

export default function Header() {
    return (
        <header className={styles.main_header}>
            <nav className={styles.main_nav}>
                <Link href="/">
                    <a>Presentación</a>
                </Link>
                <Link href="/posts">
                    <a>Profund<span className="dot_decoration"></span>ar</a>
                </Link>
                
                <a href='https://github.com/cocodelacueva/profundar' target="_blank" rel="noreferrer">Sobre esto!</a>
                <a href='https://www.linkedin.com/in/cocodelacueva/' target="_blank" rel="noreferrer">Contacto</a>
                
            </nav>
        </header>
    )
}
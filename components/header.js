import Link from 'next/link'
import styles from './styles/Header.module.css'

export default function Header() {
    return (
        <header className={styles.main_header}>
            <nav className={styles.main_nav}>
                <Link href="/">
                    <a>Profund<span></span>ar</a>
                </Link>
                <Link href="/temas">
                    <a>Temas</a>
                </Link>
                
                <a href='https://github.com/cocodelacueva/profundar' target="_blank">Sobre esto!</a>
                <a href='https://www.linkedin.com/in/cocodelacueva/' target="_blank">Contacto</a>
                
            </nav>
        </header>
    )
}
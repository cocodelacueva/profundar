import Link from 'next/link'

export default function Header() {
    return (
        <header className='main_header'>
            <nav className='main_nav'>
                <Link href="/">
                    <a>Profund<span></span>ar</a>
                </Link>
                <Link href="/tecnologias">
                    <a>Tecnologías</a>
                </Link>
                
                <a href='https://github.com/cocodelacueva/profundar' target="_blank">Sobre esto!</a>
                <a href='https://www.linkedin.com/in/cocodelacueva/' target="_blank">Contacto</a>
                
            </nav>
        </header>
    )
}
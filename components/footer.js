import Link from 'next/link';

export default function Footer() {
    return (
        <footer className='main_footer'>
            <nav className='nav_footer'>
                <Link href="/inicio">
                    <a>Presentación</a>
                </Link>
                <Link href="/tecnologias">
                    <a>Tecnologías</a>
                </Link>
                
                <a href='https://github.com/cocodelacueva/profundar' target="_blank">Sobre esto</a>
                <a href='https://www.linkedin.com/in/cocodelacueva/' target="_blank">Contacto</a>
                
            </nav>

            <p className='copy_footer'>© 2022 - De uso público... </p>

        </footer>
    )
}
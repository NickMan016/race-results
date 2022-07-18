import './Footer.css'

export const Footer = () => {
    const fecha = new Date();
    return (
        <footer>
            <div className="contenedor__footer">
                <div className="derechos__footer">
                    Race Results &copy; {fecha.getFullYear()}. All rights reserved.
                </div>
                <div className="info__footer">
                    By NickMan016. Powered by Ergast API
                </div>
            </div>
        </footer>
    )
}
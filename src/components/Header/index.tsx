import './Header.css';
import logo from './../../assets/img/Race_Results_Logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

export const Header = () => {
    return (
        <header>
            <nav className="navbar">
                <a href="#" className="logo">
                    <img src={ logo } alt="Logo" />
                </a>
                <ul>
                    <li><a href="#">Drivers</a></li>
                    <li><a href="#">Constructors</a></li>
                    <li><a href="#">Circuits</a></li>
                    <li><a href="#">Races</a></li>
                    <li><a href="#"><FontAwesomeIcon icon={faCog} /></a></li>
                </ul>
            </nav>
        </header>
    )
}
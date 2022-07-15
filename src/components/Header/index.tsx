import './Header.css';
import logo from './../../assets/img/Race_Results_Logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faBars } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export const Header = () => {
    const [activeMenu, setActiveMenu] = useState(false);

    return (
        <header>
            <nav className="navbar">
                <a href="#" className="logo">
                    <img src={logo} alt="Logo" />
                </a>
                <ul className={`${activeMenu ? 'active' : ''}`}>
                    <li><a href="#">Drivers</a></li>
                    <li><a href="#">Constructors</a></li>
                    <li><a href="#">Circuits</a></li>
                    <li><a href="#">Races</a></li>
                </ul>
                <button className='btn__lista btn__menu' id='btn-menu'><FontAwesomeIcon icon={faBars} onClick={() => setActiveMenu(!activeMenu)} /></button>
            </nav>
        </header>
    )
}
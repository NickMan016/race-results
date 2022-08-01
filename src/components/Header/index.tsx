import './Header.css';
import logo from './../../assets/img/Race_Results_Logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faBars } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export const Header = () => {
    const [activeMenu, setActiveMenu] = useState(false);

    return (
        <header>
            <nav className="navbar">
                <Link onClick={() => setActiveMenu(false)} to="/" className="logo">
                    <img src={logo} alt="Logo" />
                </Link>
                <ul className={`${activeMenu ? 'active' : ''}`}>
                    <li><NavLink onClick={() => setActiveMenu(false)} to="/drivers">Drivers</NavLink></li>
                    <li><NavLink onClick={() => setActiveMenu(false)} to="/">Teams</NavLink></li>
                    <li><NavLink onClick={() => setActiveMenu(false)} to="/">Races</NavLink></li>
                </ul>
                <button className='btn__lista btn__menu' id='btn-menu'><FontAwesomeIcon icon={faBars} onClick={() => setActiveMenu(!activeMenu)} /></button>
            </nav>
        </header>
    )
}
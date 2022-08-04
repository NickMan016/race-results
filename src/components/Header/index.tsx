// import './Header.css';
import logo from './../../assets/img/Race_Results_Logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ItemListMenu } from './components/ItemListMenu';

export const Header = () => {
    const [activeMenu, setActiveMenu] = useState(false);
    const Routes = [
        {name: 'Drivers', route: '/drivers'},
        {name: 'Teams', route: '/teams'},
        {name: 'Races', route: '/races'},
    ]

    return (
        <header className="fixed z-50 top-0 w-full bg-white shadow-md shadow-gray-500">
            <nav className="relative mx-auto w-[90%] max-w-[1200px] flex items-center justify-between">
                <Link onClick={() => setActiveMenu(false)} to="/" className="">
                    <img src={logo} alt="Logo" className="block h-7 md:h-8" />
                </Link>
                <ul className={`fixed bg-white w-[250px] h-screen top-[44px] list-none transition-all duration-500 shadow-md shadow-gray-500 md:static md:w-auto md:h-auto md:top-0 md:right-0 md:shadow-none md:float-left ${activeMenu ? 'right-0' : 'right-[-250px]'}` }>
                    {
                        Routes.map((value, index) => (
                            <ItemListMenu key={index} name={value.name} route={value.route} hideMenu={setActiveMenu} />
                        ))
                    }
                </ul>
                <button className="p-3 md:hidden" id='btn-menu'><FontAwesomeIcon icon={faBars} onClick={() => setActiveMenu(!activeMenu)} /></button>
            </nav>
        </header>
    )
}
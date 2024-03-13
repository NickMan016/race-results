// import './Header.css';
import { useEffect, useState } from "react";
import logo from "./../../assets/img/Race_Results_Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { ItemListMenu } from "./ItemListMenu";
import { useDispatch } from "react-redux";
import { changeActivePage } from "../../redux";
// import { Link } from 'react-router-dom';
// import { ItemListMenu } from './components/ItemListMenu';

export const Header = () => {
  const dispatch = useDispatch();
  const [activeMenu, setActiveMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const Routes = [
    { name: "Drivers", route: "drivers" },
    { name: "Teams", route: "teams" },
    // { name: "Circuits", route: "circuits" },
    { name: "Schedule", route: "schedule" },
    { name: "Archive", route: "archive" },
  ];

  const goHome = () => {
    setActiveMenu(false);
    dispatch(changeActivePage('home'));
  }

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const handleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    if (!darkMode) localStorage.setItem("theme", "dark");
    else localStorage.setItem("theme", "light");
  };

  return (
    <header className="fixed z-50 top-0 w-full bg-white shadow-md shadow-gray-500 dark:bg-gray-900 dark:shadow-none">
      <nav className="relative mx-auto w-[90%] max-w-[1200px] flex items-center justify-between">
        <button onClick={goHome}>
          <img src={logo} alt="Logo" className="block h-7 md:h-8" />
        </button>
        <ul className="hidden sm:block">
          {Routes.map((value, index) => (
            <ItemListMenu
              key={index}
              name={value.name}
              route={value.route}
              hideMenu={setActiveMenu}
            />
          ))}
          <li
            className="inline-block py-3 p-4 cursor-pointer"
            onClick={() => {
              setDarkMode(!darkMode);
              handleDarkMode();
            }}
          >
            <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
          </li>
        </ul>
        <div
          className={`block fixed bg-white w-[250px] h-full top-[42px] list-none transition-all duration-300 shadow-md shadow-gray-500 dark:bg-gray-900 dark:shadow-none sm:hidden ${
            activeMenu ? "right-0" : "right-[-250px]"
          }`}
        >
          <div className="h-[calc(100%-40px)] flex flex-col justify-between">
            <ul className="">
              {Routes.map((value, index) => (
                <ItemListMenu
                  key={index}
                  name={value.name}
                  route={value.route}
                  hideMenu={setActiveMenu}
                />
              ))}
            </ul>
            <button
              className="flex items-center text-left px-4 py-3 hover:bg-gray-300 dark:hover:bg-gray-700"
              onClick={() => {
                setDarkMode(!darkMode);
                handleDarkMode();
              }}
            >
              <FontAwesomeIcon
                className="mr-3"
                icon={darkMode ? faSun : faMoon}
              />
              Cambiar Tema
            </button>
          </div>
        </div>
        <button className="p-3 sm:hidden">
          <FontAwesomeIcon
            icon={faBars}
            onClick={() => setActiveMenu(!activeMenu)}
          />
        </button>
      </nav>
    </header>
  );
};

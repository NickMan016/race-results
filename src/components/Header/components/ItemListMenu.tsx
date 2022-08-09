import { Dispatch, SetStateAction } from "react";
import { NavLink } from "react-router-dom";

interface PropsItemListMenu {
    name: string
    route: string
    hideMenu: Dispatch<SetStateAction<boolean>>
}

export const ItemListMenu = ({ name, route, hideMenu } : PropsItemListMenu) => {
    return (
        <li className="text-center sm:relative sm:float-left"><NavLink className="block px-5 py-3 transition-all duration-300 hover:bg-gray-300 dark:hover:bg-gray-700" onClick={() => hideMenu(false)} to={route}>{name}</NavLink></li>
    )
}

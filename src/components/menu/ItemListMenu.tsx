import { Dispatch, SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeActivePage, selectActivePage } from "../../redux";

interface PropsItemListMenu {
  name: string;
  route: string;
  hideMenu: Dispatch<SetStateAction<boolean>>;
}

export const ItemListMenu = ({ name, route, hideMenu }: PropsItemListMenu) => {
  const dispatch = useDispatch();
  const activePage = useSelector(selectActivePage);

  const changePage = () => {
    dispatch(changeActivePage(route));
  };

  return (
    <li className="text-center sm:relative sm:float-left">
      <button
        className={`block px-5 py-3 transition-all duration-300 ${ activePage === route && 'bg-gray-300/75 dark:bg-gray-300/25' } hover:bg-gray-300 dark:hover:bg-gray-700`}
        onClick={() => {
          hideMenu(false);
          changePage();
        }}
      >
        {name}
      </button>
    </li>
  );
};

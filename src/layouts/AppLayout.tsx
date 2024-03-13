import "../index.css";
import "../assets/css/index.css";
import { Header } from "../components";
import { useDispatch, useSelector } from "react-redux";
import {
  changeActivePage,
  selectActivePage,
  useLazyGetCurrentSeasonQuery,
} from "../redux";
import { ConstructorPage, ConstructorsPage, DriverPage, DriversPage, HomePage, SchedulePage } from "../pages";
import { useEffect } from "react";

export const AppLayout = () => {
  const dispatch = useDispatch();
  const activePage = useSelector(selectActivePage);
  const [getCurrentSeason] = useLazyGetCurrentSeasonQuery();

  useEffect(() => {
    dispatch(changeActivePage("home"));
  }, []);

  useEffect(() => {
    getCurrentSeason("");
  }, [getCurrentSeason]);

  return (
    <>
      <Header />
      <div className="m-auto w-[90%] max-w-[1200px] mt-16 mb-5">
        {activePage === "home" && <HomePage />}
        {activePage === "drivers" && <DriversPage />}
        {activePage === "driver" && <DriverPage />}
        {activePage === "teams" && <ConstructorsPage />}
        {activePage === "team" && <ConstructorPage />}
        {activePage === "schedule" && <SchedulePage />}
      </div>
    </>
  );
};

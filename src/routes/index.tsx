import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Content } from "../components/Content";
import { Drivers } from "../components/Drivers";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Schedule } from "../components/Schedule";
import { Teams } from "../components/Teams";

export const Router = () => {
    return (
        <BrowserRouter>
            <Header />
            <div className="m-auto w-[90%] max-w-[1200px] mt-16 mb-5">
                <Routes>
                    <Route path="/" element={<Content />} />
                    <Route path="/drivers" element={<Drivers />} />
                    <Route path="/teams" element={<Teams />} />
                    <Route path="/schedule" element={<Schedule />} />
                </Routes>
            </div>
            <Footer />
        </BrowserRouter>
    )
}
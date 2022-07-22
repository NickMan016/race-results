import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Content } from "../components/Content";
import { Drivers } from "../components/Drivers";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export const Router = () => {
    return(
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={ <Content /> } />
                <Route path="/drivers" element={ <Drivers /> } />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}
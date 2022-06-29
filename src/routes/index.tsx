import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Content } from "../components/Content";
import { Header } from "../components/Header";

export const Router = () => {
    return(
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={ <Content /> } />
            </Routes>
        </BrowserRouter>
    )
}
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "../components/Header";

export const Router = () => {
    return(
        <BrowserRouter>
            <Header />
            <Routes>
                {/* <Route path="/" element={ <Header /> } /> */}
            </Routes>
        </BrowserRouter>
    )
}
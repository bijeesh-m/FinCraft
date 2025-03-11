import React from "react";
import Header from "../Pages/Manager/Header";
import { Outlet } from "react-router-dom";
import ManagerFooter from "../components/Manager/ManagerHeader";

const ManagerLayout = () => {
    return (
        <div>
            <Header />
            <Outlet />
            <ManagerFooter />
        </div>
    );
};

export default ManagerLayout;

import React from "react";
import Header from "../Pages/Manager/Header";
import { Outlet } from "react-router-dom";

const ManagerLayout = () => {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    );
};

export default ManagerLayout;

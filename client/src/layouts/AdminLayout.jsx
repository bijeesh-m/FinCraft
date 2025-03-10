import React from "react";
import AdminHeader from "../components/Admin/Header";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
    return (
        <div className="flex flex-col  h-screen">
            <AdminHeader />
            <div className="flex-1  overflow-y-auto bg-gray-100">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;

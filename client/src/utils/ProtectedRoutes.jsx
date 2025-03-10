import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie"

const ProtectedRoutes = () => {
    const token = Cookies.get('AccessToken');
    console.log(token);
    let user;
    console.log(token);
    if (token) {
        user = jwtDecode(token);
    }

    console.log(user);

    return <div>{user && user.role === "user" ? <Outlet /> : <Navigate to={"/signin"} />}</div>;
};

export default ProtectedRoutes;

import React from "react";
import { useAddress } from "@thirdweb-dev/react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children, ...rest}) => {
    const address = useAddress();

    return (address ? <Outlet /> : <Navigate to="/" />)
};

export default ProtectedRoutes;
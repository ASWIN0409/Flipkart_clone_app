import { Navigate, Outlet } from "react-router-dom";
import MainLayout from "../../layout/MainLayout";

function PrivateRoute() {

    const accessToken = localStorage.getItem('access');

    return (
        accessToken ?
            <Outlet /> :
            <Navigate to='/login' />
    );
}

export default PrivateRoute;
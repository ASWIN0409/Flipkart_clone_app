import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {

    const accessToken = localStorage.getItem('access');

    return (
        accessToken ?
            <Outlet /> :
            <Navigate to='/login' />
    );
}

export default PrivateRoute;
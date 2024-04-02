import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../provider/AuthProvider";

const PrivateRoute = ({ children }) => {
    const { currentUser, loading, error } = useAuthContext();
    const location = useLocation();

    console.log(loading);
    return (
        <>
            {loading ? (
                <div className="h-screen flex justify-center items-center"><span className="loading loading-ring loading-lg"></span></div>
            ) : error ? (
                // Handle error state, for example, show an error message
                <div>Error: {error.message}</div>
            ) : currentUser ? (
                <>{children}</>
            ) : (
                // If currentUser doesn't exist, redirect to login
                <Navigate to="/account" state={location} />
            )}
        </>
    );
}

export default PrivateRoute;

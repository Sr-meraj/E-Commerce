import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../provider/AuthProvider";

const PrivateRoute = ({ children }) => {
    const { currentUser } = useAuthContext()
    const location = useLocation()
    return (
        currentUser ? (
            <>
                {children}
            </>
        ) : (
            <Navigate to="/login" state={location} /> // Redirect to the login page
        )
    );
}

export default PrivateRoute;

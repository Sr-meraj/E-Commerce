import { Navigate } from "react-router-dom";
import { useAuthContext } from "../provider/AuthProvider";

const PublicRoute = ({ children }) => {
    const { currentUser } = useAuthContext()
    return (
        !currentUser ? (
            <>
                {children}
            </>
        ) : (
            <Navigate to="/" replace /> // Redirect to the home page
        )
    );
}

export default PublicRoute;

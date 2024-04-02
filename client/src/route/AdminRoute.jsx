import { useAuthContext } from "../provider/AuthProvider";

const AdminRoute = ({ children }) => {
    const { currentUser, loading } = useAuthContext()
    console.log(currentUser, loading);
    // return (
    //     !loading && currentUser?.role === 'ADMIN' ? (
    //         <>
    //             {children}
    //         </>
    //     ) : (
    //         <Navigate to="/" replace /> // Redirect to the login page
    //     )
    // );
}

export default AdminRoute;

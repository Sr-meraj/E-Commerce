import AdminLayout from "../../Component/Dashboard/AdminLayout.jsx";
import Customer from "../../Component/Dashboard/Customer.jsx";
import { useAuthContext } from "../../provider/AuthProvider";
import links from './links.json';

const Dashboard = () => {
    const { currentUser, loading, error } = useAuthContext();
    return (
        <>
            <section className="container py-6">
                {loading ? (
                    <div className="h-screen flex justify-center items-center"><span className="loading loading-ring loading-lg"></span></div>
                ) : error ? (
                    <p>{error.message}</p>
                ) : (
                    currentUser.role === 'ADMIN' ? (
                        <AdminLayout user={currentUser} links={links[currentUser.role]} />
                    ) : (
                        <Customer user={currentUser} links={links[currentUser.role]} />
                    )
                )
                }
            </section>
        </>
    );
}
export default Dashboard;
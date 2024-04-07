import AdminLayout from '../../Component/Dashboard/AdminLayout'; // Make sure to import AdminLayout
import Customer from '../../Component/Dashboard/Customer'; // Make sure to import Customer
import { useAuthContext } from '../../provider/AuthProvider';
import links from './links.json';
const Dashboard = () => {
    const { currentUser, error, loading } = useAuthContext();

    return (
        <section className="container py-6 px-4">
            {!loading && !error && currentUser.role === 'ADMIN' ? (
                <AdminLayout user={currentUser} links={links[currentUser.role]} />
            ) : (
                <Customer user={currentUser} links={links[currentUser.role]} />
            )}
        </section>
    );
}

export default Dashboard;

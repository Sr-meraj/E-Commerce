import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from '../../assets/logo.svg';
import { useAuthContext } from "../../provider/AuthProvider";

const AdminHeader = () => {
    const { currentUser, logout, setUser } = useAuthContext()

    const Logout = async () => {
        const res = await logout();
        if (res.success) {
            localStorage.removeItem('access_token');
            setUser(null);
            toast.success(`${res.message}`);
        } else {
            toast.error(res.error);
        }
    }
    return (
        <>
            <div className="navbar bg-base-200 justify-between">
                <div className=" space-x-4">

                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden"><FaBars /></label>

                    <div className="flex-1">
                        <Link to={'/'}>
                            <img
                                className="h-8 w-auto"
                                src={logo}
                                alt=""
                            />
                        </Link>
                    </div>
                </div>

                <div className="flex-none">

                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li><span onClick={Logout}>Logout</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
export default AdminHeader;
import Login from "./Login";
import Signup from "./Signup";

const AuthLayout = () => {
    return (
        <div className="">
            <div className="bg-slate-200">
                <div className="text-sm breadcrumbs container mx-auto px-6 py-5">
                    <ul>
                        <li><a>Home</a></li>
                        <li>My Account</li>
                    </ul>
                </div>
            </div>
            <div className="container py-12">
                <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">My Account</h1>
                <div className="grid md:grid-cols-2 grid-cols-1  gap-4">
                    <Login />
                    <Signup />
                </div>
            </div>
        </div>
    );
}
export default AuthLayout;
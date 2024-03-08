import Login from "./Login";
import Signup from "./Signup";

const AuthLayout = () => {
    return (
        <div className="container py-12">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">My Account</h1>
            <div class="grid md:grid-cols-2 grid-cols-1  gap-4">
                <Login />
                <Signup />
            </div>
        </div>
    );
}
export default AuthLayout;
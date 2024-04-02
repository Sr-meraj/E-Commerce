import { Route, Routes } from "react-router-dom";
import Page404 from "../../pages/ErrorPage/Page404";
import AdminSideBar from "./AdminSideBar";

const AdminLayout = () => {
    return (
        <div className="container">
            <div className='admin'>
                <div className="grid grid-cols-12">
                    <div className="col-span-5 md:col-span-3">
                        <AdminSideBar />
                        <AccountMenu {...props} />
                    </div>
                    <div className="col-span-7 md:col-span-9">
                        <div className='w-full'>
                            <Routes>
                                <Route exact path='/dashboard' component={"Account"} />
                                <Route path='/dashboard/security' component={"AccountSecurity"} />
                                <Route path='/dashboard/address' component={"Address"} />
                                <Route path='/dashboard/product' component={"Product"} />
                                <Route path='/dashboard/category' component={"Category"} />
                                <Route path='/dashboard/brand' component={"Brand"} />
                                <Route path='/dashboard/users' component={"Users"} />
                                <Route path='/dashboard/merchant' component={"Merchant"} />
                                <Route path='/dashboard/orders' component={"Order"} />
                                <Route path='/dashboard/review' component={"Review"} />
                                <Route path='/dashboard/wishlist' component={"Wishlist"} />
                                <Route path='*' component={Page404} />
                            </Routes>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default AdminLayout;
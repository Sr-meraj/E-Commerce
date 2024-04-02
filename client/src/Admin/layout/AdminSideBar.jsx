const AdminSideBar = () => {
    return (
        <>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content px-6 py-4 flex flex-col items-center justify-center">

                </div>
                <div className="drawer-side">
                    <label for="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-60 min-h-full bg-main/5 text-base-content">
                        {/* <!-- Sidebar content here --> */}
                        <li><a>Add Product</a></li>
                        <li><a>Manage Products</a></li>
                        <li><a>Add Brand</a></li>
                        <li><a>Manage Brands</a></li>
                        <li><a>Add Category</a></li>
                        <li><a>Add SubCategory</a></li>
                        <li><a>Manage Categories</a></li>
                    </ul>

                </div>
            </div>
        </>
    );
}
export default AdminSideBar;
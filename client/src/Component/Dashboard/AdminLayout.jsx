import React from 'react';
import { Route } from 'react-router-dom';
import Page404 from '../../pages/ErrorPage/Page404';
import AccountMenu from './AccountMenu';

const AdminLayout = ({ user, links }) => {
    return (
        <div>
            <div className='admin'>
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-5 md:col-span-3">
                        <AccountMenu links={links} />
                    </div>
                    <div className="col-span-7 md:col-span-9">
                        <div className='w-full'>
                            <Route>
                                <Route index element={
                                    <div>
                                        <h1>Dashboard</h1>
                                        <p>Welcome to your dashboard!</p>
                                    </div>
                                } />
                                <Route path='/dashboard/security' element={
                                    <div>
                                        <h1>Dashboard</h1>
                                        <p>Welcome to your Security!</p>
                                    </div>
                                } />
                                <Route path='/dashboard/address' element={<p>Address</p>} />
                                <Route path='/dashboard/product' element={<p>Product</p>} />
                                <Route path='/dashboard/category' element={<p>Category</p>} />
                                <Route path='/dashboard/brand' element={<p>Brand</p>} />
                                <Route path='/dashboard/users' element={<p>Users</p>} />
                                <Route path='/dashboard/merchant' element={<p>Merchant</p>} />
                                <Route path='/dashboard/orders' element={<p>Order</p>} />
                                <Route path='/dashboard/review' element={<p>Review</p>} />
                                <Route path='/dashboard/wishlist' element={<p>Wishlist</p>} />
                                <Route path='*' element={<Page404 />} />
                            </Route>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;

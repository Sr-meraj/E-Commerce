import React from 'react';

import { Route, Routes } from 'react-router-dom';

import Page404 from '../../pages/ErrorPage/Page404';

const Customer = props => {
    const { user } = props;

    return (
        <div className='customer'>
            <div className='grid grid-cols-12 gap-6'>
                <div className="col-span-5 md:col-span-3">
                    {/* <AccountMenu {...props} /> */}
                </div>
                <div className="col-span-7 md:col-span-9">
                    <div className='panel-body'>
                        <Routes>
                            <Route exact path='/dashboard' component={<p>Account</p>} />
                            <Route path='/dashboard/security' component={<p>AccountSecurity</p>} />
                            <Route path='/dashboard/address' component={<p>Address</p>} />
                            <Route path='/dashboard/orders' component={<p>Order</p>} />
                            {/* <Route path='/dashboard/wishlist' component={Wishlist} /> */}
                            <Route path='*' component={Page404} />
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Customer;

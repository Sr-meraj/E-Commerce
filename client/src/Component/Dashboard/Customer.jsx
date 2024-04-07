import React from 'react';

import { Route, Routes } from 'react-router-dom';

import Page404 from '../../pages/ErrorPage/Page404';
import AccountDetails from './AccountDetails/AccountDetails';
import AccountMenu from './AccountMenu';
import AccountSecurity from './AccountSecurity/AccountSecurity';

const Customer = (props) => {
    const { user, links } = props;

    return (
        <div className='customer'>
            <div className='grid grid-cols-12 gap-6'>
                <div className="col-span-5 md:col-span-3">
                    <AccountMenu links={links} />
                </div>
                <div className="col-span-7 md:col-span-9">
                    <div className='panel-body'>
                        <Routes>
                            <Route index element={<AccountDetails />} />
                            <Route path='security' element={
                                <AccountSecurity />
                            } />
                            <Route path='address' element={<p>Address</p>} />
                            <Route path='orders' element={<p>Order</p>} />
                            <Route path='wishlist' element={<p>Wishlist</p>} />
                            <Route path='*' element={Page404} />
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Customer;

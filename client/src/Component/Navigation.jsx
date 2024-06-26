import { Dialog, Popover, Tab, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';

import { FiUser } from "react-icons/fi";
import { HiBars3, HiMiniMagnifyingGlass, HiMiniXMark, HiOutlineShoppingBag } from "react-icons/hi2";

import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from '../assets/logo.svg';
import { navigation } from '../config/NavigationData';
import { useAuthContext } from '../provider/AuthProvider';
import { toggleSidebar } from '../utility/cart-action';
import CartSideBar from './cart/CartSideBar';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Navigation() {
    const [open, setOpen] = useState(false)
    const [cartItems, setCartItems] = useState()
    const { currentUser, logout, setUser } = useAuthContext()

    const Logout = async () => {
        const res = await logout();
        console.log(res);
        if (res?.success) {
            localStorage.removeItem('access_token');
            setUser(null);
            toast.success(`${res.message}`);
        } else {
            toast.error(res.error);
        }
    }

    useEffect(() => {
        const handleStorageChange = () => {
            // Update cart items when local storage changes
            setCartItems(JSON.parse(localStorage.getItem('CART_ITEMS')) || []);
        };

        // Listen for storage events
        window.addEventListener('storage', handleStorageChange);

        // Initial fetch of cart items from local storage
        setCartItems(JSON.parse(localStorage.getItem('CART_ITEMS')) || []);

        document.addEventListener("click", handleStorageChange);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            document.removeEventListener("click", handleStorageChange);

        };
    }, []);



    return (
        <div className="bg-white">
            {/* Mobile menu */}
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-40 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                                <div className="flex px-4 pb-2 pt-5">
                                    <button
                                        type="button"
                                        className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                                        onClick={() => setOpen(false)}
                                    >
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">Close menu</span>
                                        <HiMiniXMark className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                </div>

                                {/* Links */}
                                <Tab.Group as="div" className="mt-2">
                                    <div className="border-b border-gray-200">
                                        <Tab.List className="-mb-px flex space-x-8 px-4">
                                            {navigation.categories.map((category) => (
                                                <Tab
                                                    key={category.name}
                                                    className={({ selected }) =>
                                                        classNames(
                                                            selected ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-900',
                                                            'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium'
                                                        )
                                                    }
                                                >
                                                    {category.name}
                                                </Tab>
                                            ))}
                                        </Tab.List>
                                    </div>
                                    <Tab.Panels as={Fragment}>
                                        {navigation.categories.map((category) => (
                                            <Tab.Panel key={category.name} className="space-y-10 px-4 pb-8 pt-10">
                                                <div className="grid grid-cols-2 gap-x-4">
                                                    {category.featured.map((item) => (
                                                        <div key={item.name} className="group relative text-sm">
                                                            <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                                                <img src={item.imageSrc} alt={item.imageAlt} className="object-cover object-center" />
                                                            </div>
                                                            <Link to={item.href} className="mt-6 block font-medium text-gray-900">
                                                                <span className="absolute inset-0 z-10" aria-hidden="true" />
                                                                {item.name}
                                                            </Link>
                                                            <p aria-hidden="true" className="mt-1">
                                                                Shop now
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                                {category.sections.map((section) => (
                                                    <div key={section.name}>
                                                        <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
                                                            {section.name}
                                                        </p>
                                                        <ul
                                                            role="list"
                                                            aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                                                            className="mt-6 flex flex-col space-y-6"
                                                        >
                                                            {section.items.map((item) => (
                                                                <li key={item.name} className="flow-root">
                                                                    <Link to={item.href} className="-m-2 block p-2 text-gray-500">
                                                                        {item.name}
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </Tab.Panel>
                                        ))}
                                    </Tab.Panels>
                                </Tab.Group>

                                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                                    {navigation.pages.map((page) => (
                                        <div key={page.name} className="flow-root">
                                            <Link to={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                                                {page.name}
                                            </Link>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                                    <div className="flow-root">
                                        {currentUser ? (<span className="-m-2 block p-2 font-medium text-gray-900"> Logout </span>) : (<Link to={"/account"} className="-m-2 block p-2 font-medium text-gray-900">
                                            Sign in
                                        </Link>)}
                                    </div>
                                </div>

                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            <header className="relative bg-white">
                <p className="flex h-10 items-center justify-center border-b-2 border-b-[#39b4ac] bg-emerald-200/40 px-4 text-sm font-medium text-black sm:px-6 lg:px-8">
                    Get free delivery on orders over $100
                </p>

                <nav aria-label="Top" className="container mx-auto px-4">
                    <div className="border-b border-gray-200">
                        <div className="flex h-16 items-center">
                            <button
                                type="button"
                                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                                onClick={() => setOpen(true)}
                            >
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Open menu</span>
                                <HiBars3 className="h-5 w-5" aria-hidden="true" />
                            </button>

                            {/* Logo */}
                            <div className="ml-4 flex lg:ml-0">
                                <Link to={'/'}>
                                    <span className="sr-only">Your Company</span>
                                    <img
                                        className="h-8 w-auto"
                                        src={logo}
                                        alt=""
                                    />
                                </Link>
                            </div>

                            {/* Flyout menus */}
                            <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch z-50">
                                <div className="flex h-full space-x-8 ">
                                    {navigation.categories.map((category) => (
                                        <Popover key={category.name} className="flex">
                                            {({ open }) => (
                                                <>
                                                    <div className="relative flex">
                                                        <Popover.Button
                                                            className={classNames(
                                                                open
                                                                    ? 'border-indigo-600 text-indigo-600'
                                                                    : 'border-transparent text-gray-700 hover:text-gray-800',
                                                                'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out'
                                                            )}
                                                        >
                                                            {category.name}
                                                        </Popover.Button>
                                                    </div>

                                                    <Transition
                                                        as={Fragment}
                                                        enter="transition ease-out duration-200"
                                                        enterFrom="opacity-0"
                                                        enterTo="opacity-100"
                                                        leave="transition ease-in duration-150"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                                                            {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                                            <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                                                            <div className="relative bg-white">
                                                                <div className="mx-auto max-w-7xl px-8">
                                                                    <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                                                        <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                                                            {category.featured.map((item) => (
                                                                                <div key={item.name} className="group relative text-base sm:text-sm">
                                                                                    <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                                                                        <img
                                                                                            src={item.imageSrc}
                                                                                            alt={item.imageAlt}
                                                                                            className="object-cover object-center"
                                                                                        />
                                                                                    </div>
                                                                                    <Link to={item.href} className="mt-6 block font-medium text-gray-900">
                                                                                        <span className="absolute inset-0 z-10" aria-hidden="true" />
                                                                                        {item.name}
                                                                                    </Link>
                                                                                    <p aria-hidden="true" className="mt-1">
                                                                                        Shop now
                                                                                    </p>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                        <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                                                            {category.sections.map((section) => (
                                                                                <div key={section.name}>
                                                                                    <p id={`${section.name}-heading`} className="font-medium text-gray-900">
                                                                                        {section.name}
                                                                                    </p>
                                                                                    <ul
                                                                                        role="list"
                                                                                        aria-labelledby={`${section.name}-heading`}
                                                                                        className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                                                    >
                                                                                        {section.items.map((item) => (
                                                                                            <li key={item.name} className="flex">
                                                                                                <Link to={`/shop/${category.name}/${section.name}/${item.name}`} className="hover:text-gray-800">
                                                                                                    {item.name}
                                                                                                </Link>
                                                                                            </li>
                                                                                        ))}
                                                                                    </ul>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Popover.Panel>
                                                    </Transition>
                                                </>
                                            )}
                                        </Popover>
                                    ))}

                                    {navigation.pages.map((page) => (
                                        <Link
                                            key={page.name}
                                            to={page.href}
                                            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                                        >
                                            {page.name}
                                        </Link>
                                    ))}
                                </div>
                            </Popover.Group>

                            <div className="ml-auto flex items-center gap-3">

                                {/* Search */}
                                <div className="flex">
                                    <Link to={"/#"} className="p-2 text-gray-400 hover:text-gray-500">
                                        <span className="sr-only">Search</span>
                                        <HiMiniMagnifyingGlass className="h-5 w-5" aria-hidden="true" />
                                    </Link>
                                </div>

                                {/* Cart */}
                                <div className="flow-root">
                                    <label htmlFor="my-drawer-4" className="group indicator cursor-pointer" onClick={toggleSidebar}>
                                        <span className="sr-only indicator-item badge badge-success text-white px-1.5 text-xs">0</span>
                                        <HiOutlineShoppingBag
                                            className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                        />
                                        <span className=" ml-1 text-sm font-medium text-gray-700 group-hover:text-gray-800">{cartItems?.length}</span>
                                        <span className="sr-only">items in cart, view bag</span>
                                    </label>
                                    <CartSideBar />

                                </div>
                                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">

                                    {currentUser ?
                                        (
                                            <div className="dropdown menu-dropdown-toggle  dropdown-end rounded-full">
                                                <div tabIndex={0} role="button" className="flex items-center justify-center m-1">
                                                    {
                                                        currentUser?.avatar ? (
                                                            <div className="avatar">
                                                                <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                                                    <img src={currentUser?.avatar} />
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="avatar placeholder">
                                                                <div className="bg-neutral text-neutral-content rounded-full w-8">
                                                                    <span className="text-xs">{currentUser?.fullname.charAt(0)}</span>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                                    <li>
                                                        <Link to='/dashboard'>
                                                            <span className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                                                My Account
                                                            </span>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to='/dashboard/my-order'>
                                                            <span className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                                                Orders
                                                            </span>
                                                        </Link>
                                                    </li>
                                                    <li onClick={Logout}>
                                                        <span className="text-sm font-medium text-gray-700 hover:text-gray-800"> Logout </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        )
                                        : (<Link to={"/account"} className="text-sm font-medium p-2 text-gray-400 hover:text-gray-500">
                                            <FiUser className="h-5 w-5" />
                                        </Link>)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    )
};

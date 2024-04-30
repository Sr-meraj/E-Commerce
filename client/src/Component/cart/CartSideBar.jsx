import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../provider/AuthProvider";
import { handleCart, handleCheckout, handleRemoveFromCart, handleShopping } from "../../utility/cart-action";

const CartSideBar = () => {
    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [cartId, setCartId] = useState('');
    const { currentUser } = useAuthContext();
    const navigate = useNavigate()

    // Call handleCart every time the sidebar opens
    useEffect(() => {
        const handleDrawerOpen = () => {
            handleCart(setCartItems, setCartTotal, setCartId);
        };

        document.addEventListener("click", handleDrawerOpen);

        return () => {
            document.removeEventListener("click", handleDrawerOpen);
        };
    }, []);

    // Function to toggle sidebar open/close
    const toggleSidebar = () => {
        document.getElementById('my-drawer-4').click();
        setIsOpen(!isOpen); // Toggle isOpen state
    };
    return (
        <>
            <div className={`drawer drawer-end z-50`}>
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" onChange={toggleSidebar} />
                <div className="drawer-content"></div>
                <div className="drawer-side overflow-x-hidden overflow-y-auto">
                    <label htmlFor="my-drawer-4" onClick={toggleSidebar} aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="p-4 w-80 min-h-full bg-base-200 text-base-content">
                        <div>
                            <label className="absolute end-4 top-4 text-gray-600 transition hover:scale-110 cursor-pointer" htmlFor="my-drawer-4" onClick={toggleSidebar}>
                                <span className="sr-only">Close cart</span>

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-5 w-5"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </label>

                            <div className="mt-4 space-y-6 flex flex-col justify-between min-h-[60vh]">
                                {cartItems.length === 0 ? (
                                    <p className="text-center">No items in the cart.</p>
                                ) : (
                                    <>
                                        <ul className="space-y-4">
                                            {cartItems.map(item => (
                                                <li key={item._id} className="flex items-center justify-between gap-4">
                                                    <img
                                                        src={item.productImages && item.productImages.length > 0 ? item.productImages[0] : ''}
                                                        alt={item.title}
                                                        className="size-16 rounded object-cover"
                                                    />
                                                    <div>
                                                        <h3 className="text-sm text-gray-900 truncate text-balance line-clamp-1">{item.title}</h3>
                                                        <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                                                            <div>
                                                                <dt className="inline">price: </dt>
                                                                <dd className="inline">{item.discountedPrice ? item.discountedPrice : item.price} BDT</dd>
                                                            </div>
                                                            <div>
                                                                <dt className="inline">quantity: </dt>
                                                                <dd className="inline">{item.quantity}</dd>
                                                            </div>
                                                        </dl>
                                                    </div>
                                                    <button onClick={() => handleRemoveFromCart(item._id)} type="button"><FaTrash /></button>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}

                                <div className="space-y-4 text-center">
                                    <span>Total Price: <>{cartTotal} BDT</></span>
                                    <Link
                                        to="/cart"
                                        className="block rounded border border-gray-600 px-5 py-3 text-sm text-gray-600 transition hover:ring-1 hover:ring-gray-400"
                                        onClick={toggleSidebar} // Close sidebar when "View Cart" is clicked
                                    >
                                        View my cart ({cartItems.length})
                                    </Link>

                                    {
                                        currentUser ? (<>
                                            <Link
                                                to="/order"
                                                className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                                                onClick={toggleSidebar} // Close sidebar when "Checkout" is clicked
                                            >
                                                Place Order
                                            </Link>
                                            {/* <Link
                                                to="/checkout"
                                                className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                                                onClick={toggleSidebar} // Close sidebar when "Checkout" is clicked
                                            >
                                                Checkout
                                            </Link> */}
                                        </>) : (<>
                                            <button className="btn btn-square btn-success w-full text-white"
                                                onClick={() => handleCheckout(navigate, toggleSidebar)}
                                            >
                                                Proceed to Checkout
                                            </button>
                                        </>)
                                    }

                                    <span
                                        className="cursor-pointer inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
                                        onClick={() => handleShopping(navigate)} // Close sidebar when "Continue Shopping" is clicked
                                    >
                                        Continue shopping
                                    </span>
                                </div>
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
        </>
    );
}
export default CartSideBar;
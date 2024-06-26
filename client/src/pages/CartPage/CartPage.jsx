import { Fragment, useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import CartItem from "../../Component/cart/CartItem";
import { useAuthContext } from "../../provider/AuthProvider";
import { calculateCartTotal, clearCart } from "../../utility/cart-action";

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [cartId, setCartId] = useState('');
    const { currentUser } = useAuthContext();
    const navigate = useNavigate()

    const handleCart = () => {
        const storedCartItems = JSON.parse(localStorage.getItem('CART_ITEMS'));
        const storedCartTotal = localStorage.getItem('CART_TOTAL');
        const storedCartId = localStorage.getItem("CART_ID");

        if (storedCartItems) {
            setCartItems(storedCartItems);
            setCartTotal(storedCartTotal);
            setCartId(storedCartId);
            calculateCartTotal(); // This might need adjustments depending on its functionality
        }
    };
    useEffect(() => {
        const handleDrawerOpen = () => {
            handleCart();
        };

        document.addEventListener("click", handleDrawerOpen);

        return () => {
            document.removeEventListener("click", handleDrawerOpen);
        };
    }, []);

    return (
        <>
            <section>
                <div className="mx-auto container px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                    <div className="">
                        <header className="">
                            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Shopping Cart</h1>
                        </header>

                        <div className="mt-8 grid grid-cols-3 gap-10">
                            <ul className="space-y-4 col-span-2 border rounded-lg py-4 px-6">
                                {cartItems.length === 0 ? (
                                    <p className="text-center">No items in the cart.</p>
                                ) : (
                                    cartItems.map(item => (<>
                                        <Fragment key={item._id}>
                                            <CartItem item={item} />
                                        </Fragment>
                                    </>)))
                                }
                                <div className="float-end">
                                    <button className='link link-hover link-success flex  justify-center items-center' onClick={() => clearCart(setCartItems, setCartTotal, setCartId)}>
                                        <IoIosClose size={20} className='mt-1' />
                                        Clear cart
                                    </button>
                                </div>
                            </ul>

                            <div className=" flex justify-end bg-gray-50 max-h-[22rem] min-h-[22rem] rounded-lg px-6 py-4 border-t border-gray-100 ">
                                <div className="w-full space-y-4">
                                    <h4 className="font-semibold card-title">Order summary</h4>
                                    <dl className="space-y-4 text-sm text-gray-700">
                                        <div className="flex justify-between">
                                            <dt>Subtotal</dt>
                                            <dd>{cartTotal} BDT</dd>
                                        </div>

                                        <div className="flex justify-between">
                                            <dt>VAT</dt>
                                            <dd>£25</dd>
                                        </div>
                                        <div className="flex justify-between">
                                            <dt>Shipping</dt>
                                            <dd>Free Shipping</dd>
                                        </div>

                                        <div className="flex justify-between">
                                            <dt>Discount</dt>
                                            <dd>-£20</dd>
                                        </div>

                                        <div className="flex justify-between !text-base font-medium">
                                            <dt>Total</dt>
                                            <dd>{cartTotal} BDT</dd>
                                        </div>
                                    </dl>

                                    <div className="flex justify-end">
                                        <span
                                            className="inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-main"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="-ms-1 me-1.5 h-4 w-4"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                                                />
                                            </svg>

                                            <p className="whitespace-nowrap text-xs">2 Discounts Applied</p>
                                        </span>
                                    </div>

                                    <div className="">
                                        {
                                            currentUser ? (<>
                                                <Link
                                                    to="/checkout"
                                                    className="btn btn-square btn-success w-full text-white"
                                                >
                                                    Checkout
                                                </Link>
                                            </>) : (<>
                                                <button className="btn btn-square btn-success w-full text-white"
                                                    onClick={() => handleCheckout(navigate)}
                                                >
                                                    Proceed to Checkout
                                                </button>
                                            </>)
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default CartPage;
import { Fragment, useEffect, useState } from "react";
import CartItem from "../../Component/cart/CartItem";
import { calculateCartTotal } from "../../utility/cart-action";
import Steps from "./Steps";

const OrderTracking = (props) => {
    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [cartId, setCartId] = useState('');

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
        <div className="space-y-12">
            <Steps activeStep={2} />
            <div>
                {cartItems.length === 0 ? (
                    <p className="text-center">No items in the cart.</p>
                ) : (
                    cartItems.map(item => (<>
                        <Fragment key={item._id}>
                            <CartItem item={item} />
                        </Fragment>
                    </>)))
                }
            </div>
        </div>
    );
}
export default OrderTracking;
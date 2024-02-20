import CartItem from "../../Component/cart/CartItem";
import Steps from "./Steps";

const OrderTracking = (props) => {
    return (
        <div className="space-y-12">
            <Steps activeStep={2} />
            <div>
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
            </div>
        </div>
    );
}
export default OrderTracking;
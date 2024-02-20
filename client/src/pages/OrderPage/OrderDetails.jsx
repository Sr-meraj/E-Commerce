import OrderTracking from "./OrderTracking";

const OrderDetails = () => {
    return (
        <section className="container mx-auto px-4 py-4 min-h-80 space-y-9">
            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
                OrderDetails
            </h1>

            <div className="py-2">
                <OrderTracking />
            </div>

        </section>
    );
}
export default OrderDetails;
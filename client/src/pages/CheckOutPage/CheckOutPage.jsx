import { useEffect, useState } from "react";
import InputText from "../../Component/input/InputText";
import { handleCart } from "../../utility/cart-action";

const CheckOutPage = (props) => {
    const [checked, setChecked] = useState(false)
    const [cartItems, setCartItems] = useState("")
    const [cartTotal, setCartTotal] = useState("")
    const [cartId, setCartId] = useState("")

    useEffect(() => {
        handleCart(setCartItems, setCartTotal, setCartId);
    }, []);

    return (
        <section className="container mx-auto px-2 py-4">
            <div className="grid grid-cols-2 gap-10 font-[poppins] py-12 px-8">
                <div className="w-full">
                    <form action="">
                        <h4 className="font-semibold mb-4">Contact information</h4>
                        <InputText label={"Email address"} type="email" placeholder="Type here" />
                        <div className="divider h-12" />
                        <div>
                            <h4 className="font-semibold mb-4">Billing information</h4>
                            <div className="flex gap-4">
                                <InputText label={"First name"} type="text" />
                                <InputText label={"Last name"} type="text" />
                            </div>
                            <InputText label={"Address"} type="text" name={'address'} />
                            <InputText label={"Apartment, suite, etc."} type="text" name={'apartment'} />
                            <div className="flex gap-4">
                                <InputText label={"City"} type="text" name={'city'} />
                                <InputText label={"Country"} type="text" name={'country'} />
                            </div>
                            <div className="flex gap-4">
                                <InputText label={"State/Province"} name={'region'} type="text" />
                                <InputText label={"Postal code"} type="text" name={'postal-code'} />
                            </div>
                            <InputText label={"Phone"} name={'phone'} type="text" />
                        </div>
                        <div className="form-control py-2">
                            <label className="cursor-pointer label justify-start gap-3">
                                <input type="checkbox" className="checkbox checkbox-success checkbox-sm" onChange={() => setChecked(!checked)} />
                                <span className="label-text">Ship to a different address?</span>
                            </label>
                        </div>
                        {checked &&
                            <div >
                                <h4 className="font-semibold mb-4 sr-only">Shipping information</h4>
                                <div className="flex gap-4">
                                    <InputText label={"First name"} type="text" />
                                    <InputText label={"Last name"} type="text" />
                                </div>
                                <InputText label={"Address"} type="text" name={'address'} />
                                <InputText label={"Apartment, suite, etc."} type="text" name={'apartment'} />
                                <div className="flex gap-4">
                                    <InputText label={"City"} type="text" name={'city'} />
                                    <InputText label={"Country"} type="text" name={'country'} />
                                </div>
                                <div className="flex gap-4">
                                    <InputText label={"State/Province"} name={'region'} type="text" />
                                    <InputText label={"Postal code"} type="text" name={'postal-code'} />
                                </div>
                                <InputText label={"Phone"} name={'phone'} type="text" />
                            </div>
                        }
                        <div className="py-4">
                            <h4 className="font-semibold mb-4">Additional information</h4>
                            <textarea placeholder="Order notes" className="textarea textarea-bordered textarea-md w-full " ></textarea>
                        </div>
                    </form>
                </div>
                <div>
                    <div className="w-full border rounded-md bg-white p-6">
                        <h4 className="font-semibold mb-4 text-lg">Your Orders</h4>
                        <div className="overflow-x-auto w-full border bg-white min-h-96">
                            <table className="table border-dashed">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Product</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cartItems?.length !== 0 && cartItems.map(item => (
                                            <tr key={item._id}>
                                                <td>
                                                    <div className="flex items-center gap-3">
                                                        <div className="avatar">
                                                            <div className="rounded w-20 ">
                                                                <img src={item.productImages && item.productImages.length > 0 ? item.productImages[0] : ''}
                                                                    alt={item?.title} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <h4>
                                                        {item?.title}
                                                    </h4>
                                                    x {item?.quantity}
                                                </td>
                                                <td>{item.discountedPrice ? item.discountedPrice : item.price} BDT</td>
                                            </tr>
                                        ))

                                    }
                                    <tr>
                                        <td>
                                            SubTotal
                                        </td>
                                        <td>
                                            {cartTotal} BDT
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Shipping
                                        </td>
                                        <td>
                                            Free Shipping
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Total
                                        </td>
                                        <td>
                                            {cartTotal} BDT
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                        <div className="py-6">
                            <h4 className="font-semibold mb-4 pl-1">Payment</h4>
                            <div className="space-y-3">
                                <div>
                                    <div className="form-control">
                                        <label className="label cursor-pointer justify-start gap-4">
                                            <input type="radio" name="payment" className="radio radio-success" defaultChecked />
                                            <span className="label-text">Cash on delivery</span>
                                        </label>
                                    </div>
                                    <div className="form-control sr-only">
                                        <label className="label cursor-pointer justify-start gap-4">
                                            <input type="radio" name="payment" className="radio radio-success" />
                                            <span className="label-text">Credit card</span>
                                        </label>
                                    </div>
                                </div>
                                <button className="btn bg-success hover:bg-[#088179] text-white">Place order</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default CheckOutPage;
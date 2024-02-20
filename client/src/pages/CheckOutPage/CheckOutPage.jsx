import { useState } from "react";
import InputText from "../../Component/input/InputText";

const CheckOutPage = (props) => {
    const [checked, setChecked] = useState(false)

    console.log(checked);
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
                                <input type="checkbox" className="checkbox checkbox-success checkbox-sm" onChange={() => console.log(setChecked(!checked))} />
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
                                        [1, 2, 3, 4].map(item => (
                                            <tr key={item}>
                                                <td>
                                                    <div className="flex items-center gap-3">
                                                        <div className="avatar">
                                                            <div className="rounded w-20 ">
                                                                <img src="https://res.cloudinary.com/dkuwlnejd/image/upload/v1707581286/Ecommerce/product-6-2_u0ygxb.jpg" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <h4>
                                                        Yidarton Women Summer Blue
                                                    </h4>
                                                    x 2
                                                </td>
                                                <td>$640</td>
                                            </tr>
                                        ))

                                    }
                                    <tr>
                                        <td>
                                            SubTotal
                                        </td>
                                        <td>
                                            $1250.34
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
                                            $1250.34
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
                                            <input type="radio" name="payment" className="radio radio-success" checked />
                                            <span className="label-text">Cash on delivery</span>
                                        </label>
                                    </div>
                                    <div className="form-control">
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
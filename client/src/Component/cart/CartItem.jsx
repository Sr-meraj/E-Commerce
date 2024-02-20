import { useState } from "react"
import { HiMiniMinus, HiOutlinePlus } from "react-icons/hi2"

const CartItem = (props) => {
    const [quantity, setQuantity] = useState(1)

    const increaseQuantity = () => {
        setQuantity(prev => prev + 1)
    }
    const decreaseQuantity = () => {
        setQuantity(prev => (quantity >= 1) && prev - 1)
    }
    return (
        <>
            <li className="flex items-center gap-4 last:border-none border-b border-b-gray-200 pb-3">
                <img
                    src="https://res.cloudinary.com/dkuwlnejd/image/upload/v1707581286/Ecommerce/product-6-2_u0ygxb.jpg"
                    alt=""
                    className="aspect-square w-16 h-16 rounded-lg object-cover"
                />

                <div>
                    <h3 className="text-sm/tight text-gray-900 font-semibold">
                        <a href="">
                            Title goes here goes here Lorem, ipsum.
                        </a>
                    </h3>

                    <dl className="mt-2 text-[10px] text-gray-600">
                        <div>
                            <dt className="inline font-semibold">Size: </dt>
                            <dd className="inline">XXS</dd>
                        </div>

                        <div>
                            <dt className="inline font-semibold">Color: </dt>
                            <dd className="inline">White</dd>
                        </div>
                        <div>
                            <dt className="inline font-semibold">Price: </dt>
                            <dd className="inline text-sm font-semibold text-success">$239.43</dd>
                            <dd className="inline ml-3 text-xs line-through"> $283.23</dd>
                        </div>
                    </dl>
                </div>

                <div className="flex flex-1 items-center justify-end gap-2">
                    <div className="flex items-center rounded border border-gray-200 dark:border-gray-800">
                        <button
                            onClick={decreaseQuantity}
                            type="button"
                            className="size-10 leading-10 text-gray-600 transition hover:opacity-75 dark:text-gray-300"
                        >
                            <HiMiniMinus className='mx-auto' />
                        </button>

                        <input
                            type="number"
                            id="Quantity"
                            value={quantity}
                            className="h-10 w-16 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm dark:bg-gray-900 dark:text-white [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none outline-none"
                        />

                        <button
                            onClick={increaseQuantity}
                            type="button"
                            className="size-10 leading-10 text-gray-600 transition hover:opacity-75 dark:text-gray-300"
                        >
                            <HiOutlinePlus className='mx-auto' />
                        </button>
                    </div>

                    <button className="text-gray-600 transition hover:text-red-600">
                        <span className="sr-only">Remove item</span>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-4 w-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                        </svg>
                    </button>
                </div>
            </li>
        </>
    );
}
export default CartItem;
import { RadioGroup } from '@headlessui/react';
import { StarIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import { BsArrowRepeat } from "react-icons/bs";
import { HiMiniMinus, HiOutlinePlus } from 'react-icons/hi2';
import { IoCardOutline } from "react-icons/io5";
import { PiCrownSimple } from "react-icons/pi";
import { Link, useParams } from 'react-router-dom';
import useDataFetching from '../../hook/useDataFatching.js';
import DescriptionSection from './DescriptionSection';
import ProductCarousel from './ProductCarousel';
import RelatedProduct from './RelatedProduct';

const product = {
    name: 'lorem',
    colors: [
        { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
        { name: 'Purple', class: 'bg-purple-600', selectedClass: 'ring-gray-400' },
        { name: 'green', class: 'bg-success', selectedClass: 'ring-gray-400' },
        { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
        { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
    ],
    sizes: [
        { name: 'XS', inStock: false },
        { name: 'S', inStock: true },
        { name: 'M', inStock: true },
        { name: 'L', inStock: true },
        { name: 'XL', inStock: true },
        { name: '2XL', inStock: true },
    ],
    highlights: [
        'Hand cut and sewn locally',
        'Dyed with our proprietary colors',
        'Pre-washed & pre-shrunk',
        'Ultra-soft 100% cotton',
    ],
}
const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProductSingle() {
    const [selectedColor, setSelectedColor] = useState(product.colors[0])
    const [selectedSize, setSelectedSize] = useState(product.sizes[2])
    const [quantity, setQuantity] = useState(1)
    const { slug } = useParams()
    const apiUrl = `http://localhost:4000/api/v1/products/${slug}`;
    const { data, loading, error } = useDataFetching(apiUrl)

    const increaseQuantity = () => {
        setQuantity(prev => prev + 1)
    }
    const decreaseQuantity = () => {
        setQuantity(prev => (quantity >= 1) && prev - 1)
    }

    const transformedImages = data?.productImages?.map((image, index) => (
        <div key={index}>
            <img src={image} alt={data.title} />
        </div>
    ));

    console.log(data)

    if (loading) return <p>Loading</p>
    if (error) return <p>Something went wrong</p>
    return (
        <div className="bg-white">
            <div className="bg-slate-100">
                <div className="container mx-auto mb-7 md:mb-14 px-4 sm:px-6 py-4">
                    <div className="text-sm breadcrumbs">
                        <ul>
                            <li><Link to='/'>Home</Link></li>
                            <li><a>{data.category.name}</a></li>
                            {data.subcategory && <li><a>{data.subcategory.name}</a></li>}
                            <li>{data.title}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="pt-2 container mx-auto px-4">

                {/* Image gallery */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12'>
                    {/* <!-- images - start --> */}
                    <div className="space-y-4 lg:col-span-2">
                        <ProductCarousel images={transformedImages} />
                    </div>
                    {/* <!-- images - end --> */}

                    {/* Product info */}
                    <div className="px-4 pb-6 lg:col-span-2 sm:px-6 lg:px-8 lg:pb-14">
                        <div className="">
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{data.title}</h1>
                        </div>

                        {/* Options */}
                        <div className="mt-4 lg:row-span-3 lg:mt-0 ">
                            <h2 className="sr-only">Product information</h2>
                            <div className='flex justify-between items-center py-4'>

                                <p className="text-sm tracking-tight text-gray-500">Brands: <span className='text-main font-medium'>{data.brand?.name}</span></p>

                                {/* Reviews */}
                                <div className="mt-0">
                                    <h3 className="sr-only">Reviews</h3>
                                    <div className="flex items-center">
                                        <div className="flex items-center">
                                            {[0, 1, 2, 3, 4].map((rating) => (
                                                <StarIcon
                                                    key={rating}
                                                    className={classNames(
                                                        reviews.average > rating ? 'text-amber-400' : 'text-gray-200',
                                                        'h-5 w-5 flex-shrink-0'
                                                    )}
                                                    aria-hidden="true"
                                                />
                                            ))}
                                        </div>
                                        <p className="sr-only">{reviews.average} out of 5 stars</p>
                                        <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                            {reviews.totalCount} reviews
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-4">
                                <h2 className="sr-only">Product information</h2>
                                <div className="space-x-3 border-y border-gray-200 py-3 flex items-end flex-nowrap">
                                    {data?.discountedPrice ? (
                                        <>
                                            <span className='text-2xl sm:text-3xl font-bold text-main'>${data?.discountedPrice}</span>
                                            <span className='text-lg sm:text-xl line-through text-[#90908e]'>${data?.price}</span>
                                        </>
                                    ) : (
                                        <span className='text-2xl sm:text-3xl font-bold text-main'>${data?.price}</span>
                                    )}
                                </div>
                            </div>
                            {/* Description and details */}
                            <div>
                                <h3 className="sr-only">Description</h3>

                                <div className="space-y-6">
                                    <p className="text-base text-gray-900">{data.shortDescription}</p>
                                </div>
                            </div>
                            <div className="mt-8">
                                <div className='space-y-2'>
                                    <span className='flex flex-nowrap items-center gap-2'>
                                        <PiCrownSimple />
                                        <p> 1 Year AL Jazeera Brand Warranty</p>
                                    </span>
                                    <span className='flex flex-nowrap items-center gap-2'>
                                        <BsArrowRepeat />
                                        <p>
                                            30 Day Return Policy
                                        </p>
                                    </span>
                                    <span className='flex flex-nowrap items-center gap-2'>
                                        <IoCardOutline />
                                        <p>
                                            Cash on Delivery available
                                        </p>
                                    </span>
                                </div>
                            </div>

                            <form className="mt-10">
                                {/* Colors */}
                                <div className='flex items-center gap-5 sr-only'>
                                    <h3 className="text-sm font-medium text-gray-900">Color</h3>

                                    <RadioGroup value={selectedColor} onChange={setSelectedColor} className="">
                                        <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                                        <div className="flex items-center space-x-3">
                                            {product.colors.map((color) => (
                                                <RadioGroup.Option
                                                    key={color?.name}
                                                    value={color}
                                                    className={({ active, checked }) =>
                                                        classNames(
                                                            color.selectedClass,
                                                            active && checked ? 'ring ring-offset-1' : '',
                                                            !active && checked ? 'ring-2' : '',
                                                            'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                                                        )
                                                    }
                                                >
                                                    <RadioGroup.Label as="span" className="sr-only">
                                                        {color?.name}
                                                    </RadioGroup.Label>
                                                    <span
                                                        aria-hidden="true"
                                                        className={classNames(
                                                            color.class,
                                                            'h-8 w-8 rounded-full border border-black border-opacity-10'
                                                        )}
                                                    />
                                                </RadioGroup.Option>
                                            ))}
                                        </div>
                                    </RadioGroup>
                                </div>

                                {/* Sizes */}
                                <div className="mt-10 sr-only">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-medium text-gray-900">Size</h3>
                                        <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                            Size guide
                                        </a>
                                    </div>

                                    <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                                        <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                                        <div className="flex items-center gap-4 ">
                                            {product.sizes.map((size) => (
                                                <RadioGroup.Option
                                                    key={size?.name}
                                                    value={size}
                                                    disabled={!size.stock}
                                                    className={({ active }) =>
                                                        classNames(
                                                            size.stock
                                                                ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                                                : 'cursor-not-allowed bg-gray-50 text-gray-200',
                                                            active ? 'ring-2 ring-success' : '',
                                                            'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:border-success focus:outline-none sm:flex-1'
                                                        )
                                                    }
                                                >
                                                    {({ active, checked }) => (
                                                        <>
                                                            <RadioGroup.Label as="span">{size?.name}</RadioGroup.Label>
                                                            {size.stock ? (
                                                                <span
                                                                    className={classNames(
                                                                        active ? 'border' : 'border-2',
                                                                        checked ? 'border-success' : 'border-transparent',
                                                                        'pointer-events-none absolute -inset-px rounded-md'
                                                                    )}
                                                                    aria-hidden="true"
                                                                />
                                                            ) : (
                                                                <span
                                                                    aria-hidden="true"
                                                                    className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                                                >
                                                                    <svg
                                                                        className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                                                        viewBox="0 0 100 100"
                                                                        preserveAspectRatio="none"
                                                                        stroke="currentColor"
                                                                    >
                                                                        <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                                                    </svg>
                                                                </span>
                                                            )}
                                                        </>
                                                    )}
                                                </RadioGroup.Option>
                                            ))}
                                        </div>
                                    </RadioGroup>
                                </div>

                                <div className='flex gap-4 items-center justify-start mt-6 relative'>
                                    <label for="Quantity" className="sr-only"> Quantity </label>
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
                                    <button
                                        type="submit"
                                        className="btn btn-active btn-success text-white flex-"
                                    >
                                        Add to cart
                                    </button>
                                </div>
                            </form>

                            <div className="mt-10 border-t pt-4">
                                <div className='flex flex-col gap-1'>
                                    <p className="text-sm tracking-tight text-gray-500">SKU: <span className='text-main font-medium'>{data.sku}</span></p>
                                    <p className="text-sm tracking-tight text-gray-500">
                                        Category: <span className='text-main font-medium'>
                                            {data.category?.name}
                                            {data.subcategory ? `, ${data.subcategory.name}` : ''}
                                        </span>
                                    </p>

                                    <p className="text-sm tracking-tight text-gray-500">
                                        Availability:
                                        <span className={`font-medium ${data.stock > 0 ? 'text-main' : 'text-red-500'}`}>
                                            {data.stock > 0 ? ` ${data.stock} Items In Stock` : 'Out of Stock'}
                                        </span>
                                    </p>

                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="py-0 pb-10 md:py-10 lg:pb-16 lg:col-span-4">
                        <DescriptionSection data={data} />
                    </div>
                </div>
                <div className=''>
                    <RelatedProduct showItem={4} />
                </div>

                <div className="hidden sm:block py-9">
                    <div className="card bg-base-100 from-base-200 relative overflow-hidden bg-gradient-to-b font-sans shadow-lg  md:flex-row-reverse">
                        <figure className="max-md:bg-primary/10 isolate shrink-0 w-full">
                            <img className="pointer-events-none" alt="daisyUI store" src='https://wp.alithemes.com/html/evara/evara-frontend/assets/imgs/banner/banner-4.png' />
                        </figure>
                        <div className="bg-gray-300 -left-1/5 pointer-events-none absolute bottom-[-50%] aspect-square w-3/4 -translate-x-1/2 rounded-full opacity-20"></div>
                        <div className="card-body relative isolate -mr-64 z-[3] flex flex-col justify-center gap-6">
                            <div className="">
                                <h2 className="card-title text-xl font-light sm:w-[250%] sm:text-2xl md:text-3xl lg:text-xl xl:text-3xl">Repair Services
                                </h2>
                            </div>
                            <h2 className="card-title text-xl text-slate-800 contrast-200 [text-wrap:balance] sm:w-[250%] sm:text-2xl md:text-4xl lg:text-3xl "><span>We're an Apple
                                Authorised Service Provider</span></h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

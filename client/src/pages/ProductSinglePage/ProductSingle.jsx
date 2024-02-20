import { RadioGroup } from '@headlessui/react';
import { StarIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import { BsArrowRepeat } from "react-icons/bs";
import { HiMiniMinus, HiOutlinePlus } from 'react-icons/hi2';
import { IoCardOutline } from "react-icons/io5";
import { PiCrownSimple } from "react-icons/pi";
import DescriptionSection from './DescriptionSection';
import ProductCarousel from './ProductCarousel';
import RelatedProduct from './RelatedProduct';

const product = {
    name: 'Colorful Pattern Shirts HD450',
    price: '192',
    selling_price: '100',
    href: '#',
    breadcrumbs: [
        { id: 1, name: 'Men', href: '#' },
        { id: 2, name: 'Clothing', href: '#' },
    ],
    images: [
        {
            src: 'https://res.cloudinary.com/dkuwlnejd/image/upload/v1707581285/Ecommerce/product-6-1_uq0s7g.jpg',
            alt: 'Two each of gray, white, and black shirts laying flat.',
        },
        {
            src: 'https://res.cloudinary.com/dkuwlnejd/image/upload/v1707581286/Ecommerce/product-6-2_u0ygxb.jpg',
            alt: 'Model wearing plain black basic tee.',
        },
        {
            src: 'https://res.cloudinary.com/dkuwlnejd/image/upload/v1707581284/Ecommerce/product-4-2_jxz1xm.jpg',
            alt: 'Model wearing plain gray basic tee.',
        },
        {
            src: 'https://res.cloudinary.com/dkuwlnejd/image/upload/v1707581284/Ecommerce/product-4-1_g7tvbq.jpg',
            alt: 'Model wearing plain white basic tee.',
        },
    ],
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
    description:
        "The Basic Tee 6-Pack is the ultimate wardrobe essential, providing you with a versatile collection of timeless tees in three captivating grayscale options. Elevate your style effortlessly with this wardrobe staple that allows you to fully express your vibrant personality. Whether you're feeling adventurous and opt for the heather gray tee, want to make a bold statement in our exclusive Black colorway, or need a classic white tee for that extra pop of color, this 6 - pack has you covered.Crafted for comfort and designed for every occasion, these tees are the perfect foundation for building your signature look.",
    short_description: "Elevate your style with the Basic Tee 6-Pack, a versatile collection featuring three grayscale options. Choose from heather gray, exclusive Black, or classic white to express your personality effortlessly. These timeless tees are crafted for comfort and designed for every occasion, making them the ultimate wardrobe essential.",
    highlights: [
        'Hand cut and sewn locally',
        'Dyed with our proprietary colors',
        'Pre-washed & pre-shrunk',
        'Ultra-soft 100% cotton',
    ],
    details:
        'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}
const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProductSingle() {
    const [selectedColor, setSelectedColor] = useState(product.colors[0])
    const [selectedSize, setSelectedSize] = useState(product.sizes[2])
    const [quantity, setQuantity] = useState(1)

    console.log(selectedSize);
    const increaseQuantity = () => {
        setQuantity(prev => prev + 1)
    }
    const decreaseQuantity = () => {
        setQuantity(prev => (quantity >= 1) && prev - 1)
    }

    const transformedImages = product.images.map((image, index) => (
        <div key={index}>
            <img src={image.src} alt={image.alt} />
        </div>
    ));

    return (
        <div className="bg-white">
            <div className="pt-2 container mx-auto px-4">
                <div className="bg-slate-100 mb-7 md:mb-14 px-4 sm:px-6 py-6">
                    <nav aria-label="Breadcrumb">
                        <ol role="list" className="mx-auto flex container items-center space-x-2 ">
                            {product.breadcrumbs.map((breadcrumb) => (
                                <li key={breadcrumb.id}>
                                    <div className="flex items-center">
                                        <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                                            {breadcrumb.name}
                                        </a>
                                        <svg
                                            width={16}
                                            height={20}
                                            viewBox="0 0 16 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                            className="h-5 w-4 text-gray-300"
                                        >
                                            <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                        </svg>
                                    </div>
                                </li>
                            ))}
                            <li className="text-sm">
                                <a href={product.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                                    {product.name}
                                </a>
                            </li>
                        </ol>
                    </nav>
                </div>

                {/* Image gallery */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12'>
                    {/* <!-- images - start --> */}
                    <div className="space-y-4 lg:col-span-2">
                        {/* <div className="relative overflow-hidden rounded-lg max-h-80 bg-gray-100 md:max-h-[320px] lg:max-h-[500px] h-full">
                            <img src={product.images[0].src} loading="lazy" alt={product.images[0].alt} className="h-full w-full object-contain object-top" />

                            <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white sr-only">sale</span>
                        </div> */}
                        <ProductCarousel images={transformedImages} />

                        {/* <div className="flex gap-2 justify-center">
                            {
                                product.images.map((item, id) => (<>
                                    <div className="overflow-hidden rounded-lg bg-gray-100 h-20 w-20 lg:w-32 lg:h-32" key={item.src}>
                                        <img src={item.src} loading="lazy" alt={item.alt} className="h-full w-full object-cover object-center" />
                                    </div>
                                </>))
                            }
                        </div> */}
                    </div>
                    {/* <!-- images - end --> */}

                    {/* Product info */}
                    <div className="px-4 pb-6 lg:col-span-2 sm:px-6 lg:px-8 lg:pb-14">
                        <div className="">
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
                        </div>

                        {/* Options */}
                        <div className="mt-4 lg:row-span-3 lg:mt-0 ">
                            <h2 className="sr-only">Product information</h2>
                            <div className='flex justify-between items-center py-4'>

                                <p className="text-sm tracking-tight text-gray-500">Brands: <span className='text-[#088178] font-medium'>Clothing</span></p>

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
                                    <span className='text-2xl sm:text-3xl font-bold text-[#088178]'>${product.price}</span>
                                    <span className='text-lg sm:text-xl line-through text-[#90908e]'>${product?.selling_price}</span>
                                </div>
                            </div>
                            {/* Description and details */}
                            <div>
                                <h3 className="sr-only">Description</h3>

                                <div className="space-y-6">
                                    <p className="text-base text-gray-900">{product.short_description}</p>
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
                                <div className='flex items-center gap-5'>
                                    <h3 className="text-sm font-medium text-gray-900">Color</h3>

                                    <RadioGroup value={selectedColor} onChange={setSelectedColor} className="">
                                        <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                                        <div className="flex items-center space-x-3">
                                            {product.colors.map((color) => (
                                                <RadioGroup.Option
                                                    key={color.name}
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
                                                        {color.name}
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
                                <div className="mt-10">
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
                                                    key={size.name}
                                                    value={size}
                                                    disabled={!size.inStock}
                                                    className={({ active }) =>
                                                        classNames(
                                                            size.inStock
                                                                ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                                                : 'cursor-not-allowed bg-gray-50 text-gray-200',
                                                            active ? 'ring-2 ring-success' : '',
                                                            'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:border-success focus:outline-none sm:flex-1'
                                                        )
                                                    }
                                                >
                                                    {({ active, checked }) => (
                                                        <>
                                                            <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                                                            {size.inStock ? (
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
                                {/* Sizes */}
                                <div className="mt-5 sr-only">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-medium text-gray-900">Size</h3>
                                        <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                            Size guide
                                        </a>
                                    </div>

                                    <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                                        <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                                        <div className="flex justify-start items-center gap-2 md:flex-nowrap flex-wrap">
                                            {product.sizes.map((size) => (
                                                <RadioGroup.Option
                                                    key={size.name}
                                                    value={size}
                                                    disabled={!size.inStock}
                                                    className={({ active }) =>
                                                        classNames(
                                                            size.inStock
                                                                ? 'cursor-pointer bg-white text-gray-900 shadow-sm checked:bg-success'
                                                                : 'cursor-not-allowed bg-gray-50 text-gray-200',
                                                            active ? 'bg-success text-white' : '',
                                                            'group relative flex items-center justify-center rounded-md border py-2 px-5 text-sm font-medium uppercase hover:bg-success hover:text-white focus:outline-none  '
                                                        )
                                                    }
                                                >
                                                    {({ active, checked }) => (
                                                        <>
                                                            <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                                                        </>
                                                    )}
                                                </RadioGroup.Option>
                                            ))}
                                        </div>
                                    </RadioGroup>
                                </div>

                                <div className='flex gap-4 items-center justify-start mt-6 relative'>
                                    {/* <label for="Quantity" className="sr-only"> Quantity </label> */}

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
                        </div>

                    </div>
                    <div className="py-0 pb-10 md:py-10 lg:pb-16 lg:col-span-4">
                        <DescriptionSection data={product} />
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

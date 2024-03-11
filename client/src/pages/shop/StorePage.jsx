
import { Dialog, Disclosure, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { BsFunnel } from "react-icons/bs";
import { GoDash, GoPlus } from "react-icons/go";
import { HiMiniXMark } from "react-icons/hi2";
import { IoIosArrowDown, IoIosClose } from "react-icons/io";
import { useLocation, useNavigate } from 'react-router-dom';
import Pagination from '../../Component/pagination/Pagination';
import ListProductCard from '../../Component/ProductCard/ListProductCard';
import ProductCard from '../../Component/ProductCard/ProductCard';
import { SkeletonCard, SkeletonListCard } from '../../Component/Skeleton/SkeletonCard';
import useDataFetching from '../../hook/useDataFatching';
import { updateFilter } from '../../utility/utility';

const sortOptions = [
    { name: 'Price: Low to High', value: "asc", current: false },
    { name: 'Price: High to Low', value: 'desc', current: false },
]
const filters = [
    {
        id: 'size',
        name: 'Size',
        options: [
            { value: 's', label: 'S', checked: false },
            { value: 'm', label: 'M', checked: false },
            { value: 'l', label: 'L', checked: false },
            { value: 'xl', label: 'XL', checked: false },
            { value: 'xxl', label: 'XXL', checked: false },
        ],
    },
];
const singleFiler = [
    {
        id: 'price',
        name: 'Price',
        options: [
            { value: '159-399', label: '$159 to $399 And Above' },
            { value: '399-999', label: '$399 to $999 And Above' },
            { value: '999-2000', label: '$999 to $2000 And Above' },
            { value: '2000-4000', label: '$2000 to $4000 And Above' },
            { value: '4000-5000', label: '$4000 to $5000 And Above' },
        ],
    },
    {
        id: 'discount',
        name: 'Discount',
        options: [
            { value: '10', label: '10% And Above' },
            { value: '20', label: '20% And Above' },
            { value: '30', label: '30% And Above' },
            { value: '40', label: '40% And Above' },
            { value: '50', label: '50% And Above' },
            { value: '60', label: '60% And Above' },
            { value: '70', label: '70% And Above' },
            { value: '80', label: '80% And Above' }
        ],
    },
];


function StorePage() {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const Location = useLocation();
    const navigate = useNavigate();
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    const [initialFilters, setInitialFilters] = useState({
        size: [],
        price: [],
        discount: [],
    });
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const [currentPage, setCurrentPage] = useState(0);
    const [priceSort, setPriceSort] = useState('');
    const catApiUrl = `categories`;

    const { data: catData, loading: catLoading, error: catError } = useDataFetching(catApiUrl);

    const handleToCategory = (categoryId) => {
        setCurrentPage(0);
        setSelectedCategoryId(categoryId)
    };

    const apiUrl = `products?${priceSort && `sort=price&order=${priceSort}&`}limit=${itemsPerPage}&page=${currentPage}&price=${initialFilters.price}${selectedCategoryId ? `&category=${selectedCategoryId}` : ''}`

    const { data, loading, error } = useDataFetching(apiUrl);
    const totalPages = Math.ceil(data.totalProducts / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const options = [3, 9, 15, 20, 30];
    const handleItemsPerPageChange = (event) => {
        setItemsPerPage(parseInt(event.target.value));
        setCurrentPage(0);
    };

    const handlePriceSort = (sort) => {
        setPriceSort(sort);
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(Location.search);

        const getSizeFilters = searchParams.getAll('size');
        const getPriceFilters = searchParams.getAll('price');
        const getDiscountFilters = searchParams.getAll('discount');

        setInitialFilters({
            size: getSizeFilters,
            price: getPriceFilters,
            discount: getDiscountFilters,
        });
    }, [Location.search]);

    const handleFilter = (value, sectionId) => {
        const searchParams = new URLSearchParams(Location.search);
        const updatedQuery = updateFilter(searchParams, sectionId, value);
        navigate({ search: updatedQuery });
    };

    const handleRadioFilter = (e, sectionId) => {
        const searchParams = new URLSearchParams(Location.search);
        searchParams.set(sectionId, e.target.value);

        const query = searchParams.toString();
        navigate({ search: `${query}` });
    }

    const clearFilter = (event) => {
        event.preventDefault();

        setInitialFilters({
            size: [],
            price: [],
            discount: [],
        });

        navigate({});
    };


    return (
        <div className="bg-white">
            <div className="bg-slate-200">
                <div className="text-sm breadcrumbs container mx-auto px-6 py-5">
                    <ul>
                        <li><a>Home</a></li>
                        <li>Store</li>
                    </ul>
                </div>
            </div>

            <div>
                {/* Mobile filter dialog */}
                <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-40 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                                    <div className="flex items-center justify-between px-4">
                                        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                        <button
                                            type="button"
                                            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                            onClick={() => setMobileFiltersOpen(false)}
                                        >
                                            <span className="sr-only">Close menu</span>
                                            <HiMiniXMark className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>

                                    {/* Filters */}
                                    <form className="mt-4 border-t border-gray-200">
                                        <h3 className="sr-only">Categories</h3>
                                        <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                                            <li className="block px-2 py-3 cursor-pointer" onClick={() => handleToCategory('')}>
                                                <span>
                                                    All
                                                </span>
                                            </li>
                                            {catData?.map((category) => (
                                                <li key={category.name} className="block px-2 py-3 cursor-pointer" onClick={() => handleToCategory(category._id)}>
                                                    <span>
                                                        {category.name}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>

                                        {filters?.map((section) => (
                                            <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                                                {({ open }) => (
                                                    <>
                                                        <h3 className="-mx-2 -my-3 flow-root">
                                                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                                <span className="font-medium text-gray-900">{section.name}</span>
                                                                <span className="ml-6 flex items-center">
                                                                    {open ? (
                                                                        <GoDash className="h-5 w-5" aria-hidden="true" />
                                                                    ) : (
                                                                        <GoPlus className="h-5 w-5" aria-hidden="true" />
                                                                    )}
                                                                </span>
                                                            </Disclosure.Button>
                                                        </h3>
                                                        <Disclosure.Panel className="pt-6">
                                                            <div className="space-y-6">
                                                                {section.options?.map((option, optionIdx) => (
                                                                    <div key={option.value} className="flex items-center">
                                                                        <input
                                                                            onChange={() => handleFilter(option.value, section.id)}
                                                                            id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                            name={`${section.id}[]`}
                                                                            defaultValue={option.value}
                                                                            type="checkbox"
                                                                            defaultChecked={option.checked}
                                                                            className="checkbox checkbox-success checkbox-sm text-white"
                                                                        />
                                                                        <label
                                                                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                            className="ml-3 min-w-0 flex-1 text-gray-500"
                                                                        >
                                                                            {option.label}
                                                                        </label>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </Disclosure.Panel>
                                                    </>
                                                )}
                                            </Disclosure>
                                        ))}
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                <main className="mx-auto container px-4 ">

                    <div className="flex items-baseline justify-end pt-8">


                        <div className="flex items-center gap-4">

                            <div>
                                <select value={itemsPerPage}
                                    onChange={handleItemsPerPageChange}
                                    className="select select-bordered w-full max-w-32 rounded-full">
                                    <option selected disabled>Items</option>
                                    {options?.map((option) => (
                                        <option key={option} value={option}>
                                            {option} items
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <div className="dropdown dropdown-hover  dropdown-end rounded-full">
                                    <div tabIndex={0} role="button" className="btn m-1">Sort
                                        <IoIosArrowDown
                                            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                        {sortOptions?.map((option) => (
                                            <li key={option.name}>
                                                <span onClick={() => handlePriceSort(option.value)}>{option.name}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <button
                                type="button"
                                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                                onClick={() => setMobileFiltersOpen(true)}
                            >
                                <span className="sr-only">Filters</span>
                                <BsFunnel className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>

                    <section aria-labelledby="products-heading" className="pb-24 pt-4">
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className="grid grid-cols-1 gap-x-5 gap-y-10 lg:grid-cols-4">
                            {/* Filters */}
                            <form className="hidden lg:block space-y-5">
                                <div className="border border-gray-200 rounded-lg p-5 pt-4">
                                    <div>
                                        <div className="mb-5">
                                            <h3 className="footer-title capitalize">Categories</h3>
                                            <span className='block mt-2 h-[2px] bg-slate-300 after:block after:h-[3px] after:w-12 after:bg-main'></span>
                                        </div>

                                        <ul role="list" className="space-y-4  text-sm font-medium text-gray-900">
                                            <li className="block cursor-pointer" onClick={() => handleToCategory('')}>
                                                <span>
                                                    All
                                                </span>
                                            </li>
                                            {catData?.map((category) => (
                                                <li key={category.name} className="cursor-pointer" onClick={() => handleToCategory(category._id)}>
                                                    <span>{category.name}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                </div>
                                <div className="border border-gray-200 rounded-lg px-5 pb-5">

                                    {filters?.map((section) => (
                                        <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                                            {({ open }) => (
                                                <>
                                                    <h3 className="-my-3 flow-root">
                                                        <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                            <span className="font-medium text-gray-900">{section.name}</span>
                                                            <span className="ml-6 flex items-center">
                                                                {open ? (
                                                                    <GoDash className="h-5 w-5" aria-hidden="true" />
                                                                ) : (
                                                                    <GoPlus className="h-5 w-5" aria-hidden="true" />
                                                                )}
                                                            </span>
                                                        </Disclosure.Button>
                                                    </h3>
                                                    <Disclosure.Panel className="pt-6">
                                                        <div className="space-y-4">
                                                            {section.options?.map((option, optionIdx) => (
                                                                <div key={option.value} className="flex items-center">
                                                                    <input
                                                                        onChange={() => handleFilter(option.value, section.id)}
                                                                        id={`filter-${section.id}-${optionIdx}`}
                                                                        name={`${section.id}[]`}
                                                                        defaultValue={option.value}
                                                                        type="checkbox"
                                                                        checked={initialFilters[section.id].toString().split(',').includes(option.value)}
                                                                        className="checkbox checkbox-success checkbox-sm text-white"
                                                                    />
                                                                    <label
                                                                        htmlFor={`filter-${section.id}-${optionIdx}`}
                                                                        className="ml-3 text-sm text-gray-600"
                                                                    >
                                                                        {option.label}
                                                                    </label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </Disclosure.Panel>
                                                </>
                                            )}
                                        </Disclosure>
                                    ))}
                                    {singleFiler?.map((section) => (
                                        <Disclosure as="div" key={section.id} className="last:border-0 border-b border-gray-200 py-6">
                                            {({ open }) => (
                                                <>
                                                    <h3 className="-my-3 flow-root">
                                                        <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                            <span className="font-medium text-gray-900">{section.name}</span>
                                                            <span className="ml-6 flex items-center">
                                                                {open ? (
                                                                    <GoDash className="h-5 w-5" aria-hidden="true" />
                                                                ) : (
                                                                    <GoPlus className="h-5 w-5" aria-hidden="true" />
                                                                )}
                                                            </span>
                                                        </Disclosure.Button>
                                                    </h3>
                                                    <Disclosure.Panel className="pt-6">
                                                        <div className="space-y-4">
                                                            {section.options?.map((option, optionIdx) => (
                                                                <div key={option.value} className="flex items-center">
                                                                    <input
                                                                        onChange={(e) => handleRadioFilter(e, section.id)}
                                                                        id={`filter-${section.id}-${optionIdx}`}
                                                                        name={`${section.id}[]`}
                                                                        defaultValue={option.value}
                                                                        type="radio"
                                                                        checked={initialFilters[section.id]?.includes(option.value)}
                                                                        className="radio radio-success radio-sm	 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                    />
                                                                    <label
                                                                        htmlFor={`filter-${section.id}-${optionIdx}`}
                                                                        className="ml-3 text-sm text-gray-600"
                                                                    >
                                                                        {option.label}
                                                                    </label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </Disclosure.Panel>
                                                </>
                                            )}
                                        </Disclosure>
                                    ))}
                                </div>

                                <div className="border border-gray-200 rounded-lg p-5 space-y-7">
                                    <h4 className='font-medium text-lg/tight uppercase'>
                                        New Products
                                        <span className='block mt-4 h-[1px] bg-slate-300 after:block after:h-[3px] after:w-12 after:bg-main'></span>
                                    </h4>
                                    <div className="space-y-6">
                                        {loading ? (
                                            <SkeletonListCard count={3} />
                                        ) : !error ? (
                                            data && data?.products?.slice(0, 3)?.map((item, id) => (
                                                <Fragment key={id}>
                                                    <ListProductCard item={item} />
                                                </Fragment>
                                            ))
                                        ) : (<h2 className='col-span-3 text-center text-xl'>Opps!! <br />Server Error</h2>)}
                                    </div>
                                </div>

                                <div className="rounded-lg">
                                    <article className="relative overflow-hidden h-80 rounded-lg shadow transition">
                                        <img
                                            alt=""
                                            src="https://wp.alithemes.com/html/evara/evara-frontend/assets/imgs/banner/banner-11.jpg"
                                            className="absolute inset-0 h-full w-full object-cover"
                                        />

                                        <div className="relative  h-full flex items-center">
                                            <div className="p-4 sm:p-6">
                                                <time dateTime="2022-10-10" className="block text-xs text-gray-600"> 10th Oct 2022 </time>

                                                <a href="#">
                                                    <h3 className="mt-0.5 text-xl text-black font-semibold">Save 17% on <br />
                                                        All Items</h3>
                                                </a>

                                                <a href='' className="mt-2 flex justify-start items-center gap-3 line-clamp-3 text-sm/relaxed text-main">
                                                    Shop now
                                                </a>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                            </form>

                            {/* Product grid */}
                            <div className="lg:col-span-3 space-y-">
                                <div className='h-16'>
                                    <p className="text-md font-medium tracking-tight text-gray-900 ">{data?.responseMessage}</p>
                                    <span>
                                        {Location.search &&
                                            <div className='justify-start flex gap-4'>
                                                <button className='link link-hover link-success flex text-xs justify-center items-center' onClick={clearFilter}>
                                                    <IoIosClose size={20} className='mt-1' />
                                                    Clear filter
                                                </button>
                                            </div>
                                        }
                                    </span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                    {loading ? (
                                        <SkeletonCard count={9} />
                                    ) : error ? (
                                        <h2 className='col-span-3 text-center text-xl'>Opps!! <br />
                                            Server Error
                                        </h2>
                                    ) : !data || data.products?.length === 0 ? (
                                        <h1 className='col-span-3 text-center text-xl'>No Product</h1>
                                    ) : (
                                        data.products.map((item, id) => (
                                            <Fragment key={id}>
                                                <ProductCard item={item} />
                                            </Fragment>
                                        ))
                                    )}
                                </div>
                                <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}

export default StorePage;



const ReviewSection = (props) => {
    return (
        <>
            <div className="bg-white py-6">
                <div className="px-0">
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                        {/* <!-- overview - start --> */}
                        <div>
                            <div className="rounded-lg border p-4">
                                <h2 className="mb-3 text-lg font-bold text-gray-800 lg:text-xl">Customer Reviews</h2>

                                <div className="mb-0.5 flex items-center gap-2">
                                    {/* <!-- stars - start --> */}
                                    <div className="rating rating-sm">
                                        <input type="radio" name="rating-5" className="mask mask-star-2 bg-yellow-400" />
                                        <input type="radio" name="rating-5" className="mask mask-star-2 bg-yellow-400" />
                                        <input type="radio" name="rating-5" className="mask mask-star-2 bg-yellow-400" />
                                        <input type="radio" name="rating-5" className="mask mask-star-2 bg-yellow-400" checked />
                                        <input type="radio" name="rating-5" className="mask mask-star-2 bg-yellow-400" />
                                    </div>
                                    {/* <!-- stars - end --> */}

                                    <span className="text-sm font-semibold">4/5</span>
                                </div>

                                <span className="block text-sm text-gray-500">Bases on 27 reviews</span>

                                <div className="my-5 flex flex-col gap-2 border-t border-b py-5">
                                    {/* <!-- star - start --> */}
                                    <div className="flex items-center gap-3">
                                        <span className="w-10 whitespace-nowrap text-right text-sm text-gray-600">5 Star</span>

                                        <div className="flex h-4 flex-1 overflow-hidden rounded bg-gray-200">
                                            <span className="h-full w-3/4 rounded bg-yellow-400"></span>
                                        </div>
                                    </div>
                                    {/* <!-- star - end --> */}

                                    {/* <!-- star - start --> */}
                                    <div className="flex items-center gap-3">
                                        <span className="w-10 whitespace-nowrap text-right text-sm text-gray-600">4 Star</span>

                                        <div className="flex h-4 flex-1 overflow-hidden rounded bg-gray-200">
                                            <span className="h-full w-1/2 rounded bg-yellow-400"></span>
                                        </div>
                                    </div>
                                    {/* <!-- star - end --> */}

                                    {/* <!-- star - start --> */}
                                    <div className="flex items-center gap-3">
                                        <span className="w-10 whitespace-nowrap text-right text-sm text-gray-600">3 Star</span>

                                        <div className="flex h-4 flex-1 overflow-hidden rounded bg-gray-200">
                                            <span className="h-full w-1/6 rounded bg-yellow-400"></span>
                                        </div>
                                    </div>
                                    {/* <!-- star - end --> */}

                                    {/* <!-- star - start --> */}
                                    <div className="flex items-center gap-3">
                                        <span className="w-10 whitespace-nowrap text-right text-sm text-gray-600">2 Star</span>

                                        <div className="flex h-4 flex-1 overflow-hidden rounded bg-gray-200">
                                            <span className="h-full w-1/4 rounded bg-yellow-400"></span>
                                        </div>
                                    </div>
                                    {/* <!-- star - end --> */}

                                    {/* <!-- star - start --> */}
                                    <div className="flex items-center gap-3">
                                        <span className="w-10 whitespace-nowrap text-right text-sm text-gray-600">1 Star</span>

                                        <div className="flex h-4 flex-1 overflow-hidden rounded bg-gray-200">
                                            <span className="h-full w-1/12 rounded bg-yellow-400"></span>
                                        </div>
                                    </div>
                                    {/* <!-- star - end --> */}
                                </div>

                                <a href="#" className="block rounded-lg border bg-white px-4 py-2 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:bg-gray-200 md:px-8 md:py-3 md:text-base">Write a review</a>
                            </div>
                        </div>
                        {/* <!-- overview - end --> */}

                        {/* <!-- reviews - start --> */}
                        <div className="lg:col-span-2">
                            <div className="border-b pb-4 md:pb-6">
                                <h2 className="text-lg font-bold text-gray-800 lg:text-xl">Top Reviews</h2>
                            </div>

                            <div className="divide-y">
                                <ReviewCard
                                    name={'Siamur Rahman'}
                                    date={'August 28, 2021'}
                                    msg={'This is a section of some simple filler text, also known as placeholder text. It shares some characteristics of a real written text but is random or otherwise generated. It may be used to display a sample of fonts or generate text for testing.'}
                                />
                                <ReviewCard
                                    name={'Siamur Rahman'}
                                    date={'August 28, 2021'}
                                    msg={'This is a section of some simple filler text, also known as placeholder text. It shares some characteristics of a real written text but is random or otherwise generated. It may be used to display a sample of fonts or generate text for testing.'}
                                />
                                <ReviewCard
                                    name={'Siamur Rahman'}
                                    date={'August 28, 2021'}
                                    msg={'This is a section of some simple filler text, also known as placeholder text. It shares some characteristics of a real written text but is random or otherwise generated. It may be used to display a sample of fonts or generate text for testing.'}
                                />
                            </div>

                            <div className="border-t pt-6 sr-only">
                                <a href="#" className="flex items-center gap-0.5 font-semibold text-indigo-400 transition duration-100 hover:text-indigo-500 active:text-indigo-600">Read all reviews</a>
                            </div>
                        </div>
                        {/* <!-- reviews - end --> */}
                    </div>
                </div>
            </div>
        </>
    );
}
export default ReviewSection;

const ReviewCard = ({ name, date, msg }) => {
    return (<>
        <div className="flex flex-col gap-3 py-4 md:py-8">
            <div className="flex gap-4 items-start">
                <div className="avatar">
                    <div className="w-14 rounded-full">
                        <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="title" />
                    </div>
                </div>
                <div className="">
                    <span className="block text-sm font-bold">{name}</span>
                    <span className="block text-sm text-gray-500">{date}</span>
                    <div className="mt-2">
                        <div className="rating rating-sm">
                            <input type="radio" name="rating-5" className="mask mask-star-2 bg-yellow-400" />
                            <input type="radio" name="rating-5" className="mask mask-star-2 bg-yellow-400" />
                            <input type="radio" name="rating-5" className="mask mask-star-2 bg-yellow-400" />
                            <input type="radio" name="rating-5" className="mask mask-star-2 bg-yellow-400" checked />
                            <input type="radio" name="rating-5" className="mask mask-star-2 bg-yellow-400" />
                        </div>
                    </div>
                </div>
            </div>


            <p className="text-gray-600">{msg}</p>
        </div>
    </>);
}
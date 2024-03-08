const Signup = () => {
    return (
        <>
            <div className="">
                <div className="flex items-center py-1">
                    <div className="w-full p-6">
                        <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-4 sm:p-5">
                                <div className="text-center">
                                    <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Register</h1>
                                </div>

                                <div className="mt-5">
                                    {/* <!-- Form --> */}
                                    <form>
                                        <div className="grid gap-y-2">

                                            <div className="grid grid-cols-2 gap-1">

                                                {/* <!-- Form Group --> */}
                                                <label className="form-control w-full max-w-xs" htmlFor="firstname" >
                                                    <div className="label">
                                                        <span className="label-text">Firstname</span>
                                                    </div>
                                                    <input type="text" id="firstname" name="firstname" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                                                </label>

                                                {/* <!-- End Form Group --> */}

                                                {/* <!-- Form Group --> */}
                                                <label className="form-control w-full max-w-xs" htmlFor="lastname" >
                                                    <div className="label">
                                                        <span className="label-text">Lastname</span>
                                                    </div>
                                                    <input type="text" id="lastname" name="lastname" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                                                </label>

                                                {/* <!-- End Form Group --> */}
                                            </div>
                                            <div className="grid grid-cols-2 gap-1">

                                                {/* <!-- Form Group --> */}
                                                <label className="form-control w-full max-w-xs" htmlFor="username" >
                                                    <div className="label">
                                                        <span className="label-text">Username</span>
                                                    </div>
                                                    <input type="text" id="username" name="username" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                                                </label>

                                                {/* <!-- End Form Group --> */}

                                                {/* <!-- Form Group --> */}
                                                <label className="form-control w-full max-w-xs" htmlFor="email">
                                                    <div className="label">
                                                        <span className="label-text">Email Address</span>
                                                    </div>
                                                    <input type="email" id="email" name="email" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                                                </label>
                                                {/* <!-- End Form Group --> */}

                                            </div>


                                            {/* <!-- Form Group --> */}
                                            <label className="form-control w-full" htmlFor="password" >
                                                <div className="label">
                                                    <span className="label-text">Password</span>
                                                </div>
                                                <input type="password" id="password" name="password" placeholder="Type here" className="input input-bordered w-full" />
                                            </label>

                                            {/* <!-- End Form Group --> */}

                                            {/* <!-- Checkbox --> */}

                                            <div className="form-control">
                                                <label className="label justify-start gap-3 cursor-pointer">
                                                    <input type="checkbox" className="checkbox  checkbox-xs rounded-md" />
                                                    <span className="label-text">I accept the <a className="text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">Terms and Conditions</a></span>
                                                </label>
                                            </div>
                                            {/* <!-- End Checkbox --> */}

                                            <button type="submit" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">Register</button>
                                        </div>
                                    </form>
                                    {/* <!-- End Form --> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Signup;
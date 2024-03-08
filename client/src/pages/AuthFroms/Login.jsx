export default function Login() {
    return (
        <>
            <div class="">
                <div class="flex items-center py-1">
                    <div class="w-full max-w-md p-6">
                        <div class="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
                            <div class="p-4 sm:p-7">
                                <div class="text-center">
                                    <h1 class="block text-2xl font-bold text-gray-800 dark:text-white">Login</h1>
                                </div>

                                <div class="mt-5">
                                    {/* <!-- Form --> */}
                                    <form>
                                        <div class="grid gap-y-4">
                                            {/* <!-- Form Group --> */}
                                            <label className="form-control w-full max-w-xs" htmlFor="email">
                                                <div className="label">
                                                    <span className="label-text">Username or email address</span>
                                                </div>
                                                <input type="email" id="email" name="email" placeholder="Type here" className="input input-bordered w-full max-w-xs" required />
                                            </label>
                                            {/* <!-- End Form Group --> */}

                                            {/* <!-- Form Group --> */}
                                            <label className="form-control w-full max-w-xs" htmlFor="password" >
                                                <div className="label">
                                                    <span className="label-text">Password</span>
                                                </div>
                                                <input type="password" id="password" name="password" placeholder="Type here" className="input input-bordered w-full max-w-xs" required />
                                            </label>
                                            {/* <!-- End Form Group --> */}

                                            {/* <!-- Checkbox --> */}
                                            <div className="form-control">
                                                <label className="label justify-start gap-3 cursor-pointer" htmlFor="remember-me">
                                                    <input id="remember-me" name="remember-me" type="checkbox" className="checkbox  checkbox-xs rounded-md" required />
                                                    <span className="label-text">Remember me</span>
                                                </label>
                                            </div>
                                            {/* <!-- End Checkbox --> */}

                                            <button type="submit" class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">Login</button>
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

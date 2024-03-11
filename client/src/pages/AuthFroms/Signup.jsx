import { Field, Form, Formik } from 'formik';
import { useState } from "react";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';


const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const classes = 'input focus:outline-none input-bordered w-full max-w-xs'
const Signup = () => {
    const [checkbox, setCheckbox] = useState(false);
    const handleConditionCheck = () => {
        setCheckbox(!checkbox);
    }

    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        accept: false,
        username: '',
    }

    const validationCheck = (values) => {
        const errors = {};

        // Validate Email
        if (!values.email) {
            errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }

        // Validate Password
        if (!values.password) {
            errors.password = 'Required';
        } else if (values.password.length < 8) {
            errors.password = 'Password must be at least 8 characters long';
        }

        return errors;
    }

    return (
        <>
            <div className="">
                <div className="flex items-center py-1">
                    <div className="w-full">
                        <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-4 sm:p-5">
                                <div className="text-center">
                                    <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Register</h1>
                                </div>

                                <div className="mt-5">
                                    {/* <!-- Form --> */}
                                    <Formik
                                        initialValues={initialValues}
                                        validate={validationCheck}
                                        onSubmit={async (values) => {
                                            await sleep(500);
                                            toast.success('🦄 Wow so easy!');
                                            alert(JSON.stringify(values, null, 2));
                                        }}
                                    >
                                        {({ errors, isSubmitting, touched }) => (
                                            <Form>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                                                    <label className="form-control w-full max-w-xs" htmlFor="firstName" >
                                                        <div className="label">
                                                            <span className="label-text">First Name</span>
                                                        </div>
                                                        <Field name="firstName" placeholder="Type here" className={classes} />
                                                    </label>
                                                    <label className="form-control w-full max-w-xs" htmlFor="lastName" >
                                                        <div className="label">
                                                            <span className="label-text">Last Name</span>
                                                        </div>
                                                        <Field name="lastName" placeholder="Type here" className={classes} />
                                                    </label>
                                                </div>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">

                                                    {/* <!-- Form Group --> */}
                                                    <label className="form-control w-full max-w-xs" htmlFor="email" >
                                                        <div className="label">
                                                            <span className="label-text">Email</span>
                                                        </div>
                                                        <Field name="email" placeholder="jane@acme.com" type="email" className={classes} />
                                                        {errors.email && touched.email && <div className="text-red-500">{errors.email}</div>}
                                                    </label>
                                                    <label className="form-control w-full max-w-xs" htmlFor="username" >
                                                        <div className="label">
                                                            <span className="label-text">Username</span>
                                                        </div>
                                                        <Field type="text" id="username" name="username" placeholder="username" className={classes} />
                                                    </label>
                                                </div>

                                                {/* <!-- Form Group --> */}
                                                <label className="form-control w-full" htmlFor="password" >
                                                    <div className="label">
                                                        <span className="label-text">Password</span>
                                                    </div>
                                                    <Field type="password" name="password" placeholder="******" className="input focus:outline-none input-bordered w-full" />
                                                    {errors.password && touched.password && <div className="text-red-500">{errors.password}</div>}
                                                </label>
                                                {/* <!-- End Form Group --> */}

                                                {/* <!-- Checkbox --> */}
                                                <div className="form-control my-2 sm:my-4">
                                                    <label className="label justify-start gap-3 cursor-pointer" htmlFor='accept'>
                                                        <Field name="accept" type="checkbox" className="checkbox  checkbox-xs rounded-md" required />
                                                        <span className="label-text">I accept the <Link to='/term' className="text-main decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" >Terms and Conditions</Link></span>
                                                    </label>
                                                </div>
                                                {/* <!-- End Checkbox --> */}

                                                <button type="submit" disabled={isSubmitting} className="btn w-full bg-[#078660] text-white hover:bg-main disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">Register</button>
                                            </Form>
                                        )}
                                    </Formik>
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
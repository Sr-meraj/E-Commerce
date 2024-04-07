import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuthContext } from '../../provider/AuthProvider';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const classes = 'input focus:outline-none input-bordered w-full'


const Login = () => {
    const { Login, error, setUser } = useAuthContext();
    const navigate = useNavigate();
    const location = useLocation();
    const form = location?.state?.pathname || '/';
    const [showPassword, setShowPassword] = useState(false);

    const initialValues = { email: '', password: '', rememberMe: false, }

    console.log(location)
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

    const onSubmit = async (values) => {
        await sleep(500);
        try {
            const result = await Login(values.email, values.password);
            if (result) {
                toast.success('Login successful!');
                // set access token to the localstorage
                localStorage.setItem('access_token', result?.accessToken)
                setUser(result?.user)
                if (result?.user) {
                    navigate('/dashboard', { replace: true })
                } else {
                    navigate(form, { replace: true })
                }
            } else {
                toast.error('Failed to login! Please try again later.');
            }
        } catch (error) {
            toast.error('An error occurred! Please try again later.');
            console.error(error);
        }
    };


    return (
        <>
            <div className="">
                <div className="flex items-center py-1">
                    <div className="w-full max-w-md">
                        <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-4 sm:p-7">
                                <div className="text-center">
                                    <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Login</h1>
                                </div>

                                <div className="mt-5">
                                    <Formik
                                        initialValues={initialValues}
                                        validate={validationCheck}
                                        onSubmit={onSubmit}
                                    >
                                        {({ errors, isSubmitting, touched }) => (
                                            <Form>
                                                <label className="form-control w-full" htmlFor="email" >
                                                    <div className="label">
                                                        <span className="label-text">Email</span>
                                                    </div>
                                                    <Field name="email" placeholder="jane@acme.com" type="email" className={classes} />
                                                    {errors.email && touched.email && <div className="text-red-500">{errors.email}</div>}
                                                </label>
                                                {/* <!-- Form Group --> */}
                                                <label className="form-control w-full" htmlFor="password" >
                                                    <div className="label">
                                                        <span className="label-text">Password</span>
                                                    </div>
                                                    <div className="relative">

                                                        <Field type={`${showPassword ? "text" : 'password'}`} name="password" placeholder="******" className="input focus:outline-none input-bordered w-full" />
                                                        <span className="absolute right-4 top-4">
                                                            {showPassword ? <span className='cursor-pointer' onClick={() => setShowPassword(!showPassword)}><HiOutlineEye /></span> : <span className='cursor-pointer' onClick={() => setShowPassword(!showPassword)}><HiOutlineEyeOff /></span>}
                                                        </span>
                                                        {errors.password && touched.password && <div className="text-red-500">{errors.password}</div>}
                                                    </div>
                                                </label>
                                                {/* <!-- End Form Group --> */}

                                                {/* <!-- Checkbox --> */}
                                                <div className="form-control my-4">
                                                    <label className="label justify-start gap-3 cursor-pointer" htmlFor="rememberMe">
                                                        <Field name="rememberMe" type="checkbox" className="checkbox  checkbox-xs rounded-md"
                                                        />
                                                        <span className="label-text">Remember me</span>
                                                    </label>
                                                </div>
                                                {/* <!-- End Checkbox --> */}

                                                <button type="submit" disabled={isSubmitting} className="btn w-full bg-[#078660] text-white hover:bg-main disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">Login</button>
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

export default Login;

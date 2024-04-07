import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { HiOutlineEyeOff } from "react-icons/hi";
import { HiOutlineEye } from "react-icons/hi2";
import { toast } from "react-toastify";
import { useAuthContext } from "../../../provider/AuthProvider";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const AccountSecurity = (props) => {
    const { ChangePassword, error } = useAuthContext();

    const [showPassword, setShowPassword] = useState(false);
    const initialValues = { oldPassword: '', newPassword: '' }

    const onSubmit = async (values) => {
        await sleep(500);
        try {
            console.log(values.oldPassword, values.newPassword);
            const result = await ChangePassword(values.oldPassword, values.newPassword);
            if (result) {
                toast.success('password change successfully!');
            } else {
                toast.error('Failed to change password! Please try again later.');
            }
        } catch (error) {
            toast.error('An error occurred! Please try again later.');
            console.error(error);
        }
    };
    return (
        <>
            <div className="space-y-5">
                <div className="">
                    <h2 className="card-title">Account Security</h2>
                    <div className="divider"></div>
                </div>

                <div className="">
                    <h2 className="card-title">Reset Password</h2>
                    <p className="text-slate-400">Update your password to a stronger one.</p>
                </div>


                <Formik initialValues={initialValues} onSubmit={onSubmit}>
                    {({ errors, isSubmitting, touched }) => (
                        <Form action="">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="form-control w-full relative" htmlFor="oldPassword" >
                                        <div className="label">
                                            <span className="label-text">Old Password</span>
                                        </div>
                                        <Field id="oldPassword" name="oldPassword" placeholder="********" type={`${showPassword ? "text" : 'password'}`} className="input focus:outline-none input-bordered w-full" />
                                        <span className="absolute right-4 top-[50px]">
                                            {showPassword ? <span className='cursor-pointer' onClick={() => setShowPassword(!showPassword)}><HiOutlineEye /></span> : <span className='cursor-pointer' onClick={() => setShowPassword(!showPassword)}><HiOutlineEyeOff /></span>}
                                        </span>
                                        {errors.oldPassword && touched.oldPassword && <div className="text-red-500">{errors.oldPassword}</div>}
                                    </label>

                                </div>

                                <div>
                                    <label className="form-control w-full relative" htmlFor="newPassword" >
                                        <div className="label">
                                            <span className="label-text">New Password</span>
                                        </div>
                                        <Field name="newPassword" placeholder="********" type={`${showPassword ? "text" : 'password'}`} id="newPassword" className="input focus:outline-none input-bordered w-full" required />
                                        <span className="absolute right-4 top-[50px]">
                                            {showPassword ? <span className='cursor-pointer' onClick={() => setShowPassword(!showPassword)}><HiOutlineEye /></span> : <span className='cursor-pointer' onClick={() => setShowPassword(!showPassword)}><HiOutlineEyeOff /></span>}
                                        </span>
                                        {errors.newPassword && touched.newPassword && <div className="text-red-500">{errors.newPassword}</div>}
                                    </label>
                                </div>
                            </div>
                            <div className="mt-4 flex">
                                <button
                                    type="submit"
                                    className="inline-block rounded-lg bg-main px-5 py-3 font-medium text-white sm:w-auto"
                                    disabled={isSubmitting}
                                >
                                    Reset Password
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
}
export default AccountSecurity;
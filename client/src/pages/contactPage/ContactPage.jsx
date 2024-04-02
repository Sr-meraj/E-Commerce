import { Field, Form, Formik } from "formik";

const ContactPage = () => {
    return (
        <>
            {/*
  Heads up! 👋

  Plugins:
    - @tailwindcss/forms
*/}

            <section className="bg-gray-100">
                <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
                        <div className="lg:col-span-2 lg:py-12">
                            <p className="max-w-xl text-lg">
                                At the same time, the fact that we are wholly owned and totally independent from
                                manufacturer and other group control gives you confidence that we will only recommend what
                                is right for you.
                            </p>

                            <div className="mt-8">
                                <a href="#" className="text-2xl font-bold text-main"> 0151 475 4450 </a>

                                <address className="mt-2 not-italic">282 Kevin Brook, Imogeneborough, CA 58517</address>
                            </div>
                        </div>

                        <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
                            <Formik>
                                <Form action="#" className="space-y-4">
                                    <div>
                                        <label className="form-control w-full" htmlFor="email" >
                                            <div className="label">
                                                <span className="label-text">Name</span>
                                            </div>
                                            <Field placeholder="Name" type="text" id="name" className="input focus:outline-none input-bordered w-full" />
                                        </label>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div>
                                            <label className="form-control w-full" htmlFor="email" >
                                                <div className="label">
                                                    <span className="label-text">Email</span>
                                                </div>
                                                <Field name="email" placeholder="jane@acme.com" type="email" className="input focus:outline-none input-bordered w-full" />
                                            </label>
                                        </div>

                                        <div>
                                            <label className="form-control w-full" htmlFor="email" >
                                                <div className="label">
                                                    <span className="label-text">Phone</span>
                                                </div>
                                                <Field name="phone" placeholder="Phone Number" type="tel" id="phone" className="input focus:outline-none input-bordered w-full" />
                                            </label>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="sr-only" htmlFor="message">Message</label>
                                        <textarea className="textarea w-full textarea-bordered"
                                            placeholder="Message"
                                            rows="8"
                                            id="message"></textarea>

                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="submit"
                                            className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default ContactPage;
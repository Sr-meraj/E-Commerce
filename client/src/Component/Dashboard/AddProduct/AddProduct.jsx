import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { toast } from 'react-toastify';
import useDataFetching from "../../../hook/useDataFatching";
import { useAuthContext } from "../../../provider/AuthProvider";
import Modal from "../../Model/Model";
import Table from "../../Table/Table";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const AddProduct = () => {
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [currentPage, setCurrentPage] = useState(0);
    const { loading, error, currentUser, updateAccountInfo } = useAuthContext();
    const apiUrl = `products?limit=${itemsPerPage}&page=${currentPage}`;


    const { data, loading: isFetching, error: isError } = useDataFetching(apiUrl);
    const totalPages = Math.ceil(data?.totalProducts / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const onSubmit = async (values) => {
        await sleep(500);
        try {
            const result = await updateAccountInfo(values);
            if (result) {
                toast.success('Account Update successful!');
            } else {
                toast.error('Failed to update! Please try again later.');
            }
        } catch (error) {
            toast.error('An error occurred! Please try again later.');
            console.error(error);
        }
    };


    if (error) {
        return <p>{error.message}</p>;
    }
    const initialValues = { title: '', description: '', price: '', stock: '', productImages: [], category: '', subCategory: '', discountedPrice: '', brand: '', sku: '', shortDescription: '' };


    const tableData = data?.products?.map(product => ({
        id: product._id,
        title: product.title,
        category: product.category?.name,
        productImages: product.productImages,
        price: product.price,
        discountedPrice: product.discountedPrice,
        isActive: product.isActive,
    }));


    const tableHeader = ["Id", "Product", "Category", "Price", "Discounted Price"];

    const handleDelete = (id) => {
        // Implement delete functionality
        // Update tableData state accordingly
    };

    const handleEdit = (data) => {
        // Implement edit functionality
    };
    return (
        <div className="space-y-5">
            <div className="flex justify-between items-center border-b-2">
                <h1 className="card-title">Add Product</h1>
                {/* <div className="divider"></div> */}
                <div className="overflow-hidden relative">
                    <Modal title={"Add Product"} id="my_modal_1">
                        <Formik initialValues={initialValues} onSubmit={onSubmit}>
                            {({ errors, isSubmitting, touched, values, handleChange }) => (
                                <Form action="">
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div>
                                            <label className="form-control w-full relative" htmlFor="fullname" >
                                                <div className="label">
                                                    <span className="label-text">Fullname</span>
                                                </div>
                                                <Field id="fullname" name="fullname" value={values.fullname} onChange={handleChange} type="text" className="input focus:outline-none input-bordered w-full" />
                                                {errors.fullname && touched.fullname && <div className="text-red-500">{errors.fullname}</div>}
                                            </label>

                                        </div>

                                        <div>
                                            <label className="form-control w-full relative" htmlFor="email" >
                                                <div className="label">
                                                    <span className="label-text">Email</span>
                                                </div>
                                                <Field id="email" name="email" value={values.email} onChange={handleChange} type="text" className="input focus:outline-none input-bordered w-full" />
                                                {errors.email && touched.email && <div className="text-red-500">{errors.email}</div>}
                                            </label>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <label className="form-control w-full relative" htmlFor="username" >
                                            <div className="label">
                                                <span className="label-text">Username</span>
                                            </div>
                                            <Field id="username" name="username" value={values.username} onChange={handleChange} type="text" className="input focus:outline-none input-bordered w-full" />
                                            {errors.username && touched.username && <div className="text-red-500">{errors.username}</div>}
                                        </label>
                                        <label className="form-control w-full relative" htmlFor="phone" >
                                            <div className="label">
                                                <span className="label-text">Phone Number</span>
                                            </div>
                                            <Field id="phone" name="phone" value={values.phone} onChange={handleChange} type="text" className="input focus:outline-none input-bordered w-full" placeholder="xxxxx xxx xxx" />
                                            {errors.phone && touched.phone && <div className="text-red-500">{errors.phone}</div>}
                                        </label>
                                    </div>
                                    <div className="mt-4 flex">
                                        <button
                                            type="submit"
                                            className="inline-block rounded-lg bg-main px-5 py-3 font-medium text-white sm:w-auto"
                                            disabled={isSubmitting}
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </Modal>
                </div>
            </div>
            {loading && <div className="h-screen flex justify-center items-center"><span className="loading loading-ring loading-lg"></span></div>}
            <Table
                data={tableData}
                header={tableHeader}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
            />
        </div>
    );
}
export default AddProduct;
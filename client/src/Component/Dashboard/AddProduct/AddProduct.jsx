import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { toast } from 'react-toastify';
import useDataFetching from "../../../hook/useDataFatching";
import { useAuthContext } from "../../../provider/AuthProvider";
import { axiosInstance } from "../../../utility/utility";
import Modal from "../../Model/Model";
import ProductManage from "./ProductManage";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const AddProduct = () => {
    const [subCategories, setSubCategories] = useState([]);
    // const apiUrl = `categories`;
    const { data: categories, loading: isCategoryFetching, error: isCategoryError } = useDataFetching('categories');
    const { data: brands, loading: isBrandFetching, error: isBrandError } = useDataFetching('brands');

    const { loading, error, currentUser, updateAccountInfo } = useAuthContext();

    const initialValues = { title: '', description: '', price: '', stock: '', productImages: [], category: '', subCategory: '', discountedPrice: '', brand: '', sku: '', shortDescription: '' };

    // Function to fetch subcategories based on the selected category
    const fetchSubcategories = async (categoryId) => {
        const subCategoriesUrl = `categories/${categoryId}/subcategories`;
        const { data } = await axiosInstance.get(subCategoriesUrl);
        console.log(data.data);
        setSubCategories(data?.data?.subcategories); // Update state with fetched subcategories
    };

    // Handler for category field value change
    const handleCategoryChange = (categoryId, handleChange) => {
        fetchSubcategories(categoryId); // Fetch subcategories when category changes
        // handleChange(); // Call Formik's handleChange to update form values
        handleChange({ target: { name: 'category', value: categoryId } });
    };

    const onSubmit = async (values) => {
        await sleep(500);
        try {
            // const result = await axiosInstance.post('products/create', values);
            const result = values
            if (result) {
                console.log(result);
                toast.success('Account updated successfully!');
            } else {
                toast.error('Failed to update! Please try again later.');
            }
        } catch (error) {
            toast.error('An error occurred! Please try again later.');
            console.error(error);
        }
    };

    return (
        <div className="space-y-5">
            <div className="flex justify-between items-center border-b-2">
                <h1 className="card-title">Add Product</h1>
                <div className="overflow-hidden relative">
                    <Modal title={"Add Product"} id="my_modal_1">
                        <Formik initialValues={initialValues} onSubmit={onSubmit}>
                            {({ errors, isSubmitting, touched, values, handleChange, setFieldValue, setValues }) => (
                                <Form action="">
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div>
                                            <label className="form-control w-full relative" htmlFor="title" >
                                                <div className="label">
                                                    <span className="label-text">Product Title</span>
                                                </div>
                                                <Field id="title" name="title" value={values.title} onChange={handleChange} type="text" className="input focus:outline-none input-bordered w-full" />
                                                {errors.title && touched.title && <div className="text-red-500">{errors.title}</div>}
                                            </label>

                                        </div>

                                        <div>
                                            <label className="form-control w-full relative" htmlFor="sku" >
                                                <div className="label">
                                                    <span className="label-text">SKU</span>
                                                </div>
                                                <Field id="sku" name="sku" value={values.sku} onChange={handleChange} type="text" className="input focus:outline-none input-bordered w-full" />
                                                {errors.sku && touched.sku && <div className="text-red-500">{errors.sku}</div>}
                                            </label>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <label className="form-control w-full relative" htmlFor="category" >
                                            <div className="label">
                                                <span className="label-text">category</span>
                                            </div>
                                            <Field as="select" name="category" className="select select-bordered w-full" value={values.category} onChange={(e) => handleCategoryChange(e.target.value, handleChange)}>
                                                {isCategoryFetching ? "loading" : (
                                                    <>
                                                        <option value="" selected disabled hidden>Select Category</option>
                                                        {categories.map((item) => (
                                                            <option key={item._id} value={item._id}>{item.name}</option>))}
                                                    </>
                                                )}
                                            </Field>
                                            {errors.category && touched.category && <div className="text-red-500">{errors.category}</div>}
                                        </label>
                                        <label className="form-control w-full relative" htmlFor="subCategory" >
                                            <div className="label">
                                                <span className="label-text">Sub category</span>
                                            </div>
                                            <Field as="select" name="subCategory" className="select select-bordered w-full">
                                                {isCategoryFetching ? "loading" : (
                                                    <>
                                                        {subCategories.length === 0 ? (
                                                            <option value="" selected disabled>No Subcategories</option>
                                                        ) : (
                                                            <>
                                                                <option value="" disabled hidden>Select Subcategory</option>
                                                                {subCategories.map((item) => (
                                                                    <option key={item._id} value={item._id}>{item.name}</option>
                                                                ))}
                                                            </>
                                                        )}
                                                    </>
                                                )}
                                            </Field>
                                            {errors.category && touched.category && <div className="text-red-500">{errors.category}</div>}
                                        </label>

                                    </div>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <label className="form-control w-full relative" htmlFor="productImages" >
                                            <div className="label">
                                                <span className="label-text">Product Images</span>
                                            </div>
                                            <input
                                                id="productImages"
                                                name="productImages"
                                                type="file"
                                                className="file-input file-input-bordered w-full"
                                                multiple
                                                accept="image/jpg, image/jpeg"
                                                onChange={(event) => setFieldValue("productImages", event.currentTarget.files)}
                                            />
                                            {errors.productImages && touched.productImages && <div className="text-red-500">{errors.productImages}</div>}
                                        </label>
                                        <label className="form-control w-full relative" htmlFor="brand" >
                                            <div className="label">
                                                <span className="label-text">Brand</span>
                                            </div>
                                            <Field as="select" name="brand" className="select select-bordered w-full" value={values.brand} onChange={handleChange}>
                                                {isBrandFetching ? "loading" : (
                                                    <>
                                                        <option value="" selected disabled hidden>Select brand</option>
                                                        {brands.map((item) => (
                                                            <option key={item._id} value={item._id}>{item.name}</option>))}
                                                    </>
                                                )}
                                            </Field>
                                            {errors.brand && touched.brand && <div className="text-red-500">{errors.brand}</div>}
                                        </label>
                                    </div>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                        <label className="form-control w-full relative" htmlFor="price" >
                                            <div className="label">
                                                <span className="label-text">Price</span>
                                            </div>
                                            <Field id="price" name="price" value={values.price} onChange={handleChange} type="text" className="input focus:outline-none input-bordered w-full" placeholder="xxxxx" />
                                            {errors.price && touched.price && <div className="text-red-500">{errors.price}</div>}
                                        </label>
                                        <label className="form-control w-full relative" htmlFor="discountedPrice" >
                                            <div className="label">
                                                <span className="label-text">Discount Price</span>
                                            </div>
                                            <Field id="discountedPrice" name="discountedPrice" value={values.discountedPrice} onChange={handleChange} type="text" className="input focus:outline-none input-bordered w-full" placeholder="xxxxx" />
                                            {errors.discountedPrice && touched.discountedPrice && <div className="text-red-500">{errors.discountedPrice}</div>}
                                        </label>
                                        <label className="form-control w-full relative" htmlFor="stock" >
                                            <div className="label">
                                                <span className="label-text">Stock</span>
                                            </div>
                                            <Field id="stock" name="stock" value={values.stock} onChange={handleChange} type="text" className="input focus:outline-none input-bordered w-full" placeholder="xxxxx" />
                                            {errors.stock && touched.stock && <div className="text-red-500">{errors.stock}</div>}
                                        </label>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                                        <label className="form-control">
                                            <div className="label">
                                                <span className="label-text">Short description</span>
                                            </div>
                                            <textarea className="textarea textarea-bordered h-44" placeholder="Short description" name="shortDescription" onChange={handleChange}></textarea>
                                        </label>
                                        <label className="form-control">
                                            <div className="label">
                                                <span className="label-text">Description</span>
                                            </div>
                                            <textarea className="textarea textarea-bordered h-44" placeholder="Description" name="description" onChange={handleChange}></textarea>
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
            <ProductManage />
        </div>
    );
}
export default AddProduct;
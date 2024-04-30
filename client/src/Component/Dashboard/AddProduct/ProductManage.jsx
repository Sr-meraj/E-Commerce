import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import useDataMutation from "../../../hook/useDataMutation";
import { axiosInstance } from "../../../utility/utility";
import Pagination from "../../pagination/Pagination";
import Table from "../../Table/Table";

const ProductManage = (props) => {
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [currentPage, setCurrentPage] = useState(0);
    const { deleteData } = useDataMutation();
    const apiUrl = `products?limit=${itemsPerPage}&page=${currentPage}`;

    const fetchProductList = async () => {
        const response = await axiosInstance.get(apiUrl); // Use apiUrl here
        return response.data?.data;
    };

    const { isLoading: isQueryLoading, isError: isQueryError, data: queryData, error: queryError } = useQuery({
        queryKey: ['product'],
        queryFn: fetchProductList,
        config: {
            refetchOnWindowFocus: false, // Disable refetching on window focus
        }
    });

    if (isQueryLoading) {
        return <span>Loading...</span>;
    }

    if (isQueryError) {
        return <span>Error: {queryError.message}</span>;
    }

    const totalPages = Math.ceil(queryData?.totalProducts / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    console.log(queryData);
    const tableData = queryData?.products?.map(product => ({
        id: product._id,
        title: product.title,
        category: product.category?.name,
        productImages: product.productImages,
        price: product.price,
        discountedPrice: product.discountedPrice,
        isActive: product.isActive,
    }));

    const token = localStorage.getItem("access_token");

    const tableHeader = ["Id", "Product", "Category", "Price", "Discounted Price"];

    const handleDelete = async (id) => {
        // Implement delete functionality
        // Update tableData state accordingly
        if (window.confirm('Are you sure to delete this item ?')) {
            try {
                const res = await axiosInstance.delete(`products/delete/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (res.status === 204) {
                    toast.success("Item has been deleted successfully");
                }
                // window.location.reload();
            } catch (error) {
                console.log(error);
                toast.error("Something went wrong!");
            }
        }
    };

    const handleEdit = (data) => {
        // Implement edit functionality
    };
    return (
        <>
            <Table
                data={tableData}
                header={tableHeader}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
            />
            <Pagination totalPages={4} currentPage={2} onPageChange={handlePageChange} />
        </>
    );
}

export default ProductManage;

import { useState } from "react";
import useDataFetching from "../../../hook/useDataFatching";
import Table from "../../Table/Table";

const ProductManage = (props) => {
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [currentPage, setCurrentPage] = useState(0);

    const apiUrl = `products?limit=${itemsPerPage}&page=${currentPage}`;
    const { data, loading: isFetching, error: isError } = useDataFetching(apiUrl);
    const totalPages = Math.ceil(data?.totalProducts / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
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
        <>
            <Table
                data={tableData}
                header={tableHeader}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
            />
        </>
    );
}
export default ProductManage;
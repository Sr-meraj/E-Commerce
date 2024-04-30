import React from 'react';
import { FiEye, FiEyeOff, FiTrash2 } from "react-icons/fi";
import { HiOutlinePencilAlt } from "react-icons/hi";

const TableRow = ({ data, header, handleDelete, handleEdit, rowIndex }) => {
    return (
        <tr>
            {/* {header?.map((column, index) => (
                <th key={index}>{data[column]}</th>
            ))} */}
            <th>{rowIndex}</th>
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={data?.productImages[0]} alt={data.title} />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{data.title}</div>
                    </div>
                </div>
            </td>
            <td>
                {data.category}
            </td>
            <td>
                {data.price}
            </td>
            <td>
                {data.discountedPrice}
            </td>
            <th className="flex flex-wrap gap-3 items-center p-7">
                <button className="" onClick={() => handleDelete(data.id)}>
                    <FiTrash2 />
                </button>
                {data.isActive ? (
                    <button className="">
                        <FiEye />
                    </button>
                ) : (
                    <button className="">
                        <FiEyeOff />
                    </button>
                )}
                <button className="" onClick={() => handleEdit(data)}>
                    <HiOutlinePencilAlt />
                </button>
            </th>
        </tr>
    );
}

const Table = ({ data, header, handleDelete, handleEdit }) => {
    console.log(data);

    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        {header?.map((column, index) => (
                            <th key={index}>{column}</th>
                        ))}
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item, index) => (
                        <TableRow
                            key={index}
                            data={item}
                            header={header}
                            handleDelete={handleDelete}
                            handleEdit={handleEdit}
                            rowIndex={index + 1}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;

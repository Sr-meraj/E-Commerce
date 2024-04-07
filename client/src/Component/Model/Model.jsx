/**
 * The `Modal` component in React creates a modal with a title, content, and close button
 * functionality.
 * @returns The `Modal` component is being returned. It consists of a button that opens a modal when
 * clicked, and the modal itself with a title, content, and a close button.
 */

import React from 'react';


const Modal = ({ id, title, children }) => {
    return (
        <>
            {/* Button to open the modal */}
            <button className="btn btn-active btn-link" onClick={() => document.getElementById(id).showModal()}>{title}</button>
            {/* The modal */}
            <dialog id={id} className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    {/* Modal actions */}
                    <div className="modal-action">
                        {/* <button className="btn" onClick={() => document.getElementById(id).close()}>Close</button> */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById(id).close()}>✕</button>
                    </div>
                    {/* Modal title */}
                    <h3 className="font-bold text-lg">{title}</h3>
                    {/* Modal content */}
                    <div className="modal-content">{children}</div>

                </div>
            </dialog>
        </>
    );
}

export default Modal;

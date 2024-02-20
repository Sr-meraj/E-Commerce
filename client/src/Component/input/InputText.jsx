const InputText = ({ label, ...rest }) => {
    return (
        <>
            <label className="form-control w-full mb-3">
                <div className="label">
                    <span className="label-text">{label}</span>
                </div>
                <input {...rest} className="input input-bordered h-9 focus:outline-none rounded-md w-full input-sm placeholder:text-xs" />
            </label>
        </>
    );
}
export default InputText;
import React  from "react";

function InputField({ label, name, placeholder, type, register }) {
    return(
    <div className="flex justify-between items-center">
        {label && <label htmlFor="input-field">{label}</label>}
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            {...register(name)}
            className="border border-gray-100 h-10 rounded-sm focus:border-gray-500 pl-5 w-2/4"
        />
    </div>
    )
}

export default InputField;
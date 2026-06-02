function Input({type, placeholder, value, setValue}) {
    return (
        <div className="search">
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>

    )
}

export default Input
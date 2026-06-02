function Button({text, handleSubmit}) {
    return (
        <button className="submit-bttn" onClick={handleSubmit}>{text}</button>
    )    
}

export default Button
import { useNavigate, useLocation } from 'react-router-dom'

function NavBar() {

    const navigate = useNavigate();
    const location = useLocation()

    const hideOn = ['/', '/login', '/signup']

    if (hideOn.includes(location.pathname)) return null

    //Get Token
    const token = localStorage.getItem("token")
    const isLoggedIn = !!token

    function handleLogout() {
        localStorage.removeItem("token")
        navigate("/login")
    }

    return (
        <nav className="navbar">
            <p className="navbar-brand" onClick={() => navigate('/')}>
                Address<span>Verify</span>
            </p>
            {isLoggedIn && (
                <button className="submit-bttn" onClick={handleLogout}>Logout</button>
            )}
        </nav>
    )

}

export default NavBar
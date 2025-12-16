import { Link, useNavigate } from "react-router-dom"

export const NavBar = () => {
    const navigate = useNavigate()

    return <ul className="navbar">
        <li className="navbar-item">
            <Link to="/create">Create New Wishlist</Link>
        </li>
        <li className="navbar-item">
            <Link to="/wishlists">View All Wishlists</Link>
        </li>
        <li className="navbar-item">
            <Link to="/profile">Profile</Link>
        </li>
        <li className="navbar-item navbar-logout" >
            <Link
                className="navbar-link" 
                to="" 
                onClick={() => {
                    localStorage.removeItem("wishlist_user")
                    navigate("/", {replace: true})
                }}
                >Logout
            </Link>
        </li>
    </ul>
}
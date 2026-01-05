import { Link, useNavigate } from "react-router-dom"
import './NavBar.css'

export const NavBar = () => {
    const navigate = useNavigate()

    const loggedInUser = JSON.parse(localStorage.getItem("wishlist_user"))
    const userId = loggedInUser?.id

    return <ul className="navbar">
        <li className="navbar-item"></li>
            <Link to="/">Home</Link>
        <li className="navbar-item">
            <Link to="/create_wishlist">Create New Wishlist</Link>
        </li>
        <li className="navbar-item">
            <Link to="/wishlists">View All Wishlists</Link>
        </li>
        <div className="navbar-right-group">

        <li className="navbar-item">
            <Link to={`/profile/${userId}`} className={"profile-link"}>
                {loggedInUser?.avatarUrl && (
                    <img 
                        src={loggedInUser.avatarUrl}
                        alt="Avatar"
                        className="navbar-avatar"
                    />
                )}
            Profile</Link>
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
        </div>
    </ul>
}
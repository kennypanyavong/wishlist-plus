import { useEffect, useState } from "react"
import { getWishlistsByUserId } from "../../services/wishlistService.jsx"
import { Link } from "react-router-dom"
import { getLoggedInUser } from "../auth/Auth.jsx"
import './Wishlist.css'

// define and export Wishlist function
export const Wishlist = () => {
    const [wishlists, setWishlists] = useState([])
    const loggedInUser = getLoggedInUser()
// fetch wishlists from api
    useEffect(() => {
        getWishlistsByUserId(loggedInUser.id).then(setWishlists)
    }, [loggedInUser.id])
// map over the wishlists array and create an element for each wishlist
    return (
        <div className="wishlist-grid-container">
            
                {wishlists.map((wishlist) => {
                    return (
                        <Link 
                            key={wishlist.id} 
                            to={`/wishlists/${wishlist.id}`} 
                            className="wishlist-card">
                        {/* <img
                            src={wishlist.imageUrl}
                            alt={wishlist.name}
                            className="wishlist-card-img"
                        /> */}
                            <header className="glitch" data-text={wishlist.name}>{wishlist.name}</header>
                        </Link>
                    )
                })}
            
        </div>
    )
}
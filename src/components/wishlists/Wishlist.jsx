import { useEffect, useState } from "react"
import { getWishlistsByUserId } from "../../services/wishlistService.jsx"
import { Link } from "react-router-dom"
import { getLoggedInUser } from "../auth/Auth.jsx"

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
        <div>
            <article>
                {wishlists.map((wishlist) => {
                    return (
                        <Link key={wishlist.id} to={`/wishlists/${wishlist.id}`}>
                            <header>{wishlist.name}</header>
                        </Link>
                    )
                })}
            </article>
        </div>
    )
}
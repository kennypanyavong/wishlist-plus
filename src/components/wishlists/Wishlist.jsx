import { useEffect, useState } from "react"
import { getAllWishlists } from "../../services/wishlistService.jsx"
import { Link } from "react-router-dom"

// define and export Wishlist function
export const Wishlist = () => {
    const [wishlists, setWishlists] = useState([])
// fetch wishlists from api
    useEffect(() => {
        getAllWishlists().then((wishlistArray) => {
            setWishlists(wishlistArray)
        })
    }, [])
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
import { useEffect, useState } from "react"
import { getWishlistById, getWishlistGamesById } from "../../services/wishlistService.jsx"
import { Link, useParams } from "react-router-dom"
import { AddGame } from "../forms/AddGame.jsx"


export const ViewWishlist = () => {
    const [wishlistGames, setWishlistGames] = useState([])
    const [wishlist, setWishlist] = useState({})
    const {wishlistId} = useParams()

    useEffect(() => {
        getWishlistGamesById(wishlistId).then((wishlistGamesArray) => {
            setWishlistGames(wishlistGamesArray)
            getWishlistById(wishlistId).then(setWishlist)
        })
    }, [wishlistId])
     
    return (
        <div>
            <h1>{wishlist.name}</h1>
            <article>
                {wishlistGames.map((wishlistGame) => {
                    return (
                        <div key={wishlistGame.id}>
                            <Link to={`/wishlists/${wishlistId}/game/${wishlistGame.game.id}`}>
                            <img src={wishlistGame.game.imageUrl} alt={wishlistGame.game.title} />
                            <p>${wishlistGame.game.price}</p>                         
                            </Link>
                        </div>
                    )
                })}
            </article>
            <div>
                <Link to={`/wishlists/${wishlistId}/add_game`}>
                    <button>
                        Add Game
                    </button>
                </Link>
            </div>
            <div>
                <button>Edit List</button>
            </div>   
        </div>
    )
}
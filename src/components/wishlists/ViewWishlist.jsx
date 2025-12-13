import { useEffect, useState } from "react"
import { getWishlistGamesById } from "../../services/wishlistService.jsx"
import { Link, useParams } from "react-router-dom"


export const ViewWishlist = () => {
    const [wishlistGames, setWishlistGames] = useState([])
    const {wishlistId} = useParams()

    useEffect(() => {
        getWishlistGamesById(wishlistId).then((wishlistGamesArray) => {
            setWishlistGames(wishlistGamesArray)
        })
    }, [wishlistId])
     
    return (
        <div>
            <article>
                {wishlistGames.map((wishlistGame) => {
                    return (
                        <div key={wishlistGame.id}>
                            <Link to={`/wishlists/${wishlistId}/game/${wishlistGame.game.id}`}>
                            <img src={wishlistGame.game.imageUrl} alt={wishlistGame.game.title} />
                            <p>${wishlistGame.game.price}</p>
                            
                            </Link>
                            {/* <header>{wishlistGame.game.title}</header> */}
                        </div>
                    )
                })}
            </article>
            <div>
                <button>Edit List</button>
            </div>   
        </div>
    )
}
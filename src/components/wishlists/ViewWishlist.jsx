import { useEffect, useState } from "react"
import { getWishlistGames } from "../../services/wishlistService.jsx"


export const ViewWishlist = () => {
    const [wishlistGames, setWishlistGames] = useState([])

    useEffect(() => {
        getWishlistGames().then((wishlistGamesArray) => {
            setWishlistGames(wishlistGamesArray)
        })
    }, [])
     
    return (
        <div>
            <article>
                {wishlistGames.map((wishlistGame) => {
                    return (
                        <div key={wishlistGame.id}>
                            {/* <header>{wishlistGame.game.title}</header> */}
                            <img src={wishlistGame.game.imageUrl} alt={wishlistGame.game.title} />
                            <p>${wishlistGame.game.price}</p>
                        </div>
                    )
                })}
            </article>
            <div>
                <btn>Edit List</btn>
            </div>   
        </div>
    )
}
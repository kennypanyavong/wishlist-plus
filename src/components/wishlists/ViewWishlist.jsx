import { useEffect, useState } from "react"
import { getWishlistById, getWishlistGamesById } from "../../services/wishlistService.jsx"
import { Link, Outlet, useParams } from "react-router-dom"
import './ViewWishlist.css'


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
        <div className="view-wishlist-container page-container">
            <h1 className="wishlist-header glitch" data-text={wishlist.name || "Wishlist"}>{wishlist.name}</h1>
            <article className="wishlist-games-grid">
                {wishlistGames.map((wishlistGame) => {
                    return (
                        <div key={wishlistGame.id}>
                            <Link to={`/wishlists/${wishlistId}/game/${wishlistGame.game.id}`}
                            className="wishlist-game-card">
                            <img src={wishlistGame.game.imageUrl} alt={wishlistGame.game.title} />
                            <p className="game-price">${wishlistGame.game.price.toFixed(2)}</p>                         
                            </Link>
                        </div>
                    )
                })}
            </article>
            <div className="wishlist-buttons">
                <Link to={`/wishlists/${wishlistId}/add_game`}>
                    <button className="cyber-btn">
                        Add Game
                    </button>
                </Link>
                <Link to={`edit`}>
                    <button className="cyber-btn">
                        Edit List
                    </button>
                </Link>
                <Link to={`/wishlists`}>
                    <button className="cyber-btn">
                        Back
                    </button>
                </Link>
            </div>
            {/* <div className="wishlist-buttons">
            </div>    */}
            {<Outlet />}
        </div>
    )
}
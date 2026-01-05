import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getGameInfoById, updateGame } from "../../services/gameService"
import { getWishlistGameByGameId, getWishlistsByUserId, updateWishlistGame } from "../../services/wishlistService"
import { getLoggedInUser } from "../auth/Auth"
import './EditGame.css'

export const EditGame = () => {
    const [game, setGame] = useState({
        title: "",
        price: "",
        imageUrl: ""
    })
    const [wishlists, setWishlists] = useState([])
    const [selectedWishlist, setSelectedWishlist] = useState("")
    const [wishlistGame, setWishlistGame] = useState(null)
    const loggedInUser = getLoggedInUser()
    const { gameId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getGameInfoById(gameId).then(setGame)
    }, [gameId])

    useEffect(() => {
        getWishlistsByUserId(loggedInUser.id).then(setWishlists)
    }, [loggedInUser.id])

    useEffect(() => {
        getWishlistGameByGameId(gameId).then((game) => {
            setWishlistGame(game)
            setSelectedWishlist(game.wishlistId ?? "")
        })
    }, [gameId])

    const handleSave = (event) => {
        event.preventDefault()

        if(!game.title.trim()) {
            alert("Title can't be empty")
            return
        }

        const updatedGame = {
            ...game,
            price: Number(game.price),
            id: game.id
        }

        updateGame(updatedGame).then(() => {
            if (!wishlistGame) return

            const newWishlistId = Number(selectedWishlist)

            if (wishlistGame.wishlistId !== newWishlistId)

                return updateWishlistGame({
                    ...wishlistGame,
                     wishlistId: newWishlistId
                    })
        }).then(() => {
            navigate(`/wishlists/${selectedWishlist}`)
    })
}

    return(
        <div className="edit-game-container">
            <form className="edit-game-form">
                <h2 className="glitch" data-text="Edit Game">Edit Game</h2>

                <input 
                    type ="text"
                    value ={game.title}
                    onChange ={(e) => setGame({ ...game, title: e.target.value})}
                />

                <input 
                    type ="number"
                    value ={game.price}
                    onChange ={(e) => setGame({ ...game, price: e.target.value})}
                />

                <input 
                    type ="text"
                    value ={game.imageUrl}
                    onChange ={(e) => setGame({ ...game, imageUrl: e.target.value})}
                />

                <select
                    value={selectedWishlist}
                    onChange= {(e) => setSelectedWishlist(e.target.value)}
                >
                    <option value="">Select a Wishlist</option>
                    {wishlists.map(wishlist => (
                        <option key={wishlist.id} value={wishlist.id}>
                            {wishlist.name}
                    </option>
                    ))}
                </select>
            <div className="button-group">
                <button 
                    type ="button"
                    className="neon-btn"
                    onClick={handleSave}>
                        Save Changes
                </button>
                <button 
                    type ="button"
                    className="neon-btn"
                    onClick={() => navigate(`/wishlists/${selectedWishlist}`)}>
                        Cancel
                </button>
            </div>
            </form>
        </div>
    )

}
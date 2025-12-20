import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { deleteWishlist, getWishlistById, getWishlistGamesById, updateWishlist } from "../../services/wishlistService"
import { deleteGameFromWishlist } from "../../services/gameService"
import './EditWishlist.css'

export const EditWishlist = () => {
    const [wishlist, setWishlist] = useState({})
    const [wishlistGames, setWishlistGames] = useState([])
    const { wishlistId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getWishlistById(wishlistId).then(setWishlist)
        getWishlistGamesById(wishlistId).then(setWishlistGames)
    }, [wishlistId])

    const handleDeleteGame = (wishlistGameId) => {
        const confirmed = window.confirm(
            "Delete game from this wishlist?"
        )

        if (!confirmed) {
            return
        }
        deleteGameFromWishlist(wishlistGameId).then(() => {
            setWishlistGames(previous => previous.filter(game => game.id !== wishlistGameId))
        })
    }

    const handleDeleteWishlist = () => {
        const confirmed = window.confirm(
            "Delete entire wishlist?"
        )

        if (!confirmed) {
            return
        }
        deleteWishlist(wishlistId).then(() => {
            navigate("/wishlists")
            
        })
    }

    const handleSave = () => {
        if (!wishlist.name.trim()) {
            alert("Wishlist name can't be empty")
            return
        }
        updateWishlist(wishlist).then(() => {
            navigate(`/wishlists/${wishlistId}`)
        })
    }
       
    return (
        <div className="edit-wishlist-container">
            <h2>Edit Wishlist</h2>
            <input 
                value={wishlist.name}
                onChange={(e) =>
                    setWishlist({ ...wishlist, name: e.target.value})
                }
            />
            <div className="wishlist-games-grid">
                {wishlistGames.map(wishlistGame => (
                    <div key={wishlistGame.id} className="wishlist-game-card">
                        <img src={wishlistGame.game.imageUrl} alt={wishlistGame.game.title} />
                        <p>{wishlistGame.game.title}</p>
                        <p>${wishlistGame.game.price.toFixed(2)}</p>
                        <button onClick={() => handleDeleteGame(wishlistGame.id)} className="danger">
                            Remove Game
                        </button>
                        
                    </div>
                ))}
            </div>
            <div className="wishlist-buttons">
                <button onClick={() => navigate(`/wishlists/${wishlistId}/add_game`)}>
                    Add Game
                </button>
            
                <button onClick={handleSave}>
                    Save Changes
                </button>
            
                <button onClick={handleDeleteWishlist} className="danger">
                    Delete List
                </button>
            </div>
        </div>
        
    )
}
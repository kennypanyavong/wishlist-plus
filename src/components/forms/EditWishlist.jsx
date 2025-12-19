import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { deleteWishlist, getWishlistById, getWishlistGamesById, updateWishlist } from "../../services/wishlistService"
import { deleteGameFromWishlist } from "../../services/gameService"

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
        <div>
            <h2>Edit Wishlist</h2>
            <input 
                value={wishlist.name}
                onChange={(e) =>
                    setWishlist({ ...wishlist, name: e.target.value})
                }
            />
            <div>
                {wishlistGames.map(wishlistGame => (
                    <div key={wishlistGame.id}>
                        <img src={wishlistGame.game.imageUrl} alt={wishlistGame.game.title} />
                        <p>{wishlistGame.game.title}</p>
                        <p>${wishlistGame.game.price.toFixed(2)}</p>
                        <button onClick={() => handleDeleteGame(wishlistGame.id)}>
                            Remove Game
                        </button>
                        
                    </div>
                ))}
            </div>
            <div>
                <button onClick={() => navigate(`/wishlists/${wishlistId}/add_game`)}>
                    Add Game
                </button>
            </div>
            <div>
                <button onClick={handleSave}>
                    Save Changes
                </button>
            </div>
            <div>
                <button onClick={handleDeleteWishlist}>
                    Delete List
                </button>
            </div>
        </div>
        
    )
}
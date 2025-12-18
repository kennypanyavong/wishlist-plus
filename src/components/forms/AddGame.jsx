import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { addGameToWishlist, createGame } from "../../services/gameService"
import { getLoggedInUser } from "../auth/Auth"
import { getWishlistsByUserId } from "../../services/wishlistService"

export const AddGame = () => {
    const [gameTitle, setGameTitle] = useState("")
    const [gamePrice, setGamePrice] = useState("")
    const [gameUrl, setGameUrl] = useState("")
    const [wishlists, setWishlists] = useState([])
    const [selectedWishlist, setSelectedWishlist] = useState("")
    const { wishlistId } = useParams()
    const loggedInUser = getLoggedInUser()
    const navigate = useNavigate()

    useEffect(() => {
        getWishlistsByUserId(loggedInUser.id).then(setWishlists)
    }, [loggedInUser.id])

    useEffect(() => {
        if (wishlistId) {
            setSelectedWishlist(wishlistId)
        }
    }, [wishlistId])

    const handleSave = (event) => {
        event.preventDefault()
        
                if (!gameTitle.trim()) {
                    alert("Please enter a game title")
                    return
                }
                
                const newGame = {
                    userId: loggedInUser.id,
                    title: gameTitle,
                    price: Number(gamePrice),
                    imageUrl: gameUrl
                }
        
                createGame(newGame).then((createdGame) => {
                    return addGameToWishlist(
                            Number(selectedWishlist),
                            createdGame.id
                        )
                    }).then(() => {navigate(`/wishlists/${selectedWishlist}`)})
                    
                
    }

    return (
        <div>
            <div>
                <form>
                    <h2>Add a Game</h2>
                        <input
                            type="text"
                            value={gameTitle}
                            placeholder= "Enter game title"
                            onChange= {(e) => setGameTitle(e.target.value)}
                        />
                        <input
                            type="number"
                            value={gamePrice}
                            placeholder= "Enter game price"
                            onChange= {(e) => setGamePrice(e.target.value)}
                        />
                        <input
                            type="text"
                            value={gameUrl}
                            placeholder= "Enter image URL"
                            onChange= {(e) => setGameUrl(e.target.value)}
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
                </form>
            </div>
            <div>
                <button type="submit" 
                    onClick={handleSave}
                    >Save
                </button>
            </div>
        </div>
    )
}
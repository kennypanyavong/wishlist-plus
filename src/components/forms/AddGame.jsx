import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { addGameToWishlist, createGame } from "../../services/gameService"
import { getLoggedInUser } from "../auth/Auth"
import { getWishlistsByUserId } from "../../services/wishlistService"
import './AddGame.css'

export const AddGame = () => {
    const [gameTitle, setGameTitle] = useState("")
    const [gamePrice, setGamePrice] = useState("")
    const [gameUrl, setGameUrl] = useState("")
    const [wishlists, setWishlists] = useState([])
    const [selectedWishlist, setSelectedWishlist] = useState("")
    const [searchTerm, setSearchTerm] = useState("")
    const [steamResults, setSteamResults] = useState([])
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

    const handleSteamSearch = (e) => {
        e.preventDefault()
        if (!searchTerm.trim()) return

        console.log("Searching Steam for:", searchTerm)

        fetch(`/steam-search?term=${encodeURIComponent(searchTerm)}&cc=US&l=english`)
            .then(res => res.json())
            .then(data => setSteamResults(data.items || []))
    }

    const handleAddSteamGame = (steamGame) => {
        const newGame = {
            userId: loggedInUser.id,
            title: steamGame.name,
            price: steamGame.price ? steamGame.price.final / 100 : 0,
            imageUrl: steamGame.tiny_image
        }

        createGame(newGame)
            .then((createdGame) => addGameToWishlist(Number(selectedWishlist), createdGame.id))
            .then(() => navigate(`/wishlists/${selectedWishlist}`))
    }

    const handleSave = () => {

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

                console.log("Rendering steamResults:", steamResults)


    return (
        <div className="add-game-container">
            <div>
                <h2>Add games to {wishlists.find(w => w.id === Number(selectedWishlist))?.name || "a Wishlist"} </h2>
                <form onSubmit={handleSteamSearch}>
                    <input
                        type="text"
                        placeholder="Search Steam..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="submit">Search</button>
                </form>

                <div className="steam-results-grid">
                    {steamResults.map((game) => (
                        <div key={game.id} className="steam-game-card">
                            <img src={game.tiny_image} alt={game.name} />
                            <h4>{game.name}</h4>
                            {game.price ? <p>${(game.price.final / 100).toFixed(2)}</p> : <p>Free / N/A</p>}
                            <button onClick={() => handleAddSteamGame(game)}>
                                Add to Wishlist
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <form className="add-game-form">
                    <h2>Couldn't Find What You Were Looking For?</h2> 
                        <p>Add Game Details here!</p>
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
                        <p>Want to add to a different list?</p>
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
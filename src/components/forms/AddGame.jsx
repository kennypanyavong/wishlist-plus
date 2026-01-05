import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { addGameToWishlist, createGame } from "../../services/gameService"
import { getLoggedInUser } from "../auth/Auth"
import { getWishlistGamesById, getWishlistsByUserId } from "../../services/wishlistService"
import './AddGame.css'

export const AddGame = () => {
    const [gameTitle, setGameTitle] = useState("")
    const [gamePrice, setGamePrice] = useState("")
    const [gameUrl, setGameUrl] = useState("")
    const [wishlists, setWishlists] = useState([])
    const [selectedWishlist, setSelectedWishlist] = useState("")
    const [wishlistGames, setWishlistGames] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [steamResults, setSteamResults] = useState([])
    const [noResults, setNoResults] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")
    const { wishlistId } = useParams()
    const loggedInUser = getLoggedInUser()


    useEffect(() => {
        getWishlistsByUserId(loggedInUser.id).then(setWishlists)
    }, [loggedInUser.id])

    useEffect(() => {
        if (wishlistId) {
            setSelectedWishlist(wishlistId)
        }
    }, [wishlistId])

    useEffect(() => {
        if (selectedWishlist) {
            getWishlistGamesById(selectedWishlist).then(setWishlistGames)
        }
    }, [selectedWishlist])

    const isAlreadyAdded = (steamGame) => {
        return wishlistGames.some(wg => wg.game.title.toLowerCase() === steamGame.name.toLowerCase())
    }

    const handleSteamSearch = (e) => {
        e.preventDefault()
        if (!searchTerm.trim()) return
        
        fetch(`/steam-search?term=${encodeURIComponent(searchTerm)}&cc=US&l=english`)
        .then(res => res.json())
        .then(data => {
            const items = data.items || []
                setSteamResults(items)
                setNoResults(items.length === 0)
            })
            
        }

    const handleAddSteamGame = async (steamGame) => {

        if (isAlreadyAdded(steamGame)) {
            window.alert("This game is already in your wishlist.")
            return
        }
        const confirmed = window.confirm(
            `Do you want to add "${steamGame.name}" to this wishlist?`
        )

        if (!confirmed) return

        const newGame = {
            userId: loggedInUser.id,
            title: steamGame.name,
            price: steamGame.price ? steamGame.price.final / 100 : 0,
            imageUrl: steamGame.tiny_image
        }

        const createdGame = await createGame(newGame)
            await addGameToWishlist(Number(selectedWishlist), createdGame.id)
            
            const updatedWishlistGames = await getWishlistGamesById(selectedWishlist)
                setWishlistGames(updatedWishlistGames)
                
            window.alert(`"${steamGame.name}" added to your wishlist!`)
            setSteamResults([])
            setSearchTerm("")
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
                
                createGame(newGame)
                    .then((createGame) =>
                        addGameToWishlist(Number(selectedWishlist), createGame.id)
                    )
                    .then(() => {
                        setSuccessMessage(`"${gameTitle}" added!`)
                        setGameTitle("")
                        setGamePrice("")
                        setGameUrl("")
                    })              
    }



    return (
        <div className="add-game-container">
            {successMessage && (
                <div className="success-message">
                    {successMessage}
                </div>
            )}

            <div>
                <h2>Add games to {wishlists.find(w => w.id === Number(selectedWishlist))?.name || "a Wishlist"} </h2>

                <div className="steam-search-section">
                    <h2>Search the Steam Store</h2>
                    <form onSubmit={handleSteamSearch}>
                        <input
                            type="text"
                            placeholder="Search Steam..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button type="submit">Search</button>
                    </form>
                </div>

                {noResults && (
                    <p className="no-results">
                        No games found. Try another search.
                    </p>
                )}

                <div className="steam-results-grid">
                    {steamResults.map((game) => (
                        <div key={game.id} className="steam-game-card">
                            <img src={game.tiny_image} alt={game.name} />
                            <h4>{game.name}</h4>
                            {game.price ? <p>${(game.price.final / 100).toFixed(2)}</p> : <p>Free / N/A</p>}
                            <button
                                disabled={isAlreadyAdded(game)} 
                                onClick={() => handleAddSteamGame(game)}>
                                {isAlreadyAdded(game) ? "Already Added" : "Add to Wishlist"}           
                            </button>
                            {/* <button onClick={() => handleAddSteamGame(game)}>
                                Add to Wishlist
                            </button> */}
                        </div>
                    ))}
                </div>
            </div>

            <div className="manual-add-section">
                <form className="add-game-form">
                    <h2>Couldn't find it?</h2> 
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
                    >Add this game!
                </button>
            </div>
        </div>
    )
}
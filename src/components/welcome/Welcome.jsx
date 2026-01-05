import { useEffect, useState } from 'react'
import './Welcome.css'
import { getLoggedInUser } from '../auth/Auth'
import { useNavigate } from 'react-router-dom'
import { getWishlistGamesById, getWishlistsByUserId } from '../../services/wishlistService'

export const Welcome = () => {
    const [randomGame, setRandomGame] = useState(null)
    const [loading, setLoading] = useState(true)
    const loggedInUser = getLoggedInUser()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchRandomGame = async () => {
            if (!loggedInUser) {
                setLoading(false)
                return
            }

            const wishlists = await getWishlistsByUserId(loggedInUser.id)

            if (wishlists.length === 0) {
                setLoading(false)
                return
            }

            const allGamesArrays = await Promise.all(
                wishlists.map(w => getWishlistGamesById(w.id))
            )

            const allGames = allGamesArrays.flat().filter(wg => wg.game)

            if (allGames.length === 0) {
                setLoading(false)
                return
            }

            const randomIndex = Math.floor(Math.random() * allGames.length)
            setRandomGame(allGames[randomIndex])
            setLoading(false)
        }

        fetchRandomGame()
    }, [])

    if (loading) {
        return <div className="welcome-container"><p>Loading...</p></div>
    }

    return (
        <div className="welcome-container">
            {randomGame ? (
                <div className="random-game-card">
                    <h2>Featured Game:</h2>
                    <img 
                        src={randomGame.game.imageUrl} 
                        alt={randomGame.game.title} />
                    <h3>{randomGame?.game?.title || "Unknown Game"}</h3>
                    <p>{randomGame?.game?.price ? `$${randomGame.game.price.toFixed(2)}` : "Free / N/A"}</p>
                    
                    <button onClick={() => navigate(`/wishlists/${randomGame.wishlistId}`)}>
                        Go to this wishlist
                    </button>
                </div>
            ) : (
                <article>To get started, create a wishlist!</article>
            )}
        </div>
    )
}
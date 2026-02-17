import { useEffect, useState } from "react"
import { getAllWishlistGames } from "../../services/gameService"
import "./GameWallBackground.css"



export const GameWallBackground = () => {
    const [games, setGames] = useState([])

    useEffect(() => {
        getAllWishlistGames().then(data => {
            const unique = []
            const seen = new Set()

            data.forEach(item => {
                if (item.game && !seen.has(item.game.id)){
                    seen.add(item.game.id)
                    unique.push(item.game)
                }
            })
            setGames(unique)
        })
    }, [])

    return (
        <div className = "game-wall">
            {games.map(game => (
                <img
                    key={game.id}
                    src={game.imageUrl}
                    alt=""
                    className="wall-image"
                />
            ))}
        </div>
    )
}
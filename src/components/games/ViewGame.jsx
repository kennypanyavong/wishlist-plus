import { useEffect, useState } from "react"
import { getGameInfoById } from "../../services/gameService.jsx"
import { Link, useParams } from "react-router-dom"
import './ViewGame.css'

// need to get game by id
export const ViewGame = () => {
    const [gameInfo, setGameInfo] = useState({})
    const {gameId} = useParams()

    useEffect(() => {
        getGameInfoById(gameId).then(setGameInfo)
    }, [gameId])

    return (
        <div className="view-game-container">
            <article className="game-card">            
                <div key={gameInfo.id}>
                    <img src={gameInfo.imageUrl} alt={gameInfo.title} />
                    <header>{gameInfo.title}</header>
                    <p>${gameInfo.price ? gameInfo.price.toFixed(2) : "0.00"}</p>
                    <button>
                        <Link to="edit">
                            Edit
                        </Link>
                    </button>
                </div>              
            </article>
        </div>
    )
}
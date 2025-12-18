import { useEffect, useState } from "react"
import { getGameInfoById } from "../../services/gameService.jsx"
import { useParams } from "react-router-dom"

// need to get game by id
export const ViewGame = () => {
    const [gameInfo, setGameInfo] = useState({})
    const {gameId} = useParams()

    useEffect(() => {
        getGameInfoById(gameId).then(setGameInfo)
    }, [gameId])

    return (
        <div>
            <article>            
                <div key={gameInfo.id}>
                    <img src={gameInfo.imageUrl} alt={gameInfo.title} />
                    <header>{gameInfo.title}</header>
                    <p>${gameInfo.price.toFixed(2)}</p>
                    <button>Edit</button>
                </div>              
            </article>
        </div>
    )
}
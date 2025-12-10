import { useEffect, useState } from "react"
import { getGameInfo } from "../../services/gameService.jsx"

// need to get game by id
export const ViewGame = () => {
    const [gameInfo, setGameInfo] = useState([])

    useEffect(() => {
        getGameInfo().then((gameInfoArray) => {
            setGameInfo(gameInfoArray)
        })
    }, [])

    return (
        <div>
            <article>
                {gameInfo.map((info) => {
                    return (
                        <div key={info.id}>
                            <img src={info.imageUrl} alt={info.title} />
                            <header>{info.title}</header>
                            <p>${info.price}</p>
                            <btn>Edit</btn>
                        </div>
                    )
                })}
            </article>
        </div>
    )
}
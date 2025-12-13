export const getGameInfoById = (gameId) => {
    return fetch(`http://localhost:8088/games/${gameId}`).then((res) => res.json())
}
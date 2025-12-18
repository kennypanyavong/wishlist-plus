export const getGameInfoById = (gameId) => {
    return fetch(`http://localhost:8088/games/${gameId}`).then((res) => res.json())
}

export const createGame = (newGame) => {
    return fetch("http://localhost:8088/games", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newGame)
    }).then((res) => res.json())
}

export const addGameToWishlist = (wishlistId, gameId) => {
    return fetch("http://localhost:8088/wishlistGames", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            wishlistId,
            gameId
        })
    }).then((res) => res.json())
}

export const deleteGameFromWishlist = (wishlistGameId) => {
    return fetch(`http://localhost:8088/wishlistGames/${wishlistGameId}`, {
        method: "DELETE"
        }
    )
}

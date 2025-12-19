export const getWishlistById = (wishlistId) => {
    return fetch(`http://localhost:8088/wishlists/${wishlistId}`).then((res) => res.json())
}

// fetch request hard-coded to return a list, need to update with useParams()
export const getWishlistGamesById = (wishlistId) => {
    return fetch(`http://localhost:8088/wishlistGames?wishlistId=${wishlistId}&_expand=game`).then((res) => res.json())
}

export const getWishlistGameByGameId = (gameId) => {
    return fetch(`http://localhost:8088/wishlistGames?gameId=${gameId}`)
        .then(res => res.json())
        .then(results => results[0])
}

export const getWishlistsByUserId = (userId) => {
    return fetch(`http://localhost:8088/wishlists?userId=${userId}`).then((res) => res.json())
}

export const createWishlist = (newWishlist) => {
    return fetch("http://localhost:8088/wishlists", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newWishlist)
    }).then((res) => res.json())
}

export const updateWishlist = (wishlist) => {
    return fetch(`http://localhost:8088/wishlists/${wishlist.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(wishlist)
    })
}

export const updateWishlistGame = (updatedGame) => {
    return fetch(`http://localhost:8088/wishlistGames/${updatedGame.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedGame)
    }).then((res) => res.json())
}

export const deleteWishlist = (wishlistId) => {
    return fetch(`http://localhost:8088/wishlists/${wishlistId}`, {
        method: "DELETE"
        }
    )
}
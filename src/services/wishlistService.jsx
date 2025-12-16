export const getAllWishlists = () => {
    return fetch("http://localhost:8088/wishlists").then((res) => res.json())
}

// fetch request hard-coded to return a list, need to update with useParams()
export const getWishlistGamesById = (wishlistId) => {
    return fetch(`http://localhost:8088/wishlistGames?wishlistId=${wishlistId}&_expand=game`).then((res) => res.json())
}

export const getWishlistsByUserId = (userId) => {
    return fetch(`http://localhost:8088/wishlists?userId=${userId}`).then((res) => res.json())
}
export const getAllWishlists = () => {
    return fetch("http://localhost:8088/wishlists").then((res) => res.json())
}

// fetch request hard-coded to return a list, need to update with useParams()
export const getWishlistGames = () => {
    return fetch("http://localhost:8088/wishlistGames?wishlistId=1&_expand=game").then((res) => res.json())
}
export const getAllWishlists = () => {
    return fetch("http://localhost:8088/wishlists").then((res) => res.json())
}
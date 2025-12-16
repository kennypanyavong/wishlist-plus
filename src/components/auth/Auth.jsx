export const getLoggedInUser = () => {
    return JSON.parse(localStorage.getItem("wishlist_user"))
}
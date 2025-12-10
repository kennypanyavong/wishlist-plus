import { Login } from "./components/auth/Login.jsx"
import { Register } from "./components/auth/Register.jsx"
import { ViewGame } from "./components/games/ViewGame.jsx"
import { ViewWishlist } from "./components/wishlists/ViewWishlist.jsx"
import { Wishlist } from "./components/wishlists/Wishlist.jsx"

export const App = () => {
  return (
    <>
      <Login />
      <Register />
      <Wishlist />
      <ViewWishlist />
      <ViewGame />
    </>
  )
}
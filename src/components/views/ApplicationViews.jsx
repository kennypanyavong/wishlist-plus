import { Outlet, Route, Routes } from "react-router-dom"
import { Wishlist } from "../wishlists/Wishlist.jsx"
import { ViewWishlist } from "../wishlists/ViewWishlist.jsx"
import { ViewGame } from "../games/ViewGame.jsx"
import { Welcome } from "../welcome/Welcome.jsx"
import { UserProfile } from "../users/UserProfile.jsx"
import { NavBar } from "../nav/NavBar.jsx"
import { EditProfile } from "../forms/EditProfile.jsx"
import { CreateWishlist } from "../forms/CreateWishlist.jsx"
import { AddGame } from "../forms/AddGame.jsx"
import { EditWishlist } from "../forms/EditWishlist.jsx"


export const ApplicationViews = () => {


    return (
        <Routes>
            <Route 
                path="/" 
                element={
                    <>
                        <NavBar/>
                        <Outlet/>
                    </>
                }
            >

                <Route index element={<Welcome />} />
                
                <Route path="create_wishlist">
                    <Route index element={<CreateWishlist/>} />
                </Route>

                <Route path="wishlists">
                    <Route index element={<Wishlist />} />

                    <Route path=":wishlistId">
                        <Route index element={<ViewWishlist />} />
                        <Route path="edit" element={<EditWishlist />} />

                        <Route path="game/:gameId">
                            <Route index element={<ViewGame />} />
                            <Route path="edit" element={<>EditGameForm</>} /> {/* just a fragment */}
                        </Route>

                        <Route path="add_game" element={<AddGame />} />
                    </Route>
                </Route>

                <Route path="profile/:userId" element={<UserProfile />} />
                <Route path="profile/:userId/edit" element={<EditProfile/>} />

            </Route>
        </Routes>
    )
}
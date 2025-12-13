import { Outlet, Route, Routes } from "react-router-dom"
import { Wishlist } from "../wishlists/Wishlist.jsx"
import { ViewWishlist } from "../wishlists/ViewWishlist.jsx"
import { ViewGame } from "../games/ViewGame.jsx"
import { Welcome } from "../welcome/Welcome.jsx"
import { UserProfile } from "../users/UserProfile.jsx"


export const ApplicationViews = () => {


    return <>
        <Routes>
            <Route path="/" element={
                <>
                    <>NavBar</> {/*just a fragment*/}
                    <Outlet/>
                </>
            }/>
                <Route index element={<Welcome />} />
                <Route path="create">
                    <Route index element={<>CreateWishlist</>} /> {/* just a fragment */}
                    <Route path="new_wishlist" element={<>NewWishlistForm</>} /> {/* just a fragment */}
                </Route>
                <Route path="wishlists">
                    <Route index element={<Wishlist />} />
                    <Route path=":wishlistId">
                        <Route index element={<ViewWishlist />} />
                        <Route path="game/:gameId" element={<ViewGame />} />
                        <Route path="game/:gameId/edit" element={<>EditGameForm</>} /> {/* just a fragment */}
                    </Route>
                </Route>
                <Route path="profile">
                    <Route index element={<UserProfile />} /> 
                    <Route path="profile/:userId" element={<>EditProfileForm</>} /> {/* just a fragment */}
                </Route>
        </Routes>
    </>
}
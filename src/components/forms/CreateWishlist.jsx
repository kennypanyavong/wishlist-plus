import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { getLoggedInUser } from "../auth/Auth"
import { createWishlist } from "../../services/wishlistService"
import './CreateWishlist.css'

export const CreateWishlist = () => {
    const [wishlistName, setWishlistName] = useState("")
    const navigate = useNavigate()

    const loggedInUser = getLoggedInUser()

    const handleSave = (event) => {
        event.preventDefault()

        if (!wishlistName.trim()) {
            alert("Please enter a wishlist name")
            return
        }
        
        const newWishlist = {
            userId: loggedInUser.id,
            name: wishlistName
        }

        createWishlist(newWishlist).then((createdWishlist) => {
            navigate(`/wishlists/${createdWishlist.id}`)
        })
    }
 
    return (
        <div className="create-wishlist-container">
            <form className="create-wishlist-form">
            <h2>Create Wishlist</h2>
                <input
                    type ="text"
                    value = {wishlistName} 
                    placeholder="Enter wishlist name"
                    onChange = {(e) => setWishlistName(e.target.value)}
                    required
                />
            </form>
            <div>
                <button type="submit" disabled={!wishlistName.trim()}
                    onClick={handleSave}
                >Create List</button>
            </div>
            <div>
                <button
                    onClick={() => navigate("/")}
                >Cancel</button>
            </div>
        </div>
    )
}
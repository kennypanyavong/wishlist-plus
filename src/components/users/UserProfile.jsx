import { useEffect, useState } from "react"
import { getUserById } from "../../services/userService.jsx"
import { Link, useParams } from "react-router-dom"
import { getWishlistsByUserId } from "../../services/wishlistService.jsx"
import './UserProfile.css'

export const UserProfile = () => {
    const [userProfile, setUserProfile] = useState({})
    const [wishlists, setWishlists] = useState([])
    const { userId } = useParams()

    useEffect(() => {
        getUserById(userId).then(setUserProfile)
        getWishlistsByUserId(userId).then(setWishlists)
    }, [userId])

    return (
        <div className="user-profile-container">
            <article className="user-profile-info">
                <h1>{userProfile?.username}</h1>
                <h2>{wishlists.length} Wishlists</h2>
            </article>
            <Link to={`/profile/${userProfile.id}/edit`}>
                <button>Edit</button>
            </Link>
        </div>
    )
}
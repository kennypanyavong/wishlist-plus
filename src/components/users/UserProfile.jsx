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
        <div className="user-profile-container page-container">
            <article className="user-profile-info">
                {userProfile.avatarUrl && (
                    <img 
                        src={userProfile.avatarUrl}
                        alt={`${userProfile.username}'s avatar`}
                        className="user-avatar neon-avatar"
                    />
                )}
                <h1 className="glitch" data-text={userProfile?.username || "Unknown User"}>
                    {userProfile?.username || "Unknown User"}
                </h1>
                <h2 className="glitch" data-text={`${wishlists.length} Wishlists`}>
                    {wishlists.length} Wishlists
                </h2>
            </article>
            <Link to={`/profile/${userProfile.id}/edit`}>
                <button className="cyber-btn">Edit</button>
            </Link>
        </div>
    )
}
// import { useEffect, useState } from "react"
// import { getLoggedInUser } from "../auth/Auth"
// import { getWishlistsByUserId } from "../../services/wishlistService"
// import './SteamSearch.css'

// export const SteamSearch = () => {
//     const [results, setResults] = useState([])
//     const [wishlists, setWishlists] = useState([])
//     const [selectedWishlist, setSelectedWishlist] = useState("")
//     const [loading, setLoading] = useState(false)
//     const [error, setError] = useState(null)
//     const [searchTerm, setSearchTerm] = useState("")
//     const loggedInUser = getLoggedInUser()

//     useEffect(() => {
//         getWishlistsByUserId(loggedInUser.id).then(setWishlists)
//     }, [loggedInUser.id])

//     const handleSearch = async (e) => {
//         e.preventDefault()
//         if (!searchTerm.trim()) return

//         setLoading(true)
//         setError(null)

//         try {
//             const res = await fetch(`/steam/api/storesearch/?term=${encodeURIComponent(searchTerm)}&cc=US&l=english`)
//             if (!res.ok) throw new Error("Failed to fetch Steam data")
//             const data = await res.json()
//             setResults(data.item || [])
//         } catch (err) {
//             setError(err.message)
//         } finally {
//             setLoading(false)
//         }
        
//     }

//     const handleAddGame = (steamGame) => {

//     }

//     return (
//         <div>

//         </div>
//     )
// }
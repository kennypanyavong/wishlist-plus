import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getUserById, updateUser } from "../../services/userService"
import { getLoggedInUser } from "../auth/Auth"

export const EditProfile = () => {
    const { userId } = useParams()
    const [ user, setUser] = useState({})

    const loggedInUser = getLoggedInUser()

    const navigate = useNavigate()

    useEffect(() => {
        getUserById(userId).then(setUser)
    }, [userId])

    const handleSave = (event) => {
        event.preventDefault()

        const editedUser = {
            id: user.id,
            username: user.username,
            email: user.email
        }

        updateUser(editedUser).then(() => {
            navigate(`/profile/${loggedInUser.id}`)
        })
    } 

    const handleInputChange = (event) => {
        const stateCopy = { ...user }
        stateCopy[event.target.name] = event.target.value
        setUser(stateCopy)
    }

    return (
        <form onSubmit={handleSave}>
            <input 
                name="username"
                value={user.username || ""}
                onChange={handleInputChange}
            />
            <input
                name="email"
                value={user.email || ""}
                onChange={handleInputChange}
            />
                <div className="form-group">
                    <button 
                        className="form-btn btn-primary" 
                        type="submit">
                            Save Changes
                    </button>
                </div>
        </form>

    )
}
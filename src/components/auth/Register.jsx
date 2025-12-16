import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { createUser, getUserByEmail } from "../../services/userService.jsx"

export const Register = () => {
    const [user, setUser] = useState({
        username: "",
        email: ""
    })
    const navigate = useNavigate()

    const registerNewUser = () => {
        createUser(user).then((createdUser) => {
            if (createdUser.id) {
                localStorage.setItem(
                    "wishlist_user",
                    JSON.stringify({
                        id: createdUser.id,
                    })
                )
                navigate("/")
            }
        })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        getUserByEmail(user.email).then((response) => {
            if (response.length > 0) {
                window.alert("Account with that email address already exists")
            } else {
                registerNewUser()
            }
        })
    }

    const updateUser = (evt) => {
        const copy = { ...user }
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }

    return (
        <main style={{ textAlign: "center" }}>
      <form className="form-login" onSubmit={handleRegister}>
        <h1>Wishlist+</h1>
        <h2>CREATE ACCOUNT</h2>
        <fieldset>
          <div className="form-group">
            <input
              onChange={updateUser}
              type="text"
              id="username"
              className="form-control"
              placeholder="Username"
              required
              autoFocus
            />
          </div>
        </fieldset>

        <fieldset>
          <div className="form-group">
            <input
              onChange={updateUser}
              type="email"
              id="email"
              className="form-control"
              placeholder="Email address"
              required
            />
          </div>
        </fieldset>

        <fieldset>
          <div className="form-group">
            <button className="login-btn btn-info" type="submit">
              CREATE ACCOUNT
            </button>
          </div>
        </fieldset>
      </form>
      <div>
        Have an account? 
        <Link to="/login" >LOG IN</Link>
      </div>
    </main>
    )
}
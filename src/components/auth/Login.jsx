import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getUserByEmail } from "../../services/userService.jsx"
import './Login.css'

export const Login = () => {
    const [email, setEmail] = useState("")
    const navigate= useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        getUserByEmail(email).then((foundUsers) => {
            if (foundUsers.length === 1) {
                const user = foundUsers[0]
                localStorage.setItem(
                   "wishlist_user",
                   JSON.stringify({
                    id: user.id
                   }) 
                )

                navigate("/")
            } else {
                window.alert("Invalid login")
            }
        })
    }

    return (
        <main className="container-login">
      <section>
        <form className="form-login" onSubmit={handleLogin}>
          <h1>Wishlist+</h1>
          <h2>Log in</h2>
          <fieldset>
            <div className="form-group">
              <input
                type="email"
                value={email}
                onChange={(evt) => setEmail(evt.target.value)}
                className="form-control"
                placeholder="Email address"
                required
                autoFocus
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <button className="login-btn btn-info" type="submit">
                LOG IN
              </button>
            </div>
          </fieldset>
        </form>
      </section>
      <section>
        <Link to="/register">Create Account</Link>
      </section>
    </main>
    )
}
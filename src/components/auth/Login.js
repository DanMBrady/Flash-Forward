import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import newLogo from "../photos/newLogo.png"
import "./Login.css"

export const Login = () => {
    const [email, set] = useState("")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("flash_user", JSON.stringify({
                        id: user.id,
                       admin: user.isAdmin
                    }))

                    navigate("/")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    return <article className="loginFull">
        <section className="loginMain">
                <form className="formLogin" onSubmit={handleLogin}>
                    <div className="topLogin">
                    <img className="loginIm"src={newLogo}></img>
                    </div>
                    <div className="midLogin">
                        
                    <h2>Login Form</h2>
                    <fieldset className="green">
                        <label htmlFor="inputEmail"></label>
                        <input type="email"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset className="green">
                        <button className="loginButton"type="submit">
                            Login
                        </button>
                    </fieldset>
                    </div>
                </form>
            <section className="link--register">Not a member yet?
                <Link className="registerLink"to="/register"> Signup now</Link>
            </section>
        </section>
        </article>
    
}


import { useState } from "react"
import { useNavigate } from "react-router-dom"
import newLogo from "../photos/newLogo.png"
import "./Login.css"

export const Register = (props) => {
    const [customer, setCustomer] = useState({
        email: "",
        fullName: "",
        userName:"",
        isAdmin: false,
        isSuperAdmin:false,
    })
    let navigate = useNavigate()

    const registerNewUser = () => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customer)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("flash_user", JSON.stringify({
                        id: createdUser.id,
                        staff: createdUser.isStaff
                    }))

                    navigate("/")
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/users?email=${customer.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }

    const updateCustomer = (evt) => {
        const copy = {...customer}
        copy[evt.target.id] = evt.target.value
        setCustomer(copy)
    }

    return <article className="loginFull">
       <section className="registerMain">
            <form className="form--login" onSubmit={handleRegister}>
            <div className="topLogin">
            <img className="loginIm"src={newLogo}></img>
            </div>
            <h2>Register Form</h2>
                <fieldset className="green">
                    <label htmlFor="fullName"></label>
                    <input onChange={updateCustomer}
                           type="text" id="fullName" className="form-control"
                           placeholder="Full name" required autoFocus />
                </fieldset>
                <fieldset className="green">
                    <label htmlFor="email"></label>
                    <input onChange={updateCustomer}
                        type="userName" id="userName" className="form-control"
                        placeholder="Username" required />
                </fieldset>
                <fieldset className="green">
                    <label htmlFor="email"></label>
                    <input onChange={updateCustomer}
                        type="userName" id="email" className="form-control"
                        placeholder="Email address" required />
                </fieldset>
                <fieldset className="green">
                    <button className="registerButton" type="submit"> Register </button>
                </fieldset>
            </form>
        </section>
   </article>
}


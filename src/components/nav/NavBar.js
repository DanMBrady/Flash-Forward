import { Link, useNavigate } from "react-router-dom"
import logo from "../photos/logo.png"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
             <li className="navbarS">
             <Link className="navbarB" to="/"> <img className="logo"src ={logo}/></Link>
            </li>
            <li className="navbarS">
                <button className="navbarB"onClick={() => navigate(`/community`)}>Community Library</button>
            </li>
            <li className="navbarS">
            <button className="navbarB"onClick={() => navigate(`/library`)}> Library</button>
             </li>
            {
                localStorage.getItem("honey_user")
                    ? <li className="navbar__item navbar__logout">
                        <button className="" to="" onClick={() => {
                            localStorage.removeItem("honey_user")
                            navigate("/", {replace: true})
                        }}>Logout</button>
                    </li>
                    : ""
            }
        </ul>
    )
}


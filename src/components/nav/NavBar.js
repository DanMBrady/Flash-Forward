import { Link, useNavigate } from "react-router-dom"
import logo from "../photos/logo.png"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">Home</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/community">Community Library</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/library">Library</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link fav" to="/favorites">Favorites</Link>
            </li>
            {
                localStorage.getItem("honey_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link log" to="" onClick={() => {
                            localStorage.removeItem("honey_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}


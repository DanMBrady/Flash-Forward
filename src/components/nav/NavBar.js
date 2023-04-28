import { Link, useNavigate } from "react-router-dom"
import logo from "../photos/logo.png"
import newLogo from "../photos/newLogo.png"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()
    const localFlashUser = localStorage.getItem("flash_user")
    const flashUserObject = JSON.parse(localFlashUser)

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="" to="/"><img className="logoF"src={newLogo}></img></Link>
            </li>
            <div className="navStart">
            <li >
                <Link className="navbar__link" to="/community">Community</Link>
            </li>
            <li >
                <Link className="navbar__link spaceHead" to="/library">Library</Link>
            </li>
            
            <li >
                <Link className="navbar__link spaceHead" to="/favorites">Favorites</Link>
            </li>
            {
                (flashUserObject.superAdmin) ?  <li >
                <Link className="navbar__link spaceHead" to="/users">Users</Link>
            </li> : ""
            }
            </div>
            {
                localStorage.getItem("flash_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link log" to="" onClick={() => {
                            localStorage.removeItem("flash_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
            
        </ul>
    )
}


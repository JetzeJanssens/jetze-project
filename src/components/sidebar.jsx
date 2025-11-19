import { Link, NavLink } from "react-router-dom"
import "../style/sidebar.css"
import logo from "../assets/GenebosFM.png"
import {supabase} from "../supabaseClient.js";



export default function Sidebar() {
    async function signOut() {
        const {error} = await supabase.auth.signOut()
    }
    return (
        <aside className="sidebar">
            <p className="betaTag">Beta</p>
            <img className="image" src={logo} alt=""/>

            <nav>
                <ul>
                    <li>
                        <NavLink
                            to="/app"
                            end // belangrijk voor index routes!
                            className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
                        >
                            Home
                        </NavLink>

                    </li>
                    <li>
                        <NavLink
                            to="/app/profile"
                            className={({ isActive }) =>
                                isActive ? "nav-item active" : "nav-item"
                            }
                        >
                            Profile
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <button onClick={signOut}>Uitloggen</button>
            <p className="version">Version: 0.0.1</p>
        </aside>
    )
}

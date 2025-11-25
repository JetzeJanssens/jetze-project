import { useState } from "react"
import {Link} from "react-router-dom"
import { supabase } from "../supabaseClient.js"
import "../style/login.css"
import logo from "../assets/ZVKLogo.png"


export default function Login({ onLogin, showRegister }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const signIn = async (e) => {
        e.preventDefault() // voorkomt dat de pagina refresh bij enter
        setLoading(true)
        setErrorMessage("")
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        setLoading(false)

        if (error) setErrorMessage(error.message)
        else onLogin(data.user)
    }

    return (
        <div className="login-container">
            <div className="login-box">
                <img className="logo" src={logo} alt="logo"/>
                <h2>Login</h2>
                <form onSubmit={signIn}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Wachtwoord"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <button type="submit" disabled={loading}>
                        {loading ? "Even wachten..." : "Inloggen"}
                    </button>
                </form>
                <p>
                    Nog geen account?{" "}
                    <Link to="/register" className="link">
                        Registreren
                    </Link>
                </p>
            </div>
        </div>
    )
}

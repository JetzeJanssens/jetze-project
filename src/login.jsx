import { useState } from "react"
import { supabase } from "./supabaseClient"
import "./Login.css"

export default function Login({ onLogin, showRegister }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("") // <-- nieuwe state

    const signIn = async () => {
        setLoading(true)
        setErrorMessage("") // reset foutmelding
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        setLoading(false)

        if (error) setErrorMessage(error.message) // toon fout in de app
        else onLogin(data.user)
    }

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                <h3>TEST</h3>
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
                <button onClick={signIn} disabled={loading}>
                    {loading ? "Even wachten..." : "Inloggen"}
                </button>
                <p>
                    Nog geen account?{" "}
                    <span className="link" onClick={showRegister}>
            Registreren
          </span>
                </p>
            </div>
        </div>
    )
}

import { useState } from "react"
import { supabase } from "../supabaseClient.js"
import "../style/register.css"
import {Link} from "react-router-dom";

export default function Register({ onRegister }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const handleRegister = async () => {
        setLoading(true)
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        })
        setLoading(false)

        if (error) {
            alert(error.message)
        } else {
            alert("Account aangemaakt! Check je e-mail om te bevestigen.")
            onRegister() // bijvoorbeeld redirect naar login
        }
    }

    return (
        <div className="register-container">
            <div className="register-box">
                <h2>Registreren</h2>
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
                <button onClick={handleRegister} disabled={loading}>
                    {loading ? "Even wachten..." : "Registreren"}
                </button>
                <p>Al een account?{" "}
                <Link to="/login" className="link">
                    Inloggen
                </Link>
                </p>
            </div>
        </div>
    )
}

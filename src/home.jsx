import { useState, useEffect } from "react"
import { supabase } from "./supabaseClient"
import "./home.css"

export default function Home({ user }) {
    const [displayName, setDisplayName] = useState(user.user_metadata?.display_name || "")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")

    const updateDisplayName = async () => {
        setLoading(true)
        setMessage("")
        const { data, error } = await supabase.auth.updateUser({
            data: { display_name: displayName }
        })
        setLoading(false)

        if (error) setMessage(error.message)
        else setMessage("Naam succesvol bijgewerkt!")
    }

    const signOut = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) console.error(error)
    }

    return (
        <div className="home-container">
            <div className="home-box">
                <h2>Homepage</h2>
                <p>Email: {user.email}</p>
                <p>User ID: {user.id}</p>

                <div className="form-group">
                    <label>Display Name:</label>
                    <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                    />
                    <button onClick={updateDisplayName} disabled={loading}>
                        {loading ? "Even wachten..." : "Opslaan"}
                    </button>
                </div>

                {message && <div className="status-message">{message}</div>}

                <button onClick={signOut}>Uitloggen</button>
            </div>
        </div>
    )
}

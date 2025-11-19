import { useState } from "react"
import { supabase } from "../supabaseClient"
import Sidebar from "../components/sidebar"
import "../style/home.css"

export default function Profile({ user }) {
    const [displayName, setDisplayName] = useState(user.user_metadata?.display_name || "")
    const [message, setMessage] = useState("")

    const updateDisplayName = async () => {
        const { error } = await supabase.auth.updateUser({ data: { display_name: displayName } })
        if (error) setMessage(error.message)
        else setMessage("Naam succesvol bijgewerkt!")
    }

    return (
        <div className="layout-container">
            <Sidebar user={user} />

            <main className="main-content">
                <h2>Profiel</h2>

                <label>Display Name</label>
                <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />

                <button onClick={updateDisplayName}>Opslaan</button>

                {message && <p>{message}</p>}
            </main>
        </div>
    )
}

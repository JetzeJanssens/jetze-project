import { supabase } from "./supabaseClient"

export default function Home({ user }) {
    const signOut = async () => {
        await supabase.auth.signOut()
    }

    return (
        <div style={{ padding: "2rem" }}>
            <h2>Welkom, {user.email}</h2>
            <button onClick={signOut}>Uitloggen</button>
            <p>Hier komt je homepage content</p>
        </div>
    )
}

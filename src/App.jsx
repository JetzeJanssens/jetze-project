import { useState, useEffect } from "react"
import { supabase } from "./supabaseClient"
import login from "./login"
import register from "./register"
import home from "./home"
import "./App.css"

function App() {
    const [user, setUser] = useState(null)
    const [showRegister, setShowRegister] = useState(false)

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            setUser(data.session?.user || null)
        })

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user || null)
        })

        return () => listener.subscription.unsubscribe()
    }, [])

    if (user) return <home user={user} />

    return showRegister ? (
        <register onRegister={() => setShowRegister(false)} />
    ) : (
        <login onLogin={setUser} showRegister={() => setShowRegister(true)} />
    )
}

export default App

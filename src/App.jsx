import { useState, useEffect } from "react"
import { supabase } from "./supabaseClient"
import Login from "./Login.jsx"
import Register from "./Register.jsx"
import Home from "./Home.jsx"
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

    if (user) return <Home user={user} />

    return showRegister ? (
        <Register onRegister={() => setShowRegister(false)} />
    ) : (
        <Login onLogin={setUser} showRegister={() => setShowRegister(true)} />
    )
}

export default App

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "./supabaseClient"

import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Profile from "./pages/Profile"

import "./app.css"

export default function App() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            setUser(data.session?.user ?? null)
            setLoading(false)
        })

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
        })
        return () => listener.subscription.unsubscribe()
    }, [])

    if (loading) return <p>Even laden...</p>

    return (
        <BrowserRouter>
            <Routes>

                {/* PUBLIC */}
                {!user && (
                    <>
                        <Route path="/login" element={<Login setUser={setUser} />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="*" element={<Navigate to="/login" replace />} />
                    </>
                )}

                {/* PROTECTED */}
                {user && (
                    <>
                        <Route path="/app" element={<Home user={user} />} />
                        <Route path="/app/profile" element={<Profile user={user} />} />
                        <Route path="*" element={<Navigate to="/app" replace />} />
                    </>
                )}

            </Routes>
        </BrowserRouter>
    )
}

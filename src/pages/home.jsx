import Sidebar from "../components/Sidebar"
import "../style/home.css"

export default function Home({ user }) {
    const displayName = user.user_metadata?.display_name || user.email

    return (
        <div className="layout-container">
            <Sidebar user={user} />

            <main className="main-content">
                <h1>Welkom, {displayName}! 👋</h1>
                <p>Fijn dat je bent ingelogd.</p>
                <p>More is coming soon...</p>
            </main>
        </div>
    )
}

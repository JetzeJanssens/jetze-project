import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar.jsx";
import "../style/players.css";
import { supabase } from "../supabaseClient.js";

export default function Players({ user }) {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [newPlayer, setNewPlayer] = useState({ first_name: "", last_name: "" });
    const [editingPlayer, setEditingPlayer] = useState(null);
    const [saving, setSaving] = useState(false);

    // Haal spelers op
    async function fetchPlayers() {
        const { data, error } = await supabase
            .from("players")
            .select("*")
            .order("id", { ascending: true });

        if (error) {
            console.error("Fetch error:", error);
        } else {
            setPlayers(data);
        }

        setLoading(false);
    }

    // Nieuwe speler toevoegen
    async function addPlayer(e) {
        e.preventDefault();
        const { first_name, last_name } = newPlayer;

        if (!first_name.trim() || !last_name.trim()) {
            alert("Vul voornaam en achternaam in.");
            return;
        }

        try {
            setSaving(true);

            const { data, error } = await supabase
                .from("players")
                .insert([
                    {
                        first_name: first_name.trim(),
                        last_name: last_name.trim(),
                    },
                ])
                .select(); // haal direct nieuwe rij terug

            if (error) {
                console.error("Insert error:", error);
                alert("Kon speler niet toevoegen: " + error.message);
                return;
            }

            const inserted = Array.isArray(data) ? data[0] : data;
            setPlayers((prev) => [...prev, inserted]);
            setNewPlayer({ first_name: "", last_name: "" });
        } catch (err) {
            console.error("Unexpected insert error:", err);
        } finally {
            setSaving(false);
        }
    }

    // Speler bewerken
    async function updatePlayer(e) {
        e.preventDefault();

        const { id, first_name, last_name } = editingPlayer;

        const { error } = await supabase
            .from("players")
            .update({
                first_name: first_name.trim(),
                last_name: last_name.trim(),
            })
            .eq("id", id);

        if (error) {
            console.error("Update error:", error);
            alert("Kon speler niet updaten: " + error.message);
            return;
        }

        // pas UI direct aan
        setPlayers((prev) =>
            prev.map((p) => (p.id === id ? editingPlayer : p))
        );

        setEditingPlayer(null);
    }

    // Speler verwijderen
    async function deletePlayer(id) {
        const { error } = await supabase.from("players").delete().eq("id", id);

        if (error) {
            console.error("Delete error:", error);
            alert("Kon speler niet verwijderen: " + error.message);
            return;
        }

        setPlayers((prev) => prev.filter((p) => p.id !== id));
    }

    useEffect(() => {
        fetchPlayers();
    }, []);

    return (
        <div className="layout-container">
            <Sidebar user={user} />

            <main className="main-content">
                <h1>Spelers</h1>

                {/* Form voor toevoegen of bewerken */}
                <form
                    onSubmit={editingPlayer ? updatePlayer : addPlayer}
                    className="player-form"
                >
                    <input
                        type="text"
                        placeholder="Voornaam"
                        value={
                            editingPlayer
                                ? editingPlayer.first_name
                                : newPlayer.first_name
                        }
                        onChange={(e) =>
                            editingPlayer
                                ? setEditingPlayer({
                                    ...editingPlayer,
                                    first_name: e.target.value,
                                })
                                : setNewPlayer({
                                    ...newPlayer,
                                    first_name: e.target.value,
                                })
                        }
                    />

                    <input
                        type="text"
                        placeholder="Achternaam"
                        value={
                            editingPlayer
                                ? editingPlayer.last_name
                                : newPlayer.last_name
                        }
                        onChange={(e) =>
                            editingPlayer
                                ? setEditingPlayer({
                                    ...editingPlayer,
                                    last_name: e.target.value,
                                })
                                : setNewPlayer({
                                    ...newPlayer,
                                    last_name: e.target.value,
                                })
                        }
                    />

                    <button type="submit" disabled={saving}>
                        {editingPlayer
                            ? "Opslaan"
                            : saving
                                ? "Bezig..."
                                : "Toevoegen"}
                    </button>

                    {editingPlayer && (
                        <button type="button" onClick={() => setEditingPlayer(null)}>
                            Annuleren
                        </button>
                    )}
                </form>

                {/* Tabel */}
                {loading ? (
                    <p>Aan het laden...</p>
                ) : (
                    <table className="players-table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Voornaam</th>
                            <th>Achternaam</th>
                            <th>Acties</th>
                        </tr>
                        </thead>
                        <tbody>
                        {players.map((p) => (
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>{p.first_name}</td>
                                <td>{p.last_name}</td>
                                <td>
                                    <button onClick={() => setEditingPlayer(p)}>
                                        Bewerken
                                    </button>
                                    <button onClick={() => deletePlayer(p.id)}>
                                        Verwijderen
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </main>
        </div>
    );
}

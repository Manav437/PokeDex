import { useEffect, useState } from "react";
import "./Body.css"

function Body() {
    const [dark, setDark] = useState(false);
    const [pokemon, setPokemon] = useState("");
    const [result, setResult] = useState(null);
    const [showFront, setShowFront] = useState(true);
    const [loading, setLoading] = useState(false);
    const [customAlert, setCustomAlert] = useState("");


    useEffect(() => {
        document.body.classList.toggle("dark", dark);
    }, [dark])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!pokemon.trim()) {
            setCustomAlert("Please enter a Pokémon name!");
            return;
        }

        setResult(null);
        setLoading(true);
        setCustomAlert("");

        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);
            if (!response.ok) {
                throw new Error("Pokémon not found");
            }
            const data = await response.json();
            setResult(data); // Set the fetched result
            setShowFront(true); // Reset to front image
            setPokemon("")
        } catch (error) {
            setResult(null); // Reset result on error
            setCustomAlert(error.message);
        } finally {
            setLoading(false); // Stop the loading state
        }
    };


    return (
        <div className="body">
            <h1>Search a Pokémon</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter a Pokémon"
                    value={pokemon}
                    onChange={(e) => setPokemon(e.target.value)}
                    disabled={loading}
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Loading..." : "Search"}
                </button>
            </form>

            {customAlert && (
                <div className="custom-alert">
                    {customAlert}
                    <button onClick={() => setCustomAlert("")}>✖</button>
                </div>
            )}

            {loading ? (
                <div className="loader"></div>
            ) : result ? (
                <div className={`pokemon-card ${result.types[0].type.name}`}>
                    <h2>{result.name.toUpperCase()}</h2>
                    <div className="card-main">
                        <div className="img-container" style={{ margin: "0 auto", display: "flex", flexDirection: "column" }}>
                            <img
                                src={showFront ? result.sprites.front_default : result.sprites.back_default}
                                alt={result.name}
                            />
                            <button onClick={() => setShowFront(!showFront)}>
                                {showFront ? "Show Back" : "Show Front"}
                            </button>
                        </div>
                        <div className="info">
                            <p><strong>Type:</strong> {result.types.map(t => t.type.name).join(', ')}</p>
                            <p><strong>Abilities:</strong> {result.abilities.map(a => a.ability.name).join(', ')}</p>
                            <p><strong>Height:</strong> {result.height}</p>
                            <p><strong>Weight:</strong> {result.weight}</p>
                            <p><strong>Base XP:</strong> {result.base_experience}</p>
                        </div>
                    </div>

                    <div className="stats-moves">
                        <div>
                            <strong>Stats:</strong>
                            <ul>
                                {result.stats.map(stat => (
                                    <li key={stat.stat.name}>{stat.stat.name.slice(0, 3)}: {stat.base_stat}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <strong>Moves:</strong>
                            <ul>
                                {result.moves.slice(0, 3).map(move => (
                                    <li key={move.move.name}>{move.move.name}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default Body;

import { useState, useEffect } from "react";

import "./Header.css";

function Header() {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        document.body.classList.toggle("dark", dark);
    }, [dark])

    return (
        <header className="header">
            <div className="logo">
                <img src="/poke-ball.svg" alt="Pokéball" />
                <h1>PokéDex</h1>
            </div>
            <nav className="nav-links">
                <button>Home</button>
                <button>About</button>
                <button>Compare</button>
                <button onClick={() => setDark(!dark)}>
                    {dark ? "Switch to Dark Mode" : "Switch to Light Mode"}
                </button>            </nav>
        </header>
    );
}

export default Header;

import { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Body from './components/Body/Body';
import Footer from './components/Footer/Footer';
import './App.css'

function App() {
	useEffect(() => {
		const starsContainer = document.querySelector(".stars");

		for (let i = 0; i < 100; i++) {
			const star = document.createElement("div");
			star.classList.add("star");
			star.style.left = `${Math.random() * 100}vw`;
			star.style.top = `${Math.random() * -100}vh`;
			star.style.animationDuration = `${3 + Math.random() * 5}s`;
			starsContainer.appendChild(star);
		}
	}, []);

	return (
		<div className='app' style={{ gap: "5px", display: "flex", flexDirection: "column", alignItems: "center" }}>
			<div className="stars"></div>
			<Header />
			<Body />
			<Footer />
		</div>
	)
}

export default App

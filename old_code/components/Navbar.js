import { useState } from "react";

export default function Navbar() {
	const navbarItems = ["#home", "#documentation", "#playground", "#about"];
	const [close, setclose] = useState(false);
	const toggleNav = () => {
		close ? setclose(false) : setclose(true);

		if (!close) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		console.log(close);
	};
	return (
		<header className="navbar">
			<div className="navbar__nav">
				<div className="navbar__title">
					Hunter x <span>Hunter</span> API
				</div>

				<ul className={`navbar__nav-list ${close && "close"}`}>
					{navbarItems.map((item) => (
						<li className="navbar__nav-item" key={item}>
							{item.substring(1)}
						</li>
					))}
				</ul>

				<div
					className={`navbar__burger ${close && "close"}`}
					onClick={toggleNav}
				>
					<span></span>
					<span></span>
				</div>
			</div>
		</header>
	);
}

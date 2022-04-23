export default function Navbar() {
	const navbarItems = ["#home", "#documentation", "#playground", "#about"];

	return (
		<header className="navbar">
			<div>Hunter x Hunter</div>
			<div className="navbar__nav">
				<ul className="navbar__nav-list">
					{navbarItems.map((item) => (
						<li className="navbar__nav-item" key={item}>
							{item}
						</li>
					))}
				</ul>
			</div>
		</header>
	);
}

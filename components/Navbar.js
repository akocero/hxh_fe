export default function Navbar() {
	const navbarItems = ["#home", "#documentation", "#playground", "#about"];

	return (
		<header className="navbar">
			<div className="navbar__nav">
				<div>Hunter x Hunter</div>

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

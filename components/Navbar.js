export default function Navbar() {
	const navbarItems = ["#home", "#documentation", "#playground", "#about"];

	return (
		<header className="navbar">
			<div className="navbar__nav">
				<div className="navbar__title">
					Hunter x <span>Hunter</span> API
				</div>

				<ul className="navbar__nav-list">
					{navbarItems.map((item) => (
						<li className="navbar__nav-item" key={item}>
							{item.substring(1)}
						</li>
					))}
				</ul>
			</div>
		</header>
	);
}

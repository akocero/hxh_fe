import Image from "next/image";

export async function getStaticProps() {
	const res = await fetch("https://hxh-api.herokuapp.com/api/characters");
	const characters = await res.json();

	return {
		props: {
			characters,
		},
	};
}

export default function Home({ characters }) {
	return (
		<main className="wrapper">
			<div className="heading">
				<h1>Hunter x Hunter API</h1>
			</div>

			<div className="character__list">
				<div className="grid">
					{characters.map((item) => (
						<div className="card shadow-sm" key={item._id}>
							<div className="card__img-container">
								<Image
									src={item.image.secure_url}
									width={item.image.width}
									height={item.image.height}
								/>
							</div>
							<div className="card__content">
								<h4>{`${item.name} (${item.nen_type[0]})`}</h4>
								<ul>
									{item.abilities.map((ability) => (
										<li key={ability}>{ability}</li>
									))}
								</ul>
								<p></p>
							</div>
						</div>
					))}
				</div>
			</div>
		</main>
	);
}

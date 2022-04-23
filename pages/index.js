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
			<div className="intro">
				<div className="intro__content">
					<h1 className="heading__1 mb-2">
						THE MOST POPULAR <span>ANIME API</span>
					</h1>
					<p>
						Lorem ipsum, dolor sit amet consectetur adipisicing
						elit. Beatae ducimus facere placeat amet aspernatur
						voluptas iure illum dolores neque sequi?
					</p>
				</div>

				<div className="intro__image-container">
					<Image
						src="/images/intro_img.webp"
						width={300}
						height={429}
					/>
				</div>
			</div>

			<div className="character__list">
				<h2 className="mb-2">Main Characters</h2>
				<div className="card-list">
					{characters.map((item) => (
						<div className="card" key={item._id}>
							<div className="card__img-container">
								<Image
									src={item.image.secure_url}
									width={item.image.width}
									height={item.image.height}
								/>
							</div>
							<div className="card__content">
								<h4>{item.name}</h4>
								<h4>{item.nen_type[0]}</h4>
							</div>
						</div>
					))}
				</div>
			</div>
		</main>
	);
}

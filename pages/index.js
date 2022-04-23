import Image from "next/image";
import Api from "../public/images/api.svg";
import Json from "../public/images/json.svg";
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
			<section className="intro">
				<div className="intro__content">
					{/* <h1 className="heading__1 mb-2">
						The Most Popular <span>Anime API</span>
					</h1> */}

					<h1 className="heading__1 mb-2">
						Explore <br />
						<span>Hunter x Hunter</span> Database API
					</h1>
					<p>
						Lorem ipsum, dolor sit amet consectetur adipisicing
						elit. Beatae ducimus facere placeat amet aspernatur
						voluptas iure illum dolores neque sequi?
					</p>
					<div className="intro__actions mt-4">
						<button className="btn btn--accent">
							Documentation
						</button>
						<button className="btn btn--default">Playground</button>
					</div>
				</div>

				<div className="intro__image-container">
					<Image
						src="/images/intro_img.webp"
						width={300}
						height={429}
					/>
				</div>
			</section>

			<section className="characters">
				<h3 className="heading__3 mb-1">Characters</h3>

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
								{item.also_known_as.length ? (
									<h6 className="card__title">{`${item.name} (${item.also_known_as[0]})`}</h6>
								) : (
									<h6 className="card__title">{item.name}</h6>
								)}

								<h6 className="card__sub-title">
									{item.nen_type.map((nen, i) =>
										i === 0 ? nen : ", " + nen
									)}
								</h6>
							</div>
						</div>
					))}
				</div>
			</section>
			<section className="py-7">
				<div className="api">
					<div className="api__content">
						<h2 className="heading__2 mb-2">
							Adding <span>API key</span> to your request.
						</h2>
						<p>
							Lorem ipsum dolor sit amet consectetur, adipisicing
							elit. Aspernatur, alias et, quisquam enim deserunt
							nulla rem reiciendis quidem distinctio omnis
							explicabo earum.
						</p>

						<button className="btn btn--accent mt-3">
							Documentation
						</button>
					</div>
					<div className="api__image">
						<Api />
					</div>
				</div>
			</section>

			<section className="py-7">
				<div className="api reverse">
					<div className="api__content">
						<h2 className="heading__2 mb-2">
							Detailed <span>JSON</span> Response.
						</h2>
						<p>
							Lorem ipsum dolor sit amet consectetur, adipisicing
							elit. Aspernatur, alias et, quisquam enim deserunt
							nulla rem reiciendis.
						</p>

						<button className="btn btn--default mt-3">
							Playground
						</button>
					</div>
					<div className="api__image">
						<Json />
					</div>
				</div>
			</section>
		</main>
	);
}

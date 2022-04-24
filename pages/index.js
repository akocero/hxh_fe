import Image from "next/image";
import Api from "../public/images/api.svg";
import Json from "../public/images/json.svg";
import StickerCircle from "../public/images/circle.svg";
import StickerTriangle from "../public/images/triangle.svg";
import StickerRectangle from "../public/images/rectangle.svg";
export async function getStaticProps() {
	const res = await fetch("https://hxh-api.herokuapp.com/api/characters");
	const characters = await res.json();

	const res2 = await fetch("https://hxh-api.herokuapp.com/api/groups");
	const groups = await res2.json();

	return {
		props: {
			characters,
			groups,
		},
	};
}

export default function Home({ characters, groups }) {
	return (
		<main className="wrapper">
			<section className="intro">
				<span className="sticker sticker--circle">
					<StickerCircle />
				</span>
				<span className="sticker sticker--rectangle">
					<StickerRectangle />
				</span>
				<span className="sticker sticker--triangle">
					<StickerTriangle />
				</span>
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

				<div className="intro__img">
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
			<section className="py-7" id="api">
				<div className="api">
					<span className="sticker sticker--circle">
						<StickerCircle />
					</span>
					<span className="sticker sticker--rectangle">
						<StickerRectangle />
					</span>
					<span className="sticker sticker--triangle">
						<StickerTriangle />
					</span>
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

			<section className="groups">
				<h3 className="heading__3 mb-1">Groups</h3>

				<div className="groups__list">
					{groups.map((item) => (
						<div className="groups__item" key={item._id}>
							<div className="groups__img">
								<Image
									src={item.image.secure_url}
									width={item.image.width}
									height={item.image.height}
								/>
							</div>
							<div className="groups__content mt-2">
								{item.also_known_as.length ? (
									<h6 className="groups__item--title">{`${item.name} (${item.also_known_as[0]})`}</h6>
								) : (
									<h6 className="groups__item--title">
										{item.name}
									</h6>
								)}

								<h6>{item.classification}</h6>
							</div>
						</div>
					))}
				</div>
			</section>

			<section className="py-7" id="api-reverse">
				<div className="api reverse">
					<span className="sticker sticker--circle">
						<StickerCircle />
					</span>
					<span className="sticker sticker--rectangle">
						<StickerRectangle />
					</span>
					<span className="sticker sticker--triangle">
						<StickerTriangle />
					</span>
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

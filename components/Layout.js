import Navbar from './Navbar';
import Footer from './Footer';
import Head from 'next/head';

export default function Layout({ children }) {
	return (
		<div>
			<Head>
				<title>HxH | Open Source API</title>
				<meta property="og:url" content="https://hxh-api.vercel.app/" />
				<meta property="og:type" content="website" />
				<meta property="og:title" content="Hxh API" />
				<meta name="twitter:card" content="summary" />
				<meta property="og:description" content="Open Source API" />
			</Head>
			<Navbar />

			{children}
			<Footer />
		</div>
	);
}

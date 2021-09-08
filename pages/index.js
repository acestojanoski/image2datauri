import Head from 'next/head';
import {useCallback, useEffect, useRef, useState} from 'react';
import DataURI from '../components/data-uri';
import LoadingOverlay from '../components/loading-overlay';

const IndexPage = () => {
	const urlRef = useRef();
	const [url, setUrl] = useState('');
	const [dataURI, setDataURI] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	// Focus URL input on first render, and after the form is reset
	useEffect(() => {
		if (urlRef.current) {
			urlRef.current.focus();
		}
	}, [dataURI]);

	const handleUrlChange = (event) => {
		setUrl(event.target.value);
	};

	const handleUrlSubmit = (event) => {
		event.preventDefault();

		if (!url) {
			return;
		}

		setIsLoading(true);
		fetch(`/api/convert?url=${encodeURIComponent(url)}`)
			.then(async (response) => {
				const body = await response.json();

				if (response.ok) {
					setDataURI(body.result);
				} else {
					console.error('HTTPError', {response, body});
				}
			})
			.catch((error) => console.error(error))
			.finally(() => setIsLoading(false));
	};

	const handleUpload = (event) => {
		const reader = new FileReader();

		reader.addEventListener('load', () => {
			setDataURI(reader.result);
		});

		reader.readAsDataURL(event.target.files[0]);
	};

	const reset = useCallback(() => {
		setDataURI('');
		setUrl('');
	}, []);

	return (
		<main>
			<Head>
				<title>Convert Image To Data URI</title>
			</Head>

			{isLoading && <LoadingOverlay>Loading...</LoadingOverlay>}

			<section>
				<h1>Convert Image To Data URI</h1>

				{!dataURI && (
					<>
						<form onSubmit={handleUrlSubmit}>
							<input
								ref={urlRef}
								type="url"
								placeholder="Enter your image URL"
								value={url}
								onChange={handleUrlChange}
							/>
						</form>
						<p>or</p>
						<div className="upload-container">
							<input
								type="file"
								accept="image/*"
								capture="environment"
								onChange={handleUpload}
							/>
							<button type="button">Upload Image</button>
						</div>
					</>
				)}

				{dataURI && <DataURI dataURI={dataURI} reset={reset} />}
			</section>

			<aside>
				<nav>
					<a
						href="https://github.com/acestojanoski/image2datauri"
						target="_blank"
						rel="noreferrer"
					>
						GitHub
					</a>
				</nav>
			</aside>

			<style jsx global>{`
				* {
					box-sizing: border-box;
				}

				body {
					margin: 0;
					font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
						'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
						'Droid Sans', 'Helvetica Neue', sans-serif;
					background-color: #282c35;
					color: #fff;
				}

				input:not([type='file']) {
					border: 0;
					border-bottom: 1px solid #444;
					background-color: #282c35;
					color: #fff;
					outline: none;
					padding: 0.6rem 0.9rem;
					width: 100%;
					text-align: center;
				}

				input:not([type='file']):focus {
					border-color: #fff !important;
				}

				button {
					border: none;
					background-color: #282c35;
					color: #b2b2b2;
					font-weight: 400;
					font-size: 14px;
					text-align: center;
					border: 1px solid #444;
					padding: 1rem;
					cursor: pointer;
				}

				button:hover {
					border-color: #fff;
					color: #fff;
				}

				a {
					color: #b2b2b2;
					text-decoration: none;
				}

				a:hover {
					color: #c792ea;
				}
			`}</style>

			<style jsx>{`
				main {
					width: 100vw;
					height: 100vh;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					padding: 1rem;
				}

				section {
					text-align: center;
					min-width: 40%;
					max-width: 100%;
				}

				h1 {
					font-weight: normal;
					font-size: 24px;
					text-align: center;
					margin-bottom: 1rem;
				}

				p {
					font-weight: 400;
					font-size: 14px;
					line-height: 24px;
					text-align: center;
					margin: 1rem auto 1rem auto;
				}

				.upload-container {
					position: relative;
					overflow: hidden;
					display: inline-block;
				}

				.upload-container input[type='file'] {
					position: absolute;
					left: 0;
					top: 0;
					opacity: 0;
					height: 100%;
				}

				aside {
					position: absolute;
					bottom: 1.5rem;
					left: 50vw;
					transform: translateX(-50%);
				}
			`}</style>
		</main>
	);
};

export default IndexPage;

import PropTypes from 'prop-types';
import {useMemo, useState} from 'react';

const DataURI = ({dataURI, reset}) => {
	const [copied, setCopied] = useState(false);

	const copyDataURI = async () => {
		try {
			await navigator.clipboard.writeText(dataURI);

			setCopied(true);
			const timeoutID = setTimeout(() => {
				setCopied(false);
				clearTimeout(timeoutID);
			}, 1000);
		} catch (error) {
			console.error(error);
		}
	};

	const shortenedDataURI = useMemo(() => dataURI.slice(0, 200), [dataURI]);

	return (
		<div>
			<p>{shortenedDataURI} ...</p>
			<button type="button" onClick={copyDataURI}>
				{copied ? 'Copied!' : 'Copy'}
			</button>
			<button type="button" onClick={reset}>
				Reset
			</button>
			<style jsx>{`
				div {
					width: 100%;
					padding: 1rem;
				}

				p {
					word-wrap: break-word;
				}

				button {
					min-width: 100px;
					margin-top: 1rem;
				}

				button:not(:first-child) {
					margin-left: 1rem;
				}
			`}</style>
		</div>
	);
};

DataURI.propTypes = {
	dataURI: PropTypes.string,
	reset: PropTypes.func,
};

export default DataURI;

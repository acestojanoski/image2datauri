import PropTypes from 'prop-types';

const LoadingOverlay = ({children}) => (
	<div>
		{children}
		<style jsx>{`
			div {
				position: absolute;
				top: 0;
				left: 0;
				width: 100vw;
				height: 100vh;
				background-color: rgba(40, 44, 53, 0.9);
				display: flex;
				align-items: center;
				justify-content: center;
				z-index: 999999;
				font-size: 18px;
			}
		`}</style>
	</div>
);

LoadingOverlay.propTypes = {
	children: PropTypes.elementType,
};

export default LoadingOverlay;

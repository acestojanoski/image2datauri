export class FunctionError extends Error {
	constructor({message, statusCode} = {}) {
		super(message);
		this.name = 'FunctionError';
		this.statusCode = statusCode;
	}
}

export const withErrorHandling = (execute) => async (request, response) => {
	try {
		await execute(request, response);
	} catch (error) {
		console.error('error', error);

		response.status(error.statusCode || 500).json({
			message: error.message || 'Internal server error',
		});
	}
};

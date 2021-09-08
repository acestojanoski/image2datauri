import allowedMethods from 'allowed-methods';
import got from 'got';
import {FunctionError, withErrorHandling} from '../../lib/server';

const execute = async (request, response) => {
	const {url} = request.query;

	if (!url) {
		throw new FunctionError({
			statusCode: 400,
			message: '`url` query parameter is missing',
		});
	}

	const {body, headers} = await got(url, {responseType: 'buffer'});

	const base64 = body.toString('base64');
	const contentType = headers['content-type'];

	response.json({
		result: `data:${contentType};base64,${base64}`,
	});
};

const handler = withErrorHandling(execute);

export default allowedMethods(['get'])(handler);

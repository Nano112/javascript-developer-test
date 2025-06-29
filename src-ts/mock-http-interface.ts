import type { HttpResponse, ResponseMessage } from "./types";

const urlPrefix: string = `http://www.smokeballdev.com`;

const urlToResponseLookup: Record<string, string> = {
	[`${urlPrefix}/arnie0`]: "Get to the chopper",
	[`${urlPrefix}/arnie1`]: "MY NAME IS NOT QUAID",
	[`${urlPrefix}/arnie2`]: `What's wrong with Wolfie?`,
};

const httpRequestMockP = (url: string): Promise<string> =>
	new Promise((resolve, reject) => {
		setTimeout(() => {
			const responseData = urlToResponseLookup[url];
			if (responseData) {
				resolve(responseData);
			} else {
				reject(new Error("Your request has been terminated"));
			}
		}, 200);
	});

const httpGet = async (url: string): Promise<HttpResponse> => {
	try {
		const message: string = await httpRequestMockP(url);
		const responseBody: ResponseMessage = { message };
		return {
			status: 200,
			body: JSON.stringify(responseBody),
		};
	} catch (err) {
		const errorMessage = err instanceof Error ? err.message : "Unknown error";
		const errorBody: ResponseMessage = { message: errorMessage };
		return {
			status: 500,
			body: JSON.stringify(errorBody),
		};
	}
};

export { httpGet };

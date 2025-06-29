import { httpGet } from "./mock-http-interface";
import type { ArnieQuoteResult, HttpResponse, ResponseMessage } from "./types";

/**
 * Executes HTTP GET requests on each URL and returns Arnold quotes or failures.
 *
 * @param urls - Array of URLs to request
 * @returns Promise resolving to array of quote/failure objects
 */
const getArnieQuotes = async (urls: string[]): Promise<ArnieQuoteResult[]> => {
	return Promise.all(
		urls.map(async (url: string): Promise<ArnieQuoteResult> => {
			try {
				const response: HttpResponse = await httpGet(url);
				if (response.status === 200) {
					const { message }: ResponseMessage = JSON.parse(response.body);
					return { "Arnie Quote": message };
				} else {
					const errorBody: ResponseMessage = JSON.parse(response.body);
					throw new Error(errorBody?.message || "Unknown error");
				}
			} catch (err) {
				const errorMessage =
					err instanceof Error ? err.message : "Unknown error";
				return { FAILURE: errorMessage };
			}
		})
	);
};

export { getArnieQuotes };

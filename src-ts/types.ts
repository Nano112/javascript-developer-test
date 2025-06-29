export type ArnieQuoteResult = { "Arnie Quote": string } | { FAILURE: string };

export interface HttpResponse {
	status: number;
	body: string;
}

export interface ResponseMessage {
	message: string;
}

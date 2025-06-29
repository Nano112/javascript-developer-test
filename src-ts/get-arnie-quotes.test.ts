import { getArnieQuotes } from "./get-arnie-quotes";

import type { ArnieQuoteResult } from "./types";

const urls: string[] = [
	"http://www.smokeballdev.com/arnie0",
	"http://www.smokeballdev.com/arnie1",
	"http://www.smokeballdev.com/arnie2",
	"http://www.smokeballdev.com/arnie3",
];

test("expect no throws", () => {
	expect.assertions(1);
	expect(async (): Promise<void> => {
		await getArnieQuotes(urls);
	}).not.toThrow();
});

test("responses to be correct", async (): Promise<void> => {
	expect.assertions(5);

	const results: ArnieQuoteResult[] = await getArnieQuotes(urls);

	expect(results.length).toBe(4);

	expect(results[0]).toEqual({ "Arnie Quote": "Get to the chopper" });
	expect(results[1]).toEqual({ "Arnie Quote": "MY NAME IS NOT QUAID" });
	expect(results[2]).toEqual({ "Arnie Quote": `What's wrong with Wolfie?` });
	expect(results[3]).toEqual({ FAILURE: "Your request has been terminated" });
});

test("code to be executed in less than 400ms", async (): Promise<void> => {
	expect.assertions(2);

	const startTime: [number, number] = process.hrtime();
	await getArnieQuotes(urls);
	const [seconds, nanos]: [number, number] = process.hrtime(startTime);

	expect(seconds).toBe(0);
	expect(nanos / 1000 / 1000).toBeLessThan(400);
});

test("handles wrong URLs correctly", async (): Promise<void> => {
	expect.assertions(4);

	const wrongUrls: string[] = [
		"http://www.smokeballdev.com/invalid",
		"http://www.smokeballdev.com/arnie99",
		"http://www.smokeballdev.com/notfound",
	];

	const results: ArnieQuoteResult[] = await getArnieQuotes(wrongUrls);

	expect(results.length).toBe(3);
	expect(results[0]).toEqual({ FAILURE: "Your request has been terminated" });
	expect(results[1]).toEqual({ FAILURE: "Your request has been terminated" });
	expect(results[2]).toEqual({ FAILURE: "Your request has been terminated" });
});
test("handles empty URL array", async (): Promise<void> => {
	expect.assertions(1);

	const results: ArnieQuoteResult[] = await getArnieQuotes([]);
	expect(results).toEqual([]);
});

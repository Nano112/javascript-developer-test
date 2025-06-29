const { httpGet } = require('./mock-http-interface');

/**
 * Executes HTTP GET requests on each URL and returns Arnold quotes or failures.
 * 
 * @param {string[]} urls - Array of URLs to request
 * @returns {Promise<Array<Object>>} Promise resolving to array of quote/failure objects
 */
const getArnieQuotes = async (urls) => {
  return Promise.all(
    urls.map(async (url) => {
      try {
        const response = await httpGet(url);
        if (response.status === 200) {
          const { message } = JSON.parse(response.body);
          return { 'Arnie Quote': message };
        } else {

          throw new Error(JSON.parse(response.body)?.message || 'Unknown error');
        }
      } catch (err) {
        return { 'FAILURE': err.message };
      }
    })
  );
};

module.exports = {
  getArnieQuotes,
};

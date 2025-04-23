// netlify/functions/run-playwright.js
exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "It works!" })
  };
};
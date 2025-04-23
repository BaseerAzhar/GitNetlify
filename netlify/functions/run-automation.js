// netlify/functions/run-automation.js

const { exec } = require("child_process");

exports.handler = async (event, context) => {
    try {
        // Your logic here
        return {
            statusCode: 200,
            body: JSON.stringify({ result: 'The test was successful' })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' })
        };
    }
};

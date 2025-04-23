// .netlify/functions/run-automation.js
const { exec } = require('child_process');

exports.handler = async (event, context) => {
    try {
        // Read test name from query parameters (e.g., "test_example")
        const testName = event.queryStringParameters.test || "defaultTest";

        // Map the test name to the corresponding Python script
        const scriptMap = {
            'test_example': 'test_example.py',
            // Add other tests as needed
        };

        const script = scriptMap[testName];

        if (!script) {
            throw new Error('Test not found');
        }

        // Execute the Python script
        const result = await executePythonScript(script);

        return {
            statusCode: 200,
            body: JSON.stringify({ result }),
            headers: {
                'Access-Control-Allow-Origin': '*',  // Allow all origins (you can restrict this to specific domains)
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            }
        };

    } catch (error) {
        console.error("Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to run the test" }),
            headers: {
                'Access-Control-Allow-Origin': '*',  // Allow all origins (you can restrict this to specific domains)
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            }
        };
    }
};
exports.handler = async (event, context) => {
    if (event.httpMethod === "OPTIONS") {
        return {
            statusCode: 204,  // No content
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            }
        };
    }

    try {
        // Existing code for handling the test request
        // ...
    } catch (error) {
        // Error handling code
        // ...
    }
};

// Helper function to execute Python scripts
const executePythonScript = (scriptName) => {
    return new Promise((resolve, reject) => {
        exec(`python ${scriptName}`, (err, stdout, stderr) => {
            if (err) {
                reject(`Error: ${stderr}`);
            } else {
                resolve(stdout);
            }
        });
    });
};

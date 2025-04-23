const { exec } = require("child_process");

exports.handler = async (event, context) => {
  const { test } = event.queryStringParameters;

  // Map test names to Python scripts
  const testScripts = {
    usa_automation: 'tests/usa_automation.py',
    // Add more test scripts here if needed
  };

  const scriptPath = testScripts[test];

  if (!scriptPath) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Test not found" }),
    };
  }

  try {
    // Run the test script
    const output = await runPythonScript(scriptPath);
    return {
      statusCode: 200,
      body: JSON.stringify({ result: output }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `Failed to run the test: ${error.message}` }),
    };
  }
};

// Helper function to run Python script
function runPythonScript(scriptPath) {
  return new Promise((resolve, reject) => {
    exec(`python3 ${scriptPath}`, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(stderr || error.message));
      } else {
        resolve(stdout);
      }
    });
  });
}

const { execSync } = require('child_process');

exports.handler = async (event, context) => {
  try {
    // Run your Python Playwright script
    const result = execSync('python test_example.py', {
      stdio: 'pipe',
      encoding: 'utf-8'
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Playwright test executed successfully",
        output: result
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message,
        stderr: error.stderr?.toString() || '',
        stdout: error.stdout?.toString() || ''
      })
    };
  }
};
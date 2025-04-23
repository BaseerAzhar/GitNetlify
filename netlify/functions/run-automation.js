// netlify/functions/run-automation.js

const { exec } = require("child_process");

exports.handler = async (event, context) => {
  return new Promise((resolve, reject) => {
    // Adjust the command based on your file's location and python version
    exec("python3 usa_automation.py", (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing python script: ${error.message}`);
        return reject({
          statusCode: 500,
          body: JSON.stringify({ message: "Error executing Python script", error: error.message })
        });
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return reject({
          statusCode: 500,
          body: JSON.stringify({ message: "Error in Python script", stderr: stderr })
        });
      }

      console.log(`stdout: ${stdout}`);
      resolve({
        statusCode: 200,
        body: JSON.stringify({ message: "Script executed successfully", output: stdout })
      });
    });
  });
};

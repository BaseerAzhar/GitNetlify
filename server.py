import os
from http.server import SimpleHTTPRequestHandler, HTTPServer
import subprocess
import logging
import json
from urllib.parse import parse_qs, urlparse

# Enable logging
logging.basicConfig(level=logging.DEBUG)

# Map of test names to script filenames
TEST_SCRIPTS = {
    'usa_manual': 'usa_manual.py',
    'usa_automation': 'usa_automation.py',
    'canada_automation': 'canada_automation.py',
    'canada_manual':'canada_manual.py'
}


class MyHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        # Parse the query string to get the 'test' parameter
        query_params = parse_qs(urlparse(self.path).query)
        test_name = query_params.get('test', [None])[0]

        if test_name in TEST_SCRIPTS:
            test_script = TEST_SCRIPTS[test_name]
            self.run_test(test_script)
        else:
            # If the test is not found, serve static files (like the HTML)
            super().do_GET()

    def run_test(self, test_script):
        try:
            logging.info(f"Running test script: {test_script}")

            # Run the corresponding test script
            result = subprocess.run(['python', test_script], capture_output=True, text=True)

            # Check if there was an error while running the script
            if result.returncode != 0:
                logging.error(f"Test execution failed: {result.stderr}")
                self.send_response(500)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                error_message = f"Test execution failed: {result.stderr.strip()}"
                self.wfile.write(json.dumps({"error": error_message}).encode())
            else:
                # Log the result before sanitizing the output
                logging.info(f"Test output: {result.stdout}")

                # Sanitize the output for JSON
                sanitized_output = result.stdout.replace("\n", "\\n").replace("\r", "\\r").replace("\t", "\\t")
                sanitized_output = sanitized_output.replace('"', '\\"')

                logging.info(f"Sanitized output: {sanitized_output}")

                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"result": sanitized_output}).encode())
        except Exception as e:
            logging.error(f"Error while executing test: {e}")
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            error_message = f"An error occurred: {str(e)}"
            self.wfile.write(json.dumps({"error": error_message}).encode())

# Set the directory where the HTML file is (now it's in the same directory as the script)
os.chdir(os.path.dirname(__file__))  # This will use the current directory

# Create and start the server
httpd = HTTPServer(('localhost', 8000), MyHandler)
logging.info("Server started on http://localhost:8000")
httpd.serve_forever()

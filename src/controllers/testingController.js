'use strict'

const { status, successMessage, errorMessage } = require('../helpers/payload');
const PythonShell = require('python-shell').PythonShell;

module.exports = {
    postSoundToTest: async (req, res) => {
        const testDir = __dirname + '/detection/testing.py';

        var options = {args: [req.file.filename]};
          
        PythonShell.run(testDir, options, function (err, results) {
            if (err) {
                errorMessage.message = err.message;
                errorMessage.error = status.error;
            }
            successMessage.file = req.file;
            // successMessage.value = parseFloat(results[0]);
            successMessage.status = results;
            res.send(successMessage);
        });
    }
}